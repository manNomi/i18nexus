# i18nexus Demo

This is a demonstration of i18nexus features including:

- Server-Side Rendering (SSR) with Next.js App Router
- Client-side translations with `useTranslation` hook
- Language switching with cookie persistence
- Collapsible sidebar navigation
- Modern UI with dark mode support

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000 to see the demo.

## Features Demonstrated

- **Sidebar Navigation**: Collapsible sidebar with SVG icons
- **SSR Page**: Server-side translation using `getServerTranslation()`
- **Client Components**: Client-side translation with `useTranslation()`
- **Language Switching**: Seamless language switching with `router.refresh()`
- **Cookie Persistence**: Language preference saved in cookies

## Project Structure

```
demo/
├── app/
│   ├── components/
│   │   ├── ClientProvider.tsx         # Wraps I18nProvider for client components
│   │   ├── Sidebar.tsx                # Main navigation sidebar
│   │   ├── LanguageSwitcherWithRefresh.tsx  # Language switcher with SSR support
│   │   └── SSRProvider.tsx            # Helper for server-side translations
│   ├── ssr-test/
│   │   └── page.tsx                   # SSR translation demo page
│   ├── layout.tsx                     # Root layout with SSR language detection
│   └── page.tsx                       # Home page
├── lib/
│   ├── i18n.ts                        # Translation data export
│   └── translations/
│       ├── en.json                    # English translations
│       └── ko.json                    # Korean translations
└── package.json
```

## Learn More

- [i18nexus Documentation](https://www.npmjs.com/package/i18nexus)
- [SSR Guide](../SSR_GUIDE.md)
- [Next.js Documentation](https://nextjs.org/docs)
