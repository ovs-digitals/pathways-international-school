import { useState } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { ADDRESS, ADDRESS_LINES, CONTACT, MAP_QUERY } from "./siteData";

// Both Pakistan offices — used on Home, Contact and in the footer
export const OFFICES = [
  {
    key: "niazi",
    name: "Head Office",
    tag: "Niazi Square",
    lines: ADDRESS_LINES,
    phone: CONTACT.phone,
    phoneHref: CONTACT.phoneHref,
    query: MAP_QUERY,
  },
];
export { ADDRESS };

export const mapUrl = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}`;

export default function OfficeLocations({ eyebrow = "Head office", title = "Our location", text, compact = false }) {
  const [active, setActive] = useState(0);
  const office = OFFICES[active];

  return (
    <section className={compact ? "" : "bg-white py-16 md:py-24"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-800 md:text-5xl">{title}</h2>
          <span className="gold-rule mt-5" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            {text || "Our head office in Gujranwala is ready to welcome you. Visit us, call us, or get directions in one tap."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            {OFFICES.map((o, i) => {
              const on = i === active;
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-3xl border-2 p-6 text-left transition duration-300 ${
                    on
                      ? "border-navy-700 bg-navy-50 shadow-xl shadow-navy-950/10"
                      : "border-slate-100 bg-white hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
                  }`}
                >
                  <span className={`absolute inset-y-0 left-0 w-1.5 bg-gold-500 transition ${on ? "opacity-100" : "opacity-0"}`} />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full bg-gold-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-800">
                        Pakistan · {o.tag}
                      </span>
                      <h3 className="mt-3 font-serif text-2xl font-semibold text-navy-800">{o.name}</h3>
                    </div>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition ${
                        on ? "bg-navy-700 text-gold-400" : "bg-slate-100 text-slate-500 group-hover:bg-gold-100 group-hover:text-navy-800"
                      }`}
                    >
                      <MapPin className={`h-5 w-5 ${on ? "animate-bounce" : ""}`} />
                    </span>
                  </div>
                  <div className="mt-3 space-y-0.5 text-sm leading-6 text-slate-600">
                    {o.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                  <a
                    href={o.phoneHref}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-gold-700"
                  >
                    <Phone className="h-4 w-4" /> {o.phone}
                  </a>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/15 ring-1 ring-slate-100">
            <iframe
              key={office.key}
              title={`${office.name} map`}
              src={`${mapUrl(office.query)}&z=16&output=embed`}
              className="panel-in h-80 w-full border-0 lg:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapUrl(office.query)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-navy-700 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-900"
            >
              Open {office.name} in Google Maps <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
