/* =====================================================================
   Real mock paper: Computer Science 0478 · Paper 1 Computer Systems · Mock 3
   The student reads the paper (page images) and types answers in the answer
   sheet. Objective parts are checked exactly; written parts are checked against
   mark-scheme points (keywords). Exams team can review and adjust any mark.
===================================================================== */

const re = (s) => new RegExp(s, "i");

const TERMS = [
  "certificate", "database", "domain name server (DNS)", "encryption", "hypertext markup language (HTML)",
  "internet protocol (IP) address", "low-level language", "protocol", "request", "uniform resource locator (URL)",
  "web browser", "web server",
];

export const CS_PAPER = {
 "id": "cs0478-m3",
 "subject": "Computer Science",
 "board": "Cambridge IGCSE",
 "code": "0478",
 "title": "Paper 1 Computer Systems",
 "mock": "Mock 3",
 "minutes": 105,
 "total": 75,
 "pages": [
  "/mock/cs0478-m3-1.webp",
  "/mock/cs0478-m3-2.webp",
  "/mock/cs0478-m3-3.webp",
  "/mock/cs0478-m3-4.webp",
  "/mock/cs0478-m3-5.webp",
  "/mock/cs0478-m3-6.webp",
  "/mock/cs0478-m3-7.webp",
  "/mock/cs0478-m3-8.webp",
  "/mock/cs0478-m3-9.webp",
  "/mock/cs0478-m3-10.webp",
  "/mock/cs0478-m3-11.webp",
  "/mock/cs0478-m3-12.webp",
  "/mock/cs0478-m3-13.webp",
  "/mock/cs0478-m3-14.webp",
  "/mock/cs0478-m3-15.webp"
 ],
 "questions": [
  {
   "q": 1,
   "page": 2,
   "parts": [
    {
     "id": "1a",
     "label": "(a)",
     "type": "mcq",
     "marks": 1,
     "prompt": "Tick one box to show which is the largest unit of measurement for data storage.",
     "opts": [
      "exbibyte (EiB)",
      "gibibyte (GiB)",
      "mebibyte (MiB)",
      "tebibyte (TiB)"
     ]
    },
    {
     "id": "1b",
     "label": "(b)",
     "type": "exact",
     "marks": 1,
     "prompt": "Calculate how many kibibytes (KiB) are equal to 3072 bytes."
    },
    {
     "id": "1c",
     "label": "(c)",
     "type": "mcq",
     "marks": 1,
     "prompt": "Tick one box to show the correct statement about why data is converted to binary for storing in a computer.",
     "opts": [
      "Binary uses numbers and characters to store all the data.",
      "Binary is one type of data that a computer can store.",
      "Data is processed by logic gates that can only be set as binary numbers.",
      "Only binary numbers can be input into a computer."
     ]
    }
   ]
  },
  {
   "q": 2,
   "page": 3,
   "parts": [
    {
     "id": "2ai",
     "label": "(a)(i)",
     "type": "kw",
     "marks": 1,
     "prompt": "Identify the name of the register that stores the location in RAM of the next instruction."
    },
    {
     "id": "2aii",
     "label": "(a)(ii)",
     "type": "points",
     "marks": 3,
     "long": true,
     "prompt": "Describe the actions that take place in the decode stage of the FDE cycle."
    },
    {
     "id": "2aiii",
     "label": "(a)(iii)",
     "type": "kw",
     "marks": 1,
     "prompt": "Give the name of one component that is used in the execute stage of the FDE cycle."
    },
    {
     "id": "2b",
     "label": "(b)",
     "type": "points",
     "marks": 2,
     "long": true,
     "prompt": "Explain the advantages of the smartphone having a quad-core processor instead of a dual-core processor."
    },
    {
     "id": "2ci",
     "label": "(c)(i)",
     "type": "list",
     "n": 2,
     "marks": 2,
     "prompt": "Identify two input devices that could be built into the smartphone."
    },
    {
     "id": "2cii",
     "label": "(c)(ii)",
     "type": "list",
     "n": 2,
     "marks": 2,
     "prompt": "Identify two output devices that could be built into the smartphone."
    }
   ]
  },
  {
   "q": 3,
   "page": 5,
   "parts": [
    {
     "id": "3a",
     "label": "(a)",
     "type": "kw",
     "marks": 1,
     "prompt": "Give one other example of a number system."
    },
    {
     "id": "3b",
     "label": "(b)",
     "type": "exact",
     "marks": 1,
     "prompt": "Convert the hexadecimal number 2A to an 8-bit binary number."
    },
    {
     "id": "3c",
     "label": "(c)",
     "type": "exact",
     "marks": 1,
     "prompt": "Convert the hexadecimal number 101 to a 12-bit binary number."
    },
    {
     "id": "3d",
     "label": "(d)",
     "type": "exact",
     "marks": 1,
     "prompt": "Convert the binary number 01110001 to a hexadecimal number."
    },
    {
     "id": "3e",
     "label": "(e)",
     "type": "exact",
     "marks": 1,
     "prompt": "Convert the binary number 001011011000 to a hexadecimal number."
    },
    {
     "id": "3f",
     "label": "(f)",
     "type": "exact",
     "marks": 4,
     "prompt": "Add the binary numbers 10011101 and 11110000 using binary addition. Give your answer in binary."
    }
   ]
  },
  {
   "q": 4,
   "page": 7,
   "parts": [
    {
     "id": "4a",
     "label": "(a)",
     "type": "kw",
     "marks": 1,
     "prompt": "State the purpose of the optical mouse."
    },
    {
     "id": "4b",
     "label": "(b)",
     "type": "points",
     "marks": 4,
     "long": true,
     "prompt": "Describe how the serial half-duplex data transmission method transmits the data."
    },
    {
     "id": "4c",
     "label": "(c)",
     "type": "points",
     "marks": 2,
     "long": true,
     "prompt": "Give two other benefits of using the USB cable to connect the optical mouse to the computer."
    },
    {
     "id": "4d",
     "label": "(d)",
     "type": "table",
     "marks": 4,
     "prompt": "Complete the table with the missing functions and roles of an operating system.",
     "head": [
      "function",
      "role"
     ],
     "rows": [
      {
       "given": "providing an interface",
       "side": 1
      },
      {
       "given": "It makes sure that two processes do not access the same memory location at the same time.",
       "side": 0
      },
      {
       "given": "managing interrupts",
       "side": 1
      },
      {
       "given": "It allows the user to set a username and password.",
       "side": 0
      }
     ]
    }
   ]
  },
  {
   "q": 5,
   "page": 9,
   "parts": [
    {
     "id": "5a",
     "label": "(a)",
     "type": "kw",
     "marks": 1,
     "prompt": "Give the purpose of the compiler and the interpreter."
    },
    {
     "id": "5b",
     "label": "(b)",
     "type": "kw",
     "marks": 1,
     "prompt": "Identify one other type of translator."
    },
    {
     "id": "5c",
     "label": "(c)",
     "type": "fix",
     "marks": 4,
     "prompt": "Two of the statements (A–E) are not correct. Give the letter of each incorrect statement and suggest a corrected statement."
    },
    {
     "id": "5d",
     "label": "(d)",
     "type": "funcs",
     "marks": 4,
     "prompt": "Identify two other functions of an IDE and state the purpose of each function."
    }
   ]
  },
  {
   "q": 6,
   "page": 11,
   "parts": [
    {
     "id": "6a",
     "label": "(a)",
     "type": "cloze",
     "marks": 5,
     "prompt": "Complete the paragraph about locating and retrieving web pages using the terms from the list.",
     "terms": [
      "certificate",
      "database",
      "domain name server (DNS)",
      "encryption",
      "hypertext markup language (HTML)",
      "internet protocol (IP) address",
      "low-level language",
      "protocol",
      "request",
      "uniform resource locator (URL)",
      "web browser",
      "web server"
     ],
     "text": [
      "The user types the URL into the address bar. The web browser sends the domain name from the URL to the",
      ". This searches for the matching",
      "and sends this back to the",
      ". The web browser sends a",
      "to the web server for the web page. The web server then sends the data for the web page back to the web browser. The web browser renders the",
      "to display the web page."
     ],
     "ans": [
      "",
      "",
      "",
      "",
      ""
     ]
    },
    {
     "id": "6b",
     "label": "(b)",
     "type": "points",
     "marks": 5,
     "long": true,
     "prompt": "Complete and annotate the diagram to show the process of sending the data using SSL. (Describe the steps between the web browser and the web server.)"
    }
   ]
  },
  {
   "q": 7,
   "page": 13,
   "parts": [
    {
     "id": "7a",
     "label": "(a)",
     "type": "kw",
     "marks": 1,
     "prompt": "Give one suitable sensor that the robot animal could use to identify a clapping sound."
    },
    {
     "id": "7b",
     "label": "(b)",
     "type": "list",
     "n": 2,
     "marks": 2,
     "prompt": "Give two suitable sensors that the robot animal could use to identify if an object is nearby."
    },
    {
     "id": "7ci",
     "label": "(c)(i)",
     "type": "kw",
     "marks": 1,
     "prompt": "Give one other characteristic of the robot animal that makes it a robot."
    },
    {
     "id": "7cii",
     "label": "(c)(ii)",
     "type": "points",
     "marks": 3,
     "long": true,
     "prompt": "Describe how the microprocessor uses the data from the sensor to stop the robot animal when an object is less than 10 cm away."
    },
    {
     "id": "7d",
     "label": "(d)",
     "type": "points",
     "marks": 4,
     "long": true,
     "prompt": "Explain how the robot animal can use AI to learn where objects are in a room."
    }
   ]
  },
  {
   "q": 8,
   "page": 14,
   "parts": [
    {
     "id": "8a",
     "label": "(a)",
     "type": "points",
     "marks": 3,
     "long": true,
     "prompt": "Explain how the computer represents the text."
    },
    {
     "id": "8bi",
     "label": "(b)(i)",
     "type": "list",
     "n": 2,
     "marks": 2,
     "prompt": "Give two methods of compression that the student could use to compress the video."
    },
    {
     "id": "8bii",
     "label": "(b)(ii)",
     "type": "table",
     "marks": 5,
     "prompt": "Complete the table with the missing terms and descriptions about sound and images.",
     "head": [
      "term",
      "description"
     ],
     "rows": [
      {
       "given": "the smallest unit of an image that is made up of one colour",
       "side": 0
      },
      {
       "given": "sound sample",
       "side": 1
      },
      {
       "given": "the dimensions of an image",
       "side": 0
      },
      {
       "given": "colour depth",
       "side": 1
      },
      {
       "given": "the number of samples that are recorded each second",
       "side": 0
      }
     ]
    }
   ]
  }
 ]
};

