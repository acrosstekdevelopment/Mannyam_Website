import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory/80 border-t border-olive/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: About */}
        <div className="space-y-4">
          <Link href="/" className="flex flex-col select-none">
            <span className="font-display text-xl font-bold tracking-widest text-gold uppercase">
              MANNYAM
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-ivory/55 mt-0.5 font-light">
              The Story of India
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-ivory/60 font-light">
            MANNYAM designs bespoke travel journeys across the Indian subcontinent. We craft stories of heritage, culture, and nature for the discerning traveller.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <Link href="/experiences" className="hover:text-gold transition-colors">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/festivals" className="hover:text-gold transition-colors">
                Festivals
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="hover:text-gold transition-colors">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/journeys" className="hover:text-gold transition-colors">
                Journeys
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-gold transition-colors">
                Journal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <span className="block text-ivory/40">Studio Address</span>
              14 Heritage Enclave, New Delhi, India
            </li>
            <li>
              <span className="block text-ivory/40">Email Enquiries</span>
              <a href="mailto:journeys@mannyam.in" className="hover:text-gold transition-colors">
                journeys@mannyam.in
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Subscribe
          </h4>
          <p className="text-xs text-ivory/60 leading-relaxed font-light">
            Subscribe to receive curated itineraries, travel stories, and festival guides from across the subcontinent.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-ivory/5 border border-olive/20 text-xs px-3.5 py-2.5 rounded-sm w-full focus:outline-none focus:border-gold/50 text-ivory placeholder:text-ivory/30"
              required
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold/90 text-ink font-semibold text-xs px-4 py-2.5 rounded-sm transition-all uppercase tracking-wider whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-olive/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-ivory/40 uppercase tracking-widest font-light">
        <p>&copy; {currentYear} MANNYAM Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gold transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gold transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
