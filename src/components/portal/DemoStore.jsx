import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { questionsFor } from "./MockBank";
import { CS_PAPER, markPaper, paperFor } from "./MockPaper";
import { CURRENT_YEAR, EXAM_SESSIONS, sessionStart } from "../RefundPolicy";
import { ApiProvider } from "./ApiStore";

/* Live mode: the server build sets __PORTAL_API__ = "/api". Without it (vite dev / demo file) the portal runs as a demo. */
// eslint-disable-next-line no-undef
export const API = typeof __PORTAL_API__ !== "undefined" ? __PORTAL_API__ : "";
export const fileUrl = (id, download) => `${API}/files/${id}${download ? "?download=1" : ""}`;

/* =====================================================================
   DEMO ONLY — everything lives in this browser (localStorage).
   Nothing is sent to a server and no real payment is taken.
   In the real system this file is replaced by a database + API.
===================================================================== */

const KEY = "pathwaysPortalDemo.v7";

export const PASS_MARK = 60;
export const SESSIONS = EXAM_SESSIONS;
// British Council exam entry fee per subject (sample figures — BC publishes the real fees each series)
export const BC_FEE = { igcse: 32000, alevel: 38000 };
export const SERVICE_FEE = 0; // extra handling on the BC fee (none — registration fee is paid at sign-up)
export let REG_FEE = 2000; // Pathways registration fee, paid at sign-up
export const MAX_ATTEMPTS = 3; // mock test attempts per subject
export const ADMISSIONS_WHATSAPP = "+92 327 7771048"; // shown after a "become regular" request is approved (live: set by admin)
export const waLink = (num) => `https://wa.me/${String(num || "").replace(/\D/g, "").replace(/^0/, "92")}`;
export const levelOf = (q = "") => (/IAL|AS|A2|A Level/i.test(q) ? "A Levels" : "IGCSE");
export const levelKey = (q) => (levelOf(q) === "A Levels" ? "alevel" : "igcse");
export const feeFor = (c) => {
  const per = BC_FEE[levelKey(c.qualification)];
  const rows = c.subjects.map((s) => ({ subject: s, amount: per }));
  return { rows, per, service: SERVICE_FEE, total: per * c.subjects.length + SERVICE_FEE };
};
export const PROGRAMS = {
  full: { label: "Mock Test + British Council Exam Registration", short: "Mock Test → BC Exam" },
  mock: { label: "Mock Test only", short: "Mock Test only" },
};

/* Subjects with the paper list used on the official-style datesheet.
   Paper codes follow Pearson Edexcel; the British Council timetable is the final word. */
export const SUBJECTS = {
  IGCSE: {
    "English Language": ["4EA1", ["01", "02"]], Mathematics: ["4MA1", ["1H", "2H"]], Physics: ["4PH1", ["1P", "2P"]],
    Chemistry: ["4CH1", ["1C", "2C"]], Biology: ["4BI1", ["1B", "2B"]], "Computer Science": ["4CP0", ["01", "02"]],
    Business: ["4BS1", ["01", "02"]], Economics: ["4EC1", ["01", "02"]], Accounting: ["4AC1", ["01", "02"]],
    Islamiyat: ["4IS1", ["01", "02"]], History: ["4HI1", ["01", "02"]], Geography: ["4GE1", ["01", "02"]],
    "Global Citizenship": ["4GC1", ["01"]], Urdu: ["—", ["01"]], "Pakistan Studies": ["—", ["01", "02"]],
  },
  IAL: {
    "English Language": ["WEN", ["01", "02"]], Mathematics: ["WMA1", ["1", "2"]], Physics: ["WPH1", ["1", "2"]],
    Chemistry: ["WCH1", ["1", "2"]], Biology: ["WBI1", ["1", "2"]], "Information Technology": ["WIT1", ["1", "2"]],
    Business: ["WBS1", ["1", "2"]], Economics: ["WEC1", ["1", "2"]], Accounting: ["WAC1", ["1", "2"]], Psychology: ["WPS", ["01", "02"]],
  },
};
export const qualKey = (q) => (levelOf(q) === "A Levels" ? "IAL" : "IGCSE");
export const subjectCode = (q, s) => (SUBJECTS[qualKey(q)][s] || ["—"])[0];


