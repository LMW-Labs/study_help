"use client";

import { useState, use } from "react";
import Link from "next/link";
import { quizzes } from "@/data/quizzes";
import { notFound } from "next/navigation";

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = quizzes.find((q) => q.id === id);
  if (!quiz) notFound();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    setCurrentQ(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const score = submitted
    ? quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;
  const pct = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  const question = quiz.questions[currentQ];
  const userAnswer = answers[question.id];
  const isAnswered = userAnswer !== undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
          <Link
            href={`/answer-key/${id}`}
            className="text-xs text-blue-400 hover:text-blue-300 border border-blue-400/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            View Answer Key
          </Link>
        </div>
        <p className="text-slate-400 mt-1 text-sm">{quiz.description}</p>
      </div>

      {/* Score banner */}
      {submitted && (
        <div
          className={`rounded-xl p-6 mb-8 border ${
            pct >= 80
              ? "bg-emerald-900/30 border-emerald-700"
              : pct >= 60
              ? "bg-yellow-900/30 border-yellow-700"
              : "bg-red-900/30 border-red-700"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-white">
                {score} / {quiz.questions.length}
              </p>
              <p className={`text-sm font-medium ${pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                {pct}% — {pct >= 80 ? "Great work! 🎉" : pct >= 60 ? "Good effort, review the explanations" : "Keep studying — you've got this! 💪"}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Retake Quiz
            </button>
          </div>
          {/* Score bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* Wrong answers summary */}
          {pct < 100 && (
            <div className="mt-4">
              <p className="text-xs text-slate-400 mb-2">Questions to review:</p>
              <div className="flex flex-wrap gap-2">
                {quiz.questions.map((q, i) =>
                  answers[q.id] !== q.correctIndex ? (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(i)}
                      className="text-xs px-2 py-1 bg-red-900/40 border border-red-700/50 text-red-300 rounded hover:bg-red-900/60 transition-colors"
                    >
                      Q{i + 1}
                    </button>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {quiz.questions.map((q, i) => {
          const ans = answers[q.id];
          const correct = ans === q.correctIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                i === currentQ
                  ? "ring-2 ring-white ring-offset-2 ring-offset-slate-950"
                  : ""
              } ${
                submitted
                  ? correct
                    ? "bg-emerald-600 text-white"
                    : "bg-red-600 text-white"
                  : ans !== undefined
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full">
            Question {currentQ + 1} of {quiz.questions.length}
          </span>
          <span className="text-xs text-slate-500">{question.topic}</span>
        </div>

        <p className="text-white font-medium text-lg mb-6 leading-relaxed">{question.question}</p>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = userAnswer === i;
            const isCorrect = i === question.correctIndex;

            let cls = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ";
            if (submitted) {
              if (isCorrect) cls += "bg-emerald-900/30 border-emerald-600 text-emerald-200";
              else if (isSelected && !isCorrect) cls += "bg-red-900/30 border-red-600 text-red-200";
              else cls += "bg-slate-800/50 border-slate-700 text-slate-500";
            } else {
              if (isSelected) cls += "bg-blue-900/30 border-blue-500 text-white";
              else cls += "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white cursor-pointer";
            }

            return (
              <button key={i} className={cls} onClick={() => handleAnswer(question.id, i)} disabled={submitted}>
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    submitted
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isSelected
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-slate-600 text-slate-600"
                      : isSelected
                      ? "border-blue-400 bg-blue-500 text-white"
                      : "border-slate-600 text-slate-500"
                  }`}>
                    {submitted
                      ? isCorrect
                        ? "✓"
                        : isSelected
                        ? "✗"
                        : String.fromCharCode(65 + i)
                      : String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div className={`mt-5 p-4 rounded-lg border ${
            userAnswer === question.correctIndex
              ? "bg-emerald-900/20 border-emerald-800"
              : "bg-amber-900/20 border-amber-800"
          }`}>
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Explanation</p>
            <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
        >
          ← Previous
        </button>

        {!submitted ? (
          currentQ < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                isAnswered
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Submit Quiz ✓
            </button>
          )
        ) : (
          <button
            onClick={() => setCurrentQ(Math.min(quiz.questions.length - 1, currentQ + 1))}
            disabled={currentQ === quiz.questions.length - 1}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
          >
            Next →
          </button>
        )}
      </div>

      {/* Other quiz link */}
      <div className="mt-8 text-center">
        {quizzes.filter((q) => q.id !== id).map((q) => (
          <Link key={q.id} href={`/quiz/${q.id}`} className="text-sm text-slate-400 hover:text-white transition-colors">
            Try {q.title} →
          </Link>
        ))}
      </div>
    </div>
  );
}
