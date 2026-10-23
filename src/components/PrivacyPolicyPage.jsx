import { useEffect } from "react";
import { CONTACT } from "./siteData";

const sections = [
  {
    title: "Information We Collect",
    text: "We may collect personal information that you voluntarily provide to us when you express interest in our O Level, IGCSE, or hybrid schooling programs, enroll in courses, or contact us. This may include:",
    items: [
      "Personal Identification Details: Full name, parent/guardian name, student's name, and date of birth.",
      "Contact Information: Email address, phone/WhatsApp number, and residential address.",
      "Educational Information: Current grade level, academic background, and specific subjects or curriculums (e.g., Pearson Edexcel, Cambridge O Levels/IGCSE) of interest.",
      "Technical Data: IP address, browser type, device information, and browsing behavior collected automatically via cookies when you use our website or online learning management systems (LMS).",
    ],
  },
  {
    title: "How We Use Your Information",
    text: "We use the information we collect for legitimate educational and administrative purposes, including:",
    items: [
      "Responding to your inquiries regarding admissions, fee structures, and hybrid/online class schedules.",
      "Processing applications and managing student enrollment for O Level and IGCSE programs.",
      "Facilitating online and hybrid learning delivery, communication, and student assessments.",
      "Sending important updates, school newsletters, promotional materials, or admission deadlines (you can opt-out at any time).",
      "Improving our website functionality, online portals, and marketing campaigns (including Meta/Facebook advertising).",
    ],
  },
  {
    title: "How We Share Your Information",
    text: "We respect your privacy and do not sell, trade, or rent your personal information to third parties. We may share your data only under the following circumstances:",
    items: [
      "Service Providers: Trusted third-party vendors who assist us in operating our website, hosting our learning management systems, or managing communications (bound by strict confidentiality agreements).",
      "Legal Requirements: When required by law, regulation, or legal process to protect the rights, property, or safety of Pathways International School, our students, or others.",
    ],
  },
  {
    title: "Data Security",
    text: "We implement appropriate technical, administrative, and physical security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.",
  },
  {
    title: "Your Data Protection Rights",
    text: "Depending on your jurisdiction, you have the right to:",
    items: [
      "Access, update, or correct the personal information we hold about you.",
      "Request the deletion of your personal data, subject to legal or educational retention requirements.",
      'Opt-out of marketing communications at any time by clicking "unsubscribe" in our emails or replying "STOP" to our messages.',
    ],
  },
  {
    title: "Children's Privacy",
    text: "Our online services are intended for parents, guardians, and students exploring educational programs. We do not knowingly collect personal data directly from children under the age of 13 without parental consent.",
  },
  {
    title: "Changes to This Privacy Policy",
    text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Effective Date."',
  },
];

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Privacy Policy | Pathways International School";
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  const linkClass = "break-words text-emerald-700 underline underline-offset-4 hover:text-emerald-900";

  return (
    <main className="bg-white text-slate-900">
      <header className="bg-emerald-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-white/80">Pathways International School</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-white/80">
            Effective Date: <time dateTime="2026-09-30">September 30, 2026</time>
          </p>
        </div>
      </header>
      <article aria-label="Privacy policy" className="mx-auto max-w-4xl space-y-10 px-4 py-10 leading-7 text-slate-700 sm:px-6 sm:py-14 lg:px-8">
        <p>
          At Pathways International School, we are committed to protecting the privacy and security of our students, parents, website visitors, and prospective families. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, interact with our online and hybrid learning portals, or submit information through digital ads (such as Meta/Facebook lead forms).
        </p>
        {sections.map((section, index) => (
          <section key={section.title} aria-labelledby={`privacy-section-${index + 1}`}>
            <h2 id={`privacy-section-${index + 1}`} className="mb-4 text-2xl font-semibold text-emerald-900">
              {index + 1}. {section.title}
            </h2>
            <p>{section.text}</p>
            {section.items && (
              <ul className="mt-4 list-disc space-y-3 pl-6 marker:text-emerald-700">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
        <section aria-labelledby="privacy-contact" className="rounded-2xl bg-slate-50 p-5 sm:p-8">
          <h2 id="privacy-contact" className="mb-4 text-2xl font-semibold text-emerald-900">8. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please contact us at:</p>
          <address className="mt-5 space-y-3 not-italic">
            <p><span className="font-semibold">School Name:</span> Pathways International School</p>
            <p><span className="font-semibold">Website:</span> <a className={linkClass} href="https://www.pathwaysinternationalschool.edu.pk">www.pathwaysinternationalschool.edu.pk</a></p>
            <p><span className="font-semibold">Email:</span> <a className={linkClass} href="mailto:info@pathwaysinternationalschool.edu.pk">info@pathwaysinternationalschool.edu.pk</a></p>
            <p><span className="font-semibold">Phone:</span> <a className={linkClass} href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
          </address>
        </section>
      </article>
    </main>
  );
}
