import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-ivory text-ink selection:bg-gold/20 font-sans antialiased">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
