(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/tests/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateTestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CreateTestPage() {
    _s();
    const [testName, setTestName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateTestPage.useEffect": ()=>{
            async function loadQuestions() {
                setLoadingQuestions(true);
                const { data, error } = await supabase.from("questions").select("*").order("created_at", {
                    ascending: false
                });
                if (error) {
                    console.error("Error loading test questions:", error);
                    setLoadingQuestions(false);
                    return;
                }
                if (data) {
                    const formattedQuestions = data.map({
                        "CreateTestPage.useEffect.loadQuestions.formattedQuestions": (q)=>({
                                id: q.id,
                                question: q.question,
                                category: q.category,
                                difficulty: q.difficulty,
                                marks: q.marks
                            })
                    }["CreateTestPage.useEffect.loadQuestions.formattedQuestions"]);
                    setQuestions(formattedQuestions);
                }
                setLoadingQuestions(false);
            }
            loadQuestions();
        }
    }["CreateTestPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateTestPage.useEffect": ()=>{
            async function loadTests() {
                setLoadingTests(true);
                const { data, error } = await supabase.from("tests").select("id, title, category, difficulty, question_count, total_marks, duration_minutes, is_enabled").order("id", {
                    ascending: false
                });
                if (error) {
                    console.error("Error loading tests:", error);
                    setLoadingTests(false);
                    return;
                }
                setTests(data || []);
                setLoadingTests(false);
            }
            loadTests();
        }
    }["CreateTestPage.useEffect"], []);
    const [loadingQuestions, setLoadingQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tests, setTests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingTest, setEditingTest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingTests, setLoadingTests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Mixed");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("30");
    const [questionCount, setQuestionCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("10");
    const [randomize, setRandomize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [enableTest, setEnableTest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedQuestions, setSelectedQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const filteredQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateTestPage.useMemo[filteredQuestions]": ()=>{
            return questions.filter({
                "CreateTestPage.useMemo[filteredQuestions]": (q)=>{
                    const categoryMatch = category === "Mixed" || q.category === category;
                    const difficultyMatch = difficulty === "All" || q.difficulty === difficulty;
                    return categoryMatch && difficultyMatch;
                }
            }["CreateTestPage.useMemo[filteredQuestions]"]);
        }
    }["CreateTestPage.useMemo[filteredQuestions]"], [
        questions,
        category,
        difficulty
    ]);
    const totalMarks = selectedQuestions.reduce((total, id)=>{
        const question = questions.find((q)=>q.id === id);
        return total + (question?.marks || 0);
    }, 0);
    // Live totals for the challenge currently being edited.
    const editingSelectedTotalMarks = selectedQuestions.reduce((total, id)=>{
        const question = questions.find((q)=>q.id === id);
        return total + (Number(question?.marks) || 0);
    }, 0);
    function toggleQuestion(id) {
        setSelectedQuestions((prev)=>prev.includes(id) ? prev.filter((item)=>item !== id) : [
                ...prev,
                id
            ]);
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
        // Prevent duplicate test names (case-insensitive, ignoring surrounding spaces).
        const normalizedTestName = testName.trim().toLocaleLowerCase();
        const { data: existingTestNames, error: duplicateCheckError } = await supabase.from("tests").select("id, title");
        if (duplicateCheckError) {
            console.error("DUPLICATE TEST NAME CHECK ERROR:", duplicateCheckError);
            alert(`Could not verify whether this test name already exists: ${duplicateCheckError.message}`);
            return;
        }
        const duplicateTest = (existingTestNames || []).find((item)=>(item.title || "").trim().toLocaleLowerCase() === normalizedTestName);
        if (duplicateTest) {
            alert(`A test named "${testName.trim()}" already exists. Please change the test name before creating another one.`);
            return;
        }
        const selectedQuestionData = questions.filter((q)=>selectedQuestions.includes(q.id));
        const totalMarks = selectedQuestionData.reduce((total, q)=>total + (q.marks || 0), 0);
        // 1. Create the test
        const { data: test, error: testError } = await supabase.from("tests").insert({
            title: testName.trim(),
            description: description.trim(),
            category,
            difficulty,
            duration_minutes: Number(duration) || 30,
            question_count: selectedQuestions.length,
            total_marks: totalMarks,
            randomize,
            is_enabled: false
        }).select().single();
        if (testError) {
            console.error("SUPABASE TEST ERROR:", JSON.stringify(testError, null, 2));
            alert(`Test creation failed: ${testError.message}`);
            return;
        }
        // 2. Link selected questions to the test
        const testQuestionRows = selectedQuestions.map((questionId, index)=>({
                test_id: test.id,
                question_id: questionId,
                question_order: index + 1
            }));
        const { error: questionLinkError } = await supabase.from("test_questions").insert(testQuestionRows);
        if (questionLinkError) {
            console.error("SUPABASE TEST QUESTIONS ERROR:", JSON.stringify(questionLinkError, null, 2));
            alert(`Test created, but questions could not be linked: ${questionLinkError.message}`);
            return;
        }
        const createdQuestionCount = selectedQuestions.length;
        setTests((previous)=>[
                test,
                ...previous
            ]);
        setTestName("");
        setDescription("");
        setSelectedQuestions([]);
        setEnableTest(false);
        alert(`🎉 Test "${test.title}" created successfully with ${createdQuestionCount} questions. It is saved as a draft; activate it from Existing Challenges when ready.`);
    }
    async function startEditingTest(test) {
        setEditingTest(test);
        setLoadingQuestions(true);
        const { data, error } = await supabase.from("test_questions").select("question_id").eq("test_id", test.id).order("question_order", {
            ascending: true
        });
        if (error) {
            console.error("EDIT QUESTIONS LOAD ERROR:", error);
            alert(`Could not load challenge questions: ${error.message}`);
            setLoadingQuestions(false);
            return;
        }
        const questionIds = (data || []).map((item)=>item.question_id);
        setSelectedQuestions(questionIds);
        setLoadingQuestions(false);
    }
    async function saveEditedTest() {
        if (!editingTest) return;
        if (!editingTest.title.trim()) {
            alert("Please enter a challenge name.");
            return;
        }
        if (selectedQuestions.length === 0) {
            alert("A challenge must contain at least one question.");
            return;
        }
        const selectedQuestionData = questions.filter((question)=>selectedQuestions.includes(question.id));
        if (selectedQuestionData.length !== selectedQuestions.length) {
            alert("Some selected questions are no longer available. Refresh the page and try again.");
            return;
        }
        const newTotalMarks = selectedQuestionData.reduce((total, question)=>total + (Number(question.marks) || 0), 0);
        // Read the current links so we only add/remove changed links.
        // This preserves unchanged links and never deletes questions from the Question Bank.
        const { data: existingLinks, error: loadLinksError } = await supabase.from("test_questions").select("question_id, question_order").eq("test_id", editingTest.id).order("question_order", {
            ascending: true
        });
        if (loadLinksError) {
            console.error("EDIT QUESTION LINKS LOAD ERROR:", JSON.stringify(loadLinksError, null, 2));
            alert(`Could not load current challenge questions: ${loadLinksError.message}`);
            return;
        }
        const existingIds = (existingLinks || []).map((link)=>Number(link.question_id));
        const selectedIdSet = new Set(selectedQuestions);
        const existingIdSet = new Set(existingIds);
        const removedIds = [
            ...new Set(existingIds)
        ].filter((id)=>!selectedIdSet.has(id));
        const addedIds = selectedQuestions.filter((id)=>!existingIdSet.has(id));
        // Add new links first. If insertion fails, existing links are left intact.
        if (addedIds.length > 0) {
            const maxOrder = (existingLinks || []).reduce((max, link)=>Math.max(max, Number(link.question_order) || 0), 0);
            const newLinks = addedIds.map((questionId, index)=>({
                    test_id: editingTest.id,
                    question_id: questionId,
                    question_order: maxOrder + index + 1
                }));
            const { error: insertLinksError } = await supabase.from("test_questions").insert(newLinks);
            if (insertLinksError) {
                console.error("EDIT QUESTION LINKS INSERT ERROR:", JSON.stringify(insertLinksError, null, 2));
                alert(`Could not add questions to the challenge: ${insertLinksError.message}`);
                return;
            }
        }
        // Remove only links the administrator unchecked. The question rows remain in public.questions.
        if (removedIds.length > 0) {
            const { data: deletedLinks, error: deleteLinksError } = await supabase.from("test_questions").delete().eq("test_id", editingTest.id).in("question_id", removedIds).select("question_id");
            if (deleteLinksError) {
                console.error("EDIT QUESTION LINKS DELETE ERROR:", JSON.stringify(deleteLinksError, null, 2));
                alert(`Questions were added, but some old links could not be removed: ${deleteLinksError.message}. Please reopen this challenge and review it.`);
                return;
            }
            if (!deletedLinks || deletedLinks.length !== removedIds.length) {
                alert("Some questions could not be removed from this challenge. Check test_questions DELETE permissions, then reopen the challenge and review it.");
                return;
            }
        }
        // Update challenge metadata and calculated totals only after link operations succeed.
        const { data: updatedTest, error: testError } = await supabase.from("tests").update({
            title: editingTest.title.trim(),
            category: editingTest.category,
            difficulty: editingTest.difficulty,
            duration_minutes: Math.max(1, Number(editingTest.duration_minutes) || 30),
            question_count: selectedQuestions.length,
            total_marks: newTotalMarks,
            is_enabled: editingTest.is_enabled
        }).eq("id", editingTest.id).select().single();
        if (testError) {
            console.error("EDIT TEST UPDATE ERROR:", JSON.stringify(testError, null, 2));
            alert(`Question links were updated, but challenge details could not be saved: ${testError.message}. Reopen the challenge and save again.`);
            return;
        }
        setTests((previous)=>previous.map((test)=>test.id === editingTest.id ? updatedTest : test));
        setEditingTest(null);
        alert(`Challenge updated successfully: ${selectedQuestions.length} questions, ${newTotalMarks} total marks. Student results and history were not deleted.`);
    }
    async function toggleTestStatus(testId, currentStatus, testTitle) {
        const newStatus = !currentStatus;
        const action = newStatus ? "activate" : "deactivate";
        const confirmed = window.confirm(`Are you sure you want to ${action} "${testTitle}"?`);
        if (!confirmed) {
            return;
        }
        const { data, error } = await supabase.from("tests").update({
            is_enabled: newStatus
        }).eq("id", testId).select();
        if (error) {
            console.error("UPDATE TEST STATUS ERROR:", JSON.stringify(error, null, 2));
            alert(`Could not ${action} test: ${error.message}`);
            return;
        }
        // IMPORTANT:
        // If Supabase returned no row, update did not actually happen.
        if (!data || data.length === 0) {
            console.error("NO TEST ROW UPDATED IN SUPABASE");
            alert("Status was NOT updated in Supabase. Most likely an RLS UPDATE policy issue.");
            return;
        }
        // Update UI only after Supabase confirms the update
        setTests((prev)=>prev.map((test)=>test.id === testId ? {
                    ...test,
                    is_enabled: newStatus
                } : test));
        alert(newStatus ? `🟢 "${testTitle}" is now ACTIVE.` : `⚪ "${testTitle}" is now INACTIVE.`);
    }
    async function deleteTest(testId, testTitle) {
        const confirmed = window.confirm(`Are you sure you want to delete "${testTitle}"?\n\nThis will delete the test, its question links, and its results.`);
        if (!confirmed) {
            return;
        }
        // 1. Delete results
        const { error: resultsError } = await supabase.from("results").delete().eq("test_id", testId);
        if (resultsError) {
            console.error("DELETE RESULTS ERROR:", resultsError);
            alert(`Could not delete results: ${resultsError.message}`);
            return;
        }
        // 2. Delete question links
        const { error: questionsError } = await supabase.from("test_questions").delete().eq("test_id", testId);
        if (questionsError) {
            console.error("DELETE TEST QUESTIONS ERROR:", questionsError);
            alert(`Could not delete question links: ${questionsError.message}`);
            return;
        }
        // 3. Delete the test
        const { data: deletedTest, error: testError } = await supabase.from("tests").delete().eq("id", testId).select();
        if (testError) {
            console.error("DELETE TEST ERROR:", testError);
            alert(`Could not delete test: ${testError.message}`);
            return;
        }
        // Check whether Supabase actually deleted a row
        if (!deletedTest || deletedTest.length === 0) {
            console.error("TEST WAS NOT DELETED FROM SUPABASE");
            alert("Test was removed from the screen, but Supabase did not delete the row. This is most likely an RLS DELETE policy issue.");
            return;
        }
        // 4. Remove from UI only after Supabase deletion succeeds
        setTests((prev)=>prev.filter((test)=>test.id !== testId));
        alert(`🗑️ "${testTitle}" deleted successfully from Supabase.`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#050816] px-5 py-8 text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-bold uppercase tracking-[0.3em] text-cyan-400",
                            children: "NetQuest Admin"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 853,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-2 text-4xl font-black",
                            children: "Create Test"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 861,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-slate-400",
                            children: "Build an interactive assessment for your students."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 865,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/tests/page.tsx",
                    lineNumber: 851,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 lg:grid-cols-[1fr_360px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                                    children: "01 — Test Details"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 887,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-xl font-black",
                                                    children: "Basic Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 885,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Test Name",
                                                    value: testName,
                                                    onChange: setTestName,
                                                    placeholder: "Example: CCNA Networking Challenge"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 903,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                                                            children: "Description"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 919,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: description,
                                                            onChange: (e)=>setDescription(e.target.value),
                                                            placeholder: "Describe this test for students...",
                                                            rows: 4,
                                                            className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 927,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 917,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-4 sm:grid-cols-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NumberField, {
                                                            label: "Duration (minutes)",
                                                            value: duration,
                                                            onChange: setDuration
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 947,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NumberField, {
                                                            label: "Questions",
                                                            value: questionCount,
                                                            onChange: setQuestionCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 959,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 901,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                                    children: "02 — Question Selection"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 983,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-xl font-black",
                                                    children: "Choose Questions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 991,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 981,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-4 sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                                                    label: "Category",
                                                    value: category,
                                                    onChange: setCategory,
                                                    options: [
                                                        "Mixed",
                                                        "Networking",
                                                        "Network Detective",
                                                        "Interview",
                                                        "DSA"
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                                                    label: "Difficulty",
                                                    value: difficulty,
                                                    onChange: setDifficulty,
                                                    options: [
                                                        "All",
                                                        "Easy",
                                                        "Medium",
                                                        "Hard"
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1013,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 997,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 space-y-3",
                                            children: [
                                                filteredQuestions.map((question)=>{
                                                    const selected = selectedQuestions.includes(question.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleQuestion(question.id),
                                                        className: `w-full rounded-2xl border p-4 text-left transition ${selected ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-black/20 hover:border-white/20"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${selected ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/20"}`,
                                                                    children: selected ? "✓" : ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1059,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold",
                                                                            children: question.question
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1081,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2 flex flex-wrap gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: question.category
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1087,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: question.difficulty
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1089,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: `${question.marks} mark`
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1091,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1085,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1079,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1057,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, question.id, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 21
                                                    }, this);
                                                }),
                                                filteredQuestions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-white/10 p-8 text-center text-slate-500",
                                                    children: "No questions match your filters."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex items-center justify-between rounded-xl bg-black/20 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-slate-400",
                                                    children: "Selected Questions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1123,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-cyan-400",
                                                    children: selectedQuestions.length
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1121,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 979,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                                    children: "03 — Test Controls"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-xl font-black",
                                                    children: "Student Experience"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1157,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                                    title: "Randomize Questions",
                                                    description: "Show questions in a different order for each student.",
                                                    enabled: randomize,
                                                    onChange: ()=>setRandomize(!randomize)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1165,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                                    title: "Enable Test",
                                                    description: "Allow students to access this test.",
                                                    enabled: enableTest,
                                                    onChange: ()=>setEnableTest(!enableTest)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1179,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 879,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "h-fit space-y-6 lg:sticky lg:top-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-white/[0.02] p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                            children: "Test Preview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-3 text-2xl font-black",
                                            children: testName || "Your Test Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1213,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm leading-6 text-slate-400",
                                            children: description || "Your test description will appear here."
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewStat, {
                                                    icon: "⏱️",
                                                    label: "Duration",
                                                    value: `${duration} min`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1231,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewStat, {
                                                    icon: "❓",
                                                    label: "Questions",
                                                    value: selectedQuestions.length.toString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewStat, {
                                                    icon: "🏆",
                                                    label: "Total Marks",
                                                    value: totalMarks.toString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewStat, {
                                                    icon: "🎮",
                                                    label: "Mode",
                                                    value: randomize ? "Random" : "Fixed"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1267,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1229,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 rounded-2xl border border-white/10 bg-black/20 p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-slate-500",
                                                        children: "Test Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1285,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded-full px-3 py-1 text-xs font-bold ${enableTest ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`,
                                                        children: enableTest ? "LIVE" : "DRAFT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1289,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/tests/page.tsx",
                                                lineNumber: 1283,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: publishTest,
                                            className: "mt-6 w-full rounded-xl bg-cyan-400 py-4 font-black text-slate-950 transition hover:scale-[1.02]",
                                            children: "🚀 CREATE & PUBLISH TEST"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1313,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: "💡 Next-level features"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1331,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-3 space-y-2 text-sm text-slate-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Automatic scoring"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1337,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Student leaderboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1339,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Topper analysis"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1341,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Question-wise performance"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1343,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Animated results"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1345,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1335,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1329,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1201,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/tests/page.tsx",
                    lineNumber: 875,
                    columnNumber: 9
                }, this),
                editingTest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mb-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                            children: "Edit Challenge"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1365,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-xl font-black",
                                            children: editingTest.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1373,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1363,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingTest(null),
                                    className: "rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-400 hover:bg-white/5",
                                    children: "✕ CLOSE"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1379,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1361,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                                            children: "Test Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1399,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: editingTest.title,
                                            onChange: (e)=>setEditingTest({
                                                    ...editingTest,
                                                    title: e.target.value
                                                }),
                                            className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1407,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1397,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1437,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editingTest.category,
                                                    onChange: (e)=>setEditingTest({
                                                            ...editingTest,
                                                            category: e.target.value
                                                        }),
                                                    className: "w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Mixed",
                                                            children: "Mixed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1465,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Networking",
                                                            children: "Networking"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1467,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Network Detective",
                                                            children: "Network Detective"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1469,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Interview",
                                                            children: "Interview"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1471,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "DSA",
                                                            children: "DSA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1473,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1445,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1435,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Difficulty"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1483,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editingTest.difficulty,
                                                    onChange: (e)=>setEditingTest({
                                                            ...editingTest,
                                                            difficulty: e.target.value
                                                        }),
                                                    className: "w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "All",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1511,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Easy",
                                                            children: "Easy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1513,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Medium",
                                                            children: "Medium"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1515,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Hard",
                                                            children: "Hard"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1517,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1491,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1481,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1433,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                                            children: "Duration (minutes)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1531,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "1",
                                            value: editingTest.duration_minutes,
                                            onChange: (e)=>setEditingTest({
                                                    ...editingTest,
                                                    duration_minutes: Number(e.target.value)
                                                }),
                                            className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1539,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1529,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Challenge Questions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1573,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-slate-500",
                                                    children: "Select or remove questions for this challenge."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1581,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1571,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-h-[400px] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-3",
                                            children: [
                                                questions.map((question)=>{
                                                    const selected = selectedQuestions.includes(question.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>toggleQuestion(question.id),
                                                        className: `w-full rounded-xl border p-3 text-left transition ${selected ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-black/10 hover:border-white/20"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${selected ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/20"}`,
                                                                    children: selected ? "✓" : ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1623,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-semibold",
                                                                            children: question.question
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1645,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2 flex flex-wrap gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: question.category
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1655,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: question.difficulty
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1657,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                    text: `${question.marks} mark`
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                                    lineNumber: 1659,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1653,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1643,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1621,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, question.id, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1601,
                                                        columnNumber: 23
                                                    }, this);
                                                }),
                                                questions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-6 text-center text-sm text-slate-500",
                                                    children: "No questions available."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1677,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1591,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-slate-400",
                                                    children: "Selected Questions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1691,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-cyan-400",
                                                    children: selectedQuestions.length
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1699,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1689,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1569,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-xs text-slate-500",
                                    children: "Removing a question here only unlinks it from this challenge. It stays in the Question Bank, and submitted results/history are preserved."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1711,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-white/10 bg-black/20 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-3 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500",
                                                        children: "Questions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1723,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 font-black text-cyan-400",
                                                        children: selectedQuestions.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1725,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/tests/page.tsx",
                                                lineNumber: 1721,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500",
                                                        children: "Marks"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1737,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 font-black text-cyan-400",
                                                        children: editingSelectedTotalMarks
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/tests/page.tsx",
                                                        lineNumber: 1739,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/tests/page.tsx",
                                                lineNumber: 1735,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-white/10 bg-black/20 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-bold",
                                                                            children: "Challenge Status"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1757,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-xs text-slate-500",
                                                                            children: "Control whether students can access this challenge."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1761,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1755,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setEditingTest({
                                                                            ...editingTest,
                                                                            is_enabled: !editingTest.is_enabled
                                                                        }),
                                                                    className: `rounded-xl px-5 py-2.5 text-sm font-black transition ${editingTest.is_enabled ? "border border-yellow-400/30 bg-yellow-400/10 text-yellow-400" : "border border-green-400/30 bg-green-400/10 text-green-400"}`,
                                                                    children: editingTest.is_enabled ? "⏸ DEACTIVATE" : "▶ ACTIVATE"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1771,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1753,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 grid grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-xl border border-white/10 p-3 text-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500",
                                                                            children: "Questions"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1815,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 font-black text-cyan-400",
                                                                            children: selectedQuestions.length
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1819,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1813,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-xl border border-white/10 p-3 text-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500",
                                                                            children: "Total Marks"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1831,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 font-black text-cyan-400",
                                                                            children: editingSelectedTotalMarks
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                                            lineNumber: 1835,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                                    lineNumber: 1829,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1811,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded-full px-4 py-2 text-xs font-black ${editingTest.is_enabled ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`,
                                                                children: editingTest.is_enabled ? "🟢 ACTIVE — Students can access" : "⚪ INACTIVE — Hidden from students"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/tests/page.tsx",
                                                                lineNumber: 1849,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1847,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1751,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/tests/page.tsx",
                                                lineNumber: 1749,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/tests/page.tsx",
                                        lineNumber: 1719,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1717,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setEditingTest(null),
                                            className: "flex-1 rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-400 hover:bg-white/5",
                                            children: "CANCEL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1887,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveEditedTest,
                                            className: "flex-1 rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950",
                                            children: "💾 SAVE CHANGES"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1901,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1885,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1393,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/tests/page.tsx",
                    lineNumber: 1359,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                    children: "04 — Manage Tests"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1929,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-1 text-xl font-black",
                                    children: "Existing Challenges"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1937,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-slate-500",
                                    children: "Manage or delete previously created tests."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1941,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1927,
                            columnNumber: 11
                        }, this),
                        loadingTests ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 p-6 text-center text-slate-500",
                            children: "Loading tests..."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1953,
                            columnNumber: 13
                        }, this) : tests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 p-6 text-center text-slate-500",
                            children: "No tests created yet."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1961,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: tests.map((test)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 md:flex-row md:items-center md:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black",
                                                            children: test.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1985,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `rounded-full px-2.5 py-1 text-xs font-bold ${test.is_enabled ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`,
                                                            children: test.is_enabled ? "LIVE" : "DRAFT"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/tests/page.tsx",
                                                            lineNumber: 1989,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 1983,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs text-slate-500",
                                                    children: [
                                                        test.question_count,
                                                        " Questions · ",
                                                        test.total_marks,
                                                        " Marks · ",
                                                        test.duration_minutes,
                                                        " Minutes"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/tests/page.tsx",
                                                    lineNumber: 2011,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 1981,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleTestStatus(test.id, test.is_enabled, test.title),
                                            className: `rounded-xl border px-5 py-2.5 text-sm font-black transition ${test.is_enabled ? "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10" : "border-green-400/30 text-green-400 hover:bg-green-400/10"}`,
                                            children: test.is_enabled ? "⏸ DEACTIVATE" : "▶ ACTIVATE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 2021,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>startEditingTest(test),
                                            className: "rounded-xl border border-cyan-400/30 px-5 py-2.5 text-sm font-black text-cyan-400 transition hover:bg-cyan-400/10",
                                            children: "✏️ EDIT"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 2047,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>deleteTest(test.id, test.title),
                                            className: "rounded-xl border border-red-400/30 px-5 py-2.5 text-sm font-black text-red-400 transition hover:bg-red-400/10",
                                            children: "🗑️ DELETE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/tests/page.tsx",
                                            lineNumber: 2059,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, test.id, true, {
                                    fileName: "[project]/app/admin/tests/page.tsx",
                                    lineNumber: 1973,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/tests/page.tsx",
                            lineNumber: 1969,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/tests/page.tsx",
                    lineNumber: 1925,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/tests/page.tsx",
            lineNumber: 847,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 845,
        columnNumber: 5
    }, this);
}
_s(CreateTestPage, "fMHXW6Hb3rgZVajWgHUY3RKKWrI=");
_c = CreateTestPage;
/* ---------- Components ---------- */ function Field({ label, value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2119,
        columnNumber: 5
    }, this);
}
_c1 = Field;
function NumberField({ label, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                min: "1",
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400/50"
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2169,
        columnNumber: 5
    }, this);
}
_c2 = NumberField;
function SelectField({ label, value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: option,
                        children: option
                    }, option, false, {
                        fileName: "[project]/app/admin/tests/page.tsx",
                        lineNumber: 2247,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2235,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2225,
        columnNumber: 5
    }, this);
}
_c3 = SelectField;
function Badge({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400",
        children: text
    }, void 0, false, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2269,
        columnNumber: 5
    }, this);
}
_c4 = Badge;
function Toggle({ title, description, enabled, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onChange,
        className: "flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-bold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/admin/tests/page.tsx",
                        lineNumber: 2315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/app/admin/tests/page.tsx",
                        lineNumber: 2317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative h-7 w-12 rounded-full transition ${enabled ? "bg-cyan-400" : "bg-white/10"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute top-1 h-5 w-5 rounded-full bg-white transition ${enabled ? "left-6" : "left-1"}`
                }, void 0, false, {
                    fileName: "[project]/app/admin/tests/page.tsx",
                    lineNumber: 2333,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2323,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2305,
        columnNumber: 5
    }, this);
}
_c5 = Toggle;
function PreviewStat({ icon, label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-black/20 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xl",
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 font-black",
                children: value
            }, void 0, false, {
                fileName: "[project]/app/admin/tests/page.tsx",
                lineNumber: 2379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/tests/page.tsx",
        lineNumber: 2373,
        columnNumber: 5
    }, this);
}
_c6 = PreviewStat;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "CreateTestPage");
__turbopack_context__.k.register(_c1, "Field");
__turbopack_context__.k.register(_c2, "NumberField");
__turbopack_context__.k.register(_c3, "SelectField");
__turbopack_context__.k.register(_c4, "Badge");
__turbopack_context__.k.register(_c5, "Toggle");
__turbopack_context__.k.register(_c6, "PreviewStat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_tests_page_tsx_1eatz0n._.js.map