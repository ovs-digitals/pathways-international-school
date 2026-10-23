import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { openApply } from "./ApplyModal";
import { CONTACT } from "./siteData";
import { Link, useLocation } from "react-router-dom";

/**
 * Responsive Navbar with:
 * ✅ Desktop: dropdowns open on hover or click and stay open until you click somewhere else
 * ✅ Mobile: hamburger + animated accordion dropdowns
 * ✅ Sticky / fixed header
 * ✅ Contact numbers top bar
 * ✅ Click-to-call phone numbers
 * ✅ Responsive design
 */

const navItems = [
  {
    label: "About",
    to: "#about",
    children: [
      { label: "Welcome to PWIS", to: "/welcome" },
      { label: "Accreditation & Affiliations", to: "/accreditation-affiliations" },
      { label: "Academic Monitoring", to: "/academic-monitoring" },
      { label: "Assessments & Examinations", to: "/assessments-examinations" },
    ],
  },

  {
    label: "Programs",
    to: "#academics",
    children: [
      {
        label: "Pre IGCSE",
        to: "/pre-igcse",
      },
      {
        label: "IGCSE",
        to: "/igcse",
      },
      {
        label: "International A Levels",
        to: "#a-levels",
        children: [
          { label: "International AS Levels", to: "/international-as-levels" },
          { label: "International A2 Levels", to: "/international-a2-levels" },
        ],
      },
      { label: "University Placement", to: "/university-placement" },
    ],
  },

  { label: "British Council Exam Registration (IGCSE / A Levels)", desk: ["British Council Exam Registration", "(IGCSE / A Levels)"], to: "/private-candidates" },

  {
    label: "Admissions",
    to: "#admission",
    children: [
      {
        label: "Application Process",
        to: "/application-process",
      },
      {
        label: "Fee Structure",
        to: "/fee-structure",
      },
      {
        label: "Scholarships",
        to: "/scholarships",
      },
    ],
  },

  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    pointerEvents: "none",
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto",
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    y: 8,
    scale: 0.985,
    transition: {
      duration: 0.14,
      ease: "easeIn",
    },
  },
};

const mobilePanelVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },

  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.16,
    },
  },
};

/* Top-level desktop item: a plain button for menus (so clicking never leaves the page),
   a normal link for pages. */
function NavTop({ hasChildren, to, className, onClick, children }) {
  if (hasChildren) return <button type="button" className={className} onClick={onClick} aria-haspopup="true">{children}</button>;
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>;
}