export const STAFF = [
  { username: "admissions", password: "demo123", role: "admissions", name: "Admissions Team" },
  { username: "exams", password: "demo123", role: "exams", name: "Exams Team" },
  { username: "admin", password: "demo123", role: "admin", name: "School Admin" },
];

export const STAGES = [
  { key: "submitted", label: "Form submitted" },
  { key: "mock", label: "Mock tests" },
  { key: "result", label: "Result 60%+" },
  { key: "paid", label: "Approved & fee paid" },
  { key: "soe", label: "SOE & exams" },
];

export const PACKAGES = [
  { id: "p1", papers: 1, price: 500, label: "Single paper" },
  { id: "p5", papers: 5, price: 1000, label: "Starter pack", tag: "Popular" },
  { id: "p8", papers: 8, price: 2000, label: "Full prep pack" },
];

/* Cities where candidates can sit their exams (chosen on the "Choose your exams" step) */
export const EXAM_LOCATIONS = ["Karachi", "Lahore", "Islamabad", "Gujranwala", "Sialkot"];

export const CENTRES = [
  { name: "Pathways International School — Exam Centre", venue: "HH-45 Commercial, Near WAFI, Citi Housing Phase 1, Gujranwala" },
  { name: "Pathways — Niazi Square Centre", venue: "3rd Floor, Niazi Square, GT Road, Citi Housing, Gujranwala" },
];

const SUBJECT_PAPERS = (s) => [`${s} — Paper 1`, `${s} — Paper 2`];
export function pastPapersFor(subjects) {
  const years = [`May/June ${CURRENT_YEAR - 1}`, `Oct/Nov ${CURRENT_YEAR - 2}`, `May/June ${CURRENT_YEAR - 2}`];
  const list = [];
  subjects.forEach((s) => years.forEach((y) => SUBJECT_PAPERS(s).forEach((p) => list.push({ id: `${p}|${y}`, subject: s, title: `${p}`, series: y }))));
  return list;
}

const now = () => new Date().toISOString();
const addDays = (iso, d) => { const t = new Date(iso + "T00:00:00Z"); t.setUTCDate(t.getUTCDate() + d); return t.toISOString().slice(0, 10); };
const isWeekend = (iso) => [0, 6].includes(new Date(iso + "T00:00:00Z").getUTCDay());
const uid = () => Math.random().toString(36).slice(2, 10);

/* Official-style timetable rows for the candidate's subjects (as received from the board).
   Dates are worked out over the full subject list, so a subject always gets the same dates. */
export function boardTimetable(c) {
  const key = qualKey(c.qualification);
  let d = sessionStart(c.session) || sessionStart(EXAM_SESSIONS[0]);
  const all = Object.keys(SUBJECTS[key]);
  const out = [];
  [...all, ...c.subjects.filter((s) => !all.includes(s))].forEach((s) => {
    const [code, papers] = SUBJECTS[key][s] || ["—", ["01"]];
    papers.forEach((p, k) => {
      while (isWeekend(d)) d = addDays(d, 1);
      const am = out.length % 2 === 0;
      out.push({
        subject: s, code: code === "—" ? "—" : key === "IAL" ? `${code}${p}` : `${code} ${p}`,
        paper: `Paper ${k + 1}`, date: d, session: am ? "Morning" : "Afternoon", time: am ? "09:00" : "13:30",
      });
      d = addDays(d, am ? 1 : 2);
    });
  });
  return out.filter((r) => c.subjects.includes(r.subject));
}

export function average(marks = {}) {
  const v = Object.values(marks).map(Number).filter((n) => !isNaN(n));
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
}
export const passed = (c) => c.mock?.published && average(c.mock.marks) >= PASS_MARK;
export const approved = (c) => c.approved && c.paid;
export const requested = (c) => !!c.regRequest && !c.approved;

