"use client";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Category = "length"|"weight"|"temperature"|"area"|"volume"|"speed";

const CATEGORIES: Record<Category, {label:string; units: Array<{key:string;label:string;toBase:number|(v:number)=>number;fromBase:number|(v:number)=>number}>}> = {
  length: { label:"المسافة والطول", units:[
    {key:"km",label:"كيلومتر",toBase:1000,fromBase:0.001},
    {key:"m",label:"متر",toBase:1,fromBase:1},
    {key:"cm",label:"سنتيمتر",toBase:0.01,fromBase:100},
    {key:"mm",label:"مليمتر",toBase:0.001,fromBase:1000},
    {key:"mi",label:"ميل",toBase:1609.344,fromBase:1/1609.344},
    {key:"ft",label:"قدم",toBase:0.3048,fromBase:1/0.3048},
    {key:"in",label:"إنش",toBase:0.0254,fromBase:1/0.0254},
  ]},
  weight: { label:"الوزن والكتلة", units:[
    {key:"kg",label:"كيلوجرام",toBase:1,fromBase:1},
    {key:"g",label:"جرام",toBase:0.001,fromBase:1000},
    {key:"mg",label:"ميليجرام",toBase:0.000001,fromBase:1000000},
    {key:"lb",label:"رطل",toBase:0.453592,fromBase:1/0.453592},
    {key:"oz",label:"أونصة",toBase:0.0283495,fromBase:1/0.0283495},
    {key:"ton",label:"طن",toBase:1000,fromBase:0.001},
  ]},
  temperature: { label:"درجة الحرارة", units:[
    {key:"C",label:"مئوية °C", toBase:(v)=>v, fromBase:(v)=>v},
    {key:"F",label:"فهرنهايت °F", toBase:(v)=>(v-32)*5/9, fromBase:(v)=>v*9/5+32},
    {key:"K",label:"كلفن K", toBase:(v)=>v-273.15, fromBase:(v)=>v+273.15},
  ]},
  area: { label:"المساحة", units:[
    {key:"m2",label:"متر مربع",toBase:1,fromBase:1},
    {key:"km2",label:"كيلومتر مربع",toBase:1000000,fromBase:0.000001},
    {key:"cm2",label:"سنتيمتر مربع",toBase:0.0001,fromBase:10000},
    {key:"ft2",label:"قدم مربع",toBase:0.092903,fromBase:10.7639},
    {key:"acre",label:"فدان",toBase:4046.86,fromBase:0.000247105},
    {key:"ha",label:"هكتار",toBase:10000,fromBase:0.0001},
  ]},
  volume: { label:"الحجم والسعة", units:[
    {key:"L",label:"لتر",toBase:1,fromBase:1},
    {key:"mL",label:"مليلتر",toBase:0.001,fromBase:1000},
    {key:"m3",label:"متر مكعب",toBase:1000,fromBase:0.001},
    {key:"gal",label:"جالون (US)",toBase:3.78541,fromBase:1/3.78541},
    {key:"cup",label:"كوب",toBase:0.236588,fromBase:1/0.236588},
    {key:"tbsp",label:"ملعقة كبيرة",toBase:0.0147868,fromBase:1/0.0147868},
  ]},
  speed: { label:"السرعة", units:[
    {key:"kmh",label:"كم/ساعة",toBase:1,fromBase:1},
    {key:"ms",label:"م/ثانية",toBase:3.6,fromBase:1/3.6},
    {key:"mph",label:"ميل/ساعة",toBase:1.60934,fromBase:1/1.60934},
    {key:"knot",label:"عقدة بحرية",toBase:1.852,fromBase:1/1.852},
  ]},
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    const units = CATEGORIES[category].units;
    const from = units.find(u=>u.key===fromUnit);
    const to = units.find(u=>u.key===toUnit);
    if (!from||!to) return;
    const toBase = typeof from.toBase==="function" ? from.toBase(v) : v * from.toBase;
    const fromBase = typeof to.fromBase==="function" ? to.fromBase(toBase) : toBase * to.fromBase;
    setResult(fromBase);
    trackCalculatorUsed("unit-converter", "tools");
  };

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); setResult(null); };

  const units = CATEGORIES[category].units;

  return (
    <div className="space-y-5">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORIES) as [Category, {label:string}][]).map(([k,{label}]) => (
          <button key={k} onClick={() => { setCategory(k); setResult(null); setFromUnit(CATEGORIES[k].units[0].key); setToUnit(CATEGORIES[k].units[1].key); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${category===k?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#1E3A8A]"}`}>
            {label}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">القيمة</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="0" />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
          className="col-span-2 px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-sm">
          {units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
        </select>
        <button onClick={swap} className="col-span-1 flex justify-center text-[#1E3A8A] dark:text-blue-400 hover:scale-110 transition-transform"><ArrowLeftRight className="h-6 w-6" /></button>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
          className="col-span-2 px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-sm">
          {units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
        </select>
      </div>
      <button onClick={convert} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">تحويل</button>
      {result !== null && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
          <p className="text-blue-200 text-sm mb-2">{value} {units.find(u=>u.key===fromUnit)?.label} =</p>
          <p className="text-4xl font-black" dir="ltr">{result < 0.001 || result > 1e9 ? result.toExponential(4) : formatNumber(result, 6)}</p>
          <p className="text-blue-200 mt-1">{units.find(u=>u.key===toUnit)?.label}</p>
        </div>
      )}
    </div>
  );
}
