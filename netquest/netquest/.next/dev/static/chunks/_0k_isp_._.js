(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/test/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function TestPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-screen items-center justify-center bg-[#050816] text-white",
            children: "Loading NetQuest..."
        }, void 0, false, {
            fileName: "[project]/app/test/page.tsx",
            lineNumber: 54,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestPageContent, {}, void 0, false, {
            fileName: "[project]/app/test/page.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/test/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = TestPage;
function TestPageContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const requestedTestId = searchParams.get("testId");
    const submitLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const startedAtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tests, setTests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedTest, setSelectedTest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestPageContent.useEffect": ()=>{
            let cancelled = false;
            async function load() {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                setLoading(true);
                setError("");
                try {
                    const { data: { user }, error: authError } = await supabase.auth.getUser();
                    if (authError || !user) {
                        router.replace("/student/login");
                        return;
                    }
                    const { data: profile, error: profileError } = await supabase.from("students").select("student_id").eq("auth_user_id", user.id).maybeSingle();
                    if (profileError) throw profileError;
                    if (!profile) {
                        setError("Student profile not found. Please contact the administrator.");
                        return;
                    }
                    const { data, error: testError } = await supabase.from("tests").select("id, title, description, category, difficulty, duration_minutes, question_count, total_marks, is_enabled").eq("is_enabled", true).order("created_at", {
                        ascending: false
                    });
                    if (testError) throw testError;
                    if (!cancelled) {
                        setTests(data || []);
                    }
                } catch (err) {
                    if (!cancelled) {
                        setError(err instanceof Error ? err.message : "Unable to load tests.");
                    }
                } finally{
                    if (!cancelled) setLoading(false);
                }
            }
            void load();
            return ({
                "TestPageContent.useEffect": ()=>{
                    cancelled = true;
                }
            })["TestPageContent.useEffect"];
        }
    }["TestPageContent.useEffect"], [
        router
    ]);
    const startTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TestPageContent.useCallback[startTest]": async (test)=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            setLoading(true);
            setError("");
            setNotice("");
            try {
                const { data, error: questionError } = await supabase.from("test_questions").select(`
          question_order,
          questions (
            id,
            question,
            category,
            difficulty,
            marks,
            option_a,
            option_b,
            option_c,
            option_d
          )
        `).eq("test_id", test.id).order("question_order", {
                    ascending: true
                });
                if (questionError) throw questionError;
                const loaded = (data || []).map({
                    "TestPageContent.useCallback[startTest].loaded": (row)=>row.questions
                }["TestPageContent.useCallback[startTest].loaded"]).filter(Boolean);
                if (loaded.length === 0) {
                    throw new Error("This test does not have any linked questions.");
                }
                setSelectedTest(test);
                setQuestions(loaded);
                setAnswers({});
                setCurrentIndex(0);
                setTimeLeft(Math.max(1, Number(test.duration_minutes) || 1) * 60);
                setResult(null);
                submitLock.current = false;
                startedAtRef.current = Date.now();
                setStarted(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to load questions.");
            } finally{
                setLoading(false);
            }
        }
    }["TestPageContent.useCallback[startTest]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestPageContent.useEffect": ()=>{
            if (!requestedTestId || tests.length === 0 || selectedTest) return;
            const test = tests.find({
                "TestPageContent.useEffect.test": (item)=>item.id === Number(requestedTestId)
            }["TestPageContent.useEffect.test"]);
            if (test) {
                void startTest(test);
            } else {
                setError("This test is not available or has not been published.");
            }
        }
    }["TestPageContent.useEffect"], [
        requestedTestId,
        tests,
        selectedTest,
        startTest
    ]);
    const submitTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TestPageContent.useCallback[submitTest]": async ()=>{
            if (!selectedTest || submitLock.current) return;
            const durationSeconds = startedAtRef.current === null ? null : Math.max(0, Math.floor((Date.now() - startedAtRef.current) / 1000));
            submitLock.current = true;
            setSubmitting(true);
            setError("");
            try {
                const response = await fetch("/api/tests/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        testId: selectedTest.id,
                        answers,
                        durationSeconds
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Test submission failed.");
                }
                if (data.warning) {
                    setNotice(data.warning);
                }
                router.push(`/results/${data.resultId}`);
            } catch (err) {
                submitLock.current = false;
                setError(err instanceof Error ? err.message : "Could not submit your test. Please try again.");
            } finally{
                setSubmitting(false);
            }
        }
    }["TestPageContent.useCallback[submitTest]"], [
        selectedTest,
        answers,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestPageContent.useEffect": ()=>{
            if (!started || submitting || result) return;
            const timer = window.setInterval({
                "TestPageContent.useEffect.timer": ()=>{
                    setTimeLeft({
                        "TestPageContent.useEffect.timer": (previous)=>Math.max(0, previous - 1)
                    }["TestPageContent.useEffect.timer"]);
                }
            }["TestPageContent.useEffect.timer"], 1000);
            return ({
                "TestPageContent.useEffect": ()=>window.clearInterval(timer)
            })["TestPageContent.useEffect"];
        }
    }["TestPageContent.useEffect"], [
        started,
        submitting,
        result
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestPageContent.useEffect": ()=>{
            if (started && timeLeft === 0 && !submitting && !result) {
                void submitTest();
            }
        }
    }["TestPageContent.useEffect"], [
        started,
        timeLeft,
        submitting,
        result,
        submitTest
    ]);
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-screen items-center justify-center bg-[#050816] text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-slate-400",
                children: "Loading test..."
            }, void 0, false, {
                fileName: "[project]/app/test/page.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/test/page.tsx",
            lineNumber: 301,
            columnNumber: 7
        }, this);
    }
    const current = questions[currentIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "font-black text-cyan-300",
                            children: "← NETQUEST"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/history",
                            className: "text-sm text-slate-400 hover:text-white",
                            children: "My History"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "alert",
                    className: "mb-6 rounded-xl border border-red-400/30 bg-red-950/30 p-4 text-red-200",
                    children: [
                        error,
                        !started && !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setError("");
                                router.refresh();
                            },
                            className: "ml-3 font-bold underline",
                            children: "Refresh"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 333,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 326,
                    columnNumber: 11
                }, this),
                notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "status",
                    className: "mb-6 rounded-xl border border-yellow-400/30 bg-yellow-950/20 p-4 text-yellow-200",
                    children: notice
                }, void 0, false, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 347,
                    columnNumber: 11
                }, this),
                result && selectedTest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-6 text-center sm:p-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl",
                            children: result.percentage >= 80 ? "🏆" : "🎯"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400",
                            children: "Test Completed"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-3xl font-black",
                            children: selectedTest.title
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 365,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-8 text-6xl font-black text-cyan-300",
                            children: [
                                result.percentage,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xl font-bold",
                            children: [
                                result.score,
                                " / ",
                                result.totalMarks,
                                " marks"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 373,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 grid grid-cols-3 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Summary, {
                                    label: "Answered",
                                    value: result.answered
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Summary, {
                                    label: "Correct",
                                    value: result.correct
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 379,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Summary, {
                                    label: "Wrong",
                                    value: result.wrong
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 377,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-xs text-slate-500",
                            children: [
                                "Result reference: ",
                                result.resultId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 383,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex flex-wrap justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/history",
                                    className: "rounded-xl border border-white/10 px-5 py-3 font-bold hover:bg-white/5",
                                    children: "View History"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: "rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 hover:bg-cyan-300",
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 387,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 356,
                    columnNumber: 11
                }, this) : !started ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-bold uppercase tracking-[0.3em] text-cyan-400",
                            children: "Student Assessment"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 405,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-2 text-3xl font-black",
                            children: "Available Tests"
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-slate-400",
                            children: "Select a published assessment to begin."
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 413,
                            columnNumber: 13
                        }, this),
                        tests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 rounded-2xl border border-white/10 p-8 text-center text-slate-400",
                            children: "No published tests are available."
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 418,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid gap-4 md:grid-cols-2",
                            children: tests.map((test)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase text-cyan-400",
                                            children: test.category || "General"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-3 text-xl font-black",
                                            children: test.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-slate-400",
                                            children: test.description || "Test your knowledge with NetQuest."
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 436,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap gap-4 text-sm text-slate-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        test.question_count,
                                                        " questions"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        test.total_marks,
                                                        " marks"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        test.duration_minutes,
                                                        " minutes"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 441,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>void startTest(test),
                                            className: "mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 hover:bg-cyan-300",
                                            children: "Start Test →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 447,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, test.id, true, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 422,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 404,
                    columnNumber: 11
                }, this) : selectedTest && current ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase tracking-[0.25em] text-cyan-400",
                                            children: selectedTest.category || "Assessment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mt-2 text-2xl font-black sm:text-3xl",
                                            children: selectedTest.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-slate-400",
                                            children: [
                                                "Question ",
                                                currentIndex + 1,
                                                " of ",
                                                questions.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 470,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-xl border px-5 py-3 text-xl font-black tabular-nums ${timeLeft <= 60 ? "border-red-400/40 text-red-300" : "border-cyan-400/30 text-cyan-300"}`,
                                    children: [
                                        "⏱ ",
                                        formatTime(timeLeft)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 460,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 h-2 overflow-hidden rounded-full bg-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full bg-cyan-400 transition-all",
                                style: {
                                    width: `${(currentIndex + 1) / questions.length * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/test/page.tsx",
                                lineNumber: 487,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold leading-8 sm:text-xl",
                                            children: [
                                                "Q",
                                                currentIndex + 1,
                                                ". ",
                                                current.question
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 499,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 rounded-lg bg-cyan-400/10 px-3 py-2 text-sm font-bold text-cyan-300",
                                            children: [
                                                current.marks || 0,
                                                " marks"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 503,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 498,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-7 space-y-3",
                                    children: [
                                        [
                                            "A",
                                            current.option_a
                                        ],
                                        [
                                            "B",
                                            current.option_b
                                        ],
                                        [
                                            "C",
                                            current.option_c
                                        ],
                                        [
                                            "D",
                                            current.option_d
                                        ]
                                    ].map(([letter, option])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAnswers((previous)=>({
                                                        ...previous,
                                                        [current.id]: letter
                                                    })),
                                            className: `flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${answers[current.id] === letter ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-black/20 hover:border-white/30"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-black ${answers[current.id] === letter ? "bg-cyan-400 text-slate-950" : "bg-white/10"}`,
                                                    children: letter
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "pt-1",
                                                    children: option || "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, letter, true, {
                                            fileName: "[project]/app/test/page.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 497,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex flex-wrap items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: currentIndex === 0 || submitting,
                                    onClick: ()=>setCurrentIndex((i)=>Math.max(0, i - 1)),
                                    className: "rounded-xl border border-white/10 px-5 py-3 font-bold disabled:opacity-30",
                                    children: "← Previous"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 548,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400",
                                    children: [
                                        "Answered ",
                                        Object.keys(answers).length,
                                        " / ",
                                        questions.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 558,
                                    columnNumber: 15
                                }, this),
                                currentIndex < questions.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: submitting,
                                    onClick: ()=>setCurrentIndex((i)=>Math.min(questions.length - 1, i + 1)),
                                    className: "rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 disabled:opacity-50",
                                    children: "Next →"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: submitting,
                                    onClick: ()=>{
                                        if (window.confirm("Submit your test now? You cannot change answers after submission.")) {
                                            void submitTest();
                                        }
                                    },
                                    className: "rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950 disabled:opacity-50",
                                    children: submitting ? "Submitting..." : "Submit Test"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 575,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 547,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex flex-wrap gap-2",
                            children: questions.map((question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentIndex(index),
                                    "aria-label": `Go to question ${index + 1}`,
                                    className: `h-10 w-10 rounded-lg border text-sm font-bold ${currentIndex === index ? "border-cyan-400 bg-cyan-400 text-slate-950" : answers[question.id] ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/5 text-slate-400"}`,
                                    children: index + 1
                                }, question.id, false, {
                                    fileName: "[project]/app/test/page.tsx",
                                    lineNumber: 595,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/page.tsx",
                            lineNumber: 593,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/page.tsx",
                    lineNumber: 459,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/app/test/page.tsx",
            lineNumber: 311,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/test/page.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
}
_s(TestPageContent, "WRaZfh/tBpCq1G0zT+G64Ul3Bg4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = TestPageContent;
function Summary({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/10 bg-black/20 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/test/page.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-2xl font-black",
                children: value
            }, void 0, false, {
                fileName: "[project]/app/test/page.tsx",
                lineNumber: 628,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/test/page.tsx",
        lineNumber: 626,
        columnNumber: 5
    }, this);
}
_c2 = Summary;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TestPage");
__turbopack_context__.k.register(_c1, "TestPageContent");
__turbopack_context__.k.register(_c2, "Summary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://heyvhlopvxhjbofnumzf.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_IrWpjYnm-g9U44fMwvcrbQ_XwYfz7gM");
const createClient = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0k_isp_._.js.map