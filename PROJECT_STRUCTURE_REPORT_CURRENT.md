# ASTROPLATE PROJECT - CURRENT STRUCTURE REPORT (AFTER REFACTORING)

**Generated:** January 28, 2026  
**Status:** Refactored for Custom Furniture Company Website  
**Languages:** Polish (default), English, German

---

## MAJOR CHANGES FROM ORIGINAL TEMPLATE

### ✅ Completed Refactoring

1. **Language Update**: French (fr) → German (de) + Polish (pl) as default
2. **Content Collections**: Removed blog/authors → Added services/projects
3. **Components Removed**: BlogCard, AuthorCard, Pagination, Share, PostSidebar, TwSizeIndicator
4. **Helpers Removed**: Disqus, SearchModal, SearchResult (search functionality removed)
5. **Shortcodes Removed**: Entire folder (Accordion, Button, Notice, Tab, Tabs, Video, Youtube)
6. **Utils Reduced**: Removed dateFormat, readingTime, similarItems, sortFunctions, taxonomyFilter, taxonomyParser
7. **Routing Structure**: Language-specific folders with translated URLs (e.g., `/oferta`, `/en/offer`, `/de/angebot`)
8. **Business Focus**: Furniture services and project portfolio instead of blog

---

## 1. FULL DIRECTORY TREE (/src) - CURRENT STATE

```
src/
├── config/                          # JSON configuration files
│   ├── config.json                  # Site settings, default_language: "pl"
│   ├── language.json                # Languages: pl (weight:1), en (weight:2), de (weight:3)
│   ├── menu.pl.json                 # Polish navigation menu
│   ├── menu.en.json                 # English navigation menu
│   ├── menu.de.json                 # German navigation menu
│   ├── social.json                  # Social media links
│   └── theme.json                   # Theme colors & fonts
│
├── content/                         # Content collections (multilingual)
│   ├── about/
│   │   ├── english/-index.md
│   │   ├── german/-index.md
│   │   └── polish/-index.md
│   ├── contact/
│   │   ├── english/-index.md
│   │   ├── german/-index.md
│   │   └── polish/-index.md
│   ├── homepage/
│   │   ├── english/-index.md
│   │   ├── german/-index.md
│   │   └── polish/-index.md
│   ├── pages/
│   │   ├── english/
│   │   │   ├── elements.mdx
│   │   │   └── privacy-policy.md
│   │   ├── german/
│   │   │   ├── elements.mdx
│   │   │   └── privacy-policy.md
│   │   └── polish/
│   │       ├── elements.mdx
│   │       └── privacy-policy.md
│   ├── projects/                    # ✨ NEW - Portfolio projects
│   │   ├── english/
│   │   │   └── sample-project.md
│   │   ├── german/
│   │   │   └── sample-project.md
│   │   └── polish/
│   │       └── sample-project.md
│   ├── services/                    # ✨ NEW - Furniture services
│   │   ├── english/
│   │   │   ├── builtins.md
│   │   │   ├── kitchens.md
│   │   │   ├── other.md
│   │   │   └── wardrobes.md
│   │   ├── german/
│   │   │   ├── builtins.md
│   │   │   ├── kitchens.md
│   │   │   ├── other.md
│   │   │   └── wardrobes.md
│   │   └── polish/
│   │       ├── builtins.md
│   │       ├── kitchens.md
│   │       ├── other.md
│   │       └── wardrobes.md
│   └── sections/
│       ├── english/
│       │   ├── call-to-action.md
│       │   └── testimonial.md
│       ├── german/
│       │   ├── call-to-action.md
│       │   └── testimonial.md
│       └── polish/
│           ├── call-to-action.md
│           └── testimonial.md
│
├── content.config.ts                # Collection schemas (services, projects)
│
├── hooks/
│   └── useTheme.ts                  # React hook for theme management
│
├── i18n/                            # Translation files for UI text
│   ├── pl.json                      # Polish translations
│   ├── en.json                      # English translations
│   └── de.json                      # German translations
│
├── layouts/
│   ├── Base.astro                   # Main layout wrapper
│   │
│   ├── components/                  # Reusable .astro components (REDUCED)
│   │   ├── Breadcrumbs.astro
│   │   ├── ImageMod.astro
│   │   ├── Logo.astro
│   │   ├── Social.astro
│   │   └── ThemeSwitcher.astro
│   │
│   ├── helpers/                     # React components (REDUCED)
│   │   ├── Announcement.tsx
│   │   ├── DynamicIcon.tsx
│   │   └── LanguageSwitcher.tsx
│   │
│   └── partials/                    # Major page sections (REDUCED)
│       ├── CallToAction.astro
│       ├── Footer.astro
│       ├── Header.astro
│       ├── PageHeader.astro
│       └── Testimonial.astro
│
├── lib/
│   ├── contentParser.astro          # Content collection helpers
│   └── utils/                       # Utility functions (REDUCED)
│       ├── bgImageMod.ts
│       ├── languageParser.ts
│       └── textConverter.ts
│
├── pages/                           # ✨ RESTRUCTURED - Language-specific folders
│   ├── [...lang]/                   # Catch-all fallback
│   │   ├── index.astro              # Homepage fallback
│   │   └── [regular].astro          # Regular pages fallback
│   │
│   ├── 404.astro                    # Error page
│   │
│   ├── de/                          # ✨ German routes
│   │   ├── uber-uns.astro           # About page (Über Uns)
│   │   ├── kontakt.astro            # Contact page (Kontakt)
│   │   ├── angebot/                 # Services (Angebot)
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── projekte/                # Projects (Projekte)
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── en/                          # ✨ English routes
│   │   ├── about.astro              # About page
│   │   ├── contact.astro            # Contact page
│   │   ├── offer/                   # Services
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── projects/                # Projects
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── kontakt.astro                # ✨ Polish contact (root)
│   ├── o-nas.astro                  # ✨ Polish about (root)
│   ├── oferta/                      # ✨ Polish services (root)
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── projekty/                    # ✨ Polish projects (root)
│       ├── index.astro
│       └── [slug].astro
│
├── styles/                          # CSS files (REDUCED)
│   ├── base.css
│   ├── buttons.css
│   ├── components.css
│   ├── generated-theme.css
│   ├── main.css
│   ├── navigation.css
│   ├── safe.css
│   └── utilities.css
│
└── types/
    └── index.d.ts                   # TypeScript type definitions
```

