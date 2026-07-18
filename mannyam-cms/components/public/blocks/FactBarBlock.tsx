import React from "react";

interface FactBarData {
  facts?: { label: string; value: string }[];
}

export function FactBarBlock({ data }: { data: FactBarData }) {
  const { facts } = data;
  if (!facts || facts.length === 0) return null;

  return (
    <section className="bg-ivory px-6 py-8">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-6 md:gap-12 py-5 border-t border-b border-olive/10">
        {facts.map((fact, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
              {fact.label}
            </span>
            <span className="font-display text-lg md:text-xl text-olive">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
