import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Award, Check, ChevronLeft, CreditCard, Download, FileText, Lock, LogOut, Send, Timer, Upload, X, XCircle,
} from "lucide-react";
import { API, DemoBanner, PASS_MARK, PROGRAMS, STAGES, average, fileUrl, levelOf, printDoc, stageIndex, useDemo } from "./DemoStore";
import { MOCK_MINUTES, questionsFor } from "./MockBank";
import { allParts, answerText, answered } from "./MockPaper";

export const scrollMainTop = () => { const m = document.querySelector("[data-portal-main]"); if (m && m.scrollHeight > m.clientHeight) m.scrollTo({ top: 0, behavior: "smooth" }); else window.scrollTo({ top: 0, behavior: "smooth" }); };
export const fmt = (iso) => { try { return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch (e) { return iso; } };
export const pkr = (n) => "PKR " + Number(n || 0).toLocaleString("en-US");
export const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
export const dmy = (d) => { try { return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); } catch (e) { return d; } };
export const dayName = (d) => { try { return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" }); } catch (e) { return ""; } };

/* ============================ UI BITS ============================ */
export const Btn = ({ children, className = "", ...p }) => (
  <button type="button" {...p} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${className}`}>{children}</button>
);
export const Primary = (p) => <Btn {...p} className={`bg-navy-700 text-white hover:bg-gold-500 hover:text-navy-900 ${p.className || ""}`} />;
export const Gold = (p) => <Btn {...p} className={`btn-shimmer bg-gold-500 text-navy-900 hover:bg-gold-400 ${p.className || ""}`} />;
export const Ghost = (p) => <Btn {...p} className={`border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white ${p.className || ""}`} />;
export const Eyebrow = ({ children }) => <p className="text-xs font-bold uppercase tracking-wider text-gold-700">{children}</p>;
export function Card({ children, className = "" }) {
  return <div className={`rounded-3xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100 ${className}`}>{children}</div>;
}
export const Empty = ({ icon: Icon = Lock, children }) => (
  <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Icon className="h-7 w-7" /></span>
    <p className="mt-4 max-w-md text-sm text-slate-600">{children}</p>
  </div>
);
export const Field = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}><span className="mb-1 block text-xs font-bold uppercase tracking-wider text-navy-700">{label}</span>{children}</label>
);
export const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100";

/* ============================ SHELL ============================ */
export function Shell({ title, subtitle, profile, nav, active, setActive, bell, children }) {
  const demo = useDemo();
  const go = useNavigate();
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-700">
      <DemoBanner dark />
      <div className={`flex flex-col lg:flex-row lg:overflow-hidden ${API ? "min-h-screen lg:h-screen" : "min-h-[calc(100vh-36px)] lg:h-[calc(100vh-36px)]"}`}>
        <aside className="navy-pattern flex shrink-0 flex-col px-4 pb-4 pt-3 text-white lg:w-60 lg:overflow-y-auto">
          <Link to="/" className="block"><img src="/logo.webp" alt="Pathways" className="h-9 w-auto" /></Link>
          {profile || (
            <div className="mt-3 rounded-xl bg-white/[0.07] px-3 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">{title}</p>
              <p className="mt-1 font-semibold">{subtitle}</p>
            </div>
          )}
          <nav className="mt-3 flex gap-0.5 overflow-x-auto lg:flex-col">
            {nav.map(({ key, label, icon: Icon, count }) => (
              <button key={key} type="button" onClick={() => setActive(key)}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition ${active === key ? "bg-gold-500 text-navy-900" : "text-white/80 hover:bg-white/10"}`}>
                <Icon className="h-4 w-4 shrink-0" /> {label}
                {count ? <span className="ml-auto rounded-full bg-red-500 px-2 text-[11px] font-bold text-white">{count}</span> : null}
              </button>
            ))}
          </nav>
          {!API && <div className="mt-auto hidden space-y-2 pt-3 lg:block">
            <button type="button" onClick={() => { if (confirm("Reset all demo data?")) { demo.reset(); go("/portal"); } }} className="w-full rounded-lg border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/60 hover:bg-white/10">Reset demo data</button>
          </div>}
        </aside>
        <main data-portal-main className="min-w-0 flex-1 p-5 sm:p-8 lg:overflow-y-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{title}</p>
              <h1 className="font-serif text-3xl font-semibold text-navy-800">{nav.find((n) => n.key === active)?.label}</h1>
            </div>
            <div className="flex items-center gap-2">
              {bell}
              <button type="button" onClick={() => { demo.logout(); go("/portal"); }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:border-gold-300">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </div>
          {demo.storageFull && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">Browser storage is full — large files are not kept in the demo. Try smaller files.</p>}
          <div key={active} className="panel-in mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function StudentBadge({ c }) {
  const full = c.program !== "mock";
  return (
    <div className="mt-3 rounded-xl bg-white/[0.07] px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 font-serif text-sm font-bold text-navy-900">{c.first[0]}{c.last[0]}</span>
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-tight">{c.first} {c.last}</p><p className="text-[10px] text-white/55">{c.id}</p></div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10.5px] text-white/75">
        <span className="rounded-full bg-gold-500 px-2 py-0.5 font-bold text-navy-900">{levelOf(c.qualification)}</span>
        <span>{full ? <>Mock Test <span className="text-gold-400">→</span> BC Exam</> : "Mock Test only"}</span>
      </div>
      <p className="mt-1 text-[10.5px] text-white/60">Session: {c.session}</p>
    </div>
  );
}

export function Tracker({ c }) {
  const idx = stageIndex(c);
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {STAGES.map((s, i) => {
        const done = i < idx, cur = i === idx;
        return (
          <div key={s.key} className={`relative rounded-2xl p-4 text-center transition ${done ? "bg-navy-700 text-white" : cur ? "bg-gold-50 ring-2 ring-gold-400" : "bg-slate-50 text-slate-400"}`}>
            <span className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${done ? "bg-gold-500 text-navy-900" : cur ? "bg-navy-700 text-gold-300" : "bg-white"}`}>
              {done ? <Check className="h-5 w-5" /> : i + 1}
            </span>
            <p className={`mt-2 text-xs font-bold ${cur ? "text-navy-800" : ""}`}>{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ============================ DOWNLOADS ============================ */
const infoGrid = (c) => `<div class="grid">
  <div><b>Candidate</b>${esc(c.first)} ${esc(c.last)}</div><div><b>Candidate ID</b>${esc(c.id)}</div>
  <div><b>Level / Qualification</b>${levelOf(c.qualification)} · ${esc(c.qualification)}</div><div><b>Exam session</b>${esc(c.session)}</div>
  <div style="grid-column:span 2"><b>Programme</b>${PROGRAMS[c.program || "full"].label}</div></div>`;

export function downloadResult(c) {
  const avg = average(c.mock.marks); const ok = avg >= PASS_MARK;
  printDoc("Mock Test Result Card", infoGrid(c) + `<table><tr><th>Subject</th><th>Marks</th><th>%</th><th>Status</th></tr>${c.subjects.map((s) => { const m = c.mock.marks[s]; const a = (c.mock.attempts || {})[s]; return `<tr><td>${esc(s)}${a?.paper ? " (full mock paper)" : ""}</td><td>${a ? `${a.score} / ${a.total}` : "—"}</td><td>${m ?? "—"}</td><td>${m >= PASS_MARK ? "Pass" : "Below 60%"}</td></tr>`; }).join("")}</table>
  <p style="margin-top:20px">Overall average</p><div class="big ${ok ? "ok" : "no"}">${avg}%</div><p><b>${ok ? "Eligible for British Council examination registration (60% or above)." : "Below the 60% passing criteria."}</b></p>`);
}
export function downloadSOE(c) {
  const s = c.soe;
  if (s.fileId) { window.open(fileUrl(s.fileId), "_blank", "noopener"); return; }
  if (s.data) { const a = document.createElement("a"); a.href = s.data; a.download = s.file; document.body.appendChild(a); a.click(); a.remove(); return; }
  printDoc("Statement of Entry — Exam Timetable", infoGrid(c) + `<div class="grid" style="margin-top:14px"><div><b>Candidate number</b>${esc(s.candidateNo)}</div><div><b>Exam centre</b>${esc(s.centre)}</div><div style="grid-column:span 2"><b>Venue</b>${esc(s.venue)}</div></div>
  <table><tr><th>Date</th><th>Day</th><th>Session</th><th>Paper code</th><th>Subject / Paper</th><th>Start</th><th>Status</th></tr>${s.timetable.map((r) => `<tr><td>${dmy(r.date)}</td><td>${dayName(r.date)}</td><td>${r.session || ""}</td><td>${esc(r.code || "")}</td><td>${esc(r.subject)} — ${r.paper}</td><td>${r.time}</td><td>${r.att === "appeared" ? "Appeared" : r.att === "absent" ? "Absent" : "Upcoming"}</td></tr>`).join("")}</table>
  <p style="margin-top:18px;font-size:12px">Timetable as issued by the exam board through the British Council. Bring your Statement of Entry and original photo ID to every exam. Arrive 30 minutes before the start time.</p>`);
}
export function downloadExamResult(c) {
  const r = c.examResult;
  if (r.fileId) { window.open(fileUrl(r.fileId), "_blank", "noopener"); return; }
  if (r.data) { const a = document.createElement("a"); a.href = r.data; a.download = r.file; document.body.appendChild(a); a.click(); a.remove(); return; }
  printDoc("British Council Exam Results", infoGrid(c) + `<table><tr><th>Subject</th><th>Grade</th></tr>${c.subjects.map((s) => `<tr><td>${esc(s)}</td><td><b>${esc(r.grades[s] || "—")}</b></td></tr>`).join("")}</table><p style="margin-top:16px;font-size:12px">Uploaded by the Pathways Exams department from the official Statement of Results.</p>`);
}
export function downloadPastPaper(p) {
  printDoc(`Past Paper — ${p.title}`, `<div class="grid"><div><b>Subject</b>${esc(p.subject)}</div><div><b>Series</b>${esc(p.series)}</div></div><p style="margin-top:30px">This is a placeholder for the real past paper file. In the live portal, the school uploads the actual PDF here.</p>`);
}
export function downloadMockPaper(paper) {
  printDoc(`${paper.board} ${paper.subject} ${paper.code} — ${paper.title} (${paper.mock})`, paper.pages.map((src) => `<img class="pg" src="${src}">`).join(""));
}
export function openDoc(d) {
  if (d.fileId) { window.open(fileUrl(d.fileId), "_blank", "noopener"); return; }
  if (d.data) { const a = document.createElement("a"); a.href = d.data; a.download = d.name; document.body.appendChild(a); a.click(); a.remove(); }
  else printDoc(`Document — ${d.name}`, `<p>File: <b>${esc(d.name)}</b></p><p>In the demo only the file name is kept for this document. In the live portal the original file downloads here.</p>`);
}
/* Shows the uploaded file itself — the same PDF or picture the Exams team uploaded */
export const isImageFile = (name = "", data = "") => /\.(png|jpe?g|webp|gif)$/i.test(name) || /^data:image\//.test(data);
export function FilePreview({ fileId, data, name, title, tall }) {
  const url = fileId ? fileUrl(fileId) : data;
  if (!url) return null;
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
      {isImageFile(name, data)
        ? <img src={url} alt={title || name} className="mx-auto block max-h-[85vh] w-auto max-w-full" />
        : <iframe src={url} title={title || name} className={`block w-full bg-white ${tall ? "h-[85vh]" : "h-[60vh]"}`} />}
    </div>
  );
}
export const MAX_UPLOAD = API ? 5 * 1024 * 1024 : 1.2 * 1024 * 1024;
export function readFiles(files, cb) {
  [...files].forEach((f) => {
    if (API) return cb(f.size > MAX_UPLOAD ? { name: f.name, size: f.size } : { name: f.name, size: f.size, file: f });
    if (f.size > MAX_UPLOAD) return cb({ name: f.name, size: f.size });
    const r = new FileReader();
    r.onload = () => cb({ name: f.name, size: f.size, data: r.result });
    r.readAsDataURL(f);
  });
}

/* ============================ TABLES & CARDS ============================ */
export const paperState = (r) => {
  if (r.att === "appeared") return ["bg-[#d1fae5] text-[#065f46]", "Appeared"];
  if (r.att === "absent") return ["bg-red-100 text-red-700", "Absent"];
  return ["bg-slate-100 text-slate-500", "Upcoming"];
};
export const PaperPill = ({ r }) => { const [cls, l] = paperState(r); return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${cls}`}>{l}</span>; };

/* Official-style datesheet (as received from the board) */
export function Datesheet({ rows, att, onMark }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-navy-700 text-[11px] uppercase tracking-wider text-white">
          <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Day</th><th className="px-4 py-3">Session</th><th className="px-4 py-3">Paper code</th><th className="px-4 py-3">Subject / Paper</th><th className="px-4 py-3">Start</th>{att && <th className="px-4 py-3">Status</th>}</tr>
        </thead>
        <tbody>{rows.map((r, i) => (
          <tr key={i} className="border-t border-slate-100 odd:bg-slate-50/70">
            <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy-800">{dmy(r.date)}</td>
            <td className="px-4 py-3 text-slate-600">{dayName(r.date)}</td>
            <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${r.session === "Morning" ? "bg-gold-100 text-gold-900" : "bg-navy-50 text-navy-700"}`}>{r.session || "—"}</span></td>
            <td className="px-4 py-3 font-mono text-xs font-bold text-navy-700">{r.code || "—"}</td>
            <td className="px-4 py-3"><b className="text-navy-800">{r.subject}</b> <span className="text-slate-500">· {r.paper}</span></td>
            <td className="px-4 py-3 font-mono">{r.time}</td>
            {att && <td className="px-4 py-3">{onMark ? (
              <div className="flex gap-1">{[["appeared", "Appeared", "bg-[#059669]"], ["absent", "Absent", "bg-red-600"]].map(([k, l, on]) => (
                <button key={k} type="button" onClick={() => onMark(i, r.att === k ? undefined : k)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${r.att === k ? `${on} text-white` : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{l}</button>
              ))}</div>
            ) : <PaperPill r={r} />}</td>}
          </tr>))}</tbody>
      </table>
    </div>
  );
}

export function ResultCard({ c, onDownload }) {
  const avg = average(c.mock.marks); const ok = avg >= PASS_MARK;
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
      <div className="navy-pattern flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-white">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">Result card</p><p className="font-serif text-2xl font-semibold">Mock test results</p></div>
        <div className={`rounded-2xl px-5 py-3 text-center ${ok ? "bg-[#10b981]" : "bg-red-500"}`}><p className="font-serif text-3xl font-bold">{avg}%</p><p className="text-[11px] font-bold uppercase tracking-wider">{ok ? "Passed" : "Below 60%"}</p></div>
      </div>
      <div className="space-y-4 p-6">
        {c.subjects.map((s) => { const m = c.mock.marks[s] ?? 0; const a = (c.mock.attempts || {})[s]; return (
          <div key={s}><div className="flex justify-between text-sm font-semibold text-navy-800"><span>{s} {a?.paper && <span className="ml-1 rounded bg-gold-100 px-1.5 text-[10px] text-gold-900">full paper{a.reviewed ? " · reviewed" : ""}</span>}</span><span className={m >= PASS_MARK ? "text-[#059669]" : "text-red-600"}>{a && (a.tries || 1) > 1 ? `best of ${a.tries} · ` : a ? `${a.score}/${a.total} · ` : ""}{m}%</span></div>
            <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500 transition-all duration-1000" style={{ width: `${m}%` }} /><span className="absolute top-0 h-full w-0.5 bg-red-400" style={{ left: `${PASS_MARK}%` }} /></div></div>
        ); })}
        <p className="text-xs text-slate-500">Red line = {PASS_MARK}% passing criteria</p>
        {onDownload && <Gold onClick={onDownload}><Download className="h-4 w-4" /> Download result card</Gold>}
      </div>
    </div>
  );
}

export function ExamResultCard({ c }) {
  const r = c.examResult;
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-5 text-navy-900">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.2em]">British Council · {c.session}</p><p className="font-serif text-2xl font-semibold">Exam result card</p></div>
        <Award className="h-10 w-10" />
      </div>
      <div className="p-6">
        {(r.fileId || r.data) && <div className="mb-4"><FilePreview fileId={r.fileId} data={r.data} name={r.file} title="Statement of Results" tall /></div>}
        {Object.keys(r.grades || {}).length === 0 ? null :
        <div className="grid gap-3 sm:grid-cols-2">
          {c.subjects.map((s) => (
            <div key={s} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span className="font-semibold text-navy-800">{s}</span><span className="grid h-11 min-w-11 place-items-center rounded-xl bg-navy-700 px-2 font-serif text-xl font-bold text-gold-300">{r.grades[s] || "—"}</span></div>
          ))}
        </div>}
        <p className="mt-4 text-xs text-slate-500">Uploaded by the Exams department · {fmt(r.at)} · {r.file}</p>
        <Gold className="mt-4" onClick={() => downloadExamResult(c)}><Download className="h-4 w-4" /> Download Statement of Results</Gold>
      </div>
    </div>
  );
}

export function DocsPanel({ c, by }) {
  const demo = useDemo();
  return (
    <div className="space-y-5">
      {by === "student" && (
        <div className="navy-pattern relative overflow-hidden rounded-3xl p-6 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold-500/30" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">Your safe document locker</p>
          <p className="mt-1 font-serif text-2xl font-semibold">Keep every document safe — for the future.</p>
          <p className="mt-2 max-w-2xl text-sm text-white/75">Upload any of your documents here: IDs, results, certificates, SOEs, fee slips. They stay safe in your file — just log in and get your documents whenever you need them.</p>
        </div>
      )}
      <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center transition hover:border-gold-400 hover:bg-gold-50">
        <Upload className="mx-auto h-9 w-9 text-gold-600" />
        <span className="mt-2 block font-bold text-navy-800">{by === "student" ? "Upload a document" : "Attach a document to this student's file"}</span>
        <span className="block text-xs text-slate-500">{API ? "PDF, JPG, PNG or WEBP — up to 5 MB each." : "Any file — ID, photo, results, letters. (Demo: files up to 1.2 MB are stored in this browser.)"}</span>
        <input type="file" multiple accept={API ? ".pdf,.jpg,.jpeg,.png,.webp" : undefined} className="hidden" onChange={(e) => { readFiles(e.target.files, (d) => demo.addDoc(c.id, d, by)); e.target.value = ""; }} />
      </label>
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100">
        {c.docs.length === 0 && <p className="p-6 text-sm text-slate-500">No documents yet.</p>}
        {c.docs.map((d) => (
          <div key={d.id} className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700"><FileText className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1"><p className="truncate font-semibold text-navy-800">{d.name}</p><p className="text-xs text-slate-500">{d.cat ? <span className="mr-1 rounded bg-gold-100 px-1.5 font-semibold text-gold-900">{d.cat}</span> : null}Added by {d.by === "student" ? "student" : "Pathways staff"} · {fmt(d.at)}</p></div>
            <Btn onClick={() => openDoc(d)} className="text-navy-700 hover:bg-navy-50"><Download className="h-4 w-4" /></Btn>
            {!d.locked && (by !== "student" || d.by === "student") && <Btn onClick={() => demo.removeDoc(c.id, d.id)} className="text-xs text-red-600 hover:bg-red-50">Remove</Btn>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ PAYMENT ============================ */
const METHOD_STYLE = {
  Card: ["bg-navy-700", "Debit / credit card"],
  Easypaisa: ["bg-[#1fa84f]", "Easypaisa wallet"],
  JazzCash: ["bg-[#c8102e]", "JazzCash wallet"],
  "Bank transfer": ["bg-slate-600", "Bank transfer + fee slip"],
};

export function PaymentModal({ open, onClose, amount, title, methods = ["Card", "Easypaisa", "JazzCash"], initial, onPaid, note, bank: bankProp, test }) {
  const demo = useDemo();
  const [m, setM] = useState(methods[0]);
  const [ref, setRef] = useState("");
  const [doneNote, setDoneNote] = useState("");
  const [card, setCard] = useState({ no: "", name: "", exp: "", cvc: "" });
  const [mobile, setMobile] = useState("");
  const [slip, setSlip] = useState(null);
  const [stage, setStage] = useState("form");
  const [err, setErr] = useState("");
  useEffect(() => { if (open) { setStage("form"); setErr(""); setDoneNote(""); setM(initial || methods[0]); } }, [open]); // eslint-disable-line
  if (!open) return null;
  const pay = () => {
    if (m === "Card" && (card.no.replace(/\D/g, "").length < 16 || !card.name || !/^\d{2}\/\d{2}$/.test(card.exp) || card.cvc.length < 3)) return setErr("Please enter the card number, name, expiry (MM/YY) and CVC.");
    if ((m === "Easypaisa" || m === "JazzCash") && !/^03\d{9}$/.test(mobile.replace(/\D/g, ""))) return setErr("Please enter your 11-digit mobile account number (03XXXXXXXXX).");
    if (m === "Bank transfer" && !slip) return setErr("Please upload the paid fee slip.");
    setErr(""); setStage("busy");
    if (!API) { setTimeout(() => { setStage("done"); onPaid(m, slip); }, 1500); return; }
    Promise.resolve(onPaid(m, slip && { ...slip, ref }))
      .then((r) => { if (r?.error) { setErr(r.error); setStage("form"); return; } setDoneNote(r?.message || ""); setStage(r?.pending || m === "Bank transfer" ? "slip" : "done"); })
      .catch((e) => { setErr(e.message || "Payment failed. Please try again."); setStage("form"); });
  };
  const live = API && demo?.live;
  const bank = bankProp !== undefined ? bankProp : demo?.db?.bank;
  const testMode = test !== undefined ? test : !!demo?.db?.testPayments;
  const cardNo = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm" onClick={stage !== "busy" ? onClose : undefined}>
      <div className="lightbox-in w-full max-w-md overflow-hidden rounded-3xl bg-white text-slate-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="navy-pattern flex items-start justify-between gap-3 px-6 py-5 text-white">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">Secure payment{live ? (testMode ? " · test mode" : "") : " · demo"}</p><p className="mt-1 font-semibold">{title}</p><p className="font-serif text-3xl font-semibold">{pkr(amount)}</p></div>
          {stage !== "busy" && <button type="button" onClick={onClose} className="rounded-full p-1 text-white/70 hover:bg-white/10"><X className="h-5 w-5" /></button>}
        </div>
        {stage === "done" || stage === "slip" ? (
          <div className="p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d1fae5] text-[#047857]"><Check className="h-8 w-8" strokeWidth={3} /></span>
            <p className="mt-4 font-serif text-2xl font-semibold text-navy-800">{stage === "slip" || m === "Bank transfer" ? "Fee slip submitted" : "Payment successful"}</p>
            <p className="mt-1 text-sm text-slate-500">{stage === "slip" ? (doneNote || "Admissions will verify your slip shortly. You will get a notification.") : note || "A receipt has been added to your account."}</p>
            <Primary className="mt-6" onClick={onClose}>Done</Primary>
          </div>
        ) : (
          <div className="p-6">
            <div className={`grid gap-2 ${methods.length > 3 ? "grid-cols-2" : "grid-cols-3"}`}>
              {methods.map((x) => (
                <button key={x} type="button" onClick={() => { setM(x); setErr(""); }} className={`rounded-2xl border-2 p-3 text-left transition ${m === x ? "border-navy-700 bg-navy-50" : "border-slate-100 hover:border-gold-300"}`}>
                  <span className={`grid h-7 w-7 place-items-center rounded-lg text-white ${METHOD_STYLE[x][0]}`}><CreditCard className="h-4 w-4" /></span>
                  <span className="mt-2 block text-xs font-bold text-navy-800">{x}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {m === "Card" && <>
                <Field label="Card number"><input inputMode="numeric" className={inputCls} value={card.no} onChange={(e) => setCard((c) => ({ ...c, no: cardNo(e.target.value) }))} placeholder="4242 4242 4242 4242" /></Field>
                <Field label="Name on card"><input className={inputCls} value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry"><input className={inputCls} value={card.exp} onChange={(e) => setCard((c) => ({ ...c, exp: e.target.value.replace(/[^\d/]/g, "").slice(0, 5) }))} placeholder="MM/YY" /></Field>
                  <Field label="CVC"><input inputMode="numeric" className={inputCls} value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))} placeholder="123" /></Field>
                </div>
              </>}
              {(m === "Easypaisa" || m === "JazzCash") && <>
                <Field label={`${m} mobile account`}><input inputMode="numeric" className={inputCls} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="03XXXXXXXXX" /></Field>
                <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">You will get a payment request in your {m} app. Approve it with your MPIN to finish.</p>
              </>}
              {m === "Bank transfer" && <>
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">{live && bank ? <>
                  <b className="text-navy-800">{bank.accountTitle || "Pathways International School"}</b><br />{bank.bank}{bank.branch ? ` · ${bank.branch}` : ""}<br />
                  {bank.accountNumber && <>Account no. <b className="font-mono text-navy-800">{bank.accountNumber}</b><br /></>}{bank.iban && <>IBAN <b className="font-mono text-navy-800">{bank.iban}</b></>}
                </> : <><b className="text-navy-800">Pathways International School</b><br />Account details are shared by Admissions{live ? "" : " (demo)"}.</>}</div>
                <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-4 text-center text-sm hover:border-gold-400">
                  <Upload className="mx-auto h-6 w-6 text-gold-600" /><span className="mt-1 block font-bold text-navy-800">{slip ? slip.name : "Upload paid fee slip"}</span>
                  <input type="file" accept={API ? ".pdf,.jpg,.jpeg,.png,.webp" : undefined} className="hidden" onChange={(e) => readFiles(e.target.files, (d) => { if (API && !d.file) { setErr("That file is larger than 5 MB."); return; } setSlip(d); })} />
                </label>
                {live && <Field label="Transaction / reference no. (optional)"><input className={inputCls} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. FT123456789" /></Field>}
              </>}
            </div>
            {err && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{err}</p>}
            <Gold disabled={stage === "busy"} onClick={pay} className="mt-5 w-full py-3.5 uppercase tracking-wider">{stage === "busy" ? "Processing…" : m === "Bank transfer" ? "Submit fee slip" : `Pay ${pkr(amount)}`}</Gold>
            <p className="mt-2 text-center text-[11px] text-slate-400">{live ? (testMode ? "TEST MODE — no real money is taken." : "Card and wallet payments open when the school's merchant account is connected. Bank transfer works now.") : "Demo only — no money is taken."}</p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* ============================ MCQ RUNNER ============================ */
export function MockRunner({ c, subject, onExit, onResult }) {
  const demo = useDemo();
  const qs = questionsFor(c.qualification, subject);
  const [ans, setAns] = useState(() => qs.map(() => null));
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(MOCK_MINUTES * 60);
  const [res, setRes] = useState(null);
  const started = useRef(Date.now());
  const ansRef = useRef(ans); ansRef.current = ans;
  const busy = useRef(false);
  const [sendErr, setSendErr] = useState("");
  const submit = async () => {
    if (res || busy.current) return;
    busy.current = true; setSendErr("");
    const mins = Math.max(1, Math.round((Date.now() - started.current) / 60000));
    try { setRes(await demo.submitMock(c.id, subject, ansRef.current, mins)); scrollMainTop(); }
    catch (e) { setSendErr(e.message || "Could not submit. Check your internet and press Submit again."); }
    finally { busy.current = false; }
  };
  useEffect(() => {
    if (res) return undefined;
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { clearInterval(t); setTimeout(submit, 0); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [res]); // eslint-disable-line
  const answeredN = ans.filter((a) => a !== null).length;
  const rtl = subject === "Urdu";
  const confirmSubmit = () => { if (answeredN < qs.length && !confirm(`You have ${qs.length - answeredN} unanswered question(s). Submit anyway?`)) return; submit(); };

  if (res) {
    const ok = res.pct >= PASS_MARK;
    return (
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
        <ResultHead ok={ok} pct={res.pct} eyebrow={`Auto-checked · ${subject}`} line={`You scored ${res.score} out of ${res.total}. ${res.complete ? `All mock tests done — your average is ${res.avg}%.` : "Finish your other subjects to get your result card."}`} />
        <div className="space-y-3 p-6 sm:p-8">
          <Eyebrow>Answer review</Eyebrow>
          {qs.map((q, k) => { const key = res.key ? res.key[k] : q[2]; const right = ans[k] === key; return (
            <div key={k} dir={rtl ? "rtl" : "ltr"} className={`rounded-2xl border p-4 text-sm ${right ? "border-[#a7f3d0] bg-[#ecfdf5]" : "border-red-200 bg-red-50/60"}`}>
              <p className="font-semibold text-navy-800">{k + 1}. {q[0]}</p>
              <p className="mt-1.5 flex items-center gap-1.5">{right ? <Check className="h-4 w-4 text-[#059669]" /> : <XCircle className="h-4 w-4 text-red-600" />}
                <span className={right ? "text-[#047857]" : "text-red-700"}>Your answer: {ans[k] === null ? "not answered" : q[1][ans[k]]}</span></p>
              {!right && q[1][key] !== undefined && <p className="mt-1 text-[#047857]">Correct answer: <b>{q[1][key]}</b></p>}
            </div>
          ); })}
          <div className="flex flex-wrap gap-3 pt-3"><Primary onClick={onExit}><ChevronLeft className="h-4 w-4" /> Back to mock tests</Primary>{res.complete && <Gold onClick={onResult}><Award className="h-4 w-4" /> View result card</Gold>}</div>
        </div>
      </div>
    );
  }
  const q = qs[i];
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">{levelOf(c.qualification)} quick mock test</p><p className="font-serif text-xl font-semibold text-navy-800">{subject}</p></div>
          <Clock left={left} />
        </div>
        <div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-navy-700 to-gold-500 transition-all duration-500" style={{ width: `${((i + 1) / qs.length) * 100}%` }} /></div>
        <div key={i} className="panel-in p-6 sm:p-8" dir={rtl ? "rtl" : "ltr"}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Question {i + 1} of {qs.length}</p>
          <p className={`mt-2 font-semibold text-navy-800 ${rtl ? "text-2xl leading-loose" : "text-lg"}`}>{q[0]}</p>
          <div className="mt-6 grid gap-3">{q[1].map((o, k) => { const on = ans[i] === k; return (
            <button key={k} type="button" onClick={() => setAns((a) => a.map((x, j) => (j === i ? k : x)))} className={`flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition ${on ? "border-navy-700 bg-navy-50 shadow-md" : "border-slate-100 hover:border-gold-300 hover:bg-gold-50/50"}`}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${on ? "bg-navy-700 text-gold-300" : "bg-slate-100 text-slate-500"}`}>{"ABCD"[k]}</span>
              <span className={`font-medium text-slate-700 ${rtl ? "text-xl" : "text-sm"}`}>{o}</span>
            </button>
          ); })}</div>
          <div className="mt-8 flex items-center justify-between" dir="ltr">
            <Btn disabled={i === 0} onClick={() => setI(i - 1)} className="text-navy-700 hover:bg-slate-100"><ChevronLeft className="h-4 w-4" /> Previous</Btn>
            {i < qs.length - 1 ? <Primary onClick={() => setI(i + 1)}>Next <ArrowRight className="h-4 w-4" /></Primary> : <Gold onClick={confirmSubmit}><Send className="h-4 w-4" /> Submit test</Gold>}
          </div>
        </div>
      </div>
      <div className="space-y-4 self-start">
        <Card>
          <Eyebrow>Questions</Eyebrow>
          <div className="mt-3 grid grid-cols-4 gap-2">{qs.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} className={`h-10 rounded-xl text-sm font-bold transition ${k === i ? "bg-gold-500 text-navy-900" : ans[k] !== null ? "bg-navy-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-gold-100"}`}>{k + 1}</button>
          ))}</div>
          <p className="mt-3 text-xs text-slate-500">{answeredN} of {qs.length} answered</p>
          {sendErr && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{sendErr}</p>}
          <Gold className="mt-4 w-full" onClick={confirmSubmit}><Send className="h-4 w-4" /> Submit test</Gold>
        </Card>
        <button type="button" onClick={() => { if (confirm("Leave the test? Your answers will not be saved.")) onExit(); }} className="w-full text-center text-xs font-semibold text-slate-500 hover:text-red-600">Leave without submitting</button>
      </div>
    </div>
  );
}

