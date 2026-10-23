/* ================================================================
   ONE PLACE for the school's facts.
   The website pages AND the website robot (Pathways Assistant) both
   read from here — change a fee, number or address once, and every
   page plus the robot show the new value.
   ================================================================ */

export const SCHOOL_NAME = "Pathways International School";

/* ---------- fees (PKR) ---------- */
export const FEES = {
  admission: 35000,          // one time, non-refundable
  it: 15000,                 // per year, non-refundable
  monthly: {
    preIgcse: 25000,
    igcse: 28000,
    aLevels: 30000,          // International AS & A2 Levels (3 subjects)
    selfPacedPerSubject: 12000,
  },
};
export const pkr = (n) => Number(n).toLocaleString("en-US");
export const LOWEST_MONTHLY = Math.min(FEES.monthly.preIgcse, FEES.monthly.igcse, FEES.monthly.aLevels);

/* ---------- scholarships (% off the monthly fee) ---------- */
export const SCHOLARSHIP = { hafiz: 30, siblings: 20 };
export const MAX_SCHOLARSHIP = Math.max(SCHOLARSHIP.hafiz, SCHOLARSHIP.siblings);

/* ---------- contact ---------- */
export const CONTACT = {
  phone: "+92 327 7771048",
  phoneHref: "tel:+923277771048",
  whatsapp: "923277771048",                 // digits only, for wa.me links
  landline: "+92 55 4283590",
  landlineHref: "tel:+92554283590",
  email: "admissions@pathwaysinternationalschool.edu.pk",
  infoEmail: "info@pathwaysinternationalschool.edu.pk",
  hrEmail: "hr@pathwaysinternationalschool.com",
  hoursDays: "Monday – Friday",
  hoursTime: "9:00 AM – 4:00 PM",
};
export const waLinkTo = (text) => `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ---------- head office ---------- */
export const ADDRESS_LINES = ["3rd Floor, Niazi Square, Phase-2 Block-A", "Main GT Road, Citi Housing", "Gujranwala, Pakistan"];
export const ADDRESS = ADDRESS_LINES.join(", ");
export const MAP_QUERY = "Niazi Square, Main GT Road, Citi Housing, Gujranwala";
export const MAP_LINK = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`;

/* ---------- subjects ---------- */
export const A_LEVEL_SUBJECTS = ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Urdu", "Psychology", "Accounting", "Economics", "Geography", "History", "Computer Science"];
export const IGCSE_COMPULSORY = ["English", "Mathematics", "Urdu", "Islamic Studies", "Pakistan Studies"];
export const IGCSE_STREAMS = [
  { key: "Science", tag: "Pre-Medical & Engineering", subjects: ["Biology", "Physics", "Chemistry"] },
  { key: "IT", tag: "Computing & Technology", subjects: ["Computer Science", "Physics", "Chemistry"] },
  { key: "Business", tag: "Commerce & Management", subjects: ["Accounting", "Economics", "Business Studies"] },
  { key: "Humanities", tag: "Social Sciences", subjects: ["Global Citizenship", "History", "Geography"] },
];

/* ---------- programme age groups ---------- */
export const AGES = { preIgcse: "10 – 12 years", igcse: "12 – 14 years", aLevels: "14 – 16 years" };

/* ---------- exams ---------- */
export const PASS_MARK = 60;        // % needed in the mock tests before British Council registration
export const MOCK_ATTEMPTS = 3;
export const EXAM_CITIES = ["Karachi", "Lahore", "Islamabad", "Gujranwala", "Sialkot"];