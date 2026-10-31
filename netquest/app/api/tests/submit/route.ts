
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../../utils/supabase/server";

type QuestionRow = {
  id: number;
  question: string;
  category: string | null;
  marks: number | null;
  answer: string;
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please log in before submitting a test." },
        { status: 401 }
      );
    }

    let body: any;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON submission." },
        { status: 400 }
      );
    }

    const testId = Number(body?.testId);
    const rawAnswers = body?.answers;
    const rawDuration = body?.durationSeconds;

    const durationSeconds =
      typeof rawDuration === "number" &&
      Number.isFinite(rawDuration) &&
      Number.isInteger(rawDuration) &&
      rawDuration >= 0 &&
      rawDuration <= 86400
        ? rawDuration
        : null;

    if (
      !Number.isSafeInteger(testId) ||
      testId <= 0 ||
      !rawAnswers ||
      typeof rawAnswers !== "object" ||
      Array.isArray(rawAnswers)
    ) {
      return NextResponse.json(
        { error: "Invalid test submission." },
        { status: 400 }
      );
    }

    const answers = rawAnswers as Record<string, unknown>;
    const answerEntries = Object.entries(answers);

    if (answerEntries.length > 500) {
      return NextResponse.json(
        { error: "Too many answers in one submission." },
        { status: 400 }
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

    const { data: test, error: testError } = await supabase
      .from("tests")
      .select("id, title, is_enabled")
      .eq("id", testId)
      .eq("is_enabled", true)
      .maybeSingle();

    if (testError) throw testError;

    if (!test) {
      return NextResponse.json(
        { error: "This test is unavailable or unpublished." },
        { status: 404 }
      );
    }

    const { data: links, error: linksError } = await supabase
      .from("test_questions")
      .select(`
        question_order,
        questions (
          id,
          question,
          category,
          marks,
          answer
        )
      `)
      .eq("test_id", testId)
      .order("question_order", { ascending: true });

    if (linksError) throw linksError;

    const questions: QuestionRow[] = (links || [])
      .flatMap((row: any) => {
        const related = row.questions;
        if (!related) return [];
        return Array.isArray(related) ? related : [related];
      })
      .filter(
        (question: any) =>
          question &&
          Number.isSafeInteger(Number(question.id)) &&
          typeof question.answer === "string"
      )
      .map((question: any) => ({
        id: Number(question.id),
        question: String(question.question ?? ""),
        category: question.category ?? null,
        marks:
          question.marks === null || question.marks === undefined
            ? 0
            : Number(question.marks),
        answer: question.answer,
      }));

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "This test has no usable questions." },
        { status: 400 }
      );
    }

    const validIds = new Set(
      questions.map((question) => String(question.id))
    );

    if (answerEntries.some(([id]) => !validIds.has(id))) {
      return NextResponse.json(
        { error: "Submission contains an invalid question ID." },
        { status: 400 }
      );
    }

    for (const [, value] of answerEntries) {
      if (
        typeof value !== "string" ||
        !["A", "B", "C", "D"].includes(value)
      ) {
        return NextResponse.json(
          { error: "One or more selected answers are invalid." },
          { status: 400 }
        );
      }
    }

    let score = 0;
    let totalMarks = 0;
    let correct = 0;
    let answered = 0;

    for (const question of questions) {
      const marks = Math.max(0, Number(question.marks) || 0);
      const selected = answers[String(question.id)];

      totalMarks += marks;

      if (selected !== undefined) {
        answered++;

        if (selected === question.answer) {
          score += marks;
          correct++;
        }
      }
    }

    const wrong = answered - correct;
    const percentage =
      totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    const { data: savedResult, error: resultError } = await supabase
      .from("results")
      .insert({
        test_id: testId,
        student_id: student.student_id,
        student_name: student.student_name,
        score,
        total_marks: totalMarks,
        percentage,
        correct_answers: correct,
        wrong_answers: wrong,
        answered_questions: answered,
        duration_seconds: durationSeconds,
      })
      .select("id")
      .single();

    if (resultError) throw resultError;

    const answerRows = questions.map((question) => {
      const selected = answers[String(question.id)] ?? null;
      const isCorrect =
        selected !== null && selected === question.answer;

      return {
        result_id: savedResult.id,
        question_id: question.id,
        selected_answer: selected,
        correct_answer: question.answer,
        is_correct: isCorrect,
        category: question.category || "Uncategorized",
        marks_awarded: isCorrect
          ? Math.max(0, Number(question.marks) || 0)
          : 0,
      };
    });

    const { error: answerSaveError } = await supabase
      .from("result_answers")
      .insert(answerRows);

    if (answerSaveError) {
      console.error("[ANSWER SAVE] FAILED", {
        resultId: savedResult.id,
        code: answerSaveError.code,
        message: answerSaveError.message,
        details: answerSaveError.details,
        hint: answerSaveError.hint,
      });

      return NextResponse.json({
        resultId: savedResult.id,
        score,
        totalMarks,
        percentage,
        correct,
        wrong,
        answered,
        durationSeconds,
        warning:
          "Your score was saved, but question-level analysis could not be saved.",
      });
    }

    return NextResponse.json({
      resultId: savedResult.id,
      score,
      totalMarks,
      percentage,
      correct,
      wrong,
      answered,
      durationSeconds,
    });
  } catch (error) {
    console.error("Test submission failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save your test result.",
      },
      { status: 500 }
    );
  }
}
