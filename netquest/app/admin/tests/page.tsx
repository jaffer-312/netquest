"use client";
import { createClient } from "../../../utils/supabase/client";
import { useEffect, useMemo, useState } from "react";

type Question = {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  marks: number;
};

type Test = {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  question_count: number;
  total_marks: number;
  duration_minutes: number;
  is_enabled: boolean;
};

export default function CreateTestPage() {
  const [testName, setTestName] = useState("");
  const supabase = createClient();
  useEffect(() => {
    async function loadQuestions() {
      setLoadingQuestions(true);

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading test questions:", error);
        setLoadingQuestions(false);
        return;
      }

      if (data) {
        const formattedQuestions: Question[] = data.map((q) => ({
          id: q.id,
          question: q.question,
          category: q.category,
          difficulty: q.difficulty,
          marks: q.marks,
        }));

        setQuestions(formattedQuestions);
      }

      setLoadingQuestions(false);
    }

    loadQuestions();
  }, []);

  useEffect(() => {
    async function loadTests() {
      setLoadingTests(true);

      const { data, error } = await supabase
        .from("tests")
        .select(
          "id, title, category, difficulty, question_count, total_marks, duration_minutes, is_enabled",
        )
        .order("id", { ascending: false });

      if (error) {
        console.error("Error loading tests:", error);
        setLoadingTests(false);
        return;
      }

      setTests(data || []);
      setLoadingTests(false);
    }

    loadTests();
  }, []);

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [loadingTests, setLoadingTests] = useState(true);

  const [category, setCategory] = useState("Mixed");
  const [difficulty, setDifficulty] = useState("All");

  const [duration, setDuration] = useState("30");
  const [questionCount, setQuestionCount] = useState("10");

  const [randomize, setRandomize] = useState(true);
  const [enableTest, setEnableTest] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const categoryMatch = category === "Mixed" || q.category === category;

      const difficultyMatch =
        difficulty === "All" || q.difficulty === difficulty;

      return categoryMatch && difficultyMatch;
    });
  }, [questions, category, difficulty]);

  const totalMarks = selectedQuestions.reduce((total, id) => {
    const question = questions.find((q) => q.id === id);
    return total + (question?.marks || 0);
  }, 0);

  function toggleQuestion(id: number) {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  async function publishTest() {
    if (!testName.trim()) {
      alert("Please enter a test name.");
      return;
    }

    if (selectedQuestions.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    const selectedQuestionData = questions.filter((q) =>
      selectedQuestions.includes(q.id),
    );

    const totalMarks = selectedQuestionData.reduce(
      (total, q) => total + (q.marks || 0),
      0,
    );

    // 1. Create the test
    const { data: test, error: testError } = await supabase
      .from("tests")
      .insert({
        title: testName.trim(),
        description: description.trim(),
        category,
        difficulty,
        duration_minutes: Number(duration) || 30,
        question_count: selectedQuestions.length,
        total_marks: totalMarks,
        randomize,
        is_enabled: false,
      })
      .select()
      .single();

    if (testError) {
      console.error("SUPABASE TEST ERROR:", JSON.stringify(testError, null, 2));

      alert(`Test creation failed: ${testError.message}`);
      return;
    }

    // 2. Link selected questions to the test

    const testQuestionRows = selectedQuestions.map((questionId, index) => ({
      test_id: test.id,
      question_id: questionId,
      question_order: index + 1,
    }));

    const { error: questionLinkError } = await supabase
      .from("test_questions")
      .insert(testQuestionRows);

    if (questionLinkError) {
      console.error(
        "SUPABASE TEST QUESTIONS ERROR:",
        JSON.stringify(questionLinkError, null, 2),
      );

      alert(
        `Test created, but questions could not be linked: ${questionLinkError.message}`,
      );
      return;
    }

    alert(
      `🎉 Test "${test.title}" published successfully with ${selectedQuestions.length} questions!`,
    );
  }

  async function startEditingTest(test: Test) {
    setEditingTest(test);
    setLoadingQuestions(true);

    const { data, error } = await supabase
      .from("test_questions")
      .select("question_id")
      .eq("test_id", test.id)
      .order("question_order", { ascending: true });

    if (error) {
      console.error("EDIT QUESTIONS LOAD ERROR:", error);
      alert(`Could not load challenge questions: ${error.message}`);
      setLoadingQuestions(false);
      return;
    }

    const questionIds = (data || []).map((item) => item.question_id);

    setSelectedQuestions(questionIds);
    setLoadingQuestions(false);
  }

  async function saveEditedTest() {
    if (!editingTest) return;

    if (!editingTest.title.trim()) {
      alert("Please enter a test name.");
      return;
    }

    if (selectedQuestions.length === 0) {
      alert("Please select at least one question.");
      return;
    }

    // Calculate total marks from selected questions
    const selectedQuestionData = questions.filter((q) =>
      selectedQuestions.includes(q.id),
    );

    const newTotalMarks = selectedQuestionData.reduce(
      (total, q) => total + (q.marks || 0),
      0,
    );

    // 1. Update test details
    const { data: updatedTest, error: testError } = await supabase
      .from("tests")
      .update({
        title: editingTest.title.trim(),
        category: editingTest.category,
        difficulty: editingTest.difficulty,
        duration_minutes: Number(editingTest.duration_minutes) || 30,
        question_count: selectedQuestions.length,
        total_marks: newTotalMarks,
        is_enabled: editingTest.is_enabled,
      })
      .eq("id", editingTest.id)
      .select()
      .single();

    if (testError) {
      console.error(
        "EDIT TEST UPDATE ERROR:",
        JSON.stringify(testError, null, 2),
      );

      alert(`Could not update test: ${testError.message}`);
      return;
    }

    // 2. Remove old question links
    const { error: deleteLinksError } = await supabase
      .from("test_questions")
      .delete()
      .eq("test_id", editingTest.id);

    if (deleteLinksError) {
      console.error(
        "EDIT QUESTION LINKS DELETE ERROR:",
        JSON.stringify(deleteLinksError, null, 2),
      );

      alert(
        `Test details updated, but old question links could not be removed: ${deleteLinksError.message}`,
      );

      return;
    }

    // 3. Create new question links
    const newQuestionLinks = selectedQuestions.map((questionId, index) => ({
      test_id: editingTest.id,
      question_id: questionId,
      question_order: index + 1,
    }));

    const { error: insertLinksError } = await supabase
      .from("test_questions")
      .insert(newQuestionLinks);

    if (insertLinksError) {
      console.error(
        "EDIT QUESTION LINKS INSERT ERROR:",
        JSON.stringify(insertLinksError, null, 2),
      );

      alert(
        `Test updated, but questions could not be linked: ${insertLinksError.message}`,
      );

      return;
    }

    // 4. Update UI
    setTests((prev) =>
      prev.map((test) => (test.id === editingTest.id ? updatedTest : test)),
    );

    // 5. Close edit panel
    setEditingTest(null);

    alert(
      `✅ "${updatedTest.title}" updated successfully with ${selectedQuestions.length} questions!`,
    );
  }

  async function toggleTestStatus(
    testId: number,
    currentStatus: boolean,
    testTitle: string,
  ) {
    const newStatus = !currentStatus;

    const action = newStatus ? "activate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${testTitle}"?`,
    );

    if (!confirmed) {
      return;
    }

    const { data, error } = await supabase
      .from("tests")
      .update({
        is_enabled: newStatus,
      })
      .eq("id", testId)
      .select();

    if (error) {
      console.error(
        "UPDATE TEST STATUS ERROR:",
        JSON.stringify(error, null, 2),
      );

      alert(`Could not ${action} test: ${error.message}`);
      return;
    }

    // IMPORTANT:
    // If Supabase returned no row, update did not actually happen.
    if (!data || data.length === 0) {
      console.error("NO TEST ROW UPDATED IN SUPABASE");

      alert(
        "Status was NOT updated in Supabase. Most likely an RLS UPDATE policy issue.",
      );

      return;
    }

    // Update UI only after Supabase confirms the update
    setTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              is_enabled: newStatus,
            }
          : test,
      ),
    );

    alert(
      newStatus
        ? `🟢 "${testTitle}" is now ACTIVE.`
        : `⚪ "${testTitle}" is now INACTIVE.`,
    );
  }

  async function deleteTest(testId: number, testTitle: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${testTitle}"?\n\nThis will delete the test, its question links, and its results.`,
    );

    if (!confirmed) {
      return;
    }

    // 1. Delete results
    const { error: resultsError } = await supabase
      .from("results")
      .delete()
      .eq("test_id", testId);

    if (resultsError) {
      console.error("DELETE RESULTS ERROR:", resultsError);
      alert(`Could not delete results: ${resultsError.message}`);
      return;
    }

    // 2. Delete question links
    const { error: questionsError } = await supabase
      .from("test_questions")
      .delete()
      .eq("test_id", testId);

    if (questionsError) {
      console.error("DELETE TEST QUESTIONS ERROR:", questionsError);
      alert(`Could not delete question links: ${questionsError.message}`);
      return;
    }

    // 3. Delete the test
    const { data: deletedTest, error: testError } = await supabase
      .from("tests")
      .delete()
      .eq("id", testId)
      .select();

    if (testError) {
      console.error("DELETE TEST ERROR:", testError);
      alert(`Could not delete test: ${testError.message}`);
      return;
    }

    // Check whether Supabase actually deleted a row
    if (!deletedTest || deletedTest.length === 0) {
      console.error("TEST WAS NOT DELETED FROM SUPABASE");
      alert(
        "Test was removed from the screen, but Supabase did not delete the row. This is most likely an RLS DELETE policy issue.",
      );
      return;
    }

    // 4. Remove from UI only after Supabase deletion succeeds
    setTests((prev) => prev.filter((test) => test.id !== testId));

    alert(`🗑️ "${testTitle}" deleted successfully from Supabase.`);
  }
  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            NetQuest Admin
          </p>

          <h1 className="mt-2 text-4xl font-black">Create Test</h1>

          <p className="mt-2 text-slate-400">
            Build an interactive assessment for your students.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Test Details */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  01 — Test Details
                </p>

                <h2 className="mt-1 text-xl font-black">Basic Information</h2>
              </div>

              <div className="space-y-5">
                <Field
                  label="Test Name"
                  value={testName}
                  onChange={setTestName}
                  placeholder="Example: CCNA Networking Challenge"
                />

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this test for students..."
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField
                    label="Duration (minutes)"
                    value={duration}
                    onChange={setDuration}
                  />

                  <NumberField
                    label="Questions"
                    value={questionCount}
                    onChange={setQuestionCount}
                  />
                </div>
              </div>
            </section>

            {/* Question Selection */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  02 — Question Selection
                </p>

                <h2 className="mt-1 text-xl font-black">Choose Questions</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Category"
                  value={category}
                  onChange={setCategory}
                  options={["Mixed", "Networking", "Interview", "DSA"]}
                />

                <SelectField
                  label="Difficulty"
                  value={difficulty}
                  onChange={setDifficulty}
                  options={["All", "Easy", "Medium", "Hard"]}
                />
              </div>

              <div className="mt-6 space-y-3">
                {filteredQuestions.map((question) => {
                  const selected = selectedQuestions.includes(question.id);

                  return (
                    <button
                      key={question.id}
                      onClick={() => toggleQuestion(question.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-cyan-400/50 bg-cyan-400/10"
                          : "border-white/10 bg-black/20 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                            selected
                              ? "border-cyan-400 bg-cyan-400 text-slate-950"
                              : "border-white/20"
                          }`}
                        >
                          {selected ? "✓" : ""}
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold">{question.question}</p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge text={question.category} />
                            <Badge text={question.difficulty} />
                            <Badge text={`${question.marks} mark`} />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {filteredQuestions.length === 0 && (
                  <div className="rounded-2xl border border-white/10 p-8 text-center text-slate-500">
                    No questions match your filters.
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-black/20 p-4">
                <span className="text-sm text-slate-400">
                  Selected Questions
                </span>

                <span className="font-black text-cyan-400">
                  {selectedQuestions.length}
                </span>
              </div>
            </section>

            {/* Test Controls */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  03 — Test Controls
                </p>

                <h2 className="mt-1 text-xl font-black">Student Experience</h2>
              </div>

              <div className="space-y-4">
                <Toggle
                  title="Randomize Questions"
                  description="Show questions in a different order for each student."
                  enabled={randomize}
                  onChange={() => setRandomize(!randomize)}
                />

                <Toggle
                  title="Enable Test"
                  description="Allow students to access this test."
                  enabled={enableTest}
                  onChange={() => setEnableTest(!enableTest)}
                />
              </div>
            </section>
          </div>

          {/* RIGHT — Preview */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-6">
            <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-white/[0.02] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Test Preview
              </p>

              <h2 className="mt-3 text-2xl font-black">
                {testName || "Your Test Name"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description || "Your test description will appear here."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <PreviewStat
                  icon="⏱️"
                  label="Duration"
                  value={`${duration} min`}
                />

                <PreviewStat
                  icon="❓"
                  label="Questions"
                  value={selectedQuestions.length.toString()}
                />

                <PreviewStat
                  icon="🏆"
                  label="Total Marks"
                  value={totalMarks.toString()}
                />

                <PreviewStat
                  icon="🎮"
                  label="Mode"
                  value={randomize ? "Random" : "Fixed"}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Test Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      enableTest
                        ? "bg-green-400/10 text-green-400"
                        : "bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    {enableTest ? "LIVE" : "DRAFT"}
                  </span>
                </div>
              </div>

              <button
                onClick={publishTest}
                className="mt-6 w-full rounded-xl bg-cyan-400 py-4 font-black text-slate-950 transition hover:scale-[1.02]"
              >
                🚀 CREATE & PUBLISH TEST
              </button>
            </section>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-bold">💡 Next-level features</p>

              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>• Automatic scoring</li>
                <li>• Student leaderboard</li>
                <li>• Topper analysis</li>
                <li>• Question-wise performance</li>
                <li>• Animated results</li>
              </ul>
            </div>
          </aside>
        </div>

        {editingTest && (
          <section className="mb-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Edit Challenge
                </p>

                <h2 className="mt-1 text-xl font-black">{editingTest.title}</h2>
              </div>

              <button
                onClick={() => setEditingTest(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-400 hover:bg-white/5"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="space-y-5">
              {/* Test Name */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Test Name
                </label>

                <input
                  value={editingTest.title}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
                />
              </div>

              {/* Category + Difficulty */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Category
                  </label>

                  <select
                    value={editingTest.category}
                    onChange={(e) =>
                      setEditingTest({
                        ...editingTest,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none"
                  >
                    <option value="Mixed">Mixed</option>
                    <option value="Networking">Networking</option>
                    <option value="Interview">Interview</option>
                    <option value="DSA">DSA</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Difficulty
                  </label>

                  <select
                    value={editingTest.difficulty}
                    onChange={(e) =>
                      setEditingTest({
                        ...editingTest,
                        difficulty: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Duration (minutes)
                </label>

                <input
                  type="number"
                  min="1"
                  value={editingTest.duration_minutes}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      duration_minutes: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
                />
              </div>

              {/* Edit Challenge Questions */}
              <div>
                <div className="mb-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Challenge Questions
                  </label>

                  <p className="mt-1 text-xs text-slate-500">
                    Select or remove questions for this challenge.
                  </p>
                </div>

                <div className="max-h-[400px] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-3">
                  {questions.map((question) => {
                    const selected = selectedQuestions.includes(question.id);

                    return (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() => toggleQuestion(question.id)}
                        className={`w-full rounded-xl border p-3 text-left transition ${
                          selected
                            ? "border-cyan-400/40 bg-cyan-400/10"
                            : "border-white/10 bg-black/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                              selected
                                ? "border-cyan-400 bg-cyan-400 text-slate-950"
                                : "border-white/20"
                            }`}
                          >
                            {selected ? "✓" : ""}
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {question.question}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge text={question.category} />
                              <Badge text={question.difficulty} />
                              <Badge text={`${question.marks} mark`} />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {questions.length === 0 && (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No questions available.
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="text-sm text-slate-400">
                    Selected Questions
                  </span>

                  <span className="font-black text-cyan-400">
                    {selectedQuestions.length}
                  </span>
                </div>
              </div>

              {/* Current Information */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-500">Questions</p>
                    <p className="mt-1 font-black text-cyan-400">
                      {editingTest.question_count}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Marks</p>
                    <p className="mt-1 font-black text-cyan-400">
                      {editingTest.total_marks}
                    </p>
                  </div>

                  <div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">Challenge Status</p>

                          <p className="mt-1 text-xs text-slate-500">
                            Control whether students can access this challenge.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setEditingTest({
                              ...editingTest,
                              is_enabled: !editingTest.is_enabled,
                            })
                          }
                          className={`rounded-xl px-5 py-2.5 text-sm font-black transition ${
                            editingTest.is_enabled
                              ? "border border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                              : "border border-green-400/30 bg-green-400/10 text-green-400"
                          }`}
                        >
                          {editingTest.is_enabled
                            ? "⏸ DEACTIVATE"
                            : "▶ ACTIVATE"}
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/10 p-3 text-center">
                          <p className="text-xs text-slate-500">Questions</p>

                          <p className="mt-1 font-black text-cyan-400">
                            {editingTest.question_count}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 p-3 text-center">
                          <p className="text-xs text-slate-500">Total Marks</p>

                          <p className="mt-1 font-black text-cyan-400">
                            {editingTest.total_marks}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-black ${
                            editingTest.is_enabled
                              ? "bg-green-400/10 text-green-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}
                        >
                          {editingTest.is_enabled
                            ? "🟢 ACTIVE — Students can access"
                            : "⚪ INACTIVE — Hidden from students"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingTest(null)}
                  className="flex-1 rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-400 hover:bg-white/5"
                >
                  CANCEL
                </button>

                <button
                  onClick={saveEditedTest}
                  className="flex-1 rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950"
                >
                  💾 SAVE CHANGES
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Manage Tests */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              04 — Manage Tests
            </p>

            <h2 className="mt-1 text-xl font-black">Existing Challenges</h2>

            <p className="mt-2 text-sm text-slate-500">
              Manage or delete previously created tests.
            </p>
          </div>

          {loadingTests ? (
            <div className="rounded-2xl border border-white/10 p-6 text-center text-slate-500">
              Loading tests...
            </div>
          ) : tests.length === 0 ? (
            <div className="rounded-2xl border border-white/10 p-6 text-center text-slate-500">
              No tests created yet.
            </div>
          ) : (
            <div className="space-y-3">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{test.title}</h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          test.is_enabled
                            ? "bg-green-400/10 text-green-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {test.is_enabled ? "LIVE" : "DRAFT"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      {test.question_count} Questions · {test.total_marks} Marks
                      · {test.duration_minutes} Minutes
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toggleTestStatus(test.id, test.is_enabled, test.title)
                    }
                    className={`rounded-xl border px-5 py-2.5 text-sm font-black transition ${
                      test.is_enabled
                        ? "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                        : "border-green-400/30 text-green-400 hover:bg-green-400/10"
                    }`}
                  >
                    {test.is_enabled ? "⏸ DEACTIVATE" : "▶ ACTIVATE"}
                  </button>

                  <button
                    onClick={() => startEditingTest(test)}
                    className="rounded-xl border border-cyan-400/30 px-5 py-2.5 text-sm font-black text-cyan-400 transition hover:bg-cyan-400/10"
                  >
                    ✏️ EDIT
                  </button>
                  <button
                    onClick={() => deleteTest(test.id, test.title)}
                    className="rounded-xl border border-red-400/30 px-5 py-2.5 text-sm font-black text-red-400 transition hover:bg-red-400/10"
                  >
                    🗑️ DELETE
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
      />
    </div>
  );
}

function SelectField({
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

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
      {text}
    </span>
  );
}

function Toggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 text-left"
    >
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <div
        className={`relative h-7 w-12 rounded-full transition ${
          enabled ? "bg-cyan-400" : "bg-white/10"
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </div>
    </button>
  );
}

function PreviewStat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xl">{icon}</div>
      <p className="mt-2 text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
