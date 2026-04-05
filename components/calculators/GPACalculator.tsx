"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const GRADE_SCALES = {
  "4.0": [["A+",4.0],["A",4.0],["A-",3.7],["B+",3.3],["B",3.0],["B-",2.7],["C+",2.3],["C",2.0],["C-",1.7],["D+",1.3],["D",1.0],["F",0.0]],
  "5.0": [["ممتاز",5.0],["جيد جداً",4.0],["جيد",3.0],["مقبول",2.0],["راسب",0.0]],
  "100": [],
};

interface Course { name: string; grade: string; hours: string; }

export default function GPACalculator() {
  const [scale, setScale] = useState<"4.0"|"5.0"|"100">("4.0");
  const [courses, setCourses] = useState<Course[]>([
    {name:"",grade:"",hours:"3"},
    {name:"",grade:"",hours:"3"},
    {name:"",grade:"",hours:"3"},
  ]);
  const [result, setResult] = useState<{gpa:number;total:number;hours:number}|null>(null);

  const gradeToPoints = (g: string): number => {
    if (scale==="100") {
      const n = parseFloat(g);
      if (n>=95) return 4.0; if (n>=90) return 3.7; if (n>=85) return 3.3;
      if (n>=80) return 3.0; if (n>=75) return 2.7; if (n>=70) return 2.3;
      if (n>=65) return 2.0; if (n>=60) return 1.7; return 0;
    }
    const scales = GRADE_SCALES[scale] as [string,number][];
    return scales.find(([k])=>k===g)?.[1] ?? parseFloat(g) ?? 0;
  };

  const calculate = () => {
    let totalPoints = 0, totalHours = 0;
    courses.forEach(c => {
      const h = parseFloat(c.hours);
      const p = gradeToPoints(c.grade);
      if (!isNaN(h) && h>0 && c.grade) { totalPoints += p*h; totalHours += h; }
    });
    if (totalHours===0) return;
    setResult({ gpa: Math.round(totalPoints/totalHours*100)/100, total: totalPoints, hours: totalHours });
    trackCalculatorUsed("gpa", "tools");
  };

  const addCourse = () => setCourses(p=>[...p,{name:"",grade:"",hours:"3"}]);
  const removeCourse = (i:number) => setCourses(p=>p.filter((_,j)=>j!==i));
  const updateCourse = (i:number, k:keyof Course, v:string) => setCourses(p=>p.map((c,j)=>j===i?{...c,[k]:v}:c));

  const getGPALabel = (gpa: number) => {
    if (scale==="4.0") {
      if (gpa>=3.7) return "ممتاز — Excellent";
      if (gpa>=3.0) return "جيد جداً — Very Good";
      if (gpa>=2.0) return "جيد — Good";
      return "مقبول — Pass";
    }
    return gpa >= 4 ? "ممتاز" : gpa>=3?"جيد جداً":gpa>=2?"جيد":"مقبول";
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {(["4.0","5.0","100"] as const).map(s => (
          <button key={s} onClick={() => setScale(s)}
            className={`py-2.5 rounded-xl font-bold border-2 text-sm transition-all ${scale===s?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            نظام {s}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {courses.map((c,i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <input value={c.name} onChange={(e) => updateCourse(i,"name",e.target.value)}
              placeholder={`مادة ${i+1}`}
              className="col-span-4 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            {scale==="100" ? (
              <input type="number" value={c.grade} onChange={(e) => updateCourse(i,"grade",e.target.value)}
                placeholder="الدرجة" min="0" max="100"
                className="col-span-4 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            ) : (
              <select value={c.grade} onChange={(e) => updateCourse(i,"grade",e.target.value)}
                className="col-span-4 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
                <option value="">التقدير</option>
                {(GRADE_SCALES[scale] as [string,number][]).map(([k])=><option key={k} value={k}>{k}</option>)}
              </select>
            )}
            <input type="number" value={c.hours} onChange={(e) => updateCourse(i,"hours",e.target.value)}
              placeholder="ساعات" min="1"
              className="col-span-3 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            <button onClick={() => removeCourse(i)} className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={addCourse} className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-xl hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors text-sm font-medium">
          <Plus className="h-4 w-4" /> إضافة مادة
        </button>
        <button onClick={calculate} className="flex-1 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-2.5 rounded-xl transition-colors">احسب المعدل</button>
      </div>
      {result && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
          <p className="text-blue-200 text-sm mb-2">المعدل التراكمي GPA</p>
          <p className="text-6xl font-black mb-2">{result.gpa}</p>
          <p className="text-blue-100 font-medium">{getGPALabel(result.gpa)}</p>
          <p className="text-blue-200 text-xs mt-2">إجمالي {result.hours} ساعة معتمدة</p>
        </div>
      )}
    </div>
  );
}
