// Floating WhatsApp chat button — shown on every page
import { CONTACT } from "./siteData";
export const WHATSAPP_NUMBER = CONTACT.whatsapp;
export const WHATSAPP_DISPLAY = CONTACT.phone;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Assalam o Alaikum, I would like information about admissions at Pathways International School."
)}`;

export function WhatsAppIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C8.837 3 3.01 8.826 3.01 15.99c0 2.29.6 4.528 1.74 6.5L3 29l6.68-1.712a12.95 12.95 0 0 0 6.32 1.62h.005c7.165 0 12.995-5.826 12.995-12.99C29 8.826 23.17 3 16.004 3Zm0 23.71h-.004a10.77 10.77 0 0 1-5.49-1.503l-.394-.234-3.964 1.016 1.058-3.864-.257-.397a10.72 10.72 0 0 1-1.646-5.738c0-5.94 4.835-10.773 10.78-10.773 2.879 0 5.585 1.122 7.62 3.159a10.7 10.7 0 0 1 3.153 7.62c-.003 5.94-4.838 10.774-10.856 10.774Zm5.91-8.07c-.324-.162-1.917-.946-2.214-1.054-.297-.108-.513-.162-.729.162-.216.324-.837 1.054-1.026 1.27-.189.216-.378.243-.702.081-.324-.162-1.368-.504-2.606-1.608-.963-.859-1.613-1.92-1.802-2.244-.189-.324-.02-.5.142-.661.146-.145.324-.378.486-.567.162-.189.216-.324.324-.54.108-.216.054-.405-.027-.567-.081-.162-.729-1.757-.999-2.405-.263-.632-.53-.546-.729-.556l-.621-.011a1.19 1.19 0 0 0-.864.405c-.297.324-1.134 1.108-1.134 2.702 0 1.594 1.161 3.135 1.323 3.351.162.216 2.285 3.49 5.536 4.893.774.334 1.378.533 1.849.683.777.247 1.484.212 2.043.129.623-.093 1.917-.784 2.187-1.54.27-.757.27-1.405.189-1.54-.081-.135-.297-.216-.621-.378Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with us on WhatsApp ${WHATSAPP_DISPLAY}`}
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-xl shadow-navy-950/20 ring-1 ring-slate-100 transition group-hover:translate-x-0 group-hover:opacity-100 sm:block sm:translate-x-2 sm:opacity-0">
        Chat with us on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
