// URL mapping for translating paths across languages
// Maps base paths (without language prefix) to their equivalents in each language

interface RouteMap {
  [key: string]: {
    pl: string;
    en: string;
    de: string;
  };
}

const routeMap: RouteMap = {
  // Homepage
  "/": { pl: "/", en: "/", de: "/" },
  
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

/**
 * Translates a path from one language to another
 * @param currentPath - The current URL path (e.g., "/en/offer" or "/oferta")
 * @param currentLang - The current language code
 * @param targetLang - The target language code
 * @param defaultLanguage - The default language code
 * @param defaultLanguageInSubdir - Whether default language uses subdirectory
 * @returns The translated path in the target language
 */
export function translatePath(
  currentPath: string,
  currentLang: string,
  targetLang: string,
  defaultLanguage: string,
  defaultLanguageInSubdir: boolean
): string {
  // Remove language prefix from current path
  let basePath = currentPath;
  
  // Remove language prefix if present
  if (currentLang && currentPath.startsWith(`/${currentLang}`)) {
    basePath = currentPath.replace(`/${currentLang}`, "") || "/";
  }
  
  // Extract the main segment (first part of path) and any remaining parts
  const pathParts = basePath.split("/").filter(Boolean);
  const mainSegment = pathParts.length > 0 ? `/${pathParts[0]}` : "/";
  const remainingPath = pathParts.slice(1).join("/");
  
  // Find the translation for the main segment
  let translatedSegment = mainSegment;
  
  if (routeMap[mainSegment]) {
    translatedSegment = routeMap[mainSegment][targetLang as keyof typeof routeMap[typeof mainSegment]];
  }
  
  // Reconstruct the path
  let fullPath = translatedSegment;
  if (remainingPath) {
    fullPath = `${translatedSegment}/${remainingPath}`;
  }
  
  // Add language prefix for target language
  if (targetLang === defaultLanguage && !defaultLanguageInSubdir) {
    // Default language without subdirectory
    return fullPath || "/";
  } else {
    // Non-default language or default with subdirectory
    return `/${targetLang}${fullPath}`;
  }
}