---

## 2. COMPONENTS (/src/layouts/components/) - CURRENT STATE

### ✅ Remaining Components (5 total)

#### Breadcrumbs.astro
- **Purpose**: Navigation breadcrumb trail
- **Used in**: `PageHeader.astro`

#### ImageMod.astro
- **Purpose**: Optimized image component (wraps Astro:assets Image)
- **Used in**:
  - Homepage (`[...lang]/index.astro`)
  - About pages (`o-nas.astro`, `en/about.astro`, `de/uber-uns.astro`)
  - `CallToAction.astro`
  - `Testimonial.astro`

#### Logo.astro
- **Purpose**: Site logo with language-aware linking
- **Imports**: `ImageMod`, config, language utilities
- **Used in**: `Header.astro`, `Footer.astro`

#### Social.astro
- **Purpose**: Social media icon links
- **Imports**: `DynamicIcon` helper
- **Used in**: `Footer.astro`

#### ThemeSwitcher.astro
- **Purpose**: Dark/light mode toggle
- **Used in**: `Header.astro`

### ❌ Removed Components

- AuthorCard.astro (blog-specific)
- BlogCard.astro (blog-specific)
- Pagination.astro (blog-specific)
- Share.astro (blog-specific)
- TwSizeIndicator.astro (development tool)

---

## 3. HELPERS (/src/layouts/helpers/) - CURRENT STATE

### ✅ Remaining Helpers (3 total)

#### Announcement.tsx
- **Purpose**: Dismissible announcement banner
- **Used in**: `Base.astro` with `client:load`