export const paperFor = (qualification, subject) =>
  subject === "Computer Science" && !/IAL|AS|A2|A Level/i.test(qualification || "") ? CS_PAPER : null;

export const allParts = (paper) => paper.questions.flatMap((q) => q.parts.map((p) => ({ ...p, q: q.q, page: q.page })));

const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, "");
const txt = (s) => String(s ?? "").trim();

/* returns { got, max, review } — review = written answer, teacher should confirm */
export function markPart(p, a) {
  const max = p.marks;
  switch (p.type) {
    case "mcq": return { got: a === p.ans ? max : 0, max };
    case "exact": {
      if (p.accept.includes(norm(a))) return { got: max, max };
      const part = (p.partial || []).find((x) => x.accept.includes(norm(a)));
      return { got: part ? part.marks : 0, max };
    }
    case "kw": return { got: p.kw.some((k) => k.test(txt(a))) ? max : 0, max, review: txt(a).length > 0 && !p.kw.some((k) => k.test(txt(a))) };
    case "points": {
      const t = txt(a); const hit = p.pts.filter((k) => k.test(t)).length;
      return { got: Math.min(max, hit), max, review: t.length > 0 };
    }
    case "list": {
      const used = new Set(); let got = 0;
      (a || []).forEach((v) => { const i = p.kw.findIndex((k, j) => !used.has(j) && k.test(txt(v))); if (i >= 0) { used.add(i); got++; } });
      return { got: Math.min(max, got), max };
    }
    case "table": {
      const got = p.rows.reduce((n, r, i) => n + (r.kw.test(txt((a || [])[i])) ? 1 : 0), 0);
      return { got: Math.min(max, got), max, review: true };
    }
    case "cloze": return { got: p.ans.reduce((n, x, i) => n + ((a || [])[i] === x ? 1 : 0), 0), max };
    case "fix": {
      let got = 0; const seen = new Set();
      [0, 1].forEach((i) => {
        const L = txt((a || {})[`l${i}`]).toUpperCase().slice(0, 1); const c = txt((a || {})[`c${i}`]);
        const rule = p.wrong[L];
        if (rule && !seen.has(L)) { seen.add(L); got++; if (rule.kw.test(c) && !(rule.neg && rule.neg.test(c))) got++; }
      });
      return { got: Math.min(max, got), max, review: true };
    }
    case "funcs": {
      let got = 0; const used = new Set();
      [0, 1].forEach((i) => {
        const f = txt((a || {})[`f${i}`]); const pu = txt((a || {})[`p${i}`]);
        const j = p.kw.findIndex((k, x) => !used.has(x) && k.test(f));
        if (j >= 0) { used.add(j); got++; if (pu.length >= 10) got++; }
      });
      return { got: Math.min(max, got), max, review: true };
    }
    default: return { got: 0, max };
  }
}

