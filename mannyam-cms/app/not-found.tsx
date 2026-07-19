import Link from "next/link";
import { Button } from "@/components/public/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-ink text-ivory px-6 text-center">
      <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight text-ivory">
          This path remains <span className="text-gold italic">untravelled.</span>
        </h1>
        <p className="text-lg md:text-xl text-ivory/80 font-light max-w-md mx-auto leading-relaxed">
          The page you are looking for has been moved, removed, or never existed in the first place.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button variant="gold" className="w-full sm:w-auto px-8">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