function blank(extra) {
  return {
    program: "full",
    mock: { attempts: {}, marks: {}, published: false },
    regRequest: null, paid: false, approved: false, soe: null, examResult: null, examScripts: [], regular: null,
    docs: [], papers: { quota: 0, used: [], purchases: [] },
    ...extra,
  };
}

function seed() {
  const base = (n, first, last, subjects, extra) => ({
    id: `PC-2026-${String(n).padStart(4, "0")}`,
    username: `${first.toLowerCase()}.${n}`, password: "demo123",
    first, last, email: `${first.toLowerCase()}@example.com`, phone: "+92 3XX XXXXXXX",
    gender: n === 2 ? "M" : "F", dob: "2009-05-14", firstTime: "Yes",
    address: "House 12, Street 4, Citi Housing", city: "Gujranwala", zip: "52250", landmark: "Near Citi Housing main gate", country: "Pakistan",
    idType: "National Id", idNumber: "34101-XXXXXXX-X", idExpiry: "2030-01-01", candidateNo: "", uci: "",
    optionList: subjects.map((s, i) => `${i + 1}. ${s}`).join(", "), already: "",
    guardian: { first: "Sample", last: "Guardian", relation: "Father", phone: "+92 3XX XXXXXXX" },
    collectorType: "Guardian", collector: { first: "Sample", last: "Guardian", relation: "Father", phone: "+92 3XX XXXXXXX" },
    qualification: "IGCSE", subjects, session: "May / June 2027",
    intro: "Sample candidate created for the demo.", createdAt: now(), sample: true, regFee: { amount: REG_FEE, method: "Easypaisa", at: now() },
    ...blank(),
    docs: [{ id: uid(), name: "Candidate ID — front & back.pdf", cat: "Candidate ID", by: "student", at: now() }, { id: uid(), name: "Guardian CNIC.pdf", cat: "Guardian CNIC", by: "student", at: now() }],
    ...extra,
  });
  const subsA = ["Mathematics", "Physics", "Chemistry"];
  const att = (pct, mins) => ({ pct, best: pct, score: Math.round((pct / 100) * 8), total: 8, at: now(), mins, tries: 1, history: [{ pct, score: Math.round((pct / 100) * 8), total: 8, at: now() }] });
  const a = { qualification: "IGCSE", subjects: subsA, session: "October / November 2026" };
  const tt = boardTimetable(a).map((r, i) => ({ ...r, att: i < 3 ? "appeared" : i === 3 ? "absent" : undefined }));
  return {
    seq: 4,
    notifications: [],
    candidates: [
      base(1, "Ayesha", "Khan", subsA, {
        session: "October / November 2026", candidateNo: "PK073-0412",
        mock: { attempts: { Mathematics: att(88, 7), Physics: att(75, 9), Chemistry: att(88, 8) }, marks: { Mathematics: 88, Physics: 75, Chemistry: 88 }, published: true },
        regRequest: { at: now() }, paid: true, approved: true, approvedAt: now(), payMethod: "JazzCash", paidAt: now(), feePaid: 32000 * 3 + 3000,
        soe: { candidateNo: "PK073-0412", centre: CENTRES[0].name, venue: CENTRES[0].venue, timetable: tt, issuedAt: now(), file: "SOE_PK073-0412_ON2026.pdf" },
        examScripts: [
          { id: "es1", subject: "Mathematics", paper: "Paper 1", code: tt[0].code, file: "4MA1_1H_marked_script_PK073-0412.pdf", marks: "68 / 80", at: now() },
          { id: "es2", subject: "Mathematics", paper: "Paper 2", code: tt[1].code, file: "4MA1_2H_marked_script_PK073-0412.pdf", marks: "71 / 80", at: now() },
        ],
        papers: { quota: 5, used: [], purchases: [{ pkg: "p5", amount: 1000, method: "Easypaisa", at: now() }] },
      }),
      base(2, "Hamza", "Ali", ["English Language", "Biology"], { mock: { attempts: { "English Language": att(75, 8) }, marks: { "English Language": 75 }, published: false } }),
      base(4, "Zain", "Malik", ["Mathematics", "Physics"], {
        session: "January / February 2027",
        mock: { attempts: { Mathematics: att(88, 8), Physics: att(75, 9) }, marks: { Mathematics: 88, Physics: 75 }, published: true },
        regRequest: { at: now() }, approved: true, approvedAt: now(),
      }),
      base(3, "Sara", "Ahmed", ["Business", "Economics", "Accounting"], { qualification: "IAL", program: "mock", session: "January / February 2027" }),
    ],
  };
}

