import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeLandingPage from "./components/HomeLandingPage";
import CampusDetails from "./components/CampusDetails";
import "./App.css";
import Footer from "./components/Footer";
import PathwaysWelcomePage from "./components/PathwaysWelcomePage";
import CurriculumOverviewPage from "./components/CurriculumOverviewPage";
import OLevelResultsPage from "./components/OLevelResultsPage";
import EarlyYearsPage from "./components/Kindergartensection";
import PrimarySectionPage from "./components/PrimarySectionPage";
import JuniorSectionPage from "./components/JuniorSectionPage";
import SeniorSectionPage from "./components/SeniorSectionPage";
import BeyondClassroomPage from "./components/BeyondClassroomPage";
import ExtraCurricularActivitiesPage from "./components/ExtraCurricularActivitiesPage";
import SchoolEventsPage from "./components/SchoolEventsPage";
import AdmissionsPage from "./components/AdmissionsPage";
import CareersPage from "./components/CareersPage";
import ContactPage from "./components/Contact";
import EarlyYearsInformationPage from "./components/EarlyYearPages";
import HumanitiesGroupPage from "./components/HumanitiesGroup";
import ALevelPage from "./components/ALevelPage";
import SelfPacedASLevels from "./components/SelfPacedASLevels";
import SelfPacedA2Levels from "./components/SelfPacedA2Levels";
import PreIGCSEProgram from "./components/PreIGCSEProgram";
import IGCSETwoYearProgram from "./components/Igcse";
import FeeStructurePage from "./components/FeeStructurePage";

import PrivateCandidatesPage from "./components/PrivateCandidatesPage";
import SignupPage from "./components/portal/SignupPage";
import { PortalLogin, StudentPortal, StaffPortal } from "./components/portal/Portal";
import { DemoProvider } from "./components/portal/DemoStore";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatBot from "./components/ChatBot";
import UniversityPlacementPage from "./components/UniversityPlacementPage";
import AccreditationPage from "./components/AccreditationPage";
import AssessmentsPage from "./components/AssessmentsPage";
import AcademicMonitoringPage from "./components/AcademicMonitoringPage";
import AdmissionPopup from "./components/AdmissionPopup";
import ScrollReveal from "./components/ScrollReveal";
import ApplyModal from "./components/ApplyModal";
import ScholarshipsPage from "./components/ScholarshipsPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";

export default function App() {
  const { pathname } = useLocation();
  const portal = pathname.toLowerCase().startsWith("/portal");
  return (
    <DemoProvider>
      <ScrollToHash />
      <ScrollReveal />
      {!portal && <Navbar />}
      {!portal && <div className="h-20" />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeHero />
              <HomeLandingPage />
            </>
          }
        />

        <Route path="/campuses/:id" element={<CampusDetails />} />
        <Route path="/events/:id" element={<CampusDetails />} />
        <Route path="/welcome" element={<PathwaysWelcomePage />} />
        <Route path="/university-placement" element={<UniversityPlacementPage />} />
        <Route path="/director-message" element={<Navigate to="/welcome" replace />} />
        <Route path="/affiliations-accreditations" element={<Navigate to="/accreditation-affiliations" replace />} />
        <Route path="/accreditation-affiliations" element={<AccreditationPage />} />
        <Route path="/assessments-examinations" element={<AssessmentsPage />} />
        <Route path="/academic-monitoring" element={<AcademicMonitoringPage />} />
        <Route path="/success" element={<Navigate to="/" replace />} />
        <Route path="/private-candidates" element={<PrivateCandidatesPage />} />
        <Route path="/private-candidates/signup" element={<SignupPage />} />
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/portal/login" element={<PortalLogin />} />
        <Route path="/portal/student" element={<StudentPortal />} />
        <Route path="/portal/admissions" element={<StaffPortal role="admissions" />} />
        <Route path="/portal/exams" element={<StaffPortal role="exams" />} />
        <Route path="/portal/admin" element={<StaffPortal role="admin" />} />
        <Route path="/private-registration" element={<Navigate to="/private-candidates" replace />} />
        <Route path="/hybrid-learning" element={<Navigate to="/private-candidates" replace />} />
        <Route path="/curriculum" element={<CurriculumOverviewPage />} />
        <Route path="/results" element={<OLevelResultsPage />} />
        <Route path="/kg" element={<EarlyYearsPage />} />
        <Route path="/primary" element={<PrimarySectionPage />} />
        <Route path="/junior" element={<JuniorSectionPage />} />
        <Route path="/senior" element={<SeniorSectionPage />} />
        <Route path="/beyond" element={<BeyondClassroomPage />} />
        <Route path="/extracurricular" element={<ExtraCurricularActivitiesPage />} />
        <Route path="/events" element={<SchoolEventsPage />} />
        <Route path="/application-process" element={<AdmissionsPage />} />
        <Route path="/fee-structure" element={<FeeStructurePage />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/early-years" element={<EarlyYearsInformationPage />} />
        <Route path="/Humanities" element={<HumanitiesGroupPage />} />
        <Route path="/pre-igcse" element={<PreIGCSEProgram />} />
        <Route path="/igcse" element={<IGCSETwoYearProgram />} />
        <Route path="/international-as-levels" element={<ALevelPage level="AS" />} />
        <Route path="/international-a-levels" element={<Navigate to="/international-as-levels" replace />} />
        <Route path="/self-paced-as-levels" element={<Navigate to="/international-as-levels" replace />} />
        <Route path="/international-a2-levels" element={<ALevelPage level="A2" />} />
        <Route path="/self-paced-a2-levels" element={<Navigate to="/international-as-levels" replace />} />






      </Routes>
      {!portal && <Footer />}
      {!portal && <WhatsAppButton />}
      {!portal && <ChatBot />}
      {!portal && <AdmissionPopup />}
      {!portal && <ApplyModal />}

    </DemoProvider>
  );
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash, pathname]);

  return null;
}