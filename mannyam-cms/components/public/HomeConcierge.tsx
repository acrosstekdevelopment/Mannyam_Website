"use client";

import { useState } from "react";
import Link from "next/link";

const CHIPS = [
  "See a festival",
  "A honeymoon",
  "With our children",
  "Heritage and palaces",
  "Nature and wildlife",
  "Food and markets",
  "Wellness and quiet",
  "Off the beaten track",
];

export function HomeConcierge() {
  const [prompt, setPrompt] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);

  function toggleChip(chip: string) {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  }

  return (
    <div className="bg-paper border border-gold/25 rounded-[20px] shadow-[0_18px_48px_-24px_rgba(30,35,25,.26)] p-5 md:p-[34px_40px]">
      <span className="inline-flex items-center gap-2 text-[9.5px] uppercase tracking-[0.24em] text-gold font-medium">
        <span className="w-[7px] h-[7px] rounded-full bg-gold shadow-[0_0_0_4px_rgba(186,136,56,.18)] animate-pulse" />
        Ask MANNYAM, your journey concierge
      </span>

      <h2 className="font-display text-[26px] md:text-[36px] mt-3 leading-tight">
        Tell us your India.<br />We will point the way.
      </h2>

      <p className="font-sans text-[13px] md:text-[14.5px] text-olive/65 mt-2 leading-relaxed font-light">
        Describe the journey you are dreaming of, in your own words. We will shape a first idea and take you straight to the right place.
      </p>

      <div className="flex flex-wrap gap-2 md:gap-[10px_18px] mt-3.5 text-[11.5px] md:text-[12.5px] text-olive/60">
        <span className="flex items-center gap-[7px]"><b className="w-5 h-5 rounded-full bg-cream border border-gold/30 text-gold grid place-items-center font-display italic text-[12px]">1</b> Tell us what you fancy</span>
        <span className="flex items-center gap-[7px]"><b className="w-5 h-5 rounded-full bg-cream border border-gold/30 text-gold grid place-items-center font-display italic text-[12px]">2</b> We suggest a starting point</span>
        <span className="flex items-center gap-[7px]"><b className="w-5 h-5 rounded-full bg-cream border border-gold/30 text-gold grid place-items-center font-display italic text-[12px]">3</b> You explore or ask a curator</span>
      </div>

      <div className="mt-3.5 border border-olive/10 rounded-[14px] bg-cream/50 p-1 focus-within:border-gold transition-colors">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border-0 bg-transparent resize-none font-sans font-light text-[14px] leading-relaxed text-ink p-3 min-h-[74px] outline-none placeholder:text-olive/40"
          placeholder="For example: We would love to see Holi near Mathura, then somewhere calm and romantic afterwards."
        />
      </div>

      <div className="flex flex-wrap gap-[7px] mt-3">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => toggleChip(chip)}
            className={`text-[11px] px-3 py-2 rounded-full border transition-colors cursor-pointer ${
              activeChips.includes(chip)
                ? "bg-olive text-ivory border-olive"
                : "bg-white border-olive/10 text-ink hover:border-gold"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap mt-3.5">
        <Link
          href="/enquire"
          className="inline-flex items-center gap-2 font-sans font-medium text-[11.5px] tracking-[0.16em] uppercase bg-gold text-ink px-[22px] py-[14px] rounded-full transition-all hover:bg-[#cf9a44]"
        >
          Shape my journey <span>&rarr;</span>
        </Link>
        <span className="flex items-center gap-1.5 text-[10.5px] text-olive/50">
          <svg className="w-[13px] h-[13px] text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
          Private and secure.
        </span>
      </div>
    </div>
  );
}
