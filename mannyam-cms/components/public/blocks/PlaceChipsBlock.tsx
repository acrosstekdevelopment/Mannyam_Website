import React from "react";

interface PlaceChipsData {
  heading?: string;
  places?: { name: string; region: string }[];
}

export function PlaceChipsBlock({ data }: { data: PlaceChipsData }) {
  const { heading, places } = data;
  if (!places || places.length === 0) return null;

  return (
    <section className="bg-ivory px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h3 className="font-display text-2xl md:text-3xl font-bold text-olive mb-5">
            {heading}
          </h3>
        )}
        <div className="flex flex-wrap gap-2">
          {places.map((place, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-full border border-olive/10 bg-cream/40 text-olive transition-colors hover:border-gold/40 hover:text-gold"
            >
              <strong className="font-medium">{place.name}</strong>
              <span className="text-olive/50">{place.region}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
