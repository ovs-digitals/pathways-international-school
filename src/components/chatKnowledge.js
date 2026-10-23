/* Pathways Assistant — everything the website robot knows.
   Fees, scholarships, contact, address and subjects come from siteData.js —
   the same file the website pages use — so the robot is always up to date.
   (Bundled into the server as src/lib/siteFacts.js for the optional AI mode.) */
import { ADDRESS, AGES, A_LEVEL_SUBJECTS, CONTACT as C, EXAM_CITIES, FEES, IGCSE_COMPULSORY, IGCSE_STREAMS, LOWEST_MONTHLY, MAX_SCHOLARSHIP, MOCK_ATTEMPTS, PASS_MARK, SCHOLARSHIP, pkr } from "./siteData";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* Terms start in July, September and December — the next one from today */
export function nextTermStart(now = new Date()) {
  for (let y = now.getFullYear(); ; y++) {
    for (const m of [6, 8, 11]) if (new Date(y, m, 1) > now) return `${MONTHS[m]} ${y}`;
  }
}
/* New IGCSE / A Level batch year (changes every August) */
export function intakeYear(now = new Date()) {
  return now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
}

export const CONTACT = { ...C, address: ADDRESS, hours: `${C.hoursDays}, ${C.hoursTime}` };
export const A_LEVEL_SUBJECT_LIST = A_LEVEL_SUBJECTS;
const F = FEES, M = FEES.monthly, S = SCHOLARSHIP;
const streamLines = IGCSE_STREAMS.map((x) => `${x.key} (${x.subjects.join(", ")})`).join(", ");

