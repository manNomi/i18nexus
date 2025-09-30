# i18nexus Demo

A complete demonstration of the i18nexus React i18n toolkit with modern design and Korean translations.

## ✨ Features

### 🎨 Modern Design

- React Hook Form-inspired clean and modern UI
- Responsive design with Tailwind CSS
- Professional color scheme and typography
- Interactive components with smooth transitions

### 🌍 Complete Internationalization

- **Korean (한국어)** - Primary language with full translations
- **English** - Complete English translations
- Language switching with persistent storage
- Automatic browser language detection

### 🏗️ Restructured Homepage

The homepage is now organized into three main sections:

1. **i18nexus Introduction** - What is i18nexus and why use it
2. **How It Works** - Understanding the core components
3. **Architecture & Principles** - Technical details and design philosophy

### 🛠️ i18nexus-cli Integration

- **JSON-based translations** - All translations stored in separate JSON files
- **CLI commands** - Ready-to-use npm scripts for translation management
- **Development workflow** - Proper separation of development tools and runtime code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Main demo page
│   ├── layout.tsx        # Root layout with i18n provider
│   └── globals.css       # Global styles
├── lib/
│   ├── i18n.ts          # i18n configuration
│   └── translations/    # Translation files
│       ├── en.json      # English translations
│       └── ko.json      # Korean translations
├── i18nexus.config.js   # i18nexus-cli configuration
└── package.json        # Dependencies and scripts
```

## 🌐 Translation Management

### Using i18nexus-cli

The project is configured to use i18nexus-cli for translation management:

```bash
# Pull translations from i18nexus service
npm run i18n:pull

# Import translations from local files
npm run i18n:import

# Listen for live updates during development
npm run i18n:listen
```

### Translation Files

All translations are stored in JSON format in `lib/translations/`:

- `en.json` - English translations
- `ko.json` - Korean translations

## 🎯 Key Improvements Made

1. **Design Overhaul**

   - Modern, clean design inspired by React Hook Form
   - Better typography and spacing
   - Professional color scheme
   - Responsive layout

2. **Korean Translations**

   - Complete Korean translations for all keys
   - Natural, professional Korean language
   - Consistent terminology

3. **Homepage Restructure**

   - Clear three-section organization
   - Better information hierarchy
   - Improved user experience

4. **i18nexus-cli Integration**
   - JSON-based translation files
   - CLI commands for translation management
   - Proper development workflow

## 🔧 Configuration

### i18nexus Configuration

The `i18nexus.config.js` file contains:

- Project settings
- Translation file paths
- Language configuration
- CLI command settings

### Next.js Configuration

The project uses Next.js 15 with:

- App Router
- TypeScript support
- Tailwind CSS
- i18nexus integration

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run i18n:pull` - Pull translations from i18nexus
- `npm run i18n:import` - Import translations from local files
- `npm run i18n:listen` - Listen for live translation updates

## 🌟 Features Demonstrated

- **Language Switching** - Seamless language switching with persistence
- **Responsive Design** - Works on all device sizes
- **Modern UI** - Clean, professional interface
- **Complete i18n** - Full internationalization support
- **CLI Integration** - Development tool integration
- **TypeScript** - Full type safety
- **Performance** - Optimized for production

## 🤝 Contributing

This demo showcases the capabilities of i18nexus. Feel free to:

- Add more languages
- Improve the design
- Add more features
- Submit issues and suggestions

## 📄 License

MIT License - see LICENSE file for details.
