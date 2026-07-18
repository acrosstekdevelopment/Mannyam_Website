import React from "react";

interface TilesData {
  heading?: string;
  tiles?: { title: string; description: string }[];
}

export function TilesBlock({ data }: { data: TilesData }) {
  const { heading, tiles } = data;
  if (!tiles || tiles.length === 0) return null;

  return (
    <section className="bg-ivory px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h3 className="font-display text-2xl md:text-3xl font-bold text-olive mb-6">
            {heading}
          </h3>
        )}
        <div className="grid gap-3">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="flex gap-4 items-start bg-paper border border-olive/8 rounded-[14px] p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:translate-x-1"
            >
              <span className="font-display italic text-xl text-gold leading-none flex-shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-display text-lg font-medium text-olive">
                  {tile.title}
                </h4>
                <p className="font-sans text-sm text-olive/65 mt-1 leading-relaxed font-light">
                  {tile.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
