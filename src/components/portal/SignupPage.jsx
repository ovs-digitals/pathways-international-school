import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Copy, FileText, Lock, ShieldCheck, Upload, User, X } from "lucide-react";
import { API, DemoBanner, PROGRAMS, REG_FEE, useDemo } from "./DemoStore";
import ExamPicker, { QUALS } from "./ExamPicker";
import { PaymentModal } from "./PortalKit";
import { REFUND_POLICY } from "../RefundPolicy";

const STEPS = ["Choose your exams", "Your details", "Guardian & ID"];

const field =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-100";

function Label({ children, req }) {
  return (
    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">
      {children} {req && <span className="text-gold-600">*</span>}
    </span>
  );
}
function Choice({ options, value, onChange, cols = "sm:grid-cols-2" }) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${cols}`}>
      {options.map(([v, l]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition ${value === v ? "border-navy-700 bg-navy-50 text-navy-800" : "border-slate-100 text-slate-600 hover:border-gold-300"}`}>
          {value === v ? "✓ " : ""}{l}
        </button>
      ))}
    </div>
  );
}

const MAX = API ? 5 * 1024 * 1024 : 1.2 * 1024 * 1024;
function readAll(files, cat, cb) {
  [...files].forEach((f) => {
    if (API) return cb({ name: f.name, size: f.size, cat, file: f.size > MAX ? undefined : f, tooBig: f.size > MAX });
    if (f.size > MAX) return cb({ name: f.name, size: f.size, cat });
    const r = new FileReader();
    r.onload = () => cb({ name: f.name, size: f.size, cat, data: r.result });
    r.readAsDataURL(f);
  });
}

const UPLOADS = [
  { cat: "Candidate ID", label: "Candidate B-Form / CNIC or passport (front & back)", req: true, max: 5 },
  { cat: "Previous SOE", label: "Previous exam SOE (if any)", max: 1 },
];

