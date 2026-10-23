/* ---------- years that follow today's date (no need to edit them each year) ---------- */
const TODAY = new Date();
export const CURRENT_YEAR = TODAY.getFullYear();
// IGCSE intake: from August the new batch starts in September of this year
export const INTAKE_YEAR = TODAY.getMonth() >= 7 ? CURRENT_YEAR : CURRENT_YEAR - 1;
// Exam series and the usual first exam day (month index, day) — the board's timetable is the final word
const SERIES = [["January / February", 0, 11], ["May / June", 4, 10], ["October / November", 9, 8]];
/** First exam day (YYYY-MM-DD) for a label like "May / June 2027" */
export function sessionStart(label = "") {
  const y = Number((label.match(/(\d{4})/) || [])[1]);
  const s = SERIES.find(([n]) => label.startsWith(n));
  if (!y || !s) return null;
  return `${y}-${String(s[1] + 1).padStart(2, "0")}-${String(s[2]).padStart(2, "0")}`;
}
/** The next exam series that have not started yet */
export function upcomingSessions(n = 3, from = TODAY) {
  const out = [];
  for (let y = from.getFullYear(); out.length < n; y++) {
    for (const [name, m, d] of SERIES) if (new Date(y, m, d) > from && out.length < n) out.push(`${name} ${y}`);
  }
  return out;
}
export const EXAM_SESSIONS = upcomingSessions(3);

export const REFUND_POLICY = [
  { title: "Admission fee refund", text: "A refund of the admission or registration fee can be requested in writing to the admissions office. Each request is reviewed and, if approved, processed back to the original payment method." },
  { title: "Exam fee refund", text: "Refunds or cancellations of exam entries follow the British Council policy (and any other relevant awarding-body policy) for that exam series." },
  { title: "Penalty & late fee", text: "Entries or payments made after the British Council deadline may carry late-entry charges or penalties, as set by the British Council." },
  { title: "Approval", text: "Some cases need a decision from the school administration or the relevant authority before a refund or change is confirmed." },
];