// Demo: the "ready to pay" sample (Zain) goes back to fee-due on every page load,
// so the payment step can always be shown again after a refresh.
const RESET_ON_LOAD = ["PC-2026-0004"];
export const defaultSettings = () => ({ reg: 2000, bcIgcse: 32000, bcAlevel: 38000, pk: { p1: 500, p5: 1000, p8: 2000 } });
export function applySettings(st) {
  if (!st) return;
  REG_FEE = Number(st.reg) || 0;
  BC_FEE.igcse = Number(st.bcIgcse) || 0; BC_FEE.alevel = Number(st.bcAlevel) || 0;
  PACKAGES.forEach((p) => { if (st.pk?.[p.id] != null) p.price = Number(st.pk[p.id]) || 0; });
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const db = JSON.parse(raw); const fresh = seed();
      db.candidates = db.candidates.map((c) => (RESET_ON_LOAD.includes(c.id) && c.sample ? fresh.candidates.find((x) => x.id === c.id) || c : c));
      if (!db.settings) db.settings = defaultSettings();
      applySettings(db.settings);
      return db;
    }
  } catch (e) { /* storage blocked */ }
  const fresh = seed(); fresh.settings = defaultSettings(); applySettings(fresh.settings);
  return fresh;
}

export const Ctx = createContext(null);

export function DemoProvider(props) {
  return API ? <ApiProvider {...props} /> : <LocalProvider {...props} />;
}

