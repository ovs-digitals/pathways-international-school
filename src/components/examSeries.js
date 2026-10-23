import { API } from "./portal/DemoStore";

/* British Council registration windows shown on the exam page.
   Live site: the admin edits them in the portal (Fees & prices → Exam session dates). */
export const DEFAULT_SERIES = [{
  title: "Edexcel · International A Level · January 2027",
  stages: [
    { label: "Reg. window opens", date: "2026-09-23" },
    { label: "Normal", date: "2026-10-09" },
    { label: "Late stage 1", date: "2026-11-06" },
    { label: "Late stage 2", date: "2026-12-20" },
  ],
}, {
  title: "Edexcel · International GCSE · May / June 2027",
  stages: [
    { label: "Reg. window opens", date: "" },
    { label: "Normal", date: "" },
    { label: "Late stage 1", date: "" },
    { label: "Late stage 2", date: "" },
  ],
}];
const KEY = "pw_exam_series";   // demo mode only (no server)

export async function loadSeries() {
  if (API) {
    const r = await fetch(`${API}/public/settings`, { credentials: "include" });
    const j = await r.json();
    return Array.isArray(j.examSeries) ? j.examSeries : DEFAULT_SERIES;
  }
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(s)) return s; } catch (e) { /* ignore */ }
  return DEFAULT_SERIES;
}
export function saveDemoSeries(series) { try { localStorage.setItem(KEY, JSON.stringify(series)); } catch (e) { /* ignore */ } }
