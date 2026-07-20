"use client";

import React, { useState } from "react";

interface FaqData {
  heading?: string;
  subtitle?: string;
  items?: { question: string; answer: string }[];
}

export function FaqBlock({ data }: { data: FaqData }) {
  const { heading, subtitle, items } = data;
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="bg-ivory px-6 py-14">
      <div className="max-w-3xl mx-auto">
        {heading && (
          <div className="mb-8">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.24em] text-gold block mb-2">
              Good to know
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-olive">
              {heading}
            </h3>
            {subtitle && (
              <p className="font-sans text-sm text-olive/60 mt-2 leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid gap-3">
          {items.map((item, i) => (
            <details
              key={i}
              open={i === openIndex}
              className="group border border-olive/10 rounded-[14px] bg-paper overflow-hidden transition-colors open:border-gold/30 open:shadow-lg"
            >
              <summary
                className="flex items-center gap-3 p-4 md:p-5 cursor-pointer font-display text-[17px] text-olive leading-snug list-none [&::-webkit-details-marker]:hidden"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? -1 : i);
                }}
              >
                <span className="flex-1">{item.question}</span>
                <span className="w-6 h-6 flex-shrink-0 rounded-full border border-gold/30 flex items-center justify-center text-gold text-xs transition-all group-open:bg-gold group-open:text-ink group-open:border-gold">
                  {openIndex === i ? "−" : "+"}
                </span>
              </summary>
              {openIndex === i && (
                <div className="px-4 pb-4 md:px-5 md:pb-5 font-sans text-sm text-olive/70 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              )}
            </details>
          ))}
        </div>

        {/* CTA Section below FAQ */}
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <p className="font-display italic text-olive/80 text-[19px] mb-6">
            Make the celebration the heart of your trip.
          </p>
          <a href="/enquire" className="bg-[#3a4430] hover:bg-gold text-ivory px-7 py-3 rounded-full font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2">
            Plan my journey <span className="font-normal">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