function LocalProvider({ children }) {
  const [db, setDb] = useState(load);
  const [session, setSession] = useState(() => { try { return JSON.parse(sessionStorage.getItem(KEY + ".s")) || null; } catch (e) { return null; } });
  const [storageFull, setStorageFull] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(db)); setStorageFull(false); }
    catch (e) { setStorageFull(true); }
  }, [db]);
  useEffect(() => { try { sessionStorage.setItem(KEY + ".s", JSON.stringify(session)); } catch (e) {} }, [session]);

  const api = useMemo(() => {
    const find = (id) => db.candidates.find((x) => x.id === id);
    const notes = (roles, text, cid) => roles.map((role) => ({ id: uid(), role, text, cid, at: now(), read: false }));
    const update = (id, fn, roles, text) =>
      setDb((d) => ({
        ...d,
        candidates: d.candidates.map((c) => (c.id === id ? { ...c, ...fn(c) } : c)),
        notifications: roles ? [...notes(roles, text, id), ...d.notifications] : d.notifications,
      }));
    const who = (c) => `${c.first} ${c.last} (${c.id})`;
    // entry = the latest attempt; history keeps every attempt; best score counts
    const withMock = (c, subject, entry, replaceLast) => {
      const prev = c.mock.attempts?.[subject];
      const old = prev?.history || [];
      const row = { pct: entry.pct, score: entry.score, total: entry.total, at: entry.at || now() };
      const history = replaceLast && old.length ? [...old.slice(0, -1), row] : [...old, row];
      const best = Math.max(...history.map((h) => h.pct));
      const attempts = { ...(c.mock.attempts || {}), [subject]: { ...entry, history, best } };
      const marks = Object.fromEntries(Object.entries(attempts).map(([k, v]) => [k, v.best ?? v.pct]));
      const complete = c.subjects.every((s) => attempts[s]);
      return { attempts, marks, published: complete };
    };
    const resultNote = (c, mock, id) => {
      const avg = average(mock.marks);
      return notes(["admissions", "exams", "admin", `student:${id}`], `Mock result card ready for ${who(c)}: average ${avg}% — ${avg >= PASS_MARK ? "PASSED (60%+). British Council exam registration is open." : "below 60%. Re-sit the subjects below 60%."}`, id);
    };

    return {
      db, session, storageFull,
      register(form) {
        const n = db.seq + 1;
        const id = `PC-2026-${String(n).padStart(4, "0")}`;
        const username = `${form.first.trim().toLowerCase().replace(/[^a-z]/g, "") || "student"}.${n}`;
        const password = Math.random().toString(36).slice(2, 6) + "-" + Math.floor(1000 + Math.random() * 9000);
        const docs = (form.files || []).map((d) => ({ id: uid(), by: "student", at: now(), ...d }));
        const cand = { ...form, ...blank(), docs, id, username, password, createdAt: now(), regFee: { amount: REG_FEE, method: form.regMethod || "Card", at: now() } };
        delete cand.agree; delete cand.agreePolicy; delete cand.files;
        setDb((d) => ({
          ...d, seq: n, candidates: [cand, ...d.candidates],
          notifications: [...notes(["admissions", "exams", "admin"], `New registration form: ${form.first} ${form.last} (${id}) · ${form.qualification} · ${form.session} · ${form.subjects.length} subject(s). Registration fee PKR ${REG_FEE.toLocaleString("en-US")} paid via ${form.regMethod || "Card"}. Mock tests are now open.`, id),
            ...notes([`student:${id}`], "Welcome to Pathways! Your mock tests are ready (3 attempts per subject) — open Mock tests to start.", id), ...d.notifications],
        }));
        return cand;
      },
      login(username, password) {
        const u = username.trim().toLowerCase();
        const staff = STAFF.find((s) => s.username === u && s.password === password);
        if (staff) { const s = { type: "staff", role: staff.role, name: staff.name }; setSession(s); return s; }
        const c = db.candidates.find((x) => x.username === u && x.password === password);
        if (c) { const s = { type: "student", id: c.id, name: `${c.first} ${c.last}` }; setSession(s); return s; }
        return null;
      },
      enterAs(c) { setSession({ type: "student", id: c.id, name: `${c.first} ${c.last}` }); },
      logout() { setSession(null); },

      /* Quick MCQ mock tests */
      submitMock(id, subject, answers, mins) {
        const c = find(id);
        const qs = questionsFor(c.qualification, subject);
        const score = qs.reduce((n, q, i) => n + (answers[i] === q[2] ? 1 : 0), 0);
        const pct = Math.round((score / qs.length) * 100);
        const prev = c.mock.attempts?.[subject];
        const mock = withMock(c, subject, { pct, score, total: qs.length, at: now(), mins, answers, tries: (prev?.tries || 0) + 1 });
        const msgs = [...notes(["exams", "admin"], `${who(c)} submitted the ${subject} mock test — auto-checked: ${score}/${qs.length} (${pct}%).`, id)];
        if (mock.published) msgs.unshift(...resultNote(c, mock, id));
        setDb((d) => ({ ...d, candidates: d.candidates.map((x) => (x.id === id ? { ...x, mock } : x)), notifications: [...msgs, ...d.notifications] }));
        return { score, total: qs.length, pct, complete: mock.published, avg: average(mock.marks) };
      },
      /* Full mock paper with answer sheet */
      submitPaper(id, subject, answers, mins) {
        const c = find(id); const paper = paperFor(c.qualification, subject) || CS_PAPER;
        const r = markPaper(paper, answers);
        const pct = Math.round((r.score / r.total) * 100);
        const prev = c.mock.attempts?.[subject];
        const mock = withMock(c, subject, { paper: paper.id, pct, score: r.score, total: r.total, partMarks: r.marks, review: r.review, reviewed: false, at: now(), mins, answers, tries: (prev?.tries || 0) + 1 });
        const msgs = [...notes(["exams", "admin"], `${who(c)} submitted ${subject} ${paper.mock} — auto-marked ${r.score}/${r.total} (${pct}%). ${r.review} written answer(s) to review.`, id)];
        if (mock.published) msgs.unshift(...resultNote(c, mock, id));
        setDb((d) => ({ ...d, candidates: d.candidates.map((x) => (x.id === id ? { ...x, mock } : x)), notifications: [...msgs, ...d.notifications] }));
        return { score: r.score, total: r.total, pct, review: r.review, marks: r.marks, complete: mock.published, avg: average(mock.marks) };
      },
      reviewPaper(id, subject, partMarks) {
        const c = find(id); const a = c.mock.attempts[subject];
        const score = Object.values(partMarks).reduce((x, y) => x + Number(y || 0), 0);
        const pct = Math.round((score / a.total) * 100);
        const wasRequested = a.reviewRequest?.status === "requested";
        update(id, (x) => ({ mock: withMock(x, subject, { ...a, partMarks, score, pct, reviewed: true, reviewRequest: a.reviewRequest ? { ...a.reviewRequest, status: "done", doneAt: now(), from: a.score, to: score } : undefined }, true) }), [`student:${id}`, "admin"],
          wasRequested ? `Script review completed for ${subject}: ${a.score}/${a.total} → ${score}/${a.total} (${pct}%).` : `${subject} mock reviewed by the Exams team: ${score}/${a.total} (${pct}%).`);
      },
      resolveReview(id, subject) {
        const a = find(id).mock.attempts[subject];
        update(id, (x) => ({ mock: { ...x.mock, attempts: { ...x.mock.attempts, [subject]: { ...a, reviewed: true, reviewRequest: { ...a.reviewRequest, status: "done", doneAt: now(), from: a.score, to: a.score } } } } }),
          [`student:${id}`, "admin"], `Script review completed for ${subject}: re-checked by the Exams team — mark confirmed at ${a.score}/${a.total}.`);
      },
      requestScriptReview(id, subject, note) {
        const c = find(id);
        update(id, (x) => ({ mock: { ...x.mock, attempts: { ...x.mock.attempts, [subject]: { ...x.mock.attempts[subject], reviewRequest: { note, at: now(), status: "requested" } } } } }),
          ["exams", "admin", `student:${id}`], `Script review requested by ${who(c)} for ${subject}: "${note || "Please re-check my paper"}".`);
      },
      updateExams(id, e) {
        const c = find(id);
        const optionList = e.subjects.map((x, i) => `${i + 1}. ${subjectCode(c.qualification, x) !== "—" ? subjectCode(c.qualification, x) + " " : ""}${x}`).join(", ");
        update(id, () => ({ session: e.session, location: e.location, subjects: e.subjects, optionList }), ["admissions", "exams", "admin"],
          `${who(c)} updated their exam basket: ${e.subjects.join(", ")} · ${e.session} · ${e.location}.`);
      },
      setProgram(id, program) {
        const c = find(id);
        update(id, () => ({ program }), ["admissions", "admin"], `${who(c)} switched programme to: ${PROGRAMS[program].label}.`);
      },
      requestRegistration(id) {
        const c = find(id);
        update(id, () => ({ regRequest: { at: now() }, regNote: "" }), ["admin", "admissions", `student:${id}`],
          `${who(c)} passed the mock test and asked to register for the British Council exam (${c.session}, ${c.subjects.length} subject(s)). Admin approval needed. Email + WhatsApp alert sent to Admin and Admissions.`);
      },
      approveRegistration(id) {
        const c = find(id);
        update(id, () => ({ approved: true, approvedAt: now() }), ["admissions", `student:${id}`],
          `Registration approved for ${who(c)}. The British Council fee (PKR ${feeFor(c).total.toLocaleString("en-US")}) can now be paid in the portal.`);
      },
      rejectRegistration(id, reason) {
        const c = find(id);
        update(id, () => ({ regRequest: null, approved: false, regNote: reason }), ["admissions", `student:${id}`], `Registration for ${who(c)} was not approved: ${reason}.`);
      },
      pay(id, method, slip) {
        const c = find(id);
        const fee = feeFor(c).total;
        update(id, (x) => ({ paid: true, payMethod: method, paidAt: now(), feePaid: fee, docs: slip ? [{ id: uid(), by: "student", at: now(), cat: "Fee slip", ...slip }, ...x.docs] : x.docs }),
          ["admin", "admissions", "exams", `student:${id}`],
          `British Council fee PKR ${fee.toLocaleString("en-US")} paid by ${who(c)} via ${method}. Exams team: register the entry and upload the SOE when it arrives.`);
      },
      issueSOE(id, centreIdx, candidateNo, file) {
        const c = find(id); const ct = CENTRES[centreIdx];
        update(id, () => ({ candidateNo, soe: { candidateNo, centre: ct.name, venue: ct.venue, timetable: boardTimetable(c), issuedAt: now(), file: file?.name || "SOE.pdf", data: file?.data } }),
          ["admissions", "admin", `student:${id}`], `Statement of Entry received from the British Council for ${who(c)} — ${ct.name}, candidate no. ${candidateNo}.`);
      },
      markAttendance(id, idx, att) {
        const r = find(id).soe.timetable[idx];
        update(id, (x) => ({ soe: { ...x.soe, timetable: x.soe.timetable.map((t, i) => (i === idx ? { ...t, att } : t)) } }), [`student:${id}`],
          `Attendance updated: ${r.subject} ${r.paper} — ${att || "cleared"}.`);
      },
      publishExamResults(id, grades, file) {
        const c = find(id);
        update(id, () => ({ examResult: { grades, file: file?.name || "Statement_of_Results.pdf", data: file?.data, at: now() } }), ["admin", "admissions", `student:${id}`],
          `British Council exam results uploaded for ${who(c)}.`);
      },
      uploadExamScript(id, r, file, marks) {
        update(id, (x) => ({ examScripts: [...(x.examScripts || []), { id: uid(), subject: r.subject, paper: r.paper, code: r.code, file: file?.name || `${r.code}_marked_script.pdf`, data: file?.data, marks, at: now() }] }),
          [`student:${id}`, "admin"], `Your marked exam script for ${r.subject} ${r.paper} (${r.code}) is now in Script review.`);
      },
      bulkUpload(items) {
        items.forEach((it) => {
          const c = find(it.id);
          if (it.kind === "soe") this.issueSOE(it.id, 0, c.soe?.candidateNo || c.candidateNo || "To be confirmed", it.file);
          else if (it.kind === "result") this.publishExamResults(it.id, c.examResult?.grades || {}, it.file);
          else this.uploadExamScript(it.id, it.row, it.file, "");
        });
        return items.map(() => ({ ok: true }));
      },
      requestBcReview(id, scriptId, note) {
        const c = find(id); const sc = c.examScripts.find((x) => x.id === scriptId);
        update(id, (x) => ({ examScripts: x.examScripts.map((y) => (y.id === scriptId ? { ...y, bcReview: { note, at: now(), status: "requested" } } : y)) }),
          ["exams", "admin", `student:${id}`], `${who(c)} asked for a British Council review of marking: ${sc.subject} ${sc.paper} — "${note || "—"}".`);
      },
      requestRegular(id, note) {
        const c = find(id);
        update(id, () => ({ regular: { note, at: now(), status: "requested" } }), ["admissions", "admin"], `${who(c)} wants to join Pathways as a regular student: ${note || "—"}`);
      },
      approveRegular(id, note) {
        const c = find(id);
        update(id, (x) => ({ regular: { ...x.regular, status: "approved", decidedAt: now(), reply: note || "" } }), [`student:${id}`, "admin"],
          `Your request to become a regular Pathways student is approved! Kindly contact Admissions on WhatsApp ${ADMISSIONS_WHATSAPP}.${note ? ` ${note}` : ""} (${who(c)})`);
      },
      declineRegular(id, reason) {
        update(id, (x) => ({ regular: { ...x.regular, status: "declined", decidedAt: now(), reply: reason } }), [`student:${id}`],
          `Your request to become a regular student could not be accepted right now: ${reason}`);
      },
      addDoc(id, doc, by) {
        const c = find(id);
        update(id, (x) => ({ docs: [{ id: uid(), by, at: now(), ...doc }, ...x.docs] }),
          by === "student" ? ["admissions", "admin"] : [`student:${id}`], by === "student" ? `${who(c)} uploaded a document: ${doc.name}` : `A new document was added to your file: ${doc.name}`);
      },
      removeDoc(id, docId) { update(id, (x) => ({ docs: x.docs.filter((d) => d.id !== docId) })); },
      buyPackage(id, pkgId, method) {
        const c = find(id); const pk = PACKAGES.find((p) => p.id === pkgId);
        update(id, (x) => ({ papers: { ...x.papers, quota: x.papers.quota + pk.papers, purchases: [...x.papers.purchases, { pkg: pkgId, amount: pk.price, method, at: now() }] } }),
          ["admin"], `${who(c)} bought the ${pk.papers}-paper package (PKR ${pk.price}) via ${method}.`);
      },
      usePaper(id, paperId) { update(id, (x) => (x.papers.used.includes(paperId) ? {} : { papers: { ...x.papers, used: [...x.papers.used, paperId] } })); },
      markRead(role) { setDb((d) => ({ ...d, notifications: d.notifications.map((n) => (n.role === role ? { ...n, read: true } : n)) })); },
      saveSettings(st) { applySettings(st); setDb((d) => ({ ...d, settings: st, notifications: [...notes(["admin", "admissions"], `Fees & prices updated by admin: registration PKR ${Number(st.reg).toLocaleString("en-US")}, BC IGCSE PKR ${Number(st.bcIgcse).toLocaleString("en-US")}/subject, BC A Level PKR ${Number(st.bcAlevel).toLocaleString("en-US")}/subject.`), ...d.notifications] })); },
      reset() { const f = seed(); f.settings = defaultSettings(); applySettings(f.settings); setDb(f); setSession(null); },
    };
  }, [db, session, storageFull]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useDemo = () => useContext(Ctx);

export function stageIndex(c) {
  if (c.soe) return 5;
  if (approved(c)) return 4;
  if (passed(c)) return 3;
  if (Object.keys(c.mock?.attempts || {}).length) return 2;
  return 1;
}

/* ---------- printable documents (Save as PDF from the print dialog) ---------- */
export function printDoc(title, body) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#17365D;margin:0;padding:36px}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid #C9A44C;padding-bottom:14px;margin-bottom:22px}
.hd h1{margin:0;font-size:22px}.hd small{color:#8c6c2a;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;font-size:11px}
.demo{background:#fbf7ec;border:1px dashed #C9A44C;color:#6b5222;font-size:11px;padding:6px 10px;border-radius:6px;margin-bottom:16px}
table{width:100%;border-collapse:collapse;margin-top:12px;font-size:13px}th,td{border:1px solid #dce5f1;padding:9px 10px;text-align:left}th{background:#17365D;color:#fff}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;font-size:13px}.grid b{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#8c6c2a}
.big{font-size:42px;font-weight:bold;margin:6px 0}.ok{color:#047857}.no{color:#b91c1c}.ft{margin-top:28px;font-size:11px;color:#5479ab}
img.pg{width:100%;page-break-after:always;border:1px solid #eee;margin-bottom:12px}
</style></head><body>
<div class="hd"><div><small>Pathways International School</small><h1>${title}</h1></div><div style="text-align:right;font-size:11px">Pearson Edexcel Approved Centre<br>Centre No. 97911</div></div>
${API ? "" : '<div class="demo">DEMO DOCUMENT — sample layout for review only. Not an official document.</div>'}
${body}
<div class="ft">Generated ${new Date().toLocaleString("en-GB")} · Pathways Portal</div>
</body></html>`;
  const f = document.createElement("iframe");
  f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  document.body.appendChild(f);
  f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(() => f.remove(), 2000); }, 400);
}

export function DemoBanner({ dark = false }) {
  if (API) return null;
  return (
    <div className={`flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-bold ${dark ? "bg-gold-500 text-navy-900" : "bg-gold-100 text-gold-900"}`}>
      <span className="rounded bg-navy-800 px-1.5 py-0.5 text-[10px] tracking-widest text-gold-300">DEMO</span>
      Preview only — no real data is saved to a server and no real payment is taken.
    </div>
  );
}