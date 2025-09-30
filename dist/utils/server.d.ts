/**
 * Server-side utilities for Next.js App Router
 * Use these functions in Server Components to read language from cookies
 */
/**
 * Get language from cookies in Next.js App Router Server Components
 *
 * @example
 * ```tsx
 * import { headers } from 'next/headers';
 * import { getServerLanguage } from 'i18nexus/server';
 *
 * export default async function RootLayout({ children }) {
 *   const headersList = await headers();
 *   const language = getServerLanguage(headersList);
 *
 *   return (
 *     <I18nProvider initialLanguage={language}>
 *       {children}
 *     </I18nProvider>
 *   );
 * }
 * ```
 */
export declare function getServerLanguage(headers: Headers, options?: {
    cookieName?: string;
    defaultLanguage?: string;
}): string;
/**
 * Parse cookies from cookie header string
 */
export declare function parseCookies(cookieHeader: string | null): Record<string, string>;
//# sourceMappingURL=server.d.ts.map