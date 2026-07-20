import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const supportedLocales = ['en', 'fr', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'el'];

export default getRequestConfig(async () => {
  // We use cookie-based locale detection (no URL path prefix)
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  
  if (!supportedLocales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