export function markPaper(paper, answers) {
  const parts = allParts(paper);
  const marks = {};
  let score = 0; let review = 0;
  parts.forEach((p) => { const r = markPart(p, answers[p.id]); marks[p.id] = r.got; score += r.got; if (r.review) review++; });
  return { marks, score, total: paper.total, review };
}

export const answered = (p, a) => {
  if (a === undefined || a === null) return false;
  if (typeof a === "number") return true;
  if (typeof a === "string") return a.trim().length > 0;
  if (Array.isArray(a)) return a.some((x) => x && String(x).trim());
  return Object.values(a).some((x) => x && String(x).trim());
};

export function answerText(p, a) {
  if (!answered(p, a)) return "—";
  switch (p.type) {
    case "mcq": return `${"ABCD"[a]}  ${p.opts[a]}`;
    case "list": case "cloze": return a.filter(Boolean).map((x, i) => `${i + 1}. ${x}`).join("   ");
    case "table": return p.rows.map((r, i) => `${r.given.slice(0, 28)}… → ${a[i] || "—"}`).join("  |  ");
    case "fix": return `${a.l0 || "?"}: ${a.c0 || "—"}  |  ${a.l1 || "?"}: ${a.c1 || "—"}`;
    case "funcs": return `${a.f0 || "?"} – ${a.p0 || "—"}  |  ${a.f1 || "?"} – ${a.p1 || "—"}`;
    default: return String(a);
  }
}
