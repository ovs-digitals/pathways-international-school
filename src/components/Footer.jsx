// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { OFFICES, mapUrl } from "./OfficeLocations";
import { ADDRESS_LINES, CONTACT, MAP_LINK } from "./siteData";

const footerCols = [
  {
    title: "About",
    links: [
      { label: "Welcome to PWIS", to: "/welcome" },
      { label: "Curriculum Overview", to: "/curriculum" },
      { label: "Careers", to: "/career" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Pre IGCSE", to: "/pre-igcse" },
      { label: "IGCSE", to: "/igcse" },
      { label: "International AS Levels", to: "/international-as-levels" },
      { label: "International A2 Levels", to: "/international-a2-levels" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Application Process", to: "/application-process" },
      { label: "British Council Exam Registration (IGCSE / A Levels)", to: "/private-candidates" },
      { label: "Fee Structure", to: "/fee-structure" },
      { label: "Scholarships", to: "/scholarships" },
      { label: "Contact Admissions", to: "/contact" },
      { label: "Student / Staff Portal Login", to: "/portal" },
    ],
  },
];

const affiliations = [
  { label: "Pearson Edexcel", image: "/partners/pearson-edexcel.webp", dark: true },
  { label: "Government of Punjab", image: "/partners/punjab.webp" },
  { label: "Olevels Virtual School", image: "/partners/olevels.webp" },
];

const school = {
  name: "Pathways International School",
  tagline: "Excellence. Character. Global Learning.",

  // Address
  addressLine1: ADDRESS_LINES[0],
  addressLine2: "Main GT Road, Citi Housing",
  city: "Gujranwala",
  country: "Pakistan",
  postalCode: "",

  // Landline (Primary for calls)
  landlineDisplay: CONTACT.landline,
  landlineHref: CONTACT.landlineHref,

  // International Call Numbers
  callUs: {
    uk: "+44 7462 296681",
    pakistan: "+92 327 7771123"
  },

  // WhatsApp
  whatsappNumber: CONTACT.whatsapp,

  // Email
  email: CONTACT.infoEmail,

  // Map
  mapHref: MAP_LINK,

  // Social Media
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  linkedin: "https://linkedin.com",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700" />
      {/* soft background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl" />
      </div>

      {/* Top */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <div className="flex flex-col items-start gap-4">
              {/* Logo badge */}
              <div className="w-52 shrink-0">
              <img src="/logo.webp" alt="Pathways International School" />
              </div>

              <div>
              
                <div className="mt-1 font-serif text-sm italic text-gold-300">
                  {school.tagline}
                </div>

                <div className="mt-5 space-y-2 text-sm text-white/60">
                  {OFFICES.map((o) => (
                    <a key={o.key} href={mapUrl(o.query)} target="_blank" rel="noreferrer" className="block leading-relaxed transition hover:text-gold-300">
                      <span className="font-semibold text-white/85">{o.name}</span>
                      <br />
                      {o.lines.slice(0, 2).join(", ")}
                    </a>
                  ))}

                  <div className="flex flex-col gap-1">
                    <a
                      href={school.landlineHref}
                      className="w-fit hover:text-white transition"
                    >
                      {school.landlineDisplay}
                    </a>
                    {/* <br />
                    <a
                      href={`mailto:${school.email}`}
                      className="w-fit hover:text-white transition"
                    >
                      {school.email}
                    </a> */}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <ActionPill
                    href={`https://wa.me/${school.whatsappNumber}`}
                    label="WhatsApp"
                  />
                  <ActionPill href={`mailto:${school.email}`} label="Email" />
                  <ActionPill href={school.mapHref} label="Map" />
                </div>

                {/* Social */}
              
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              {footerCols.map((col) => (
                <FooterCol key={col.title} col={col} />
              ))}
            </div>

            {/* Newsletter / note */}
            <div className="mt-10 rounded-2xl border border-gold-500/25 bg-white/[0.04] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-serif text-gold-400 text-lg">
                    Stay connected
                  </div>
                  <div className="text-sm text-white/60">
                    Get updates about admissions, events, and results.
                  </div>
                </div>

                <div className="flex w-full max-w-md items-center gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/40 px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-gold-400"
                  />
                  <button
                    type="button"
                    className="h-11 shrink-0 rounded-xl bg-gold-500 text-navy-900 px-5 text-sm font-bold hover:bg-gold-400 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/45">
                By subscribing, you agree to receive school updates. You can
                unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliations */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">
            Recognised &amp; Affiliated
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {affiliations.map((a) => (
              <div
                key={a.label}
                className="grid h-16 w-40 place-items-center rounded-xl bg-white px-4 py-2 shadow-lg shadow-black/20"
                title={a.label}
              >
                <img
                  src={a.image}
                  alt={`${a.label} logo`}
                  className={`max-h-11 max-w-full object-contain ${a.dark ? "brightness-0" : ""}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/55">
              © {year}{" "}
              <span className="text-white/80">{school.name}</span>. All rights
              reserved.
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <Link
                to="/fee-structure"
                className="text-white/55 hover:text-gold-300 transition"
              >
                Fee Structure
              </Link>
              <Link
                to="/application-process"
                className="text-white/55 hover:text-gold-300 transition"
              >
                Admissions
              </Link>
              <Link
                to="/contact"
                className="text-white/55 hover:text-gold-300 transition"
              >
                Contact
              </Link>
              <Link
                to="/privacy-policy"
                className="text-gold-300 hover:text-gold-200 transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ col }) {
  return (
    <div>
      <div className="font-serif text-gold-400 text-lg">{col.title}</div>
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-gold-500/60" />
      <div className="mt-4 space-y-2">
        {col.links.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="block text-sm text-white/60 transition hover:translate-x-1 hover:text-gold-300"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition grid place-items-center"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white/80">
        {icon}
      </svg>
    </a>
  );
}

function ActionPill({ href, label }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-navy-900 hover:border-gold-500 hover:bg-gold-500 transition"
    >
      {label}
    </a>
  );
}
