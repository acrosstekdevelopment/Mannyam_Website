"use client";

import { useState, useEffect } from "react";

const VOICES = [
  { quote: "We came to see India. We left feeling we had been let into it.", attr: "Saoirse and Liam, Dublin, Ireland" },
  { quote: "Holi in Mathura was the most alive morning of our lives, and we always felt safe.", attr: "The Bakker family, Utrecht, Netherlands" },
  { quote: "Our curator knew exactly when to fill the day and when to leave us be.", attr: "Claire and Antoine, Lyon, France" },
  { quote: "From the airport to the last sunset, every detail was simply handled.", attr: "The Hendersons, Austin, United States" },
];

export function HomeTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % VOICES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-20 text-center bg-paper">
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-sans text-[10.5px] font-medium tracking-[0.4em] uppercase text-gold">
          In their words
        </span>
        <blockquote className="font-display italic text-[24px] md:text-[38px] leading-[1.3] mt-5 text-ink max-w-[18em] mx-auto transition-opacity duration-500">
          <span className="text-gold text-[1.4em] leading-none align-[-0.3em] mr-[0.04em]">&ldquo;</span>
          {VOICES[index].quote}
        </blockquote>
        <div className="mt-[18px] text-[11px] uppercase tracking-[0.16em] text-gold">
          {VOICES[index].attr}
        </div>
        <div className="flex gap-[7px] justify-center mt-[18px]">
          {VOICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[7px] rounded-full transition-all duration-200 cursor-pointer ${
                i === index ? "w-5 bg-gold" : "w-[7px] bg-ink/18"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
