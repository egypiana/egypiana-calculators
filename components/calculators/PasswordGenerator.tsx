"use client";
import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase:true, lowercase:true, numbers:true, symbols:true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generate = useCallback(() => {
    const sets: string[] = [];
    if (options.uppercase) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (options.lowercase) sets.push("abcdefghijklmnopqrstuvwxyz");
    if (options.numbers) sets.push("0123456789");
    if (options.symbols) sets.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
    if (!sets.length) return;
    const chars = sets.join("");
    let pwd = "";
    // Ensure at least one from each selected set
    sets.forEach(s => pwd += s[Math.floor(Math.random()*s.length)]);
    for (let i=pwd.length; i<length; i++) pwd += chars[Math.floor(Math.random()*chars.length)];
    pwd = pwd.split("").sort(()=>Math.random()-0.5).join("");
    setPassword(pwd);
    // Calculate strength
    let s = 0;
    if (length>=8) s++; if (length>=12) s++; if (length>=16) s++;
    if (options.uppercase) s++; if (options.lowercase) s++;
    if (options.numbers) s++; if (options.symbols) s+=2;
    setStrength(Math.min(s,5));
    trackCalculatorUsed("password", "tools");
  }, [length, options]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  const strengthLabels = ["","ضعيف جداً","ضعيف","متوسط","قوي","قوي جداً"];
  const strengthColors = ["","bg-red-500","bg-red-400","bg-yellow-400","bg-green-400","bg-green-500"];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">طول كلمة المرور: <span className="text-[#1E3A8A]">{length} حرف</span></label>
        <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full accent-[#1E3A8A]" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>8</span><span>64</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {([["uppercase","أحرف كبيرة A-Z"],["lowercase","أحرف صغيرة a-z"],["numbers","أرقام 0-9"],["symbols","رموز !@#$"]] as const).map(([k,l]) => (
          <label key={k} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${options[k]?"border-[#1E3A8A] bg-blue-50 dark:bg-blue-900/20":"border-gray-200 dark:border-gray-600"}`}>
            <input type="checkbox" checked={options[k]} onChange={(e) => setOptions(p=>({...p,[k]:e.target.checked}))} className="w-4 h-4 accent-[#1E3A8A]" />
            <span className="text-sm font-medium text-[#1E293B] dark:text-white">{l}</span>
          </label>
        ))}
      </div>
      <button onClick={generate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <RefreshCw className="h-5 w-5" /> توليد كلمة مرور
      </button>
      {password && (
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-2xl p-5 flex items-center justify-between gap-4">
            <code className="text-green-400 font-mono text-lg flex-1 break-all" dir="ltr">{password}</code>
            <button onClick={copy} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${copied?"bg-green-100 text-green-700":"bg-gray-700 text-white hover:bg-gray-600"}`}>
              {copied?<><Check className="h-4 w-4"/>نُسخ</>:<><Copy className="h-4 w-4"/>نسخ</>}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#1E293B] dark:text-white">قوة كلمة المرور</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${strengthColors[strength]}`}>{strengthLabels[strength]}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({length:5}).map((_,i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i<strength?strengthColors[strength]:"bg-gray-200 dark:bg-gray-600"}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