function useOutsideClick(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return;

    const listener = (e) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target)) return;

      handler?.();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, when]);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop dropdown state
  const [activeDesktop, setActiveDesktop] = useState(null);
  const desktopNavRef = useRef(null);
  const [nestedOpen, setNestedOpen] = useState(null);

  // Mobile accordion
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileNestedExpanded, setMobileNestedExpanded] = useState(null);

  // Close menu with ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveDesktop(null);
        setMobileExpanded(null);
        setMobileNestedExpanded(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileExpanded(null);
        setMobileNestedExpanded(null);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Outside click closes desktop dropdown
  useOutsideClick(
    desktopNavRef,
    () => { setActiveDesktop(null); setNestedOpen(null); },
    true
  );

  const items = useMemo(() => navItems, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div className="relative border-b border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(8,20,42,0.35)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="w-full px-4 sm:px-6 lg:pl-6 lg:pr-8">

          <div className="h-20 flex items-center justify-between gap-3">

            {/* =========================
                LOGO / BRAND
            ========================== */}
            <Link
              to="/"
              className="flex items-center gap-3 select-none shrink-0"
              onClick={() => {
                setMobileOpen(false);
                setActiveDesktop(null);
                setMobileNestedExpanded(null);
              }}
            >
              <div className="flex items-center space-x-3">
                <img
                  src="logo-light.webp"
                  alt="Pathways International School"
                  className="h-14 sm:h-[4.25rem] w-auto object-contain"
                />
              </div>
            </Link>

            {/* =========================
                DESKTOP NAVIGATION
            ========================== */}
            <nav
              ref={desktopNavRef}
              className="hidden lg:flex items-center gap-0.5"
            >
              {items.map((item, idx) => {
                const hasChildren =
                  Array.isArray(item.children) &&
                  item.children.length > 0;

                const isOpen =
                  activeDesktop === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative flex items-center"
                    onMouseEnter={() => {
                      if (hasChildren && activeDesktop !== item.label) {
                        setNestedOpen(null);
                        setActiveDesktop(item.label);
                      }
                    }}
                  >

                    <NavTop
                      hasChildren={hasChildren}
                      to={item.to}
                      className={`relative px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold tracking-wide transition inline-flex items-center gap-1 whitespace-nowrap after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-gold-500 after:origin-left after:transition-transform after:duration-300 hover:text-gold-700 hover:after:scale-x-100 ${isOpen ? "text-gold-700 after:scale-x-100" : "text-navy-800 after:scale-x-0"}`}
                      onClick={() => {
                        setNestedOpen(null);
                        setActiveDesktop(hasChildren ? item.label : null);
                      }}
                    >
                      {item.desk ? <span className="text-center leading-tight">{item.desk[0]}<span className="block text-[11px] font-semibold text-gold-700">{item.desk[1]}</span></span> : item.label}

                      {hasChildren && (
                        <span
                          className={`inline-block transition-transform ${isOpen
                              ? "rotate-180"
                              : "rotate-0"
                            }`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      )}
                    </NavTop>

                    {/* =========================
                        DESKTOP DROPDOWN
                    ========================== */}
                    <AnimatePresence>
                      {hasChildren && isOpen && (
                        <motion.div
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72"
                        >
                          <div className="rounded-xl bg-white text-black shadow-2xl shadow-navy-950/25 border-t-[3px] border-gold-500 overflow-visible">

                            <div className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700 border-b border-navy-100 bg-navy-50/60">
                              {item.label}
                            </div>

                            <div className="p-2">
                              {item.children.map(
                                (child) => {
                                  const hasNestedChildren =
                                    Array.isArray(child.children) &&
                                    child.children.length > 0;

                                  if (hasNestedChildren) {
                                    return (
                                      <div
                                        key={child.label}
                                        className="group relative"
                                      >
                                        <button type="button" onClick={() => setNestedOpen(nestedOpen === child.label ? null : child.label)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:text-navy-700 hover:bg-gold-50 ${nestedOpen === child.label ? "bg-gold-50 text-navy-700" : "text-black/80"}`}>
                                          <span>{child.label}</span>
                                          <span className="text-gold-600" aria-hidden="true">
                                            ›
                                          </span>
                                        </button>

                                        <div className={`${nestedOpen === child.label ? "visible opacity-100" : "invisible opacity-0"} group-hover:visible group-hover:opacity-100 absolute left-full top-0 w-[21rem] pl-3 transition duration-150`}>
                                          <div className="w-80 rounded-xl bg-white text-black shadow-2xl shadow-navy-950/25 border-t-[3px] border-gold-500 overflow-hidden">
                                            {child.children.map((nestedChild, nestedIdx) => (
                                              <Link
                                                key={nestedChild.label}
                                                to={nestedChild.to}
                                                className={`block px-4 py-3 text-sm transition ${
                                                  nestedIdx === 0 || nestedIdx === child.children.length - 1
                                                    ? "bg-navy-700 text-white hover:bg-navy-800 hover:text-gold-300"
                                                    : "bg-white text-black/80 hover:text-navy-700 hover:bg-gold-50"
                                                }`}
                                                onClick={() => {
                                                  setActiveDesktop(null);
                                                }}
                                              >
                                                {nestedChild.label}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={child.label}
                                      to={child.to}
                                      className="block rounded-xl px-3 py-2.5 text-sm text-black/80 hover:text-navy-700 hover:bg-gold-50 transition"
                                      onClick={() => {
                                        setActiveDesktop(
                                          null
                                        );
                                      }}
                                    >
                                      {child.label}
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Separator */}
                    {idx !==
                      items.length - 1 && (
                        <span className="hidden" />
                      )}
                  </div>
                );
              })}
            </nav>

            {/* =========================
                RIGHT SIDE ACTIONS
            ========================== */}
            <div className="flex items-center gap-2 shrink-0">

              <ApplyButton
                onClick={() => {
                  setMobileOpen(false);
                  setActiveDesktop(null);
                }}
              />

              {/* =========================
                  MOBILE TOGGLE
              ========================== */}
              <button
                type="button"
                onClick={() =>
                  setMobileOpen(
                    (value) => !value
                  )
                }
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 hover:bg-navy-900 border border-gold-500/40 transition"
              >

                {mobileOpen ? (
                  /* Close Icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 6.22a.75.75 0 0 1 1.06 0L12 10.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L13.06 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  /* Hamburger Icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25A.75.75 0 0 1 4.5 16.5h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* =========================
              MOBILE MENU
          ========================== */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="lg:hidden pb-4"
              >
                <div className="mt-2 rounded-2xl bg-navy-800 border border-gold-500/25 p-2 shadow-xl">

                  {items.map(
                    (item, idx) => {
                      const hasChildren =
                        Array.isArray(
                          item.children
                        ) &&
                        item.children.length >
                        0;

                      const expanded =
                        mobileExpanded ===
                        item.label;

                      return (
                        <div
                          key={item.label}
                        >
                          <div className="flex items-center justify-between">

                            <Link
                              to={item.to}
                              className="flex-1 block px-4 py-3 text-sm font-medium text-white hover:bg-navy-700 hover:text-gold-300 rounded-xl transition"
                              onClick={() => {
                                if (
                                  !hasChildren
                                ) {
                                  setMobileOpen(
                                    false
                                  );
                                  setMobileExpanded(
                                    null
                                  );
                                  setMobileNestedExpanded(
                                    null
                                  );
                                }
                              }}
                            >
                              {item.label}
                            </Link>

                            {hasChildren && (
                              <button
                                type="button"
                                className="mr-2 h-10 w-10 grid place-items-center rounded-xl bg-navy-700 hover:bg-navy-600 border border-gold-500/30 transition"
                                aria-label={`Toggle ${item.label}`}
                                aria-expanded={
                                  expanded
                                }
                                onClick={() =>
                                  setMobileExpanded(
                                    (
                                      current
                                    ) =>
                                      current ===
                                        item.label
                                        ? null
                                        : item.label
                                  )
                                }
                              >
                                <motion.span
                                  animate={{
                                    rotate:
                                      expanded
                                        ? 180
                                        : 0,
                                  }}
                                  transition={{
                                    duration:
                                      0.18,
                                  }}
                                  className="text-white"
                                >
                                  ▾
                                </motion.span>
                              </button>
                            )}
                          </div>

                          {/* Mobile children */}
                          <AnimatePresence
                            initial={false}
                          >
                            {hasChildren &&
                              expanded && (
                                <motion.div
                                  variants={
                                    mobilePanelVariants
                                  }
                                  initial="hidden"
                                  animate="show"
                                  exit="exit"
                                  className="overflow-hidden"
                                >
                                  <div className="ml-2 mr-2 mb-2 mt-1 rounded-2xl bg-navy-900/60 border border-white/10 p-2">

                                    {item.children.map(
                                      (
                                        child
                                      ) => {
                                        const hasNestedChildren =
                                          Array.isArray(
                                            child.children
                                          ) &&
                                          child.children.length >
                                          0;

                                        const nestedExpanded =
                                          mobileNestedExpanded ===
                                          child.label;

                                        if (hasNestedChildren) {
                                          return (
                                            <div
                                              key={
                                                child.label
                                              }
                                            >
                                              <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm text-white hover:bg-navy-700 hover:text-gold-300 transition"
                                                aria-expanded={
                                                  nestedExpanded
                                                }
                                                onClick={() =>
                                                  setMobileNestedExpanded(
                                                    (
                                                      current
                                                    ) =>
                                                      current ===
                                                        child.label
                                                        ? null
                                                        : child.label
                                                  )
                                                }
                                              >
                                                <span>
                                                  {
                                                    child.label
                                                  }
                                                </span>

                                                <motion.span
                                                  animate={{
                                                    rotate:
                                                      nestedExpanded
                                                        ? 180
                                                        : 0,
                                                  }}
                                                  transition={{
                                                    duration:
                                                      0.18,
                                                  }}
                                                  aria-hidden="true"
                                                >
                                                  ▾
                                                </motion.span>
                                              </button>

                                              <AnimatePresence
                                                initial={
                                                  false
                                                }
                                              >
                                                {nestedExpanded && (
                                                  <motion.div
                                                    variants={
                                                      mobilePanelVariants
                                                    }
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="exit"
                                                    className="overflow-hidden"
                                                  >
                                                    <div className="mt-1 mb-2 rounded-xl overflow-hidden border border-white/10 bg-white">
                                                      {child.children.map(
                                                        (
                                                          nestedChild,
                                                          nestedIdx
                                                        ) => (
                                                          <Link
                                                            key={
                                                              nestedChild.label
                                                            }
                                                            to={
                                                              nestedChild.to
                                                            }
                                                            className={`block px-4 py-3 text-sm transition ${
                                                              nestedIdx === 0 ||
                                                              nestedIdx ===
                                                              child.children.length -
                                                              1
                                                                ? "bg-navy-700 text-white hover:bg-navy-800 hover:text-gold-300"
                                                                : "bg-white text-black/80 hover:text-navy-700 hover:bg-gold-50"
                                                            }`}
                                                            onClick={() => {
                                                              setMobileOpen(
                                                                false
                                                              );
                                                              setMobileExpanded(
                                                                null
                                                              );
                                                              setMobileNestedExpanded(
                                                                null
                                                              );
                                                            }}
                                                          >
                                                            {
                                                              nestedChild.label
                                                            }
                                                          </Link>
                                                        )
                                                      )}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          );
                                        }

                                        return (
                                          <Link
                                            key={
                                              child.label
                                            }
                                            to={
                                              child.to
                                            }
                                            className="block rounded-xl px-4 py-2.5 text-sm text-white hover:bg-navy-700 hover:text-gold-300 transition"
                                            onClick={() => {
                                              setMobileOpen(
                                                false
                                              );
                                              setMobileExpanded(
                                                null
                                              );
                                              setMobileNestedExpanded(
                                                null
                                              );
                                            }}
                                          >
                                            {
                                              child.label
                                            }
                                          </Link>
                                        );
                                      }
                                    )}
                                  </div>
                                </motion.div>
                              )}
                          </AnimatePresence>

                          {idx !==
                            items.length -
                            1 && (
                              <div className="mx-4 h-px bg-white/20" />
                            )}
                        </div>
                      );
                    }
                  )}

                  {/* Mobile Apply Button */}
                  <div className="mt-2 px-2">
                    <Link
                      to="/application-process"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileExpanded(
                          null
                        );
                        setMobileNestedExpanded(
                          null
                        );
                      }}
                      className="block text-center w-full rounded-xl px-4 py-3 text-sm font-bold text-navy-900 bg-gold-500 hover:bg-gold-400 transition"
                    >
                      Apply Now
                    </Link>
                  </div>

                  {/* Mobile Contact Numbers */}
                  <div className="mt-3 border-t border-white/15 pt-3 px-2">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide mb-2">
                      Contact Us
                    </p>

                    <div className="grid grid-cols-1 gap-2">

                      <a
                        href={CONTACT.phoneHref}
                        className="select-text text-center rounded-xl bg-navy-700 hover:bg-navy-600 border border-gold-500/20 px-3 py-2 text-sm text-white transition"
                      >
                        {CONTACT.phone}
                      </a>

                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </header>
  );
}

/* =========================
   APPLY / REGISTER BUTTON
   Gold animated border + shimmer. On the Private Candidates page it
   becomes "Register Now" and opens WhatsApp.
========================== */
function ApplyButton({ onClick }) {
  const { pathname } = useLocation();
  const isPrivate = pathname.toLowerCase().startsWith("/private-candidates");
  const inner = (
    <span className="relative inline-flex items-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-gold-500 group-hover:text-navy-900">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400 group-hover:bg-navy-900" />
      </span>
      {isPrivate ? "Register Now" : "Apply Now"}
      <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
    </span>
  );
  const cls = "apply-ring group relative hidden sm:inline-flex rounded-full p-[2px] whitespace-nowrap shadow-lg shadow-gold-500/20";
  return isPrivate ? (
    <Link to="/private-candidates/signup" className={cls} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button type="button" className={cls} onClick={() => { if (onClick) onClick(); openApply(); }}>
      {inner}
    </button>
  );
}