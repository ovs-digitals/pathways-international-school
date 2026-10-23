import { useState } from "react";
import { ArrowRight, Clock, MapPin, Phone, Send } from "lucide-react";
import { PageHero, Reveal, TiltCard } from "./Motion";
import { WHATSAPP_LINK, WHATSAPP_NUMBER, WhatsAppIcon } from "./WhatsAppButton";
import OfficeLocations, { OFFICES, mapUrl } from "./OfficeLocations";
import { CONTACT } from "./siteData";


const channels = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    value: "Chat with admissions",
    note: "Fastest reply",
    href: WHATSAPP_LINK,
    external: true,
    accent: "bg-[#25D366] text-white",
  },
  {
    icon: Phone,
    title: "Call / WhatsApp",
    value: CONTACT.phone,
    note: "Admissions helpline",
    href: CONTACT.phoneHref,
    accent: "bg-[#25D366] text-white",
  },
  {
    icon: Phone,
    title: "Landline",
    value: CONTACT.landline,
    note: "Office line",
    href: CONTACT.landlineHref,
    accent: "bg-navy-700 text-gold-400",
  },
  {
    icon: Send,
    title: "Email",
    value: CONTACT.email,
    note: "For detailed queries",
    href: `mailto:${CONTACT.email}`,
    accent: "bg-gold-500 text-navy-900",
  },
];

const topics = ["Admissions", "Private Candidates", "Programmes & Subjects", "Fee Information", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", topic: topics[0], message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const text = [
      "Assalam o Alaikum, Pathways International School.",
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-100";

  return (
    <main className="overflow-hidden bg-[#f6f8fc] text-slate-900">
      <PageHero
        eyebrow="Contact Us"
        title="Let's start a"
        accent="conversation."
        image="st-stream-it.webp"
        text="Questions about admissions, programmes or private candidates? Our team is here to help — choose the way that suits you best."
      />

      {/* ================= CHANNELS ================= */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, ...c }, i) => (
            <Reveal key={c.title} variant="up" delay={i * 0.1}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className="block h-full"
              >
                <TiltCard className="group h-full rounded-3xl bg-white p-6 shadow-xl shadow-navy-950/10 ring-1 ring-slate-100 transition hover:ring-gold-300">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.accent} transition group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-700">{c.title}</p>
                  <p className="mt-1 break-words text-base font-bold text-navy-800">{c.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{c.note}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-gold-600 transition group-hover:translate-x-1" />
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FORM + VISIT ================= */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Reveal variant="left">
            <div className="gold-border">
              <div className="rounded-[1.4rem] bg-white p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Send a Message</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-800 md:text-4xl">
                  We'd love to <span className="italic text-gold-600">hear from you.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Fill in the form and press send — your message opens in WhatsApp, ready to deliver to
                  our admissions team.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Full Name</span>
                    <input required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Phone (optional)</span>
                    <input value={form.phone} onChange={set("phone")} className={field} placeholder="03XX XXXXXXX" />
                  </label>
                  <div className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-700">Topic</span>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm((f) => ({ ...f, topic: t }))}
                          className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                            form.topic === t
                              ? "bg-navy-700 text-gold-300 shadow-lg shadow-navy-950/20"
                              : "bg-slate-100 text-slate-600 hover:bg-gold-100 hover:text-navy-800"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Message</span>
                    <textarea
                      required
                      value={form.message}
                      onChange={set("message")}
                      className={`${field} min-h-[150px]`}
                      placeholder="How can we help you?"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25 transition hover:from-gold-300 hover:to-gold-400 sm:w-auto"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" className="flex flex-col gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Our head office</p>
              <div className="mt-4 space-y-4">
                {OFFICES.map((o) => (
                  <div key={o.key} className="group flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-gold-50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-700 text-gold-400 transition group-hover:rotate-6">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div className="text-sm leading-6 text-slate-600">
                      <p className="font-bold text-navy-800">{o.name}</p>
                      {o.lines.map((l) => <p key={l}>{l}</p>)}
                      <a href={mapUrl(o.query)} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-gold-700">
                        Get directions <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="navy-pattern relative overflow-hidden rounded-3xl p-7 text-white shadow-xl">
              <div aria-hidden className="blob absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/20 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <Clock className="h-6 w-6 text-gold-400" />
                <h3 className="font-serif text-xl font-semibold">Office Hours</h3>
              </div>
              <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-white/[0.07] px-5 py-4">
                <span className="text-sm text-white/80">{CONTACT.hoursDays}</span>
                <span className="font-bold text-gold-300">{CONTACT.hoursTime}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <OfficeLocations eyebrow="Find us" title="Our location" />
    </main>
  );
}