export default function SignupPage() {
  const demo = useDemo();
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  // live mode: arrived from "Continue with Google" on the login page
  const [g] = useState(() => { try { return API ? JSON.parse(sessionStorage.getItem("pw_google")) : null; } catch (e) { return null; } });
  const [f, setF] = useState({
    body: "Pearson Edexcel", qualification: "", location: "", firstTime: "Yes", firstTimeOther: "",
    first: "", last: "", dob: "", gender: "", candidateNo: "", uci: "",
    idType: "National Id", idNumber: "", idExpiry: "",
    email: g?.email || "", password: "", password2: "", phone: "", address: "", city: "", zip: "", landmark: "", country: "Pakistan",
    program: "full", session: "", subjects: [], optionList: "", already: "",
    guardian: { first: "", last: "", relation: "", phone: "" },
    collectorType: "Guardian", collector: { first: "", last: "", relation: "", phone: "" },
    files: [], agree: false, agreePolicy: false,
  });
  useEffect(() => { setErr(""); }, [f]);   // hide an old error once the form changes
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const setIn = (o, k) => (e) => setF((x) => ({ ...x, [o]: { ...x[o], [k]: e.target.value } }));
  const addFiles = (cat, list) => readAll(list, cat, (d) => setF((x) => ({ ...x, files: [...x.files, d] })));
  const filesOf = (cat) => f.files.filter((d) => d.cat === cat);
  const collector = f.collectorType === "Guardian" ? f.guardian : f.collector;

  const checks = [
    () => (!f.qualification ? "Please choose the qualification level." : !f.session ? "Please choose the exam session." : !f.location ? "Please choose your exam location." : f.subjects.length === 0 ? "Please add at least one exam to your basket." : ""),
    () => (!f.first || !f.last ? "Please enter the candidate's first and last name." : !f.dob ? "Please enter the date of birth." : !f.gender ? "Please choose a gender." : !f.idNumber ? "Please enter the B-Form / CNIC or passport number." : !f.idExpiry ? "Please enter the ID expiry date." : !f.phone ? "Please enter a mobile number." : !/^\S+@\S+\.\S+$/.test(f.email) ? "Please enter an active email address." : !f.city ? "Please enter your city." : API && !g && f.password.length < 8 ? "Please choose a password of at least 8 characters." : API && !g && f.password !== f.password2 ? "The two passwords do not match." : ""),
    () => (!f.guardian.first || !f.guardian.phone ? "Please enter the guardian's name and phone number." : filesOf("Candidate ID").length === 0 ? "Please upload the candidate's B-Form / CNIC or passport." : API && f.files.some((d) => d.tooBig) ? "Each file must be 5 MB or smaller — please remove the large file and upload a smaller copy." : !f.agree ? "Please tick the declaration to continue." : ""),
  ];

  const next = () => {
    const e = checks[step]();
    setErr(e);
    if (e) return;
    if (step < STEPS.length - 1) { setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setPayOpen(true);
  };
  const finish = (method) => {
    const cand = demo.register({ ...f, collector, regMethod: method, firstTime: f.firstTime === "Other" ? f.firstTimeOther || "Other" : f.firstTime });
    setPayOpen(false); setDone(cand);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // live mode: create the account on the server, then pay the registration fee
  const finishLive = async (method, slip) => {
    const files = f.collectorType === "Another person" ? f.files : f.files.filter((d) => d.cat !== "Collector CNIC");
    const { password2, files: _all, ...rest } = f;
    const form = {
      ...rest, files, collector, firstTime: f.firstTime === "Other" ? f.firstTimeOther || "Other" : f.firstTime,
      ...(g ? { googleSignupToken: g.token, password: undefined } : {}),
    };
    const r = await demo.register(form, method, slip);   // throws on a form problem → shown in the payment window
    try { sessionStorage.removeItem("pw_google"); } catch (e) { /* ignore */ }
    setPayOpen(false); setDone({ ...r, live: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
    return r;
  };

  if (done?.live) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] text-slate-700">
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="panel-in overflow-hidden rounded-3xl bg-white text-center shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100">
            <div className="navy-pattern px-8 py-10 text-white">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-navy-900 shadow-xl"><Check className="h-10 w-10" strokeWidth={3} /></span>
              <h1 className="mt-5 font-serif text-3xl font-semibold">Welcome, {done.first}!</h1>
              <p className="mt-2 text-white/75">Your registration form is submitted. Candidate ID: <b className="text-gold-300">{done.id}</b></p>
            </div>
            <div className="p-8">
              {done.paid && <p className="rounded-2xl bg-[#ecfdf5] p-4 text-sm font-semibold text-[#065f46]">Registration fee received — your mock tests are open.</p>}
              {done.pending && <p className="rounded-2xl bg-gold-50 p-4 text-sm font-semibold text-gold-900 ring-1 ring-gold-200">Your bank slip is with Admissions for checking. Your mock tests open as soon as it is verified.</p>}
              {done.error && <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">Your account is ready, but the fee is not paid yet: {done.error} You can pay from your portal.</p>}
              <p className="mt-5 text-sm text-slate-600">Log in any time with <b className="text-navy-800">{done.email}</b>{g ? " (Continue with Google)" : " and the password you chose"}.</p>
              <div className="mt-7 flex justify-center">
                <button type="button" onClick={() => nav("/portal/student")} className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25">
                  Open my portal <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (done) {
    const creds = `Username: ${done.username}\nPassword: ${done.password}`;
    return (
      <main className="min-h-screen bg-[#f6f8fc] text-slate-700">
        <DemoBanner />
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="panel-in overflow-hidden rounded-3xl bg-white text-center shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100">
            <div className="navy-pattern px-8 py-10 text-white">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-navy-900 shadow-xl">
                <Check className="h-10 w-10" strokeWidth={3} />
              </span>
              <h1 className="mt-5 font-serif text-3xl font-semibold">Welcome, {done.first}!</h1>
              <p className="mt-2 text-white/75">Your registration form is submitted. Candidate ID: <b className="text-gold-300">{done.id}</b></p>
            </div>
            <div className="p-8">
              <p className="text-sm text-slate-600">Use these login details for your student portal. In the real system they are also sent to your email and WhatsApp.</p>
              <div className="mx-auto mt-5 max-w-sm rounded-2xl border-2 border-dashed border-gold-300 bg-gold-50 p-5 text-left font-mono text-sm text-navy-800">
                <div><span className="text-slate-500">Username:</span> <b>{done.username}</b></div>
                <div className="mt-1"><span className="text-slate-500">Password:</span> <b>{done.password}</b></div>
              </div>
              <button type="button" onClick={() => { try { navigator.clipboard.writeText(creds); setCopied(true); } catch (e) {} }} className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-navy-700 hover:text-gold-700">
                <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy login details"}
              </button>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => { demo.enterAs(done); nav("/portal/student"); }}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25">
                  Open my portal <ArrowRight className="h-4 w-4" />
                </button>
                <Link to="/portal" className="inline-flex items-center justify-center rounded-full border-2 border-navy-700 px-7 py-3 text-sm font-bold uppercase tracking-wider text-navy-700">Go to login</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-700">
      <DemoBanner />
      {API
        ? <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} amount={REG_FEE} title="Pathways registration fee" methods={["Card", "Easypaisa", "JazzCash", "Bank transfer"]} note="Your account is ready." onPaid={finishLive} />
        : <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} amount={REG_FEE} title="Pathways registration fee" note="Your account is being created…" onPaid={(m) => setTimeout(() => finish(m), 900)} />}
      <section className="navy-pattern relative overflow-hidden px-4 pb-24 pt-12 text-center text-white sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Private Candidate Registration · Pearson Edexcel · IGCSE / IAL</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
          From private candidate <span className="italic text-gold-400">to regular student</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/75">Choose your exams like on the British Council site, then two short steps and a PKR {REG_FEE.toLocaleString("en-US")} registration fee. Your login is created as soon as you finish.</p>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-3xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100">
          <div className="border-b border-slate-100 px-6 pt-6 sm:px-10">
            <div className="flex justify-between gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-1 flex-col items-center text-center">
                  <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition ${i < step ? "bg-gold-500 text-navy-900" : i === step ? "bg-navy-700 text-gold-300 ring-4 ring-gold-200" : "bg-slate-100 text-slate-400"}`}>
                    {i < step ? <Check className="h-5 w-5" /> : i + 1}
                  </span>
                  <span className={`mt-2 hidden text-[11px] font-bold leading-tight sm:block ${i === step ? "text-navy-800" : "text-slate-400"}`}>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500 transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>

          <div key={step} className="panel-in p-6 sm:p-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-800">{STEPS[step]}</h2>
            <p className="mt-1 text-xs text-slate-500"><span className="text-gold-600">*</span> indicates a required question</p>

            {step === 0 && <ExamPicker f={f} setF={setF} />}

            {step === 1 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label><Label req>First name</Label><input className={field} value={f.first} onChange={set("first")} placeholder="As on ID document" /></label>
                <label><Label req>Last name</Label><input className={field} value={f.last} onChange={set("last")} placeholder="As on ID document" /></label>
                <label><Label req>Date of birth</Label><input type="date" className={field} value={f.dob} onChange={set("dob")} /></label>
                <div><Label req>Gender</Label><Choice options={[["M", "Male"], ["F", "Female"]]} value={f.gender} onChange={(v) => setF((x) => ({ ...x, gender: v }))} /></div>
                <div className="sm:col-span-2"><Label req>ID</Label>
                  <div className="grid gap-2 sm:grid-cols-[220px_1fr]">
                    <Choice options={[["National Id", "B-Form / CNIC"], ["Passport", "Passport"]]} value={f.idType} onChange={(v) => setF((x) => ({ ...x, idType: v }))} />
                    <input className={field} value={f.idNumber} onChange={set("idNumber")} placeholder={f.idType === "Passport" ? "Passport number" : "XXXXX-XXXXXXX-X"} />
                  </div></div>
                <label className="sm:col-span-2"><Label req>ID expiry date</Label><input type="date" className={field} value={f.idExpiry} onChange={set("idExpiry")} /></label>
                <label><Label req>Mobile number</Label><input className={field} value={f.phone} onChange={set("phone")} placeholder="+92 3XX XXXXXXX" /></label>
                <label><Label req>Email</Label><input type="email" className={field} value={f.email} onChange={set("email")} readOnly={!!g} placeholder="you@example.com" /></label>
                <label className="sm:col-span-2"><Label req>City</Label><input className={field} value={f.city} onChange={set("city")} placeholder="e.g. Gujranwala" /></label>
                {API && (g ? (
                  <p className="rounded-2xl bg-navy-50 p-4 text-sm text-navy-800 sm:col-span-2">You are signing up with Google as <b>{g.email}</b> — you will log in with “Continue with Google”, no password needed.</p>
                ) : <>
                  <label><Label req>Choose a password</Label><input type="password" autoComplete="new-password" className={field} value={f.password} onChange={set("password")} placeholder="At least 8 characters" /></label>
                  <label><Label req>Repeat the password</Label><input type="password" autoComplete="new-password" className={field} value={f.password2} onChange={set("password2")} /></label>
                  <p className="-mt-2 text-xs text-slate-500 sm:col-span-2">You will log in to your portal with this email and password.</p>
                </>)}
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 space-y-6">
                <div className="grid gap-5 sm:grid-cols-3">
                  <label><Label req>Guardian name</Label><input className={field} value={f.guardian.first} onChange={setIn("guardian", "first")} placeholder="Father / mother" /></label>
                  <label><Label req>Guardian phone</Label><input className={field} value={f.guardian.phone} onChange={setIn("guardian", "phone")} placeholder="+92 3XX XXXXXXX" /></label>
                  <label><Label>Relationship</Label><input className={field} value={f.guardian.relation} onChange={setIn("guardian", "relation")} placeholder="e.g. Father" /></label>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {UPLOADS.map((u) => {
                    const list = filesOf(u.cat);
                    return (
                      <div key={u.cat} className={`rounded-2xl border-2 border-dashed p-4 transition ${list.length ? "border-navy-200 bg-navy-50/40" : "border-slate-200 hover:border-gold-400"}`}>
                        <label className="flex cursor-pointer items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700"><Upload className="h-5 w-5" /></span>
                          <span className="min-w-0"><span className="block text-sm font-bold text-navy-800">{u.label} {u.req && <span className="text-gold-600">*</span>}</span>
                            <span className="block text-[11px] text-slate-500">Up to {u.max} file{u.max > 1 ? "s" : ""}: {API ? "PDF, JPG, PNG or WEBP, max 5 MB each" : "PDF, document or image"}</span></span>
                          <input type="file" accept={API ? ".pdf,.jpg,.jpeg,.png,.webp" : undefined} multiple={u.max > 1} data-cat={u.cat} className="hidden" onChange={(e) => { addFiles(u.cat, [...e.target.files].slice(0, u.max - list.length)); e.target.value = ""; }} />
                        </label>
                        {list.length > 0 && <ul className="mt-3 space-y-1">{list.map((d, i) => (
                          <li key={i} className={`flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-xs font-semibold ${d.tooBig ? "text-red-600" : "text-navy-700"}`}><FileText className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{d.name}{d.tooBig ? " — larger than 5 MB" : ""}</span>
                            <button type="button" onClick={() => setF((x) => ({ ...x, files: x.files.filter((y) => y !== d) }))} className="ml-auto text-slate-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button></li>
                        ))}</ul>}
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-700">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Review</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div><User className="mr-1 inline h-4 w-4 text-navy-700" /> {f.first} {f.last} · {f.gender === "M" ? "Male" : "Female"} · {f.dob}</div>
                    <div>{f.email} · {f.phone}</div>
                    <div>{QUALS[f.qualification]} · {f.session} · {f.location}</div>
                    <div>{PROGRAMS[f.program].label}</div>
                    <div className="sm:col-span-2">Exams: {f.optionList}</div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
                  <button type="button" onClick={() => setShowPolicy(!showPolicy)} className="flex w-full items-center gap-3 bg-white px-5 py-4 text-left">
                    <ShieldCheck className="h-5 w-5 text-gold-600" /><span className="flex-1 text-sm font-bold text-navy-800">Fees, refund & late-fee policy</span>
                    <span className={`text-lg font-bold text-navy-700 transition ${showPolicy ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {showPolicy && <div className="panel-in grid gap-3 border-t border-slate-100 bg-slate-50 p-5 sm:grid-cols-2">{REFUND_POLICY.map((r) => <div key={r.title}><p className="text-sm font-bold text-navy-800">{r.title}</p><p className="mt-1 text-xs leading-6 text-slate-600">{r.text}</p></div>)}</div>}
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-navy-700 p-5 text-white">
                  <div className="flex-1"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">Registration fee</p><p className="mt-1 text-sm text-white/75">Paid now. The British Council exam fee for your basket is paid later, after your mock test and admin approval.</p></div>
                  <p className="font-serif text-3xl font-semibold text-gold-300">PKR {REG_FEE.toLocaleString("en-US")}</p>
                </div>
                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[#17365D]" checked={f.agree} onChange={(e) => setF((x) => ({ ...x, agree: e.target.checked, agreePolicy: e.target.checked }))} />
                  I confirm the details are correct and match the candidate's ID, and I accept the fees & refund policy.
                </label>
              </div>
            )}

            {err && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{err}</p>}

            <div className="mt-8 flex items-center justify-between">
              <button type="button" disabled={step === 0} onClick={() => { setErr(""); setStep(step - 1); }}
                className="rounded-full px-5 py-2.5 text-sm font-bold text-navy-700 transition hover:bg-slate-100 disabled:opacity-30">← Back</button>
              <button type="button" onClick={next}
                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-navy-700 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-gold-500 hover:text-navy-900">
                {step === STEPS.length - 1 ? <><Lock className="h-4 w-4" /> Pay PKR {REG_FEE.toLocaleString("en-US")} & submit</> : <>Continue <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">Already signed up? <Link to="/portal" className="font-bold text-navy-700 hover:text-gold-700">Log in to your portal</Link></p>
      </section>
    </main>
  );
}
