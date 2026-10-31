"use client";

import { createClient } from "../../../utils/supabase/client";

import { useEffect, useMemo, useState } from "react";

import * as XLSX from "xlsx";

type Question = {

  id: number;

  question: string;

  category: "Networking" | "Network Detective" | "Interview" | "DSA";

  difficulty: "Easy" | "Medium" | "Hard";

  type: "MCQ" | "Scenario" | "Interview";

  options: string[];

  answer: string;

  explanation: string;

  marks: number;

};

export default function QuestionBankPage() {

  const [questions, setQuestions] = useState<Question[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [category, setCategory] = useState("All");

  const [difficulty, setDifficulty] = useState("All");

  const supabase = createClient();

  useEffect(() => {

  async function loadQuestions() {

    const { data, error } = await supabase

      .from("questions")

      .select("*")

      .order("created_at", { ascending: false });

    if (error) {

      console.error("SUPABASE Error:", error);
      alert(`Unable to load questions: ${error.message}`);
      setLoading(false);
      return;

    }

    if (data) {

      const formattedQuestions: Question[] = data.map((q) => ({

        id: q.id,

        question: q.question,

        category: q.category,

        difficulty: q.difficulty,

        type: q.type,

        options: [

          q.option_a,

          q.option_b,

          q.option_c,

          q.option_d,

        ],

        answer: q.answer,

        explanation: q.explanation || "",

        marks: q.marks,

      }));

      setQuestions(formattedQuestions);
    }
    setLoading(false);
  }

  loadQuestions();

}, []);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [preview, setPreview] = useState<Question | null>(null);

  const [form, setForm] = useState({

    question: "",

    category: "Networking" as Question["category"],

    difficulty: "Easy" as Question["difficulty"],

    type: "MCQ" as Question["type"],

    optionA: "",

    optionB: "",

    optionC: "",

    optionD: "",

    answer: "",

    explanation: "",

    marks: "1",

  });

  const filteredQuestions = useMemo(() => {

    return questions.filter((q) => {

      const searchText = search.trim().toLowerCase();
      const matchesSearch = [q.question, ...q.options, q.answer, q.explanation]
        .some((value) => String(value || "").toLowerCase().includes(searchText));

      const matchesCategory =

        category === "All" || q.category === category;

      const matchesDifficulty =

        difficulty === "All" || q.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;

    });

  }, [questions, search, category, difficulty]);

  useEffect(() => {
    setPage(1);
  }, [search, category, difficulty]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  const paginatedQuestions = filteredQuestions.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function resetForm() {

    setForm({

      question: "",

      category: "Networking",

      difficulty: "Easy",

      type: "MCQ",

      optionA: "",

      optionB: "",

      optionC: "",

      optionD: "",

      answer: "",

      explanation: "",

      marks: "1",

    });

    setEditingId(null);

  }

  
function downloadExcelTemplate() {
  const template = [
    {
      question: "Which device primarily operates at Layer 2?",
      category: "Networking",
      difficulty: "Easy",
      type: "MCQ",
      option_a: "Router",
      option_b: "Switch",
      option_c: "Hub",
      option_d: "Modem",
      answer: "B",
      explanation: "A switch primarily operates at Layer 2.",
      marks: 1,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");

  XLSX.writeFile(workbook, "NetQuest_Question_Template.xlsx");
}

function exportQuestions() {
  if (filteredQuestions.length === 0) {
    alert("No questions available to export.");
    return;
  }

  const exportData = filteredQuestions.map((q) => ({
    question: q.question,
    category: q.category,
    difficulty: q.difficulty,
    type: q.type,
    option_a: q.options[0] || "",
    option_b: q.options[1] || "",
    option_c: q.options[2] || "",
    option_d: q.options[3] || "",
    answer: q.answer,
    explanation: q.explanation,
    marks: q.marks,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");

  XLSX.writeFile(workbook, "NetQuest_Questions_Export.xlsx");
}



async function handleExcelUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      alert("No worksheet found in the Excel file.");
      return;
    }

    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet, {
      defval: "",
    }) as Record<string, any>[];

    if (rows.length === 0) {
      alert("Excel file is empty.");
      return;
    }

    const allowedCategories = [
      "Networking",
      "Network Detective",
      "Interview",
      "DSA",
    ];

    const allowedDifficulties = ["Easy", "Medium", "Hard"];
    const allowedTypes = ["MCQ", "Scenario", "Interview"];

    const existingQuestions = new Set(
      questions.map((q) => q.question.trim().toLowerCase())
    );

    const uploadedQuestions = new Set<string>();

    const validRows: any[] = [];
    const errors: string[] = [];
    let duplicateCount = 0;

    rows.forEach((row, index) => {
      const rowNumber = index + 2;

      const question = String(row.question || "").trim();
      const category = String(row.category || "Networking").trim();
      const difficulty = String(row.difficulty || "Easy").trim();
      const type = String(row.type || "MCQ").trim();

      const optionA = String(row.option_a || "").trim();
      const optionB = String(row.option_b || "").trim();
      const optionC = String(row.option_c || "").trim();
      const optionD = String(row.option_d || "").trim();

      const answer = String(row.answer || "").trim().toUpperCase();
      const explanation = String(row.explanation || "").trim();
      const marks = Number(row.marks) || 1;

      if (!question) {
        errors.push(`Row ${rowNumber}: Question is missing.`);
        return;
      }

      if (!allowedCategories.includes(category)) {
        errors.push(`Row ${rowNumber}: Invalid category.`);
        return;
      }

      if (!allowedDifficulties.includes(difficulty)) {
        errors.push(`Row ${rowNumber}: Invalid difficulty.`);
        return;
      }

      if (!allowedTypes.includes(type)) {
        errors.push(`Row ${rowNumber}: Invalid question type.`);
        return;
      }

      if (!optionA || !optionB || !optionC || !optionD) {
        errors.push(`Row ${rowNumber}: All four options are required.`);
        return;
      }

      if (!["A", "B", "C", "D"].includes(answer)) {
        errors.push(`Row ${rowNumber}: Answer must be A, B, C or D.`);
        return;
      }

      if (!Number.isFinite(marks) || marks <= 0) {
        errors.push(`Row ${rowNumber}: Marks must be greater than zero.`);
        return;
      }

      const normalizedQuestion = question.toLowerCase();

      if (
        existingQuestions.has(normalizedQuestion) ||
        uploadedQuestions.has(normalizedQuestion)
      ) {
        duplicateCount++;
        return;
      }

      uploadedQuestions.add(normalizedQuestion);

      validRows.push({
        question,
        category,
        difficulty,
        type,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        answer,
        explanation,
        marks,
      });
    });

    if (validRows.length === 0) {
      alert(
        `No new valid questions to import.\n\nDuplicates: ${duplicateCount}\nInvalid rows: ${errors.length}`
      );
      if (errors.length) console.table(errors);
      return;
    }

    const { data, error } = await supabase
      .from("questions")
      .insert(validRows)
      .select();

    if (error) {
      console.error("EXCEL UPLOAD ERROR:", error);
      alert(`Excel upload failed: ${error.message}`);
      return;
    }

    const formattedQuestions: Question[] = (data || []).map((q) => ({
      id: q.id,
      question: q.question,
      category: q.category,
      difficulty: q.difficulty,
      type: q.type,
      options: [
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
      ],
      answer: q.answer,
      explanation: q.explanation || "",
      marks: q.marks,
    }));

    setQuestions((prev) => [
      ...formattedQuestions,
      ...prev,
    ]);

    alert(
      `Import completed!\n\nSuccessfully imported: ${formattedQuestions.length}\nDuplicates skipped: ${duplicateCount}\nInvalid rows: ${errors.length}\n\n${errors.length ? "Check the browser console for row-wise errors." : ""}`
    );

    if (errors.length) {
      console.table(errors);
    }

  } catch (error) {
    console.error("EXCEL FILE ERROR:", error);
    alert("Unable to read this Excel file. Please check its format.");
  } finally {
    event.target.value = "";
  }
}


  async function saveQuestion() {

  if (

    !form.question.trim() ||

    !form.optionA.trim() ||

    !form.optionB.trim() ||

    !form.optionC.trim() ||

    !form.optionD.trim() ||

    !form.answer.trim()

  ) {

    alert("Please complete the question and all answer fields.");

    return;

  }

  const questionData = {

    question: form.question.trim(),

    category: form.category,

    difficulty: form.difficulty,

    type: form.type,

    option_a: form.optionA.trim(),

    option_b: form.optionB.trim(),

    option_c: form.optionC.trim(),

    option_d: form.optionD.trim(),

    answer: form.answer.trim(),

    explanation: form.explanation.trim(),

    marks: Number(form.marks) || 1,

  };

  // EDIT existing question

  if (editingId) {

    const { data, error } = await supabase

      .from("questions")

      .update(questionData)

      .eq("id", editingId)

      .select()

      .single();

    if (error) {

      console.error("Error updating question:", error);

      alert(`Update failed: ${error.message}`);

      return;

    }

    setQuestions((prev) =>

      prev.map((q) => {

        if (q.id !== editingId) return q;

        return {

          id: data.id,

          question: data.question,

          category: data.category,

          difficulty: data.difficulty,

          type: data.type,

          options: [

            data.option_a,

            data.option_b,

            data.option_c,

            data.option_d,

          ],

          answer: data.answer,

          explanation: data.explanation || "",

          marks: data.marks,

        };

      })

    );

  }

  // CREATE new question

  else {

    const { data, error } = await supabase

      .from("questions")

      .insert(questionData)

      .select()

      .single();

    if (error) {

      console.error(

        "SUPABSE INSERT ERROR:", JSON.stringify(error, null, 2)

      )

      alert(JSON.stringify(error, null, 2));

      return;

    }

    const newQuestion: Question = {

      id: data.id,

      question: data.question,

      category: data.category,

      difficulty: data.difficulty,

      type: data.type,

      options: [

        data.option_a,

        data.option_b,

        data.option_c,

        data.option_d,

      ],

      answer: data.answer,

      explanation: data.explanation || "",

      marks: data.marks,

    };

    setQuestions((prev) => [newQuestion, ...prev]);

  }

  resetForm();

  setShowForm(false);

}

  function editQuestion(question: Question) {

    setEditingId(question.id);

    setForm({

      question: question.question,

      category: question.category,

      difficulty: question.difficulty,

      type: question.type,

      optionA: question.options[0] || "",

      optionB: question.options[1] || "",

      optionC: question.options[2] || "",

      optionD: question.options[3] || "",

      answer: question.answer,

      explanation: question.explanation,

      marks: String(question.marks),

    });

    setShowForm(true);

  }

  async function deleteQuestion(id: number) {
    const questionToDelete = questions.find((question) => question.id === id);
    if (!questionToDelete) return;

    const confirmed = window.confirm(
      `Delete this question permanently?

${questionToDelete.question}

If it is linked to an existing challenge, the database may block deletion.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id)
      .select("id");
    setDeletingId(null);

    if (error) {
      console.error("Question delete failed:", error);
      alert(`Delete failed: ${error.message}`);
      return;
    }
    if (!data || data.length === 0) {
      alert("The question was not deleted. Check the Supabase DELETE policy/permissions.");
      return;
    }

    setQuestions((prev) => prev.filter((question) => question.id !== id));
    alert("Question deleted successfully.");
  }

  return (

    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">

              NetQuest Admin

            </p>

            <h1 className="mt-2 text-4xl font-black">

              Question Bank

            </h1>

            <p className="mt-2 text-slate-400">

              Create, manage and organize questions for your students.

            </p>

          </div>

          <button

            onClick={() => {

              resetForm();

              setShowForm(true);

            }}

            className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"

          >

            + Add Question

          </button>

          <label className="cursor-pointer rounded-xl border border-cyan-400/30 px-4 py-2.5 text-sm font-black text-cyan-400 transition hover:bg-cyan-400/10">

  📊 UPLOAD EXCEL

  
<div className="flex flex-wrap gap-3">
  <button
    type="button"
    onClick={downloadExcelTemplate}
    className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5"
  >
    ↓ Download Template
  </button>

  <button
    type="button"
    onClick={exportQuestions}
    className="rounded-xl border border-green-400/30 px-4 py-3 text-sm font-bold text-green-400 hover:bg-green-400/10"
  >
    ↑ Export Excel ({filteredQuestions.length})
  </button>

  <label className="cursor-pointer rounded-xl border border-cyan-400/30 px-4 py-3 text-sm font-black text-cyan-400 transition hover:bg-cyan-400/10">
    📊 Upload Excel

    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={handleExcelUpload}
      className="hidden"
    />
  </label>
</div>


</label>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <MiniStat

            label="Total Questions"

            value={questions.length.toString()}

          />

          <MiniStat

            label="Networking"

            value={questions.filter((q) => q.category === "Networking").length.toString()}

          />

          <MiniStat

            label="Interview + DSA"

            value={questions.filter((q) => q.category !== "Networking").length.toString()}

          />

        </div>

        {/* Filters */}

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">

          <div className="grid gap-4 md:grid-cols-[1fr_180px_180px]">

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">

                Search

              </label>

              <input

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                placeholder="Search questions..."

                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"

              />

            </div>

            <Select

              label="Category"

              value={category}

              onChange={setCategory}

              options={["All", "Networking", "Network Detective", "Interview", "DSA"]}

            />

            <Select

              label="Difficulty"

              value={difficulty}

              onChange={setDifficulty}

              options={["All", "Easy", "Medium", "Hard"]}

            />

          </div>

        </section>

        {/* Questions */}

        <section className="mt-6 space-y-4">

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center text-slate-400">Loading questions from Supabase...</div>
          ) : filteredQuestions.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

              <div className="text-5xl">🔎</div>

              <h2 className="mt-4 text-xl font-bold">

                No questions found

              </h2>

              <p className="mt-2 text-sm text-slate-500">

                Try changing your search or filters.

              </p>

            </div>

          ) : (

            paginatedQuestions.map((question, index) => (

              <div

                key={question.id}

                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20"

              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">

                      {(page - 1) * pageSize + index + 1}

                    </div>

                    <div>

                      <h2 className="font-bold leading-6">

                        {question.question}

                      </h2>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <Badge text={question.category} />

                        <Badge text={question.difficulty} />

                        <Badge text={question.type} />

                        <Badge text={`${question.marks} mark${question.marks > 1 ? "s" : ""}`} />

                      </div>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    <ActionButton

                      text="Preview"

                      onClick={() => setPreview(question)}

                    />

                    <ActionButton

                      text="Edit"

                      onClick={() => editQuestion(question)}

                    />

                    <button
                      onClick={() => void deleteQuestion(question.id)}
                      disabled={deletingId === question.id}
                      className="rounded-xl border border-red-400/20 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                    >
                      {deletingId === question.id ? "Deleting..." : "Delete"}
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

          {!loading && filteredQuestions.length > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredQuestions.length)} of {filteredQuestions.length} questions
              </p>
              <div className="flex items-center gap-2">
                <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5">Previous</button>
                <span className="min-w-20 text-center text-sm text-slate-300">Page {page} / {totalPages}</span>
                <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5">Next</button>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Add/Edit Modal */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1023] p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">

                  Question Editor

                </p>

                <h2 className="mt-1 text-2xl font-black">

                  {editingId ? "Edit Question" : "Create Question"}

                </h2>

              </div>

              <button

                onClick={() => {

                  setShowForm(false);

                  resetForm();

                }}

                className="text-2xl text-slate-500 hover:text-white"

              >

                ×

              </button>

            </div>

            <div className="mt-7 space-y-5">

              <Field

                label="Question"

                value={form.question}

                onChange={(value) =>

                  setForm({ ...form, question: value })

                }

                placeholder="Enter your question..."

                textarea

              />

              <div className="grid gap-4 md:grid-cols-3">

                <FormSelect

                  label="Category"

                  value={form.category}

                  onChange={(value) =>

                    setForm({

                      ...form,

                      category: value as Question["category"],

                    })

                  }

                  options={["Networking", "Network Detective", "Interview", "DSA"]}

                />

                <FormSelect

                  label="Difficulty"

                  value={form.difficulty}

                  onChange={(value) =>

                    setForm({

                      ...form,

                      difficulty: value as Question["difficulty"],

                    })

                  }

                  options={["Easy", "Medium", "Hard"]}

                />

                <FormSelect

                  label="Question Type"

                  value={form.type}

                  onChange={(value) =>

                    setForm({

                      ...form,

                      type: value as Question["type"],

                    })

                  }

                  options={["MCQ", "Scenario", "Interview"]}

                />

              </div>

              <div>

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">

                  Answer Options

                </p>

                <div className="grid gap-4 md:grid-cols-2">

                  <Field

                    label="Option A"

                    value={form.optionA}

                    onChange={(value) =>

                      setForm({ ...form, optionA: value })

                    }

                    placeholder="Option A"

                  />

                  <Field

                    label="Option B"

                    value={form.optionB}

                    onChange={(value) =>

                      setForm({ ...form, optionB: value })

                    }

                    placeholder="Option B"

                  />

                  <Field

                    label="Option C"

                    value={form.optionC}

                    onChange={(value) =>

                      setForm({ ...form, optionC: value })

                    }

                    placeholder="Option C"

                  />

                  <Field

                    label="Option D"

                    value={form.optionD}

                    onChange={(value) =>

                      setForm({ ...form, optionD: value })

                    }

                    placeholder="Option D"

                  />

                </div>

              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_120px]">

                <Field

                  label="Correct Answer"

                  value={form.answer}

                  onChange={(value) =>

                    setForm({ ...form, answer: value })

                  }

                  placeholder="Example: Switch"

                />

                <Field

                  label="Marks"

                  value={form.marks}

                  onChange={(value) =>

                    setForm({ ...form, marks: value })

                  }

                  placeholder="1"

                />

              </div>

              <Field

                label="Explanation"

                value={form.explanation}

                onChange={(value) =>

                  setForm({ ...form, explanation: value })

                }

                placeholder="Explain why this is the correct answer..."

                textarea

              />

              <div className="flex flex-col gap-3 pt-3 sm:flex-row">

                <button

                  onClick={saveQuestion}

                  className="flex-1 rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 transition hover:scale-[1.01]"

                >

                  {editingId ? "Save Changes" : "Create Question"}

                </button>

                <button

                  onClick={() => {

                    setShowForm(false);

                    resetForm();

                  }}

                  className="rounded-xl border border-white/10 px-6 py-3 font-bold text-slate-400 hover:bg-white/5 hover:text-white"

                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* Preview Modal */}

      {preview && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0b1023] p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">

                  Question Preview

                </p>

                <h2 className="mt-2 text-xl font-bold">

                  {preview.question}

                </h2>

              </div>

              <button

                onClick={() => setPreview(null)}

                className="text-2xl text-slate-500 hover:text-white"

              >

                ×

              </button>

            </div>

            <div className="mt-7 space-y-3">

              {preview.options.map((option, index) => (

                <div

                  key={option}

                  className={`rounded-xl border p-4 ${

                    option === preview.answer

                      ? "border-green-400/40 bg-green-400/10 text-green-300"

                      : "border-white/10 bg-white/[0.03]"

                  }`}

                >

                  <span className="mr-3 font-bold">

                    {String.fromCharCode(65 + index)}.

                  </span>

                  {option}

                  {option === preview.answer && (

                    <span className="float-right">✓ Correct</span>

                  )}

                </div>

              ))}

            </div>

            <div className="mt-6 rounded-xl bg-white/[0.03] p-4">

              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">

                Explanation

              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                {preview.explanation}

              </p>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}

function MiniStat({

  label,

  value,

}: {

  label: string;

  value: string;

}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-black text-cyan-400">{value}</p>

    </div>

  );

}

function Badge({ text }: { text: string }) {

  return (

    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">

      {text}

    </span>

  );

}

function ActionButton({

  text,

  onClick,

}: {

  text: string;

  onClick: () => void;

}) {

  return (

    <button

      onClick={onClick}

      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white"

    >

      {text}

    </button>

  );

}

function Field({

  label,

  value,

  onChange,

  placeholder,

  textarea = false,

}: {

  label: string;

  value: string;

  onChange: (value: string) => void;

  placeholder: string;

  textarea?: boolean;

}) {

  return (

    <div>

      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">

        {label}

      </label>

      {textarea ? (

        <textarea

          value={value}

          onChange={(e) => onChange(e.target.value)}

          placeholder={placeholder}

          rows={4}

          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"

        />

      ) : (

        <input

          value={value}

          onChange={(e) => onChange(e.target.value)}

          placeholder={placeholder}

          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"

        />

      )}

    </div>

  );

}

function Select({

  label,

  value,

  onChange,

  options,

}: {

  label: string;

  value: string;

  onChange: (value: string) => void;

  options: string[];

}) {

  return (

    <div>

      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">

        {label}

      </label>

      <select

        value={value}

        onChange={(e) => onChange(e.target.value)}

        className="w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none"

      >

        {options.map((option) => (

          <option key={option} value={option}>

            {option}

          </option>

        ))}

      </select>

    </div>

  );

}

function FormSelect({

  label,

  value,

  onChange,

  options,

}: {

  label: string;

  value: string;

  onChange: (value: string) => void;

  options: string[];

}) {

  return (

    <div>

      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">

        {label}

      </label>

      <select

        value={value}

        onChange={(e) => onChange(e.target.value)}

        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-400/50"

      >

        {options.map((option) => (

          <option key={option} value={option}>

            {option}

          </option>

        ))}

      </select>

    </div>

  );

}