function Clock({ left }) {
  const h = Math.floor(left / 3600), mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0"), ss = String(left % 60).padStart(2, "0");
  return <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-bold ${left < 300 ? "bg-red-100 text-red-700" : "bg-navy-700 text-gold-300"}`}><Timer className="h-4 w-4" /> {h ? `${h}:` : ""}{mm}:{ss}</span>;
}

function ResultHead({ ok, pct, eyebrow, line, extra }) {
  return (
    <div className="navy-pattern flex flex-wrap items-center justify-between gap-5 px-6 py-7 text-white sm:px-8">
      <div className="max-w-xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">{eyebrow}</p>
        <p className="mt-1 font-serif text-3xl font-semibold">{ok ? "Well done!" : "Keep going!"}</p>
        <p className="mt-1 text-sm text-white/70">{line}</p>
        {extra}
      </div>
      <div className={`lightbox-in grid h-28 w-28 place-items-center rounded-full border-8 ${ok ? "border-[#34d399]" : "border-red-400"} bg-white/10`}>
        <div className="text-center"><p className="font-serif text-3xl font-bold">{pct}%</p><p className="text-[10px] font-bold uppercase tracking-wider">{ok ? "Pass" : "Below 60%"}</p></div>
      </div>
    </div>
  );
}

/* ============================ FULL PAPER RUNNER ============================ */
function PartInput({ p, value, onChange }) {
  const v = value;
  const sub = (k) => (e) => onChange({ ...(v || {}), [k]: e.target.value });
  const arr = (i) => (e) => { const a = [...(v || [])]; a[i] = e.target.value; onChange(a); };
  switch (p.type) {
    case "mcq": return (
      <div className="grid gap-2">{p.opts.map((o, k) => (
        <button key={k} type="button" onClick={() => onChange(k)} className={`flex items-center gap-3 rounded-xl border-2 px-4 py-2.5 text-left text-sm transition ${v === k ? "border-navy-700 bg-navy-50" : "border-slate-100 hover:border-gold-300"}`}>
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${v === k ? "bg-navy-700 text-gold-300" : "bg-slate-100 text-slate-500"}`}>{"ABCD"[k]}</span>{o}
        </button>))}</div>
    );
    case "exact": case "kw": return <input className={inputCls} value={v || ""} onChange={(e) => onChange(e.target.value)} placeholder="Your answer" />;
    case "points": return <textarea className={`${inputCls} min-h-[110px]`} value={v || ""} onChange={(e) => onChange(e.target.value)} placeholder="Write your answer…" />;
    case "list": return <div className="grid gap-2">{Array.from({ length: p.n }, (_, i) => <div key={i} className="flex items-center gap-2"><span className="w-5 text-sm font-bold text-slate-400">{i + 1}</span><input className={inputCls} value={(v || [])[i] || ""} onChange={arr(i)} /></div>)}</div>;
    case "table": return (
      <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
        <div className="grid grid-cols-2 bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500"><span className="px-3 py-2">{p.head[0]}</span><span className="px-3 py-2">{p.head[1]}</span></div>
        {p.rows.map((r, i) => {
          const inp = <textarea className={`${inputCls} min-h-[64px]`} value={(v || [])[i] || ""} onChange={arr(i)} />;
          return <div key={i} className="grid grid-cols-2 items-start gap-2 border-t border-slate-100 p-2 text-sm">{r.side === 1 ? <><span className="p-1 text-slate-700">{r.given}</span>{inp}</> : <>{inp}<span className="p-1 text-slate-700">{r.given}</span></>}</div>;
        })}
      </div>
    );
    case "cloze": return (
      <div className="rounded-xl bg-slate-50 p-4 text-sm leading-[2.6]">
        {p.text.map((t, i) => (
          <span key={i}>{t}{" "}{i < p.ans.length && (
            <select value={(v || [])[i] || ""} onChange={arr(i)} className="mx-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-navy-800">
              <option value="">— choose —</option>{p.terms.map((x) => <option key={x}>{x}</option>)}
            </select>)}{" "}</span>
        ))}
      </div>
    );
    case "fix": return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-xl text-xs ring-1 ring-slate-200">{[["A", "An interpreter translates and executes the code one variable at a time."], ["B", "A compiler displays an error report when it is unable to run the code due to syntax errors."], ["C", "An interpreter stops translating as soon as it finds an error in the code."], ["D", "A compiler translates the whole code at once and then it is executed."], ["E", "A compiler produces a non-executable file."]].map(([l, t]) => <div key={l} className="flex gap-3 border-t border-slate-100 px-3 py-1.5 first:border-0"><b className="text-navy-700">{l}</b>{t}</div>)}</div>
        {[0, 1].map((i) => (
          <div key={i} className="grid grid-cols-[90px_1fr] gap-2">
            <select className={inputCls} value={(v || {})[`l${i}`] || ""} onChange={sub(`l${i}`)}><option value="">Letter</option>{"ABCDE".split("").map((x) => <option key={x}>{x}</option>)}</select>
            <input className={inputCls} value={(v || {})[`c${i}`] || ""} onChange={sub(`c${i}`)} placeholder={`Corrected statement ${i + 1}`} />
          </div>
        ))}
      </div>
    );
    case "funcs": return (
      <div className="space-y-3">{[0, 1].map((i) => (
        <div key={i} className="grid gap-2 rounded-xl bg-slate-50 p-3">
          <input className={inputCls} value={(v || {})[`f${i}`] || ""} onChange={sub(`f${i}`)} placeholder={`Function ${i + 1}`} />
          <textarea className={`${inputCls} min-h-[60px]`} value={(v || {})[`p${i}`] || ""} onChange={sub(`p${i}`)} placeholder="Purpose" />
        </div>))}</div>
    );
    default: return null;
  }
}

