"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ChunkLoadError means old cached HTML is referencing chunks from a
    // previous deployment that no longer exist. A full reload fixes it.
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
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#1a1e12", color: "#f6ede3" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 300, marginBottom: "1rem" }}>
            An unexpected <em style={{ color: "#ba8838" }}>detour.</em>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "28em", lineHeight: 1.6 }}>
            Something went wrong on our end. Please try again or contact us if the issue persists.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={() => reset()}
              style={{ padding: "0.75rem 2rem", border: "1px solid rgba(246,237,227,0.3)", background: "transparent", color: "#f6ede3", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              style={{ padding: "0.75rem 2rem", border: "none", background: "#ba8838", color: "#1a1e12", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}
            >
              Return Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
