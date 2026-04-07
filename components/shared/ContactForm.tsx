"use client";

import { useState } from "react";

type Status = "idle" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name    = (data.get("name")    as string).trim();
    const email   = (data.get("email")   as string).trim();
    const message = (data.get("message") as string).trim();

    if (!name || name.length < 2)          errs.name    = "الاسم يجب أن يكون حرفين على الأقل";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "بريد إلكتروني غير صالح";
    if (!message || message.length < 10)   errs.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
    if (message.length > 2000)             errs.message = "الرسالة طويلة جداً (الحد الأقصى 2000 حرف)";

    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const name    = (data.get("name")    as string).trim();
    const email   = (data.get("email")   as string).trim();
    const subject = (data.get("subject") as string).trim();
    const message = (data.get("message") as string).trim();

    // Build mailto link — opens user's email client with form data pre-filled
    const body = `الاسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`;
    const href = `mailto:info@egypiana.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        dir="rtl"
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
      >
        <span className="text-5xl block mb-4">✅</span>
        <p className="font-black text-green-700 dark:text-green-400 text-xl mb-2">شكراً على تواصلك!</p>
        <p className="text-green-600 dark:text-green-500 text-sm leading-relaxed">
          سيفتح تطبيق البريد الإلكتروني لإتمام الإرسال.
          <br />
          يمكنك أيضاً مراسلتنا مباشرة على{" "}
          <a
            href="mailto:info@egypiana.com"
            className="underline font-semibold"
          >
            info@egypiana.com
          </a>
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-green-700 dark:text-green-400 underline hover:no-underline"
        >
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      noValidate
      className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="cf-name"
          className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5"
        >
          الاسم <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          className={`w-full px-4 py-3 border rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white transition-colors ${
            errors.name
              ? "border-red-400 dark:border-red-600"
              : "border-gray-200 dark:border-gray-600"
          }`}
          placeholder="اسمك الكريم"
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="cf-name-err" className="text-red-500 text-xs mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="cf-email"
          className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5"
        >
          البريد الإلكتروني <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          className={`w-full px-4 py-3 border rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white transition-colors ${
            errors.email
              ? "border-red-400 dark:border-red-600"
              : "border-gray-200 dark:border-gray-600"
          }`}
          placeholder="email@example.com"
          dir="ltr"
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="cf-email-err" className="text-red-500 text-xs mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="cf-subject"
          className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5"
        >
          الموضوع
        </label>
        <select
          id="cf-subject"
          name="subject"
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
        >
          <option value="اقتراح حاسبة جديدة">اقتراح حاسبة جديدة</option>
          <option value="الإبلاغ عن خطأ">الإبلاغ عن خطأ</option>
          <option value="استفسار عام">استفسار عام</option>
          <option value="تعاون وإعلانات">تعاون وإعلانات</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="cf-message"
          className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5"
        >
          الرسالة <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          className={`w-full px-4 py-3 border rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white resize-none transition-colors ${
            errors.message
              ? "border-red-400 dark:border-red-600"
              : "border-gray-200 dark:border-gray-600"
          }`}
          placeholder="اكتب رسالتك هنا..."
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="cf-message-err" className="text-red-500 text-xs mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] active:bg-[#1e3a8a] text-white font-bold py-3 rounded-xl transition-colors"
      >
        إرسال الرسالة
      </button>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        جميع الحقول المُعلَّمة بـ <span className="text-red-500">*</span> مطلوبة
      </p>
    </form>
  );
}
