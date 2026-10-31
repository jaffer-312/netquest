
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const resultId = Number(id);

    if (!Number.isSafeInteger(resultId) || resultId <= 0) {
      return NextResponse.json(
        { error: "Invalid result ID." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please log in to view this result." },
        { status: 401 }
      );
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("student_id, student_name")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (studentError) throw studentError;

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found." },
        { status: 403 }
      );
    }

    const { data: result, error: resultError } = await supabase
      .from("results")
      .select(`
        id,
        test_id,
        student_id,
        score,
        total_marks,
        percentage,
        correct_answers,
        wrong_answers,
        answered_questions,
        duration_seconds,
        created_at
      `)
      .eq("id", resultId)
      .eq("student_id", student.student_id)
      .maybeSingle();

    if (resultError) throw resultError;

    if (!result) {
      return NextResponse.json(
        { error: "Result not found for this account." },
        { status: 404 }
      );
    }

    const { data: test, error: testError } = await supabase
      .from("tests")
      .select("id, title, category, difficulty")
      .eq("id", result.test_id)
      .maybeSingle();

    if (testError) throw testError;

    const { data: answers, error: answersError } = await supabase
      .from("result_answers")
      .select(`
        result_id,
        question_id,
        selected_answer,
        correct_answer,
        is_correct,
        category,
        marks_awarded,
        questions (
          id,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          explanation
        )
      `)
      .eq("result_id", resultId)
      .order("question_id", { ascending: true });

    if (answersError) throw answersError;

    const review = (answers ?? []).map((answer: any) => {
      const question = Array.isArray(answer.questions)
        ? answer.questions[0]
        : answer.questions;

      const options: Record<string, string | null> = {
        A: question?.option_a ?? null,
        B: question?.option_b ?? null,
        C: question?.option_c ?? null,
        D: question?.option_d ?? null,
      };

      return {
        ...answer,
        question: question?.question ?? "",
        options,
        explanation: question?.explanation ?? "",
        selected_answer_text:
          options[String(answer.selected_answer ?? "").toUpperCase()] ??
          answer.selected_answer ??
          "Not answered",
        correct_answer_text:
          options[String(answer.correct_answer ?? "").toUpperCase()] ??
          answer.correct_answer ??
          "Unavailable",
      };
    });

    return NextResponse.json({
      studentName: student.student_name,
      result,
      test,
      answers: review,
    });
  } catch (error) {
    console.error("Detailed result API error:", error);

    return NextResponse.json(
      { error: "Unable to load detailed result." },
      { status: 500 }
    );
  }
}