/* Plain-text fact sheet (used by the AI mode on the server) */
export function siteFacts(now = new Date()) {
  const Y = intakeYear(now);
  return `PATHWAYS INTERNATIONAL SCHOOL — FACT SHEET
- Pakistan's first online live interactive school. Fully online: live classes with real teachers, recorded lessons, tests with feedback, parents get attendance/results/updates. Students study from home anywhere in Pakistan with full regular-student status.
- Pearson Edexcel approved centre, Centre No. 97911. Licensed by the School Education Department, Government of Punjab. A project of Olevels Virtual School, UK.
- Zero-Tuition Policy: everything is taught properly in class, so no extra tuition or academy is needed. Expert teachers, flexible timings, affordable fees.
- CEO: Waqar Hussain.
- Head office: ${CONTACT.address}. Office hours: ${CONTACT.hours}.
- Contact: phone/WhatsApp ${CONTACT.phone}, landline ${CONTACT.landline}, email ${CONTACT.email}. WhatsApp is the fastest way to reach Admissions.

PROGRAMMES (age groups: Pre-IGCSE ${AGES.preIgcse}, IGCSE ${AGES.igcse}, International A Levels ${AGES.aLevels})
1) Pre-IGCSE (foundation) — 1 year, 2 terms: Term 1 September–June, Term 2 July–November (same months every year). Eligibility: Grade 5 to 6 or Pre IGCSE Foundation Course. Subjects include Mathematics, English, Computer Science, Biology, Islamic Studies, Chemistry, Physics. Prepares students for IGCSE / O Levels.
2) IGCSE / O Levels 2 Years Program (Pearson Edexcel, equivalent to Matric) — 3 terms over 2 years (September ${Y} – June ${Y + 2}). Eligibility: Grade 7 or 8 with British Curriculum or equivalent. Term 1 (Sep–Jun): 4 subjects; Term 2 (Jul–Nov): 2 subjects; Term 3 (Dec–Jun): 3 subjects.
   Compulsory: ${IGCSE_COMPULSORY.join(", ")}.
   Elective streams: ${streamLines}.
3) International A Levels (Pearson Edexcel, equivalent to FSc/Intermediate) — two pages/years:
   - International AS Levels (Year 1): 1 year, 2 terms, 3 subjects. Term 1 (September–June) = Unit 1 of each subject; Term 2 (July–November) = Unit 2. Same months every year. Eligibility: IGCSE / O Levels with 5 subjects including Mathematics and English, or Matric with 60% marks.
   - International A2 Levels (Year 2): 1 year, 2 terms, the same 3 subjects. Term 1 = Unit 3, Term 2 = Unit 4. Eligibility: International AS Level completed in the same 3 subjects.
   - Choose any 3 of 13 subjects: ${A_LEVEL_SUBJECT_LIST.join(", ")}.

FEES (PKR)
- Admission fee ${pkr(F.admission)} (one time, non-refundable). IT fee ${pkr(F.it)} per year (non-refundable).
- Monthly tuition: Pre-IGCSE ${pkr(M.preIgcse)}; IGCSE / O Levels ${pkr(M.igcse)}; International AS & A2 Levels (3 subjects) ${pkr(M.aLevels)}; Self-paced AS & A2 per subject ${pkr(M.selfPacedPerSubject)}.
- Exam board / British Council registration and exam fees are separate.
- Scholarships (on the monthly tuition fee only): Hafiz-e-Quran ${S.hafiz}% off (Hifz certificate + B-Form/CNIC); Siblings ${S.siblings}% off each sibling (B-Forms of each child). Only one concession per student — the higher one applies. Ask when applying; Admissions confirms after checking documents.

ADMISSIONS
- Admissions are open. Next term starts: ${nextTermStart(now)}. Terms start in July, September and December. Admission dates: 15–30 June, 15 July – 15 August, 15–30 November every year.
- Process: 1) Submit the application form with documents; 2) Entrance test & interview (with parents); 3) Pay the non-refundable application processing fee; 4) Offer & confirmation.
- Admission is subject to seat availability and age/eligibility. A first-come waiting list is kept for the selected academic year.
- Apply with the "Apply Now" button on the website (form goes to Admissions on WhatsApp) or message WhatsApp ${CONTACT.phone}.

BRITISH COUNCIL EXAM REGISTRATION (PRIVATE CANDIDATES, IGCSE / A LEVELS)
- Private candidates are accepted from anywhere in Pakistan (school students, home-schoolers, anyone). Exam cities include ${EXAM_CITIES.join(", ")}; you choose your city in the form.
- Steps: 1) Introduction form (choose level, session, city, subjects + your details); 2) Pay the Pathways registration fee — your student portal opens; 3) Free mock tests (${MOCK_ATTEMPTS} attempts per subject, best score counts); 4) Score ${PASS_MARK}% or more; 5) Pathways registers your British Council entry, you pay the British Council fee from the portal; 6) Statement of Entry (SOE), results, marked scripts and certificate arrive in the portal.
- Payments by card, Easypaisa, JazzCash or bank transfer.
- Exam dates are set by the exam board through the British Council; registration windows (normal and late stages) are shown on the exam registration page. Registering early costs less; late entries cost more.
- Refunds: admission/registration fee refund can be requested in writing to the admissions office (reviewed case by case); exam fee refunds follow British Council policy; late entries may carry British Council penalties.
- A private candidate can later request to become a regular student from the portal.

CAREERS
- Openings are listed on the Career page (e.g. Mathematics Teacher, Admissions Coordinator, Student Counsellor, IT Support). CVs: ${C.hrEmail}.`;
}

/* ------------------------------------------------------------------ */
/* Quick answers for the built-in robot (works without internet/AI).  */
/* keys: [word or phrase, weight]. Text is normalised first (see norm) */
/* ------------------------------------------------------------------ */

const L = (label, to) => ({ label, to });
const APPLY = { label: "Apply now", action: "apply" };
const WA = { label: "WhatsApp Admissions", action: "whatsapp" };

