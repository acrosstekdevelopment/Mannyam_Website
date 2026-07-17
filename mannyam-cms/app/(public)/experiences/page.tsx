import Link from "next/link";
import { getPublishedPackages } from "@/lib/data/public";

export const revalidate = 0; // Ensure fresh server-side renders

export default async function ExperiencesPage() {
  const packages = await getPublishedPackages();

  return (
    <div className="min-h-screen pb-24 font-sans bg-ivory text-ink selection:bg-gold/20">
      
      {/* Header section */}
      <section className="bg-cream/40 border-b border-olive/10 py-16 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold block">
            Curated Experiences
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-olive tracking-tight leading-tight">
            Our Bespoke Journeys
          </h1>
          <p className="font-display text-base sm:text-lg text-olive/75 italic max-w-2xl mx-auto font-light leading-relaxed">
            Immersive dispatches of heritage, nature, and culture custom designed for the discerning traveller.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        {packages.length === 0 ? (
          <div className="bg-cream/40 border border-dashed border-olive/15 rounded-lg p-16 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-medium text-olive">No experiences scheduled at this time</h3>
            <p className="font-sans text-sm text-olive/60 mt-2">
              We are currently curating new bespoke itineraries. Please contact our specialists to design your journey.
            </p>
            <div className="mt-6">
              <Link
                href="/enquire"
                className="inline-block font-sans text-xs font-semibold uppercase tracking-wider text-ivory bg-gold hover:bg-gold/90 px-8 py-4 rounded-sm transition-all duration-300"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-cream/30 border border-olive/10 hover:border-gold/30 rounded-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-olive/5 transition-all duration-500"
              >
                <div className="aspect-[4/3] bg-olive/5 relative overflow-hidden">
                  {pkg.featured_image_url ? (
                    <img
                      src={pkg.featured_image_url}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-olive/20 font-display italic text-lg bg-olive/5">
                      No Image Available
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-ink/80 text-ivory text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 backdrop-blur-sm rounded-sm">
                    {pkg.type}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-olive group-hover:text-gold transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <p className="font-sans text-xs text-olive/75 line-clamp-3 font-light leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                  <Link
                    href={pkg.type === "Festival" ? `/festivals/${pkg.slug}` : `/experiences/${pkg.slug}`}
                    className="font-sans text-[11px] font-bold uppercase tracking-wider text-gold hover:text-olive transition-colors flex items-center gap-1.5 pt-2"
                  >
                    Explore Itinerary &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
