"use client";

import { useEffect } from "react";
import { Button } from "@/components/public/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ChunkLoadError means the deployed build changed and old chunks are gone.
    // A full reload fetches the new HTML with correct chunk references.
    if (
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module")
    ) {
      window.location.reload();
      return;
    }

    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-ink text-ivory px-6 text-center">
      <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight text-ivory">
          An unexpected <span className="text-gold italic">detour.</span>
        </h1>
        <p className="text-lg md:text-xl text-ivory/80 font-light max-w-md mx-auto leading-relaxed">
          Something went wrong on our end. Please try again or contact us if the issue persists.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="ghost" className="w-full sm:w-auto px-8" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="gold" className="w-full sm:w-auto px-8" onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
