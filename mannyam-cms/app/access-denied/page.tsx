import React from "react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f3eb] p-6 font-sans">
      <div className="max-w-md w-full bg-paper border border-ivory rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Branding header */}
        <div className="space-y-1">
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
            MANNYAM Studio
          </span>
          <h1 className="font-display text-2xl font-bold text-olive">Access Denied</h1>
        </div>

        {/* Lock Icon */}
        <div className="w-16 h-16 mx-auto bg-bad/10 rounded-full flex items-center justify-center text-bad">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        {/* Alert text */}
        <div className="space-y-2">
          <p className="text-sm text-olive/80 font-medium leading-relaxed">
            You do not have permission to view this page.
          </p>
          <p className="text-xs text-olive/40 leading-relaxed">
            Please contact an administrator if you believe this is an error or to request additional permissions.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/dashboard"
            className="w-full inline-block px-5 py-2.5 bg-olive hover:bg-olive-2 text-paper rounded-lg font-semibold transition text-sm shadow-sm"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
