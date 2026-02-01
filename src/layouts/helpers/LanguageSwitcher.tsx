import config from "@/config/config.json";
import languages from "@/config/language.json";
import React, { useState, useRef, useEffect } from "react";

// URL mapping for language-specific paths
const urlMap: Record<string, Record<string, string>> = {
  // Services/Offer
  "/offer": { pl: "/oferta", en: "/offer", de: "/angebot" },
  "/oferta": { pl: "/oferta", en: "/offer", de: "/angebot" },
  "/angebot": { pl: "/oferta", en: "/offer", de: "/angebot" },

  // Realizations (portfolio)
  "/realizations": { pl: "/realizacje", en: "/realizations", de: "/realisierungen" },
  "/realizacje": { pl: "/realizacje", en: "/realizations", de: "/realisierungen" },
  "/realisierungen": { pl: "/realizacje", en: "/realizations", de: "/realisierungen" },

  // About
  "/about": { pl: "/o-nas", en: "/about", de: "/uber-uns" },
  "/o-nas": { pl: "/o-nas", en: "/about", de: "/uber-uns" },
  "/uber-uns": { pl: "/o-nas", en: "/about", de: "/uber-uns" },

  // Contact
  "/contact": { pl: "/kontakt", en: "/contact", de: "/kontakt" },
  "/kontakt": { pl: "/kontakt", en: "/contact", de: "/kontakt" },

  // Static pages
  "/elements": { pl: "/elements", en: "/elements", de: "/elements" },
  "/privacy-policy": { pl: "/privacy-policy", en: "/privacy-policy", de: "/privacy-policy" },
};

// Slug translation for second-level paths: [pl, en, de] per item
const LANG_INDEX: Record<string, number> = { pl: 0, en: 1, de: 2 };

const offerSlugTuples: [string, string, string][] = [
  ["kuchnie", "kitchens", "kuchen"],
  ["szafy", "wardrobes", "schranke"],
  ["zabudowy", "builtins", "einbaumobel"],
  ["inne", "other", "andere"],
];

const realizationSlugTuples: [string, string, string][] = [
  ["nowoczesna-kuchnia-skandynawska", "modern-scandinavian-kitchen", "moderne-skandinavische-kuche"],
];

function translateSlug(
  slug: string,
  currentLang: string,
  targetLang: string,
  tuples: [string, string, string][],
): string {
  const ci = LANG_INDEX[currentLang];
  const ti = LANG_INDEX[targetLang];
  if (ci === undefined || ti === undefined) return slug;
  for (const t of tuples) {
    if (t[ci] === slug) return t[ti];
  }
  return slug;
}

const OFFER_SEGMENTS = ["/oferta", "/offer", "/angebot"];
const REALIZATION_SEGMENTS = ["/realizacje", "/realizations", "/realisierungen"];

// Full name for display in dropdown
const FULL_NAME_BY_LANG: Record<string, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
};

// Flag icon components (inline SVG) – 3:2 aspect, ~20px height
const FLAG_ICON_CLASS = "w-6 h-4 shrink-0 rounded-sm overflow-hidden";

function FlagPL() {
  return (
    <span className={FLAG_ICON_CLASS} aria-hidden>
      <svg viewBox="0 0 30 20" className="w-full h-full block">
        <rect width="30" height="10" fill="#fff" />
        <rect y="10" width="30" height="10" fill="#dc143c" />
      </svg>
    </span>
  );
}

function FlagEN() {
  return (
    <span className={FLAG_ICON_CLASS} aria-hidden>
      <svg viewBox="0 0 30 20" className="w-full h-full block">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" strokeWidth="2.5" />
        <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
        <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="4" />
      </svg>
    </span>
  );
}

function FlagDE() {
  return (
    <span className={FLAG_ICON_CLASS} aria-hidden>
      <svg viewBox="0 0 30 20" className="w-full h-full block">
        <rect width="30" height="6.67" fill="#000" />
        <rect y="6.67" width="30" height="6.66" fill="#dd0000" />
        <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
      </svg>
    </span>
  );
}

const FLAG_ICON_BY_LANG: Record<string, () => React.JSX.Element> = {
  pl: FlagPL,
  en: FlagEN,
  de: FlagDE,
};