export function PaperViewer({ paper, page, setPage, className = "" }) {
  const box = useRef(null);
  useEffect(() => { const el = box.current?.querySelector(`[data-pg="${page}"]`); if (el && box.current) box.current.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" }); }, [page]);
  return (
    <div className={`overflow-hidden rounded-3xl bg-slate-200 ring-1 ring-slate-200 ${className}`}>
      <div className="flex items-center gap-2 bg-navy-800 px-3 py-2">
        <FileText className="h-4 w-4 shrink-0 text-gold-400" />
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {paper.pages.map((_, i) => <button key={i} type="button" onClick={() => setPage(i + 1)} className={`h-7 min-w-7 shrink-0 rounded-md px-1.5 text-[11px] font-bold ${page === i + 1 ? "bg-gold-500 text-navy-900" : "text-white/70 hover:bg-white/10"}`}>{i + 1}</button>)}
        </div>
        <button type="button" onClick={() => downloadMockPaper(paper)} className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold text-gold-300 hover:bg-white/20"><Download className="inline h-3.5 w-3.5" /> Print</button>
      </div>
      <div ref={box} className="relative h-[70vh] space-y-3 overflow-y-auto p-3">
        {paper.pages.map((src, i) => <img key={i} data-pg={i + 1} src={src} alt={`Page ${i + 1}`} className="w-full rounded-lg bg-white shadow" loading="lazy" />)}
      </div>
    </div>
  );
}

export function PaperRunner({ c, paper, onExit, onResult }) {
  const demo = useDemo();
  const [ans, setAns] = useState({});
  const [qi, setQi] = useState(0);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("sheet");
  const [left, setLeft] = useState(paper.minutes * 60);
  const [res, setRes] = useState(null);
  const started = useRef(Date.now());
  const ansRef = useRef(ans); ansRef.current = ans;
  const parts = allParts(paper);
  const doneN = parts.filter((p) => answered(p, ans[p.id])).length;
  const busy = useRef(false);
  const [sendErr, setSendErr] = useState("");
  const submit = async () => {
    if (res || busy.current) return;
    busy.current = true; setSendErr("");
    const mins = Math.max(1, Math.round((Date.now() - started.current) / 60000));
    try { setRes(await demo.submitPaper(c.id, paper.subject, ansRef.current, mins)); scrollMainTop(); }
    catch (e) { setSendErr(e.message || "Could not submit. Check your internet and press Submit again."); }
    finally { busy.current = false; }
  };
  useEffect(() => {
    if (res) return undefined;
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { clearInterval(t); setTimeout(submit, 0); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [res]); // eslint-disable-line
  const confirmSubmit = () => { if (!confirm(doneN < parts.length ? `${parts.length - doneN} part(s) are not answered. Submit your paper anyway?` : "Submit your paper for marking?")) return; submit(); };
  const q = paper.questions[qi];
  const goQ = (k) => { setQi(k); setPage(paper.questions[k].page); };

  if (res) {
    const ok = res.pct >= PASS_MARK;
    return (
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
        <ResultHead ok={ok} pct={res.pct} eyebrow={`Auto-marked · ${paper.subject} ${paper.code} · ${paper.mock}`} line={`You scored ${res.score} out of ${res.total}. ${res.complete ? `All mock tests done — your average is ${res.avg}%.` : "Finish your other subjects to get your result card."}`}
          extra={res.review > 0 && <p className="mt-3 inline-block rounded-xl bg-white/10 px-3 py-2 text-xs text-gold-200">{res.review} written answer(s) are also checked by a teacher, who confirms your final mark.</p>} />
        <div className="p-6 sm:p-8"><PaperBreakdown paper={paper} attempt={{ answers: ans, partMarks: res.marks }} />
          <div className="flex flex-wrap gap-3 pt-6"><Primary onClick={onExit}><ChevronLeft className="h-4 w-4" /> Back to mock tests</Primary>{res.complete && <Gold onClick={onResult}><Award className="h-4 w-4" /> View result card</Gold>}</div></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white px-5 py-4 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">{paper.board} · {paper.code} · {paper.mock}</p><p className="font-serif text-xl font-semibold text-navy-800">{paper.subject} — {paper.title}</p></div>
        <div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-500">{doneN}/{parts.length} parts</span><Clock left={left} /></div>
      </div>
      <div className="flex gap-2 xl:hidden">
        {[["paper", "Question paper"], ["sheet", "Answer sheet"]].map(([k, l]) => <button key={k} type="button" onClick={() => setView(k)} className={`flex-1 rounded-full py-2 text-sm font-bold ${view === k ? "bg-navy-700 text-gold-300" : "bg-white text-navy-700 ring-1 ring-slate-200"}`}>{l}</button>)}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <PaperViewer paper={paper} page={page} setPage={setPage} className={view === "paper" ? "" : "hidden xl:block"} />
        <div className={`${view === "sheet" ? "" : "hidden xl:block"} overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy-950/5 ring-1 ring-slate-100`}>
          <div className="flex gap-1 overflow-x-auto border-b border-slate-100 p-2">
            {paper.questions.map((x, k) => { const all = x.parts.every((p) => answered(p, ans[p.id])); return (
              <button key={x.q} type="button" onClick={() => goQ(k)} className={`h-9 min-w-9 shrink-0 rounded-xl px-2 text-sm font-bold transition ${k === qi ? "bg-gold-500 text-navy-900" : all ? "bg-navy-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-gold-100"}`}>Q{x.q}</button>
            ); })}
          </div>
          <div key={qi} className="panel-in max-h-[70vh] space-y-6 overflow-y-auto p-5 sm:p-6">
            <div className="flex items-center justify-between"><p className="font-serif text-2xl font-semibold text-navy-800">Question {q.q}</p><button type="button" onClick={() => { setPage(q.page); setView("paper"); }} className="text-xs font-bold text-gold-700 hover:underline">See page {q.page} →</button></div>
            {q.parts.map((p) => (
              <div key={p.id}>
                <div className="flex items-start justify-between gap-3"><p className="text-sm text-slate-700"><b className="text-navy-800">{q.q}{p.label}</b> {p.prompt}</p><span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">[{p.marks}]</span></div>
                <div className="mt-2"><PartInput p={p} value={ans[p.id]} onChange={(val) => setAns((a) => ({ ...a, [p.id]: val }))} /></div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <Btn disabled={qi === 0} onClick={() => goQ(qi - 1)} className="text-navy-700 hover:bg-slate-100"><ChevronLeft className="h-4 w-4" /> Previous</Btn>
              {qi < paper.questions.length - 1 ? <Primary onClick={() => goQ(qi + 1)}>Next question <ArrowRight className="h-4 w-4" /></Primary> : <Gold onClick={confirmSubmit}><Send className="h-4 w-4" /> Submit paper</Gold>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => { if (confirm("Leave the paper? Your answers will not be saved.")) onExit(); }} className="text-xs font-semibold text-slate-500 hover:text-red-600">Leave without submitting</button>
        {sendErr && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{sendErr}</p>}
        <Gold onClick={confirmSubmit}><Send className="h-4 w-4" /> Submit paper</Gold>
      </div>
    </div>
  );
}

/* Per-part breakdown; editable marks for the Exams team */
export function PaperBreakdown({ paper, attempt, edit, onChange }) {
  return (
    <div className="space-y-5">
      {paper.questions.map((q) => {
        const got = q.parts.reduce((n, p) => n + Number(attempt.partMarks[p.id] || 0), 0); const max = q.parts.reduce((n, p) => n + p.marks, 0);
        return (
          <div key={q.q} className="overflow-hidden rounded-2xl ring-1 ring-slate-100">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5"><p className="font-bold text-navy-800">Question {q.q}</p><span className="text-sm font-bold text-navy-700">{got} / {max}</span></div>
            {q.parts.map((p) => {
              const m = Number(attempt.partMarks[p.id] || 0); const full = m === p.marks; const zero = m === 0;
              const written = ["points", "table", "fix", "funcs"].includes(p.type);
              return (
                <div key={p.id} className="grid gap-2 border-t border-slate-100 px-4 py-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="text-slate-600"><b className="text-navy-800">{q.q}{p.label}</b> {p.prompt}</p>
                    <p className="mt-1 break-words text-xs text-slate-500">Answer: <span className="font-semibold text-slate-700">{answerText(p, attempt.answers?.[p.id])}</span></p>
                    {written && !edit && <p className="mt-0.5 text-[11px] text-gold-700">Written answer — checked against the mark scheme, reviewed by a teacher.</p>}
                  </div>
                  {edit ? (
                    <div className="flex items-center gap-1"><input type="number" min="0" max={p.marks} value={attempt.partMarks[p.id] ?? 0} onChange={(e) => onChange(p.id, Math.max(0, Math.min(p.marks, Number(e.target.value))))} className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-right" /><span className="text-xs text-slate-500">/ {p.marks}</span></div>
                  ) : (
                    <span className={`justify-self-start rounded-full px-3 py-1 text-xs font-bold sm:justify-self-end ${full ? "bg-[#d1fae5] text-[#065f46]" : zero ? "bg-red-100 text-red-700" : "bg-gold-100 text-gold-900"}`}>{m} / {p.marks}</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
