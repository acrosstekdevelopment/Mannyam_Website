import Link from "next/link";
import { getPublishedPackages, getPublishedPosts } from "@/lib/data/public";

export const revalidate = 0; // Ensure fresh server-side renders

export default async function PublicHomePage() {
  const [packages, posts] = await Promise.all([
    getPublishedPackages(undefined, 3),
    getPublishedPosts(3),
  ]);

  return (
    <div className="space-y-24 pb-24 font-sans bg-ivory text-ink selection:bg-gold/20">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cream via-ivory to-cream border-b border-olive/10 overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a443005_1px,transparent_1px),linear-gradient(to_bottom,#3a443005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold block">
            Bespoke Travel Design
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-olive tracking-tight leading-[1.1] animate-fade-in">
            Curated Journeys Across the Subcontinent
          </h1>
          <p className="font-display text-lg sm:text-xl md:text-2xl text-olive/70 italic max-w-2xl mx-auto font-light leading-relaxed">
            Crafting stories of heritage, culture, and nature for the discerning traveller.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experiences"
              className="w-full sm:w-auto font-sans text-xs font-semibold uppercase tracking-wider text-ivory bg-gold hover:bg-gold/90 px-8 py-4 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 text-center"
            >
              Explore Journeys
            </Link>
            <Link
              href="/enquire"
              className="w-full sm:w-auto font-sans text-xs font-semibold uppercase tracking-wider text-olive hover:text-gold border border-olive/30 hover:border-gold px-8 py-4 rounded-sm transition-all duration-300 text-center"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages (Journeys) Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-gold block">
              Curated Itineraries
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-olive">
              Featured Journeys
            </h2>
          </div>
          <Link
            href="/experiences"
            className="font-sans text-xs font-semibold uppercase tracking-wider text-gold hover:text-olive transition-colors flex items-center gap-2 group"
          >
            View All Journeys
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="bg-cream/40 border border-dashed border-olive/15 rounded-lg p-16 text-center">
            <h3 className="font-display text-xl font-medium text-olive">No journeys scheduled at this time</h3>
            <p className="font-sans text-sm text-olive/60 mt-2">We are currently curating new bespoke itineraries. Please check back later.</p>
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
                    href={`/experiences/${pkg.slug}`}
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

      {/* Journal Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-gold block">
              Travel Chronicles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-olive">
              From the Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="font-sans text-xs font-semibold uppercase tracking-wider text-gold hover:text-olive transition-colors flex items-center gap-2 group"
          >
            Explore the Journal
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="bg-cream/40 border border-dashed border-olive/15 rounded-lg p-16 text-center">
            <h3 className="font-display text-xl font-medium text-olive">Journal dispatches are currently being prepared</h3>
            <p className="font-sans text-sm text-olive/60 mt-2">New travel stories, guides, and cultural diaries will be published soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              // Extract category name
              const category = post.categories && !Array.isArray(post.categories) 
                ? (post.categories as { name: string }).name 
                : "Travelogue";

              const formattedDate = post.published_at 
                ? new Date(post.published_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Recently Published";

              return (
                <article
                  key={post.id}
                  className="bg-cream/10 border border-olive/5 hover:border-gold/20 rounded-sm p-6 flex flex-col justify-between group hover:shadow-lg hover:shadow-olive/5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-gold">
                      <span>{category}</span>
                      <time className="text-olive/45 font-light">{formattedDate}</time>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold text-olive group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      {post.content && (
                        <p className="font-sans text-xs text-olive/70 line-clamp-3 font-light leading-relaxed">
                          {post.content.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="font-sans text-[11px] font-bold uppercase tracking-wider text-gold hover:text-olive transition-colors flex items-center gap-1.5 pt-6"
                  >
                    Read Story &rarr;
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Concierge Plan CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-ink text-ivory p-12 md:p-20 rounded-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-olive/20 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-4 max-w-xl relative">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              Tailored Planning
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-gold">
              Bespoke Itinerary Planning
            </h2>
            <p className="font-sans text-sm text-ivory/70 font-light leading-relaxed">
              Connect with a travel specialist to start designing your journey. We will curate every experience to match your unique interests and style.
            </p>
          </div>
          <div className="relative">
            <Link
              href="/enquire"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-ink bg-gold hover:bg-gold/90 px-8 py-4.5 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 block text-center whitespace-nowrap active:scale-95"
            >
              Begin Your Story
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