const LanguageSwitcher = ({
  lang,
  pathname,
}: {
  lang: string;
  pathname: string;
}) => {
  const { default_language, default_language_in_subdir } = config.settings;

  // Function to remove trailing slash if necessary
  const removeTrailingSlash = (path: string) => {
    if (!config.site.trailing_slash) {
      return path.replace(/\/$/, "");
    }
    return path;
  };

  // Sort languages by weight and filter out disabled languages
  const sortedLanguages = languages
    .filter(
      (language) =>
        !(config.settings.disable_languages as string[]).includes(language.languageCode),
    )
    .sort((a, b) => a.weight - b.weight);

  // Translate path to target language
  const translatePath = (targetLang: string): string => {
    const baseUrl = window.location.origin;

    // Remove current language prefix if present
    let basePath = pathname;
    if (lang && pathname.startsWith(`/${lang}/`)) {
      basePath = pathname.replace(`/${lang}`, "");
    } else if (lang && pathname.startsWith(`/${lang}`)) {
      basePath = pathname.replace(`/${lang}`, "");
    }

    // Extract the first segment to translate
    const pathParts = basePath.split("/").filter(Boolean);
    const firstSegment = pathParts.length > 0 ? `/${pathParts[0]}` : "/";
    const remainingPath = pathParts.slice(1).join("/");

    // Translate the first segment if it exists in the map
    let translatedSegment = firstSegment;
    if (urlMap[firstSegment]) {
      translatedSegment = urlMap[firstSegment][targetLang];
    }

    // Reconstruct the full path; translate slug for offer/realizations second-level
    let fullPath = translatedSegment;
    if (remainingPath) {
      const pathPartsRemaining = remainingPath.split("/").filter(Boolean);
      const firstSlug = pathPartsRemaining[0];
      const restSlug = pathPartsRemaining.slice(1).join("/");
      let translatedSlug = firstSlug;
      if (OFFER_SEGMENTS.includes(translatedSegment)) {
        translatedSlug = translateSlug(firstSlug, lang, targetLang, offerSlugTuples);
      } else if (REALIZATION_SEGMENTS.includes(translatedSegment)) {
        translatedSlug = translateSlug(firstSlug, lang, targetLang, realizationSlugTuples);
      }
      fullPath = restSlug
        ? `${translatedSegment}/${translatedSlug}/${restSlug}`
        : `${translatedSegment}/${translatedSlug}`;
    }

    // Add language prefix if needed
    if (targetLang === default_language && !default_language_in_subdir) {
      return `${baseUrl}${removeTrailingSlash(fullPath)}`;
    } else {
      return `${baseUrl}/${targetLang}${removeTrailingSlash(fullPath)}`;
    }
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const displayLang = lang || default_language;
  const CurrentFlagIcon = FLAG_ICON_BY_LANG[displayLang] ?? FLAG_ICON_BY_LANG.pl;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div className="relative mr-5" ref={dropdownRef}>
      <button
        type="button"
        className="border border-border text-text-dark bg-transparent dark:border-darkmode-border dark:text-white py-1 pl-2 pr-2 rounded-sm cursor-pointer focus:ring-0 focus:border-border dark:focus:border-darkmode-border flex items-center gap-1"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <CurrentFlagIcon />
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute right-0 top-full mt-1 min-w-40 py-1 rounded-sm border border-border dark:border-darkmode-border bg-white dark:bg-darkmode-body shadow-lg z-50 list-none"
          role="listbox"
        >
          {sortedLanguages.map((language) => {
            const code = language.languageCode;
            const FlagIcon = FLAG_ICON_BY_LANG[code];
            const isSelected = (lang || default_language) === code;
            return (
              <li key={code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 flex items-center gap-2 text-text-dark dark:text-white hover:bg-light dark:hover:bg-darkmode-light focus:bg-light dark:focus:bg-darkmode-light"
                  onClick={() => {
                    const newPath = translatePath(code);
                    window.location.href = newPath;
                  }}
                >
                  {FlagIcon ? <FlagIcon /> : null}
                  <span>{FULL_NAME_BY_LANG[code] ?? language.languageName}</span>
                  {isSelected && (
                    <span className="ml-auto text-primary dark:text-darkmode-primary" aria-hidden>
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
