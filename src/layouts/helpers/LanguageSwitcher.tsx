import config from "@/config/config.json";
import languages from "@/config/language.json";
import React from "react";

// URL mapping for language-specific paths
const urlMap: Record<string, Record<string, string>> = {
  // Services/Offer
  "/offer": { pl: "/oferta", en: "/offer", de: "/angebot" },
  "/oferta": { pl: "/oferta", en: "/offer", de: "/angebot" },
  "/angebot": { pl: "/oferta", en: "/offer", de: "/angebot" },
  
  // Projects
  "/projects": { pl: "/projekty", en: "/projects", de: "/projekte" },
  "/projekty": { pl: "/projekty", en: "/projects", de: "/projekte" },
  "/projekte": { pl: "/projekty", en: "/projects", de: "/projekte" },
  
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

    // Reconstruct the full path
    let fullPath = translatedSegment;
    if (remainingPath) {
      fullPath = `${translatedSegment}/${remainingPath}`;
    }

    // Add language prefix if needed
    if (targetLang === default_language && !default_language_in_subdir) {
      return `${baseUrl}${removeTrailingSlash(fullPath)}`;
    } else {
      return `${baseUrl}/${targetLang}${removeTrailingSlash(fullPath)}`;
    }
  };

  return (
    <div className="mr-5">
      <select
        className="border border-dark text-text-dark bg-transparent dark:border-darkmode-primary dark:text-white py-1 pl-2 pr-8 rounded-sm cursor-pointer focus:ring-0 focus:border-dark dark:focus:border-darkmode-primary"
        onChange={(e) => {
          const selectedLang = e.target.value;
          const newPath = translatePath(selectedLang);
          window.location.href = newPath;
        }}
        value={lang}
      >
        {sortedLanguages.map((language) => (
          <option
            className="dark:text-text-dark"
            key={language.languageCode}
            value={language.languageCode}
          >
            {language.languageName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
