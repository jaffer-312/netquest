
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../../utils/supabase/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please log in to view your history." },
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
        { error: "Student profile not found for this account." },
        { status: 403 }
      );
    }

    const { data: results, error: resultsError } = await supabase
      .from("results")
      .select(
        "id, test_id, student_id, student_name, score, total_marks, percentage, correct_answers, wrong_answers, answered_questions, duration_seconds, created_at"
      )
      .eq("student_id", student.student_id)
      .order("created_at", { ascending: false });

    if (resultsError) throw resultsError;

    const resultRows = results ?? [];
    const resultIds = resultRows.map((result) => result.id);

    const testIds = [
      ...new Set(resultRows.map((result) => result.test_id)),
    ];

    let tests: any[] = [];
    let answers: any[] = [];

    if (testIds.length > 0) {
      const { data, error } = await supabase
        .from("tests")
        .select("id, title, category, difficulty")
        .in("id", testIds);

      if (error) {
        console.error("[HISTORY TESTS ERROR]", error);
        throw error;
      }

      tests = data ?? [];
    }

    if (resultIds.length > 0) {
      const { data, error } = await supabase
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
            question
          )
        `)
        .in("result_id", resultIds)
        .order("question_id", { ascending: true });

      if (error) {
        console.error("[HISTORY ANSWERS ERROR]", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });

        throw error;
      }

      answers = data ?? [];
    }

    const testMap = new Map(
      tests.map((test) => [test.id, test])
    );

    const attempts = resultRows.map((result) => ({
      ...result,
      test: testMap.get(result.test_id) ?? null,
      answers: answers
        .filter((answer) => answer.result_id === result.id)
        .map((answer) => ({
          ...answer,
          question: Array.isArray(answer.questions)
            ? answer.questions[0]?.question ?? ""
            : answer.questions?.question ?? "",
        })),
    }));

    return NextResponse.json({
      studentName: student.student_name,
      attempts,
    });
  } catch (error) {
    console.error("Student history API error:", error);

    return NextResponse.json(
      { error: "Unable to load test history." },
      { status: 500 }
    );
  }
}
