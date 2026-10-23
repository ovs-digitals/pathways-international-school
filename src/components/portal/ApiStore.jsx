import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { API, CENTRES, Ctx, PACKAGES, applySettings, defaultSettings } from "./DemoStore";

/* =====================================================================
   LIVE MODE — the same portal screens, backed by the Node.js API.
   Used when the site is built with __PORTAL_API__ (served by the server).
   Every method has the same name as in the demo store, but talks to the
   server and then reloads the data. Marks, fees and rules are decided by
   the server, never by the browser.
===================================================================== */

const UPLOAD_FIELD = {
  "Candidate ID": "candidateId", "Guardian CNIC": "guardianCnic", "Collector CNIC": "collectorCnic",
  "Previous SOE": "previousSoe", "Access arrangement": "accessArrangement",
};

async function req(path, { method = "GET", body, form } = {}) {
  const res = await fetch(API + path, {
    method,
    credentials: "include",
    headers: body !== undefined ? { "content-type": "application/json" } : {},
    body: form || (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const first = json?.fields ? Object.values(json.fields)[0] : "";
    const e = new Error([json?.error || `Request failed (${res.status})`, first].filter(Boolean).join(" — "));
    e.status = res.status; e.fields = json?.fields;
    throw e;
  }
  return json;
}

const mapPrices = (p) => ({
  reg: p.registrationFee, bcIgcse: p.bcFeePerSubject.IGCSE, bcAlevel: p.bcFeePerSubject.IAL,
  pk: Object.fromEntries(p.pastPaperPackages.map((x) => [x.id, x.price])),
});

function applyServerSettings(s) {
  if (!s?.prices) return;
  const pk = s.prices.pastPaperPackages.map((x) => ({ ...x, tag: x.id === "p5" ? "Popular" : undefined }));
  PACKAGES.splice(0, PACKAGES.length, ...pk);
  if (s.centres?.length) CENTRES.splice(0, CENTRES.length, ...s.centres.map((c) => ({ id: c.id, name: c.name, venue: c.venue })));
  applySettings(mapPrices(s.prices));
}

export function ApiProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);           // { id, email, name, role }
  const [cid, setCid] = useState(null);             // student's candidate id
  const [data, setData] = useState({ candidates: [], notifications: [], settings: defaultSettings(), slips: [], bank: null, testPayments: false });
  const [pub, setPub] = useState(null);             // public settings (sign-up form, Google id)
  const [toast, setToast] = useState(null);
  const [, bump] = useState(0);                     // re-render after prices change
  const userRef = useRef(null); userRef.current = user;

  const say = useCallback((text, kind = "error") => { setToast({ text, kind, at: Date.now() }); }, []);
  useEffect(() => { if (!toast) return undefined; const t = setTimeout(() => setToast(null), 6000); return () => clearTimeout(t); }, [toast]);

  const load = useCallback(async (u = userRef.current) => {
    if (!u) return;
    if (u.role === "student") {
      const s = await req("/me/state");
      applyServerSettings(s.settings);
      setData({ candidates: s.candidate ? [s.candidate] : [], notifications: s.notifications, settings: mapPrices(s.settings.prices), slips: [], bank: s.settings.bank, contact: s.settings.contact, testPayments: s.testPayments });
      setCid(s.candidate?.id ?? null);
    } else {
      const s = await req("/staff/state");
      applyServerSettings(s.settings);
      setData({ candidates: s.candidates, notifications: s.notifications, settings: mapPrices(s.settings.prices), slips: s.slips, admissionRequests: s.admissionRequests || [], bank: s.settings.bank ?? null, contact: s.settings.contact, testPayments: false });
    }
    bump((n) => n + 1);
  }, []);

  const start = useCallback(async (u) => { setUser(u); userRef.current = u; await load(u); }, [load]);

  // first load: public prices + who is logged in (session cookie)
  useEffect(() => {
    (async () => {
      try { const p = await req("/public/settings"); setPub(p); applyServerSettings(p); } catch (e) { /* server offline */ }
      try { const me = await req("/auth/session"); if (me.user) await start(me.user); } catch (e) { /* server offline */ }
      setReady(true);
    })();
  }, [start]);

  // keep notifications fresh while the portal is open
  useEffect(() => {
    if (!user) return undefined;
    const t = setInterval(() => { if (!document.hidden) load().catch(() => {}); }, 30000);
    return () => clearInterval(t);
  }, [user, load]);

  const api = useMemo(() => {
    const find = (id) => data.candidates.find((c) => c.id === id);
    const isStaff = () => userRef.current && userRef.current.role !== "student";
    /** run an action, reload, show errors; returns the result or undefined on error */
    const act = async (fn, okText) => {
      try { const r = await fn(); await load(); if (okText) say(okText, "ok"); return r; }
      catch (e) { say(e.message); if (e.status === 401) { setUser(null); } return undefined; }
    };
    /** same, but the caller handles the error (payment modal, login, sign-up, mock runner) */
    const must = async (fn) => { const r = await fn(); await load().catch(() => {}); return r; };

    // pay one bill: Card / Easypaisa / JazzCash (test mode for now) or bank slip
    const payBill = async (payment, method, slip) => {
      if (payment.stage === "awaiting_verification") return { pending: true, message: "Your slip is already waiting for verification." };
      const s = await req(`/me/payments/${payment.id}/start`, { method: "POST", body: { method } });
      if (s.next === "test_pay") { await req(`/me/payments/${payment.id}/test-pay`, { method: "POST", body: { method } }); return { paid: true }; }
      if (s.next === "upload_slip") {
        if (!slip?.file) throw new Error("Please upload the paid fee slip.");
        const fd = new FormData(); fd.append("slip", slip.file, slip.name); if (slip.ref) fd.append("reference", slip.ref);
        const r = await req(`/me/payments/${payment.id}/slip`, { method: "POST", form: fd });
        return { pending: true, message: r.message };
      }
      throw new Error(s.message || "This payment method is not available yet.");
    };

    return {
      live: true, ready, pub, toast, say,
      db: { ...data, seq: 0 },
      session: user && (user.role === "student"
        ? (cid ? { type: "student", id: cid, name: user.name } : null)
        : { type: "staff", role: user.role, name: user.name }),
      storageFull: false,

      /* ---------- account ---------- */
      async login(email, password) {
        const r = await req("/auth/login", { method: "POST", body: { email: email.trim(), password } });
        await start(r.user);
        return r.user.role === "student" ? { type: "student", id: r.candidateId } : { type: "staff", role: r.user.role };
      },
      async loginGoogle(credential) {
        const r = await req("/auth/google", { method: "POST", body: { credential } });
        if (r.needsSignup) return r;
        await start(r.user);
        return r.user.role === "student" ? { type: "student", id: r.candidateId } : { type: "staff", role: r.user.role };
      },
      async logout() { try { await req("/auth/logout", { method: "POST" }); } catch (e) { /* ignore */ } setUser(null); setCid(null); setData((d) => ({ ...d, candidates: [], notifications: [] })); },
      enterAs() {},
      reset() {},

      /** sign-up form → account + candidate → pay the registration fee */
      async register(form, method, slip) {
        const fd = new FormData();
        const { files = [], firstTimeOther, regMethod, ...rest } = form;
        fd.append("data", JSON.stringify({ ...rest, paymentMethod: method || "Card" }));
        for (const d of files) if (d.file) fd.append(UPLOAD_FIELD[d.cat], d.file, d.name);
        const r = await req("/signup", { method: "POST", form: fd });
        await start(r.user);
        let pay = {};
        try { pay = await payBill(r.payment, method, slip); }
        catch (e) { pay = { error: e.message }; }
        await load().catch(() => {});
        return { id: r.candidateId, first: form.first, email: r.user.email, ...pay };
      },

      /* ---------- payments ---------- */
      async payRegistration(method, slip) {
        return must(async () => payBill((await req("/me/payments/registration", { method: "POST" })).payment, method, slip));
      },
      async pay(id, method, slip) {
        return must(async () => payBill((await req("/me/payments/bc-fee", { method: "POST" })).payment, method, slip));
      },
      async buyPackage(id, pkg, method, slip) {
        return must(async () => payBill((await req("/me/payments/package", { method: "POST", body: { pkg } })).payment, method, slip));
      },
      verifySlip(paymentId, approve, note) {
        return act(() => req(`/staff/payments/${paymentId}/verify`, { method: "POST", body: { approve, note } }), approve ? "Payment marked as received." : "Slip rejected — the student has been told.");
      },

      /* ---------- mock tests ---------- */
      async submitMock(id, subject, answers, mins) {
        return must(() => req("/me/mock/attempts", { method: "POST", body: { subject, answers: answers.map((a) => (a === null ? null : a)), mins } }));
      },
      async submitPaper(id, subject, answers, mins) {
        return must(() => req("/me/mock/attempts", { method: "POST", body: { subject, answers, mins } }));
      },
      requestScriptReview(id, subject, note) { return act(() => req("/me/mock/review-request", { method: "POST", body: { subject, note } }), "Review requested — the Exams team will re-check your script."); },
      reviewPaper(id, subject, partMarks) { return act(() => req(`/staff/candidates/${id}/mock/review`, { method: "POST", body: { subject, partMarks } }), "Reviewed marks saved."); },
      resolveReview(id, subject) { return act(() => req(`/staff/candidates/${id}/mock/resolve-review`, { method: "POST", body: { subject } }), "Review completed — mark confirmed."); },

      /* ---------- registration ---------- */
      updateExams(id, e) { return act(() => req("/me/exams", { method: "POST", body: { session: e.session, location: e.location, subjects: e.subjects } }), "Your exam basket is saved."); },
      setProgram(id, program) { return act(() => req("/me/program", { method: "POST", body: { program } })); },
      requestRegistration() { return act(() => req("/me/registration-request", { method: "POST" }), "Request sent to the admin."); },
      approveRegistration(id) { return act(() => req(`/staff/candidates/${id}/registration/approve`, { method: "POST" }), "Registration approved."); },
      rejectRegistration(id, reason) { return act(() => req(`/staff/candidates/${id}/registration/reject`, { method: "POST", body: { reason } }), "Registration not approved — the student has been told."); },
      approveRegular(id, note) { return act(() => req(`/staff/candidates/${id}/regular/approve`, { method: "POST", body: { note } }), "Approved — the student has been sent the WhatsApp number."); },
      declineRegular(id, reason) { return act(() => req(`/staff/candidates/${id}/regular/decline`, { method: "POST", body: { reason } }), "Request declined — the student has been told."); },
      updateAdmission(id, patch, okText) { return act(() => req(`/staff/admission-requests/${id}`, { method: "PATCH", body: patch }), okText || "Saved."); },
      async getAdmissionFee() { return (await req("/admin/settings/admission")).admission; },
      saveAdmissionFee(a) { return act(() => req("/admin/settings/admission", { method: "PUT", body: a }), "Admission fee saved."); },
      async getExamSeries() { return (await req("/admin/settings/exam-series")).series; },
      saveExamSeries(series) { return act(() => req("/admin/settings/exam-series", { method: "PUT", body: { series } }), "Exam session dates saved — the website shows them now."); },
      async getContact() { return (await req("/admin/settings/contact")).contact; },
      saveContact(contact) { return act(() => req("/admin/settings/contact", { method: "PUT", body: contact }), "WhatsApp number saved."); },
      requestRegular(id, note) { return act(() => req("/me/regular", { method: "POST", body: { note } }), "Request sent to Admissions."); },

      /* ---------- SOE, attendance, results, scripts ---------- */
      issueSOE(id, centreIdx, candidateNo, file) {
        const fd = new FormData();
        fd.append("centreId", String(CENTRES[centreIdx]?.id ?? "")); fd.append("candidateNumber", candidateNo || "");
        if (file?.file) fd.append("file", file.file, file.name);
        return act(() => req(`/staff/candidates/${id}/soe`, { method: "POST", form: fd }), "SOE published — the student has been told.");
      },
      markAttendance(id, idx, att) {
        const row = find(id)?.soe?.timetable[idx];
        return act(() => req(`/staff/timetable/${row.id}`, { method: "PATCH", body: { attendance: att ?? null } }));
      },
      publishExamResults(id, grades, file) {
        const fd = new FormData(); if (grades) fd.append("grades", JSON.stringify(grades));
        if (file?.file) fd.append("file", file.file, file.name);
        return act(() => req(`/staff/candidates/${id}/results`, { method: "POST", form: fd }), "Results published.");
      },
      /** row = a datesheet row ({ id } from the SOE, or { subject, paper } before it) */
      uploadExamScript(id, row, file, marks) {
        const fd = new FormData(); fd.append("marks", marks || "");
        if (row?.id) fd.append("timetableEntryId", row.id); else { fd.append("subject", row?.subject || ""); fd.append("paper", row?.paper || ""); }
        if (file?.file) fd.append("file", file.file, file.name);
        return act(() => req(`/staff/candidates/${id}/exam-scripts`, { method: "POST", form: fd }), "Script uploaded — the student has been told.");
      },
      /** many files at once: [{ id, kind: "soe" | "result" | "script", file, row }] → [{ ok, error }] */
      async bulkUpload(items) {
        const out = [];
        for (const it of items) {
          const fd = new FormData();
          if (it.file?.file) fd.append("file", it.file.file, it.file.name);
          let path = `/staff/candidates/${it.id}/soe`;
          if (it.kind === "result") path = `/staff/candidates/${it.id}/results`;
          if (it.kind === "script") {
            path = `/staff/candidates/${it.id}/exam-scripts`;
            if (it.row?.id) fd.append("timetableEntryId", it.row.id); else { fd.append("subject", it.row?.subject || ""); fd.append("paper", it.row?.paper || ""); }
          }
          try { await req(path, { method: "POST", form: fd }); out.push({ ok: true }); }
          catch (e) { out.push({ ok: false, error: e.message }); }
        }
        await load().catch(() => {});
        const n = out.filter((x) => x.ok).length;
        say(`${n} of ${items.length} file(s) uploaded to the students' portals.`, n === items.length ? "ok" : "error");
        return out;
      },
      requestBcReview(id, scriptId, note) { return act(() => req(`/me/exam-scripts/${scriptId}/bc-review`, { method: "POST", body: { note } }), "Request sent to the Exams team."); },

      /* ---------- documents & past papers ---------- */
      addDoc(id, doc, by) {
        if (!doc.file) { say(`"${doc.name}" is too large to upload.`); return undefined; }
        const fd = new FormData(); fd.append("files", doc.file, doc.name); if (doc.cat) fd.append("category", doc.cat);
        return act(() => req(by === "student" ? "/me/documents" : `/staff/candidates/${id}/documents`, { method: "POST", form: fd }), `Uploaded ${doc.name}.`);
      },
      removeDoc(id, docId) {
        return act(() => req(isStaff() ? `/staff/candidates/${id}/documents/${docId}` : `/me/documents/${docId}`, { method: "DELETE" }));
      },
      async usePaper(id, paperId) {
        const r = await act(() => req("/me/past-papers/download", { method: "POST", body: { paper: paperId } }));
        return r ? true : false;
      },

      /* ---------- notifications & settings ---------- */
      markRead(role) {
        if (!data.notifications.some((n) => n.role === role && !n.read)) return undefined;
        return act(() => req("/notifications/read-all", { method: "POST" }));
      },
      saveSettings(st) {
        const pk = PACKAGES.map((p) => ({ id: p.id, label: p.label, papers: p.papers, price: Number(st.pk?.[p.id] ?? p.price) || 0 }));
        return act(() => req("/admin/settings/prices", { method: "PUT", body: {
          registrationFee: Number(st.reg) || 0, bcFeePerSubject: { IGCSE: Number(st.bcIgcse) || 0, IAL: Number(st.bcAlevel) || 0 }, pastPaperPackages: pk,
        } }), "Prices saved — they are live now.");
      },
      async getBank() { return (await req("/admin/settings/bank")).bank; },
      saveBank(bank) { return act(() => req("/admin/settings/bank", { method: "PUT", body: bank }), "Bank account saved."); },
      async listStaff() { return (await req("/admin/staff")).staff; },
      addStaff(s) { return act(() => req("/admin/staff", { method: "POST", body: s }), `Account created for ${s.email}.`); },
      updateStaff(id, patch) { return act(() => req(`/admin/staff/${id}`, { method: "PATCH", body: patch }), "Staff account updated."); },
      changePassword(current, next) { return act(() => req("/auth/change-password", { method: "POST", body: { current, next } }), "Password changed."); },
    };
  }, [data, user, cid, ready, pub, toast, load, say, start]);

  return (
    <Ctx.Provider value={api}>
      {ready ? children : (
        <div className="grid min-h-screen place-items-center bg-[#f6f8fc]">
          <div className="flex items-center gap-3 text-sm font-semibold text-navy-700"><span className="h-5 w-5 animate-spin rounded-full border-2 border-navy-700 border-t-transparent" /> Loading…</div>
        </div>
      )}
      {toast && (
        <div role="status" className={`fixed bottom-5 left-1/2 z-[90] w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-2xl ${toast.kind === "ok" ? "bg-[#065f46] text-white" : "bg-red-600 text-white"}`}>
          <div className="flex items-start gap-3"><span className="flex-1">{toast.text}</span><button type="button" onClick={() => setToast(null)} className="opacity-70 hover:opacity-100">✕</button></div>
        </div>
      )}
    </Ctx.Provider>
  );
}