#### DynamicIcon.tsx
- **Purpose**: Dynamically loads React Icons (FA6)
- **Used in**: `Social.astro`

#### LanguageSwitcher.tsx
- **Purpose**: Language selection dropdown (pl/en/de)
- **Used in**: `Header.astro` with `client:load`

### ❌ Removed Helpers

- Disqus.tsx (comments - not needed for furniture site)
- SearchModal.tsx (search functionality removed)
- SearchResult.tsx (search functionality removed)

---

## 4. SHORTCODES - REMOVED

**Status**: ❌ Entire `/src/layouts/shortcodes/` folder removed

Previously contained:
- Accordion.tsx
- Button.tsx
- Notice.tsx
- Tab.tsx
- Tabs.tsx
- Video.tsx
- Youtube.tsx

**Reason**: Not needed for furniture company website; MDX functionality simplified

---

## 5. PARTIALS (/src/layouts/partials/) - CURRENT STATE

### ✅ Remaining Partials (5 total)

#### CallToAction.astro
- **Used in**: Homepage

#### Footer.astro
- **Imports**: `Logo`, `Social`, config, menu data
- **Used in**: `Base.astro` (all pages)

#### Header.astro
- **Imports**: `Logo`, `ThemeSwitcher`, `LanguageSwitcher`, config, language utilities
- **Features**: Mobile menu toggle, language-aware navigation
- **Used in**: `Base.astro` (all pages)

#### PageHeader.astro
- **Imports**: `Breadcrumbs`
- **Used in**: Can be used for section headers

#### Testimonial.astro
- **Imports**: `ImageMod`, Swiper carousel
- **Used in**: Homepage

### ❌ Removed Partials

- PostSidebar.astro (blog-specific)

---

## 6. CONTENT COLLECTIONS - CURRENT STATE

Defined in `src/content.config.ts`:

### ✅ Existing Collections

#### homepage
- **Schema**: Banner (title, content, image, button), Features array
- **Files**: `-index.md` per language (polish, english, german)

#### pages
- **Schema**: Basic page fields
- **Files**: `elements.mdx`, `privacy-policy.md` per language

#### about
- **Schema**: Basic page fields
- **Files**: `-index.md` per language

#### contact
- **Schema**: Basic page fields
- **Files**: `-index.md` per language

#### ctaSection
- **Schema**: enable, title, description, image, button
- **Files**: `call-to-action.md` per language

#### testimonialSection
- **Schema**: enable, title, description, testimonials array
- **Files**: `testimonial.md` per language

### ✨ NEW Collections (Furniture-specific)

#### services
- **Path**: `src/content/services/`
- **Schema**:
  - `title: string`
  - `slug: string`
  - `excerpt: string`
  - `image: string`
  - `order: number` (for sorting)
  - `draft: boolean`
- **Files**: `kitchens.md`, `wardrobes.md`, `builtins.md`, `other.md` per language
- **Used by**: Services listing and detail pages (`/oferta`, `/en/offer`, `/de/angebot`)

#### projects
- **Path**: `src/content/projects/`
- **Schema**:
  - `title: string`
  - `slug: string`
  - `cover: string` (main image)
  - `gallery: string[]` (multiple images)
  - `categories: string[]`
  - `materials: string` (optional)
  - `time_to_complete: string` (optional)
  - `year: number` (optional)
  - `draft: boolean`
- **Files**: `sample-project.md` per language (expandable)
- **Used by**: Project portfolio pages (`/projekty`, `/en/projects`, `/de/projekte`)

### ❌ Removed Collections

- **blog** (replaced by projects/services)
- **authors** (not needed for furniture company)

---

## 7. ROUTING STRUCTURE - MAJOR CHANGES

### ✨ NEW: Language-Specific Routes with Translated URLs

#### Polish (Default Language - Root Level)
```
/                      → Homepage
/o-nas                 → About
/kontakt               → Contact
/oferta                → Services listing
/oferta/kuchnie        → Service detail (kitchens)
/oferta/szafy          → Service detail (wardrobes)
/projekty              → Projects listing
/projekty/[slug]       → Project detail
```

