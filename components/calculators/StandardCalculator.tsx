"use client";

import { useState, useEffect, useCallback } from "react";
import { Delete, RotateCcw } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface HistoryItem {
  expression: string;
  result: string;
}

const buttons = [
  // Row 1
  { label: "AC", type: "action", action: "clear", className: "bg-gray-400 hover:bg-gray-500 text-white" },
  { label: "+/-", type: "action", action: "negate", className: "bg-gray-400 hover:bg-gray-500 text-white" },
  { label: "%", type: "action", action: "percent", className: "bg-gray-400 hover:bg-gray-500 text-white" },
  { label: "÷", type: "operator", action: "/", className: "bg-[#1E3A8A] hover:bg-[#1e40af] text-white" },
  // Row 2
  { label: "7", type: "digit", action: "7", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "8", type: "digit", action: "8", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "9", type: "digit", action: "9", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "×", type: "operator", action: "*", className: "bg-[#1E3A8A] hover:bg-[#1e40af] text-white" },
  // Row 3
  { label: "4", type: "digit", action: "4", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "5", type: "digit", action: "5", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "6", type: "digit", action: "6", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "−", type: "operator", action: "-", className: "bg-[#1E3A8A] hover:bg-[#1e40af] text-white" },
  // Row 4
  { label: "1", type: "digit", action: "1", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "2", type: "digit", action: "2", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "3", type: "digit", action: "3", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "+", type: "operator", action: "+", className: "bg-[#1E3A8A] hover:bg-[#1e40af] text-white" },
  // Row 5
  { label: "0", type: "digit", action: "0", className: "col-span-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: ".", type: "digit", action: ".", className: "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white border border-gray-200 dark:border-gray-600" },
  { label: "=", type: "equals", action: "=", className: "bg-[#10B981] hover:bg-[#059669] text-white" },
];

function safeEval(expression: string): string {
  // Replace display operators with JS operators
  const clean = expression
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-");

  // Safety: only allow numbers, operators, dot, parens
  if (!/^[\d+\-*/.() ]+$/.test(clean)) return "خطأ";

  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + clean + ")")();
    if (!isFinite(result)) return "خطأ";
    // Round to avoid floating point issues
    const rounded = Math.round(result * 1e10) / 1e10;
    return String(rounded);
  } catch {
    return "خطأ";
  }
}

export default function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleButton = useCallback(
    (btn: (typeof buttons)[number]) => {
      if (btn.type === "digit") {
        if (btn.action === "0" && display === "0") return;
        if (btn.action === "." && display.includes(".")) return;
        const newDisplay =
          display === "0" || justCalculated
            ? btn.action === "."
              ? "0."
              : btn.action
            : display + btn.action;
        setDisplay(newDisplay);
        setJustCalculated(false);
      } else if (btn.type === "operator") {
        const expr = expression + display + " " + btn.action + " ";
        setExpression(expr);
        setDisplay("0");
        setJustCalculated(false);
      } else if (btn.type === "equals") {
        const fullExpr = expression + display;
        const result = safeEval(fullExpr);
        setHistory((prev) => [{ expression: fullExpr, result }, ...prev.slice(0, 4)]);
        setDisplay(result);
        setExpression("");
        setJustCalculated(true);
        trackCalculatorUsed("standard-calculator", "math");
      } else if (btn.action === "clear") {
        setDisplay("0");
        setExpression("");
        setJustCalculated(false);
      } else if (btn.action === "negate") {
        setDisplay((prev) =>
          prev.startsWith("-") ? prev.slice(1) : prev === "0" ? "0" : "-" + prev
        );
      } else if (btn.action === "percent") {
        const val = parseFloat(display);
        if (!isNaN(val)) setDisplay(String(val / 100));
      }
    },
    [display, expression, justCalculated]
  );

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleButton({ label: e.key, type: "digit", action: e.key, className: "" });
      } else if (e.key === ".") {
        handleButton({ label: ".", type: "digit", action: ".", className: "" });
      } else if (e.key === "+") {
        handleButton({ label: "+", type: "operator", action: "+", className: "" });
      } else if (e.key === "-") {
        handleButton({ label: "−", type: "operator", action: "-", className: "" });
      } else if (e.key === "*") {
        handleButton({ label: "×", type: "operator", action: "*", className: "" });
      } else if (e.key === "/") {
        e.preventDefault();
        handleButton({ label: "÷", type: "operator", action: "/", className: "" });
      } else if (e.key === "Enter" || e.key === "=") {
        handleButton({ label: "=", type: "equals", action: "=", className: "" });
      } else if (e.key === "Escape") {
        handleButton({ label: "AC", type: "action", action: "clear", className: "" });
      } else if (e.key === "Backspace") {
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleButton]);

  return (
    <div className="max-w-sm mx-auto" dir="ltr">
      {/* Display */}
      <div className="bg-[#1E293B] rounded-t-2xl p-5 mb-0">
        {/* Expression */}
        <div className="text-right text-gray-400 text-sm min-h-[20px] mb-2 font-mono overflow-x-auto whitespace-nowrap">
          {expression || " "}
        </div>
        {/* Main display */}
        <div className="text-right text-white font-bold overflow-x-auto whitespace-nowrap">
          <span
            className={`${
              display.length > 10 ? "text-3xl" : display.length > 7 ? "text-4xl" : "text-5xl"
            } font-mono`}
          >
            {display}
          </span>
        </div>
      </div>

      {/* Backspace row */}
      <div className="bg-[#1E293B] px-5 pb-3 flex justify-end">
        <button
          onClick={() => setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="حذف"
        >
          <Delete className="h-5 w-5" />
        </button>
      </div>

      {/* Buttons Grid */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-b-2xl p-3 grid grid-cols-4 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleButton(btn)}
            className={`calc-btn ${btn.className} ${
              btn.label === "0" ? "col-span-2 justify-start px-5" : ""
            }`}
            aria-label={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Calculation History */}
      {history.length > 0 && (
        <div className="mt-4 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-bold text-[#1E293B] dark:text-white">
              السجل
            </span>
            <button
              onClick={() => setHistory([])}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="مسح السجل"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          <ul className="divide-y divide-gray-50 dark:divide-gray-700">
            {history.map((item, i) => (
              <li
                key={i}
                className="px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  setDisplay(item.result);
                  setJustCalculated(true);
                }}
              >
                <p className="text-xs text-gray-400 font-mono text-right">{item.expression}</p>
                <p className="text-base font-bold text-[#1E3A8A] dark:text-blue-400 font-mono text-right">
                  = {item.result}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
