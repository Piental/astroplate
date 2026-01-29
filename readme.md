# Custom Furniture Business Website

Multilingual business website built with Astro, Tailwind CSS, and TypeScript for a custom furniture company.

## 🌐 Languages

- **Polish** (default, no prefix) - Primary market
- **English** (`/en/`) - International customers
- **German** (`/de/`) - German market

## 📌 Key Features

- 🌐 Multilingual routing with localized URLs
- 🪑 Services showcase (custom kitchens, wardrobes, built-ins)
- 🎨 Portfolio/Projects gallery
- 🌑 Dark mode support
- 📱 Fully responsive design
- 🔄 Language switcher
- 📞 Contact form
- ⚡ Optimized images with Sharp

## 📄 Pages

### Polish (default)

- 🏠 `/` - Homepage
- 🔨 `/oferta` - Services listing
- 🎨 `/projekty` - Projects portfolio
- 👤 `/o-nas` - About us
- 📞 `/kontakt` - Contact

### English

- 🏠 `/en/` - Homepage
- 🔨 `/en/offer` - Services listing
- 🎨 `/en/projects` - Projects portfolio
- 👤 `/en/about` - About us
- 📞 `/en/contact` - Contact

### German

- 🏠 `/de/` - Homepage
- 🔨 `/de/angebot` - Services listing
- 🎨 `/de/projekte` - Projects portfolio
- 👤 `/de/uber-uns` - About us
- 📞 `/de/kontakt` - Contact

## 🚀 Getting Started

### 📦 Dependencies

- Node.js v20.10+
- Yarn v1.22+
- Astro v5.16+
- Tailwind CSS v4+

### 👉 Install Dependencies

```bash
yarn install
```

### 👉 Development

```bash
yarn dev
```

### 👉 Build

```bash
yarn build
```

### 👉 Preview

```bash
yarn preview
```

## 📁 Project Structure

```
src/
├── content/
│   ├── services/      # Service offerings (polish, english, german)
│   ├── projects/      # Portfolio projects
│   ├── about/         # About page content
│   ├── contact/       # Contact page content
│   └── homepage/      # Homepage content
├── pages/
│   ├── oferta/        # Polish services routes
│   ├── projekty/      # Polish projects routes
│   ├── o-nas.astro    # Polish about
│   ├── kontakt.astro  # Polish contact
│   ├── en/            # English localized routes
│   └── de/            # German localized routes
├── layouts/           # Page layouts and components
├── config/            # Configuration files (menus, language, theme)
└── i18n/              # Translation files (pl.json, en.json, de.json)
```

## 🔗 Content Collections

### Services

Custom furniture services with fields:

- title, slug, excerpt, image, order, draft

### Projects

Portfolio projects with fields:

- title, slug, cover, gallery, categories, materials, time_to_complete, year, draft

## 🎨 Customization

### Update Menus

Edit language-specific menu files:

- `src/config/menu.pl.json` - Polish navigation
- `src/config/menu.en.json` - English navigation
- `src/config/menu.de.json` - German navigation

### Update Translations

Edit translation files in `src/i18n/`:

- `pl.json` - Polish UI labels
- `en.json` - English UI labels
- `de.json` - German UI labels

### Theme Configuration

Edit `src/config/theme.json` to customize:

- Colors
- Fonts
- Dark mode settings

## 📝 License

Copyright (c) 2023 - Present

**Code License:** Released under the MIT license.

**Image license:** Images are for demonstration purposes only.