#### English Routes
```
/en/                   → Homepage
/en/about              → About
/en/contact            → Contact
/en/offer              → Services listing
/en/offer/[slug]       → Service detail
/en/projects           → Projects listing
/en/projects/[slug]    → Project detail
```

#### German Routes
```
/de/                   → Homepage
/de/uber-uns           → About (Über Uns)
/de/kontakt            → Contact
/de/angebot            → Services listing (Angebot)
/de/angebot/[slug]     → Service detail
/de/projekte           → Projects listing
/de/projekte/[slug]    → Project detail
```

### Implementation Pattern

**Example: Services Listing (Polish)**
```astro
// src/pages/oferta/index.astro
import { getCollection } from "astro:content";

const allServices = await getCollection("services");
const services = allServices
  .filter(service => service.id.startsWith("polish/"))
  .sort((a, b) => a.data.order - b.data.order);
```

**Example: Service Detail (Polish)**
```astro
// src/pages/oferta/[slug].astro
export async function getStaticPaths() {
  const allServices = await getCollection("services");
  const polishServices = allServices
    .filter(service => service.id.startsWith("polish/"));
  
  return polishServices.map(service => ({
    params: { slug: service.data.slug },
    props: { service }
  }));
}
```

---

## 8. UTILITIES - REDUCED

### ✅ Remaining Utils (3 total)

#### languageParser.ts
- `supportedLang`: Language code array
- `getLangFromUrl()`: Extract language from URL
- `getTranslations()`: Get menu + dictionary
- `slugSelector()`: Generate language-aware URLs

#### textConverter.ts
- `slugify()`: Convert to URL-safe slug
- `humanize()`: Convert slug to readable text
- `markdownify()`: Parse markdown to HTML
- `plainify()`: Strip HTML and markdown

#### bgImageMod.ts
- Background image utilities

### ❌ Removed Utils

- dateFormat.ts (blog-specific)
- readingTime.ts (blog-specific)
- similarItems.ts (blog-specific)
- sortFunctions.ts (moved inline where needed)
- taxonomyFilter.ts (categories/tags - blog-specific)
- taxonomyParser.astro (removed from lib/)

---

## 9. CONFIGURATION FILES - CURRENT STATE

### config.json (Key Settings)
```json
{
  "settings": {
    "default_language": "pl",
    "disable_languages": ["fr"],
    "default_language_in_subdir": false
  }
}
```

### language.json
```json
[
  { "languageName": "Pl", "languageCode": "pl", "contentDir": "polish", "weight": 1 },
  { "languageName": "En", "languageCode": "en", "contentDir": "english", "weight": 2 },
  { "languageName": "De", "languageCode": "de", "contentDir": "german", "weight": 3 }
]
```

### menu.pl.json (Polish Menu)
```json
{
  "main": [
    { "name": "Start", "url": "/" },
    { "name": "Oferta", "url": "/oferta" },
    { "name": "Projekty", "url": "/projekty" },
    { "name": "O nas", "url": "/o-nas" },
    { "name": "Kontakt", "url": "/kontakt" }
  ]
}
```

### i18n/pl.json (UI Translations)
```json
{
  "full_name": "Imię i nazwisko",
  "submit": "Wyślij",
  "read_more": "Czytaj więcej",
  "page_not_found": "Strona nie znaleziona",
  "back_to_home": "Powrót do strony głównej"
}
```

---

## 10. SERVICE & PROJECT CONTENT STRUCTURE

### Service Content Example (kitchens.md)
```markdown
---
title: "Kuchnie na wymiar"
slug: "kuchnie"
excerpt: "Projektujemy i wykonujemy kuchnie dopasowane..."
image: "/images/service-1.png"
order: 1
draft: false
---

## Kuchnie na wymiar

Detailed content here...

### Nasze usługi obejmują:
- Projektowanie 3D
- Dobór materiałów wysokiej jakości
- Profesjonalny montaż
```