export function intents(now = new Date()) {
  const Y = intakeYear(now);
  return [
    {
      id: "greet",
      keys: [["hi", 2], ["hello", 2], ["hey", 2], ["salam", 3], ["aoa", 3], ["assalam", 3], ["asalam", 3], ["slam", 2], ["good morning", 2], ["good evening", 2]],
      answer: "Wa Alaikum Assalam! 👋 I'm the **Pathways Assistant**. Ask me about fees, programmes, admissions, scholarships, exam registration or our location.",
      chips: true,
    },
    {
      id: "about",
      keys: [["pathways", 1], ["about", 1.5], ["online school", 3], ["what is", 1], ["kya hai", 1.5], ["live class", 2], ["how classes", 3], ["classes work", 3], ["how does", 1], ["kaise", 1], ["online", 1.2], ["home", 0.8], ["ghar", 1.5]],
      answer: "Pathways International School is **Pakistan's first online live interactive school**.\n• Live classes with real teachers, from home\n• Recorded lessons if you miss a class\n• Regular tests and feedback\n• Parents get attendance, results and updates\n\nStudents from all over Pakistan study with full regular-student status.",
      links: [L("Welcome to PWIS", "/welcome"), APPLY],
    },
    {
      id: "fees",
      keys: [["fee", 4.5], ["fees", 4.5], ["fess", 4.5], ["price", 2.5], ["cost", 2.5], ["charges", 2.5], ["kitni", 1.5], ["kitna", 1.5], ["paise", 2], ["rupees", 2], ["pkr", 2], ["kharcha", 2.5], ["monthly", 2], ["tuition fee", 1], ["admission fee", 2], ["it fee", 3]],
      answer: `**Fee structure (PKR)**\n• Admission fee: ${pkr(F.admission)} (one time)\n• IT fee: ${pkr(F.it)} per year\n\n**Monthly fee**\n• Pre-IGCSE: ${pkr(M.preIgcse)}\n• IGCSE / O Levels: ${pkr(M.igcse)}\n• International AS & A2 Levels (3 subjects): ${pkr(M.aLevels)}\n\nAdmission and IT fees are non-refundable. Exam board / British Council fees are separate. Scholarships: up to ${MAX_SCHOLARSHIP}% off.`,
      links: [L("Fee structure", "/fee-structure"), L("Scholarships", "/scholarships")],
    },
    {
      id: "scholarship",
      keys: [["scholarship", 4], ["discount", 4], ["concession", 4], ["riayat", 4], ["off", 1], ["hafiz", 4], ["quran", 3], ["sibling", 4], ["siblings", 4], ["bhai", 3], ["behan", 3], ["brother", 3], ["sister", 3], ["kam fee", 2]],
      answer: `**Scholarships** (on the monthly fee):\n• **Hafiz-e-Quran: ${S.hafiz}% off** — Hifz certificate + B-Form / CNIC\n• **Siblings: ${S.siblings}% off** for each child from the same family — B-Form of each child\n\nOne concession per student (the higher one applies). Ask for it when you apply.`,
      links: [L("Scholarships", "/scholarships"), APPLY],
    },
    {
      id: "apply",
      keys: [["apply", 3], ["admission", 2.5], ["admissions", 2.5], ["dakhla", 4], ["dakhila", 4], ["enrol", 3], ["enroll", 3], ["join", 2.5], ["process", 2], ["procedure", 2], ["how to", 1], ["kaise", 1], ["form", 1.5], ["steps", 1.5]],
      answer: "**How to get admission — 4 steps**\n1. Submit the application form with documents\n2. Entrance test & interview (with parents)\n3. Pay the non-refundable processing fee\n4. Offer & confirmation 🎉\n\nAdmissions are open — next term starts **" + nextTermStart(now) + "**.",
      links: [APPLY, L("Application process", "/application-process")],
    },
    {
      id: "test",
      keys: [["entrance", 4], ["interview", 4], ["test", 1.5], ["admission test", 3]],
      answer: "After you submit the application, you get a schedule for an **entrance test** and an **interview** with the student and parents. After that, the processing fee is paid and an offer is made.",
      links: [L("Application process", "/application-process")],
    },
    {
      id: "eligibility",
      keys: [["eligib", 4], ["eligible", 4], ["requirement", 3], ["criteria", 3], ["age", 2.5], ["grade", 2], ["class", 1], ["umar", 3], ["qualify for", 2], ["who can", 2]],
      answer: `**Eligibility & age**\n• Pre-IGCSE: Grade 5 to 6 (or Pre IGCSE Foundation Course) · age ${AGES.preIgcse}\n• IGCSE / O Levels: Grade 7 or 8 (British curriculum or equivalent) · age ${AGES.igcse}\n• International AS & A2 Levels: age ${AGES.aLevels}\n• International AS Levels: IGCSE / O Levels with 5 subjects incl. Maths & English, or Matric with 60%\n• International A2 Levels: AS Level completed in the same 3 subjects\n\nNot sure? Our team will guide you.`,
      links: [L("Admissions", "/application-process"), WA],
    },
    {
      id: "programs",
      keys: [["program", 3], ["programme", 3], ["programs", 3], ["course", 3], ["courses", 3], ["offer", 2], ["level", 1], ["kon se", 1], ["konsa", 1], ["classes", 1]],
      answer: "**Our programmes**\n1. **Pre-IGCSE** — 1 year foundation\n2. **IGCSE / O Levels** — 2 years, 3 terms (Pearson Edexcel)\n3. **International A Levels** — AS Levels (Year 1) and A2 Levels (Year 2), 3 subjects each\n\nPlus **British Council exam registration** for private candidates.",
      links: [L("Pre IGCSE", "/pre-igcse"), L("IGCSE", "/igcse"), L("AS Levels", "/international-as-levels"), L("A2 Levels", "/international-a2-levels")],
    },
    {
      id: "preigcse",
      keys: [["preigcse", 6], ["foundation", 3]],
      answer: `**Pre-IGCSE** — a 1-year foundation before IGCSE / O Levels.\n• Term 1: September – June · Term 2: July – November (every year)\n• Eligibility: Grade 5 to 6\n• Subjects: Mathematics, English, Computer Science, Biology, Islamic Studies, Chemistry, Physics\n• Monthly fee: PKR ${pkr(M.preIgcse)}`,
      links: [L("Pre IGCSE page", "/pre-igcse"), APPLY],
    },
    {
      id: "igcse",
      keys: [["igcse", 4], ["olevel", 4], ["olevels", 4], ["matric", 2.5], ["gcse", 3]],
      answer: `**IGCSE / O Levels 2 Years Program** (Pearson Edexcel, equal to Matric)\n• 3 terms in 2 years (Sep ${Y} – Jun ${Y + 2})\n• Term 1 (September–June): 4 subjects\n• Term 2 (July–November): 2 subjects\n• Term 3 (December–June): 3 subjects\n  (same months every year)\n• Compulsory: ${IGCSE_COMPULSORY.join(", ")}\n• Streams: Science, IT, Business or Humanities\n• Monthly fee: PKR ${pkr(M.igcse)}`,
      links: [L("IGCSE page", "/igcse"), APPLY],
    },
    {
      id: "igcseSubjects",
      keys: [["subject", 2], ["subjects", 2], ["stream", 4], ["streams", 4], ["compulsory", 4], ["elective", 4], ["science", 2], ["business", 1.5], ["humanities", 3], ["igcse", 1.5], ["olevel", 1.5], ["mazmoon", 2]],
      answer: `**IGCSE / O Levels subjects**\nCompulsory: ${IGCSE_COMPULSORY.join(", ")}\n\n**Choose one stream:**\n• Science — Biology, Physics, Chemistry\n• IT — Computer Science, Physics, Chemistry\n• Business — Accounting, Economics, Business Studies\n• Humanities — Global Citizenship, History, Geography`,
      links: [L("IGCSE page", "/igcse"), L("A Level subjects", "/international-as-levels")],
    },
    {
      id: "alevel",
      keys: [["alevel", 4], ["alevels", 4], ["as level", 3], ["a2", 3], ["fsc", 3], ["intermediate", 3], ["unit", 2], ["units", 2], ["university", 1.5]],
      answer: `**International A Levels** (Pearson Edexcel, equal to FSc)\n• **AS Levels (Year 1):** 3 subjects, 2 terms — Unit 1 (September–June), then Unit 2 (July–November) — every year\n• **A2 Levels (Year 2):** same 3 subjects — Unit 3 and Unit 4\n• Choose any 3 of 13 subjects\n• Monthly fee: PKR ${pkr(M.aLevels)}`,
      links: [L("AS Levels", "/international-as-levels"), L("A2 Levels", "/international-a2-levels"), APPLY],
    },
    {
      id: "alevelSubjects",
      keys: [["subject", 2], ["subjects", 2], ["alevel", 1.5], ["alevels", 1.5], ["a2", 1], ["as level", 1], ["choose", 1], ["psychology", 3], ["economics", 2], ["accounting", 2]],
      answer: "**A Level subjects** — pick any **3** of these 13:\n" + A_LEVEL_SUBJECT_LIST.join(" · "),
      links: [L("Choose on AS page", "/international-as-levels")],
    },
    {
      id: "dates",
      keys: [["start", 2.5], ["starting", 2.5], ["shuru", 3], ["kab", 2], ["when", 1.5], ["session", 2], ["intake", 3], ["term", 1.5], ["next term", 3], ["date", 1.5], ["dates", 1.5], ["last date", 3], ["deadline", 2.5]],
      answer: `**Next term starts: ${nextTermStart(now)}**\nTerms start in **July, September and December**.\n\n**Admission dates every year:**\n• 15 – 30 June\n• 15 July – 15 August\n• 15 – 30 November`,
      links: [APPLY, WA],
    },
    {
      id: "duration",
      keys: [["duration", 4], ["how long", 3], ["years", 1.5], ["kitne saal", 4], ["kitna time", 3], ["mudat", 3]],
      answer: "**Duration**\n• Pre-IGCSE: 1 year\n• IGCSE / O Levels: 2 years (3 terms)\n• International AS Levels: 1 year (2 terms)\n• International A2 Levels: 1 year (2 terms)",
      links: [L("IGCSE", "/igcse"), L("AS Levels", "/international-as-levels")],
    },
    {
      id: "private",
      keys: [["privatecandidate", 6], ["private", 3.5], ["britishcouncil", 5], ["exam registration", 5], ["register for exam", 5], ["registration", 2], ["sit exam", 3], ["exam", 1.5], ["exams", 1.5], ["paper", 1], ["candidate", 2.5]],
      answer: `**British Council Exam Registration (IGCSE / A Levels)**\nWe accept private candidates from **anywhere in Pakistan**.\n1. Fill the introduction form (level, session, city, subjects)\n2. Pay the registration fee — your portal opens\n3. Free mock tests (${MOCK_ATTEMPTS} attempts per subject)\n4. Score **60%**\n5. We register you with the British Council\n6. SOE, results & certificate arrive in your portal`,
      links: [L("Exam registration", "/private-candidates"), L("Sign up", "/private-candidates/signup")],
    },
    {
      id: "mock",
      keys: [["mocktest", 6], ["mock", 4], ["60", 3], ["percent", 2.5], ["pass", 2.5], ["passing", 3], ["attempt", 3], ["attempts", 3], ["qualify", 2]],
      answer: `**Mock tests** are **free** with exam registration — ${MOCK_ATTEMPTS} attempts for every subject, best score counts. You need **${PASS_MARK}% or above**; then we register you with the British Council. Below ${PASS_MARK}%? Just re-sit.`,
      links: [L("Exam registration", "/private-candidates")],
    },
    {
      id: "examDates",
      keys: [["exam date", 5], ["exam dates", 5], ["datesheet", 5], ["date sheet", 5], ["series", 3], ["january", 2.5], ["may june", 3], ["october november", 3], ["late fee", 3], ["window", 2.5]],
      answer: "Exam dates are set by the exam board through the **British Council**. Registration windows (normal and late stages) are shown on our exam registration page — **register early to pay the normal fee**. Your exact dates come with your Statement of Entry in the portal.",
      links: [L("Session dates", "/private-candidates")],
    },
    {
      id: "examCity",
      keys: [["exam centre", 5], ["exam center", 5], ["centre", 2], ["center", 2], ["city", 2.5], ["cities", 2.5], ["shehar", 2.5], ["karachi", 2], ["lahore", 2], ["islamabad", 2], ["sialkot", 2], ["where exam", 4]],
      answer: `You can sit your exam in **any city of Pakistan** — e.g. ${EXAM_CITIES.join(", ")}. You choose your exam city in the registration form. Classes are online, so students join from all over Pakistan.`,
      links: [L("Exam registration", "/private-candidates")],
    },
    {
      id: "payment",
      keys: [["pay", 3], ["payment", 4], ["jazzcash", 5], ["easypaisa", 5], ["bank", 3], ["card", 2.5], ["transfer", 3], ["online payment", 4], ["ada", 2], ["account", 2]],
      answer: "**Payment methods:** debit/credit card, **Easypaisa**, **JazzCash** or **bank transfer**. Exam-registration payments are made from your student portal. For admission payments, Admissions will send you the details.",
      links: [WA],
    },
    {
      id: "refund",
      keys: [["refund", 6], ["wapas", 4], ["wapis", 4], ["money back", 5], ["cancel", 3], ["cancellation", 3]],
      answer: "**Refund policy**\n• Admission and IT fees are non-refundable.\n• A registration-fee refund can be requested in writing to the admissions office — each case is reviewed.\n• Exam fee refunds follow the British Council policy; late entries may carry British Council penalties.",
      links: [L("Exam page (policy)", "/private-candidates")],
    },
    {
      id: "portal",
      keys: [["portal", 5], ["login", 5], ["log in", 5], ["lms", 5], ["dashboard", 4], ["password", 4], ["account", 1.5], ["sign in", 4]],
      answer: "Your **student portal** has your exams basket, free mock tests, result cards, fee payment, SOE & datesheet, results, marked scripts, past papers and notifications. Log in from **Student / Staff Portal Login** in the website footer.",
      links: [L("Open portal", "/portal")],
    },
    {
      id: "results",
      keys: [["soe", 5], ["statement of entry", 5], ["result", 4], ["results", 4], ["certificate", 4], ["script", 3], ["scripts", 3], ["roll number", 4], ["candidate number", 4]],
      answer: "Your **Statement of Entry (SOE)**, exam **result card**, **marked scripts** and **certificate** are uploaded by our Exams team and appear directly in your student portal.",
      links: [L("Open portal", "/portal")],
    },
    {
      id: "contact",
      keys: [["contact", 4], ["number", 3], ["phone", 4], ["call", 3], ["whatsapp", 4], ["email", 4], ["mobile", 3], ["rabta", 4], ["talk", 2], ["baat", 2]],
      answer: `**Contact us**\n• Phone / WhatsApp: **${CONTACT.phone}** (fastest)\n• Landline: ${CONTACT.landline}\n• Email: ${CONTACT.email}`,
      links: [WA, L("Contact page", "/contact")],
    },
    {
      id: "location",
      keys: [["address", 5], ["location", 5], ["located", 5], ["office", 3], ["kahan", 4], ["kidhar", 4], ["where", 2], ["map", 3], ["visit", 3], ["gujranwala", 3], ["campus", 2.5], ["pata", 2]],
      answer: `**Head Office**\n${CONTACT.address}\n\nOffice hours: ${CONTACT.hours}. Classes are fully online, so you can study from anywhere in Pakistan.`,
      links: [L("Our location", "/contact")],
    },
    {
      id: "hours",
      keys: [["office hours", 6], ["office timing", 7], ["office timings", 7], ["office time", 7], ["open", 2], ["timing", 2.5], ["timings", 2.5], ["waqt", 2.5], ["time", 1.5], ["schedule", 2], ["flexible", 3], ["recorded", 3], ["miss", 2]],
      answer: `**Office hours:** ${CONTACT.hours}.\n\n**Classes:** live online with flexible, structured timings — and every lesson is **recorded**, so if you miss a class you can watch it again any time.`,
      links: [WA],
    },
    {
      id: "recognition",
      keys: [["pearson", 4], ["edexcel", 4], ["recognised", 4], ["recognized", 4], ["approved", 4], ["accredit", 4], ["affiliated", 4], ["valid", 3], ["government", 3], ["punjab", 3], ["licensed", 3], ["centre number", 5], ["97911", 5]],
      answer: "✅ **Pearson Edexcel approved centre — Centre No. 97911**\n✅ Licensed by the School Education Department, Government of Punjab\n✅ OLevels Virtual School · British Council · AusPak International\n✅ UCAS Approved Centre (44041)\n\nIGCSE = Matric equivalent, A Levels = FSc equivalent, recognised worldwide.",
      links: [L("Accreditation & Affiliations", "/accreditation-affiliations")],
    },
    {
      id: "tuition",
      keys: [["zero tuition", 6], ["academy", 4], ["tuition", 3], ["teacher", 2.5], ["teachers", 2.5], ["quality", 2]],
      answer: "**Zero-Tuition Policy** — everything is taught properly in class by expert teachers, so you don't need an academy or extra tuition. Live classes, recorded lessons, tests and feedback are all included.",
      links: [APPLY],
    },
    {
      id: "regular",
      keys: [["become regular", 6], ["regular student", 5], ["regular", 2.5], ["switch", 2]],
      answer: "Yes — a private candidate can **become a regular student**. Send a request from your student portal and our Admissions team will contact you.",
      links: [L("Open portal", "/portal"), APPLY],
    },
    {
      id: "placement",
      keys: [["university placement", 7], ["placement", 5], ["ucas", 6], ["auspak", 6], ["study abroad", 6], ["abroad", 4], ["bahar", 3], ["visa", 5], ["uk university", 6], ["australia", 4], ["canada", 4], ["foreign", 3], ["personal statement", 6]],
      answer: "**International University Placement Programme** 🌍\nFor our enrolled and registered students:\n• **UCAS Registered Centre** — UK university applications, course selection, personal statements and academic references\n• **AusPak International** — admission counselling, applications and study visa guidance for Australia and other countries\n• Career counselling, documentation, visa and pre-departure support\n\nUnited Kingdom · Australia · Canada · Worldwide",
      links: [L("University Placement", "/university-placement"), WA],
    },
    {
      id: "assessment",
      keys: [["assessment", 6], ["assessments", 6], ["quiz", 4], ["quizzes", 4], ["monthly test", 5], ["term exam", 5], ["monitoring", 5], ["progress report", 6], ["attendance", 3], ["homework", 4], ["coursework", 5]],
      answer: "**Assessments & academic monitoring**\n• Internal (online & physical): quizzes, class tests, monthly assessments, term exams, mock exams, progress reviews\n• Attendance, coursework and progress reports are monitored throughout\n• Parents are kept informed about performance and attendance\n• Final IGCSE / IAL exams follow the awarding body's rules",
      links: [L("Assessments", "/assessments-examinations"), L("Academic monitoring", "/academic-monitoring")],
    },
    {
      id: "career",
      keys: [["job", 5], ["jobs", 5], ["career", 5], ["vacancy", 5], ["hiring", 5], ["naukri", 5], ["cv", 4], ["teach at", 4], ["work with", 3]],
      answer: `We're hiring! See open roles (teachers, admissions, counselling, IT) on the **Career** page, or email your CV to **${C.hrEmail}**.`,
      links: [L("Career page", "/career")],
    },
    {
      id: "ceo",
      keys: [["ceo", 5], ["owner", 4], ["founder", 4], ["waqar", 5], ["principal", 3], ["director", 3], ["head", 1.5]],
      answer: "Our CEO is **Waqar Hussain**. His message — *\"Quality education should have no boundaries\"* — is on the Welcome to PWIS page.",
      links: [L("Welcome to PWIS", "/welcome")],
    },
    {
      id: "parents",
      keys: [["parent", 4], ["parents", 4], ["attendance", 4], ["report card", 4], ["progress", 3], ["walid", 3]],
      answer: "Parents stay in the loop — **attendance, results and regular updates** are shared with them, and parents join the admission interview.",
      links: [WA],
    },
    {
      id: "thanks",
      keys: [["thanks", 4], ["thank", 4], ["shukria", 5], ["shukriya", 5], ["jazakallah", 5], ["ok", 1.5], ["okay", 1.5], ["bye", 3], ["allah hafiz", 5]],
      answer: "You're welcome! 😊 If you need anything else, I'm right here — or message Admissions on WhatsApp.",
      links: [APPLY, WA],
    },
  ];
}

