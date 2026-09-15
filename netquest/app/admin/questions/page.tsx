"use client";
import { createClient } from "../../../utils/supabase/client";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

type Question = {
  id: number;
  question: string;
  category: "Networking" | "Interview" | "DSA";
  difficulty: "Easy" | "Medium" | "Hard";
  type: "MCQ" | "Scenario" | "Interview";
  options: string[];
  answer: string;
  explanation: string;
  marks: number;
};

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Which device primarily operates at Layer 2?",
    category: "Networking",
    difficulty: "Easy",
    type: "MCQ",
    options: ["Router", "Switch", "Hub", "Modem"],
    answer: "Switch",
    explanation:
      "A switch primarily operates at the Data Link Layer and forwards frames using MAC addresses.",
    marks: 1,
  },
  {
    id: 2,
    question: "A user can access the LAN but cannot access the internet. What should you check first?",
    category: "Interview",
    difficulty: "Medium",
    type: "Scenario",
    options: [
      "Default gateway",
      "Monitor brightness",
      "Keyboard",
      "Printer",
    ],
    answer: "Default gateway",
    explanation:
      "The default gateway provides the path from the local network to remote networks.",
    marks: 2,
  },
  {
    id: 3,
    question: "What is the time complexity of binary search?",
    category: "DSA",
    difficulty: "Easy",
    type: "MCQ",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: "O(log n)",
    explanation:
      "Binary search eliminates approximately half of the search space at every step.",
    marks: 1,
  },
];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  
  const [search, setSearch] = useState("");
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
      console.error("SUPABASE Error:",JSON.stringify(error,null,2)) 
      alert(JSON.stringigy(error,null,2));
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
      const matchesSearch = q.question
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || q.category === category;

      const matchesDifficulty =
        difficulty === "All" || q.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [questions, search, category, difficulty]);

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

async function handleExcelUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: "array",
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet, {
      defval: "",
    }) as Record<string, any>[];

    if (rows.length === 0) {
      alert("Excel file is empty.");
      return;
    }

    const questionsToInsert = rows
      .map((row) => ({
        question: String(row.question || "").trim(),
        category: String(row.category || "Networking").trim(),
        difficulty: String(row.difficulty || "Easy").trim(),
        type: String(row.type || "MCQ").trim(),
        option_a: String(row.option_a || "").trim(),
        option_b: String(row.option_b || "").trim(),
        option_c: String(row.option_c || "").trim(),
        option_d: String(row.option_d || "").trim(),
        answer: String(row.answer || "").trim().toUpperCase(),
        explanation: String(row.explanation || "").trim(),
        marks: Number(row.marks) || 1,
      }))
      .filter((row) => row.question);

    if (questionsToInsert.length === 0) {
      alert("No valid questions found in the Excel file.");
      return;
    }

    console.log(
      "EXCEL QUESTIONS TO INSERT:",
      questionsToInsert
    );

    const { data, error } = await supabase
      .from("questions")
      .insert(questionsToInsert)
      .select();

    if (error) {
      console.error("EXCEL UPLOAD ERROR:", error);

      alert(
        `Excel upload failed: ${error.message}`
      );

      return;
    }

    console.log(
      "EXCEL QUESTIONS INSERTED:",
      data
    );

    alert(
      `✅ ${data?.length || 0} questions imported successfully!`
    );

    // Refresh questions on the page
    const { data: refreshedQuestions, error: refreshError } =
      await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

    if (!refreshError && refreshedQuestions) {
      setQuestions(refreshedQuestions);
    }

  } catch (error) {
    console.error("EXCEL FILE ERROR:", error);

    alert(
      "Unable to read this Excel file. Please check the file format."
    );
  }

  // Allow selecting the same file again
  event.target.value = "";
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

  function deleteQuestion(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) return;

    setQuestions((prev) => prev.filter((q) => q.id !== id));
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

  <input
    type="file"
    accept=".xlsx,.xls"
    onChange={handleExcelUpload}
    className="hidden"
  />
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
              options={["All", "Networking", "Interview", "DSA"]}
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
          {filteredQuestions.length === 0 ? (
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
            filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">
                      {index + 1}
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
                      onClick={() => deleteQuestion(question.id)}
                      className="rounded-xl border border-red-400/20 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
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
                  options={["Networking", "Interview", "DSA"]}
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