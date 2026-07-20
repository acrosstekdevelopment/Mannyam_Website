"use client";

import Script from "next/script";
import { useEffect } from "react";

export function GoogleTranslate() {
  useEffect(() => {
    // Ensure googtrans cookie matches NEXT_LOCALE on mount
    const localeMatch = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
    const locale = localeMatch ? localeMatch[2].toLowerCase() : "en";
    const expectedGoogtrans = `/en/${locale}`;
    const googtransMatch = document.cookie.match(/(^| )googtrans=([^;]+)/);
    
    if (locale !== "en") {
      if (!googtransMatch || googtransMatch[2] !== expectedGoogtrans) {
        document.cookie = `googtrans=${expectedGoogtrans}; path=/`;
        document.cookie = `googtrans=${expectedGoogtrans}; path=/; domain=${window.location.hostname}`;
      }
    } else {
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          `,
        }}
      />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          body { top: 0 !important; }
          .skiptranslate > iframe.skiptranslate { display: none !important; visibility: hidden !important; }
          #goog-gt-tt { display: none !important; }
          .goog-te-banner-frame { display: none !important; }
          .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        `
      }} />
    </>
  );
}