### Project Content Example (sample-project.md)
```markdown
---
title: "Nowoczesna kuchnia w stylu skandynawskim"
slug: "nowoczesna-kuchnia-skandynawska"
cover: "/images/image-placeholder.png"
gallery:
  - "/images/image-placeholder.png"
  - "/images/banner.png"
categories:
  - "kitchens"
materials: "Fornir dębowy, płyta laminowana, blaty kwarcowe"
time_to_complete: "4 tygodnie"
year: 2024
draft: false
---

## Project description...
```

---

## 11. COMPONENT HIERARCHY - CURRENT STATE

```
Base.astro (root layout)
├── Header.astro
│   ├── Logo.astro → ImageMod.astro
│   ├── ThemeSwitcher.astro
│   └── LanguageSwitcher.tsx (React)
├── Announcement.tsx (React)
├── <Page Content>
│   ├── PageHeader.astro → Breadcrumbs.astro
│   └── ImageMod.astro
└── Footer.astro
    ├── Logo.astro
    └── Social.astro → DynamicIcon.tsx
```

**Simplified**: No search, blog, pagination, or comment components

---

## 12. KEY ARCHITECTURAL CHANGES

### ✅ Implemented

1. **Multilingual Routing**: Language-specific folders with native URLs
2. **Content Transformation**: Blog → Services & Projects
3. **Reduced Complexity**: Removed 15+ components/helpers not needed
4. **Business Focus**: Furniture portfolio and service offerings
5. **Simplified Utils**: Only essential text and language utilities
6. **No Search**: Removed search functionality
7. **No Blog Features**: No pagination, categories, tags, authors, comments

### 🎯 Business Logic

#### Services
- **Ordering**: Custom `order` field for manual sorting
- **Categories**: 4 main services (kitchens, wardrobes, builtins, other)
- **Display**: Grid layout with image, title, excerpt, and CTA

#### Projects
- **Gallery**: Multiple images per project
- **Metadata**: Materials, completion time, year
- **Categories**: Tags for filtering (implementation ready)
- **Display**: Portfolio grid with cover image and details

---

## 13. REMAINING FEATURES

### ✅ Active Features

- Multilingual support (pl/en/de)
- Dark mode toggle
- Language switcher
- Homepage with banner, features, testimonials, CTA
- Static pages (about, contact, privacy policy)
- Services catalog
- Project portfolio
- Responsive design
- SEO optimization

### ❌ Removed Features

- Blog system
- Author profiles
- Search functionality
- Comments (Disqus)
- Post pagination
- Category/tag filtering
- Reading time estimates
- Related posts
- Social sharing buttons
- MDX shortcodes

---

## 14. DEVELOPMENT STATUS

### ✅ Completed

- Language migration (fr → pl/en/de)
- Content collections refactoring
- Routing structure for all languages
- Services and projects implementation
- Component cleanup
- Menu structure updates
- UI translations

### 🔄 Ready for Expansion

- Add more service types
- Add more projects to portfolio
- Customize homepage content
- Update company branding (logo, colors, fonts)
- Add actual furniture images
- Implement contact form functionality
- Add project filtering by category
- Add service detail pages with more content

---

## 15. COMPARISON: BEFORE vs AFTER

| Aspect | Original Template | Current Furniture Site |
|--------|------------------|----------------------|
| **Languages** | English + French | Polish (default) + English + German |
| **Content Focus** | Blog posts & authors | Services & projects |
| **Components** | 15 components | 5 components |
| **Helpers** | 6 helpers | 3 helpers |
| **Shortcodes** | 7 shortcodes | 0 (removed) |
| **Utils** | 11 utilities | 3 utilities |
| **Collections** | 8 collections | 6 collections |
| **Routes** | Blog-centric | Service-centric |
| **Features** | Search, comments, pagination | Simplified portfolio |
| **Complexity** | High | Reduced |

---

**END OF CURRENT STATE REPORT**

This document reflects the furniture company website as of January 28, 2026. The refactoring successfully transformed a blog template into a business portfolio site with proper multilingual support and furniture-specific content structure.
