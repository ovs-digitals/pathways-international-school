# Pathways International School — Website + LMS (frontend)

Website aur student/staff portal (LMS) ka React project. Har hissa apne component mein hai.
Server (backend) alag folder mein hai: `pathways-portal-backend\server`.

## Pehli dafa (sirf ek dafa)
1. Node.js 20 ya naya install hona chahiye.
2. Is folder mein terminal kholein aur chalayein:
   ```
   npm install
   ```

## Kaam karte waqt (apne PC par)
1. Server chalayein: `pathways-portal-backend\server` mein `npm run dev` (port 4000).
2. Is folder mein chalayein:
   ```
   npm run dev
   ```
3. Browser mein kholein: http://localhost:5173
   - Website aur portal dono yahin chalte hain. Portal ka data `/api` se aap ke server (port 4000) se aata hai.
   - File save karte hi page khud refresh ho jata hai.

## Live karna (hosting)
1. Is folder mein chalayein:
   ```
   npm run build
   ```
2. `dist` folder ban jayega. Server ke `public` folder ki purani files hata kar
   `dist` ke andar ki **saari** files (`index.html`, `assets` folder, tasveerein, `mock`, `partners`) `server\public\` mein copy kar dein.
3. Server dobara chalayein. http://localhost:4000 (ya aap ka domain) par website + portal khul jayega.

## Kaunsi cheez kahan hai
| Kya badalna hai | File |
|---|---|
| Fees, scholarship %, phone, WhatsApp, email, address, office hours, subjects, pass mark | `src/components/siteData.js` (ek jagah — website aur robot dono yahin se lete hain) |
| Robot (Pathways Assistant) ke jawab | `src/components/chatKnowledge.js`, design: `ChatBot.jsx` |
| Menu (navbar) | `src/components/Navbar.jsx` |
| Footer | `src/components/Footer.jsx` |
| Home page | `HomeHero.jsx` (upar wala hero), `HomeLandingPage.jsx` (baqi sections), `PakistanMap.jsx` |
| Programme pages | `PreIGCSEProgram.jsx`, `Igcse.jsx` + `IgcsePathway.jsx`, `ALevelPage.jsx` + `ALevelPathway.jsx`, `ProgramFees.jsx` |
| Admissions | `AdmissionsPage.jsx`, `FeeStructurePage.jsx`, `ScholarshipsPage.jsx`, `ApplyModal.jsx`, `AdmissionPopup.jsx` |
| Exam registration page | `PrivateCandidatesPage.jsx`, `SessionDates.jsx`, `examSeries.js`, `RefundPolicy.jsx` |
| About / Contact / Career | `PathwaysWelcomePage.jsx`, `Contact.jsx`, `OfficeLocations.jsx`, `CareersPage.jsx` |
| Saare pages ke routes (URL) | `src/App.jsx` |
| Portal (LMS): login, student, admissions, exams, admin | `src/components/portal/` (`Portal.jsx`, `SignupPage.jsx`, `ExamPicker.jsx`, `ApiStore.jsx`) |
| Tasveerein | `public/` |
| Rang, fonts, animations | `src/index.css` |

## Zaroori baatein
- Mock test ke **jawab (answer keys) is project mein nahi hain** — wo sirf server par hain
  (`server/src/mock/bank.js`, `paper.js`) aur marking server karta hai. Sawal badalne hon to dono jagah badlein.
- `src/shims/` mein menu links, icons aur animations ke chhote built-in versions hain — inhein delete na karein.
- Website ke URLs `#/igcse` jaise hain, is liye hosting par koi extra setting nahi chahiye.
