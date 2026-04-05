"use client";
import { useState, useCallback } from "react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Mode = "deg" | "rad";

const BTN = "flex items-center justify-center rounded-xl font-bold text-sm h-12 transition-all active:scale-95 cursor-pointer select-none";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [mode, setMode] = useState<Mode>("deg");
  const [memory, setMemory] = useState(0);
  const [newNum, setNewNum] = useState(true);

  const toRad = (d: number) => mode === "deg" ? d * Math.PI / 180 : d;

  const press = useCallback((key: string) => {
    const cur = display;
    const num = parseFloat(cur);

    if (key === "C") { setDisplay("0"); setExpr(""); setNewNum(true); return; }
    if (key === "⌫") { setDisplay(cur.length > 1 ? cur.slice(0, -1) : "0"); return; }
    if (key === "+/-") { setDisplay(String(parseFloat(cur) * -1)); return; }
    if (key === "MC") { setMemory(0); return; }
    if (key === "MR") { setDisplay(String(memory)); setNewNum(false); return; }
    if (key === "M+") { setMemory(memory + num); return; }
    if (key === "M-") { setMemory(memory - num); return; }

    // Scientific functions (apply immediately)
    const sci: Record<string, () => number> = {
      "sin": () => Math.sin(toRad(num)),
      "cos": () => Math.cos(toRad(num)),
      "tan": () => Math.tan(toRad(num)),
      "sin⁻¹": () => (mode === "deg" ? Math.asin(num) * 180 / Math.PI : Math.asin(num)),
      "cos⁻¹": () => (mode === "deg" ? Math.acos(num) * 180 / Math.PI : Math.acos(num)),
      "tan⁻¹": () => (mode === "deg" ? Math.atan(num) * 180 / Math.PI : Math.atan(num)),
      "√": () => Math.sqrt(num),
      "x²": () => num * num,
      "x³": () => num * num * num,
      "1/x": () => 1 / num,
      "ln": () => Math.log(num),
      "log": () => Math.log10(num),
      "eˣ": () => Math.exp(num),
      "10ˣ": () => Math.pow(10, num),
      "n!": () => { let f = 1; for (let i = 2; i <= Math.round(num); i++) f *= i; return f; },
      "|x|": () => Math.abs(num),
    };
    if (sci[key]) {
      try {
        const r = sci[key]();
        setDisplay(isFinite(r) ? String(parseFloat(r.toFixed(10))) : "خطأ");
        setNewNum(true);
      } catch { setDisplay("خطأ"); }
      return;
    }

    // Constants
    if (key === "π") { setDisplay(String(Math.PI)); setNewNum(false); return; }
    if (key === "e") { setDisplay(String(Math.E)); setNewNum(false); return; }

    // Operators
    if (["+", "-", "×", "÷", "^", "%"].includes(key)) {
      const op = key === "×" ? "*" : key === "÷" ? "/" : key === "^" ? "**" : key;
      setExpr(cur + op);
      setNewNum(true);
      return;
    }

    if (key === "=") {
      if (!expr) return;
      try {
        // eslint-disable-next-line no-eval
        const r = eval(expr + cur);
        const rounded = parseFloat(r.toFixed(10));
        setDisplay(isFinite(rounded) ? String(rounded) : "خطأ");
        setExpr("");
        setNewNum(true);
        trackCalculatorUsed("scientific-calculator", "math");
      } catch { setDisplay("خطأ"); setExpr(""); }
      return;
    }

    // Digits and dot
    if (newNum) {
      setDisplay(key === "." ? "0." : key);
      setNewNum(false);
    } else {
      if (key === "." && cur.includes(".")) return;
      setDisplay(cur === "0" && key !== "." ? key : cur + key);
    }
  }, [display, expr, mode, memory, newNum]);

  const rows = [
    ["MC","MR","M+","M-","C","⌫"],
    ["sin","cos","tan","sin⁻¹","cos⁻¹","tan⁻¹"],
    ["√","x²","x³","1/x","ln","log"],
    ["n!","|x|","eˣ","10ˣ","π","e"],
    ["7","8","9","÷","^","%"],
    ["4","5","6","×","(",")" ],
    ["1","2","3","-","",""],
    ["0",".","=","+","",""],
  ];

  const btnClass = (k: string) => {
    if (!k) return "invisible";
    if (k === "=") return `${BTN} bg-[#1E3A8A] text-white hover:bg-[#1e40af] col-span-1`;
    if (["C","⌫"].includes(k)) return `${BTN} bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200`;
    if (["+","-","×","÷","^","%","(",")" ].includes(k)) return `${BTN} bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200`;
    if (["MC","MR","M+","M-"].includes(k)) return `${BTN} bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 text-xs`;
    if (["sin","cos","tan","sin⁻¹","cos⁻¹","tan⁻¹","√","x²","x³","1/x","ln","log","n!","|x|","eˣ","10ˣ","π","e"].includes(k))
      return `${BTN} bg-blue-50 dark:bg-blue-900/20 text-[#1E3A8A] dark:text-blue-300 hover:bg-blue-100 text-xs`;
    return `${BTN} bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[#1E293B] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        {(["deg","rad"] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${mode===m?"bg-[#1E3A8A] text-white border-[#1E3A8A]":"border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="bg-gray-900 rounded-2xl p-4">
        <p className="text-gray-500 text-right text-sm min-h-5" dir="ltr">{expr}</p>
        <p className="text-white text-right text-3xl font-black overflow-hidden" dir="ltr"
          style={{fontSize: display.length > 12 ? "1.2rem" : undefined}}>{display}</p>
        {memory !== 0 && <p className="text-purple-400 text-xs text-right">M: {memory}</p>}
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {rows.flat().map((k, i) => (
          <button key={i} onClick={() => k && press(k)} className={btnClass(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}