export const QUICK = [
  ["💰 Fees", "fees"], ["🎓 Programmes", "programs"], ["📝 How to apply", "apply"], ["🎁 Scholarships", "scholarship"],
  ["📅 Next term", "dates"], ["🏛 Exam registration", "private"], ["📍 Location", "location"], ["📞 Contact", "contact"],
];

export const FALLBACK = {
  id: "fallback",
  answer: "Sorry, I'm not sure about that one. 🙏 Our Admissions team can answer it on WhatsApp — or pick a topic below.",
  links: [WA],
  chips: true,
};

/* lower-case, join common multi-word names into one token */
export function norm(text) {
  let s = ` ${String(text).toLowerCase().replace(/[’'`]/g, "").replace(/[^a-z0-9%]+/g, " ")} `;
  const joins = [
    [/\bpre\s*-?\s*igcse\b/g, "preigcse"], [/\ba\s*levels?\b/g, "alevel"], [/\bo\s*levels?\b/g, "olevel"],
    [/\bbritish\s*council\b/g, "britishcouncil"], [/\bprivate\s*candidates?\b/g, "privatecandidate"],
    [/\bmock\s*tests?\b/g, "mocktest"], [/\bhafiz\s*(e\s*)?quran\b/g, "hafiz quran"], [/\bjazz\s*cash\b/g, "jazzcash"],
    [/\beasy\s*paisa\b/g, "easypaisa"], [/\bas\s*levels?\b/g, "as level"], [/\bpercentage\b/g, "percent"],
  ];
  for (const [re, to] of joins) s = s.replace(re, to);
  return s.replace(/\s+/g, " ");
}

/* best matching intent for a question (or FALLBACK) */
export function answerFor(question, now = new Date()) {
  const s = norm(question);
  const words = new Set(s.trim().split(" "));
  let best = null, bestScore = 0;
  for (const it of intents(now)) {
    let score = 0;
    for (const [k, w] of it.keys) {
      const hit = k.includes(" ") ? s.includes(` ${k} `) || s.includes(` ${k}`) : words.has(k) || (k.length >= 5 && s.includes(` ${k}`));
      if (hit) score += w;
    }
    if (score > bestScore) { best = it; bestScore = score; }
  }
  return bestScore >= 1.5 ? best : FALLBACK;
}

export function answerById(id, now = new Date()) {
  return intents(now).find((x) => x.id === id) || FALLBACK;
}