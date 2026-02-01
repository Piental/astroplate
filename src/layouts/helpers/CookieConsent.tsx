import React, { useState, useEffect } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

interface CookieConsentProps {
  message: string;
  linkText: string;
  privacyUrl: string;
  acceptLabel: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  message,
  linkText,
  privacyUrl,
  acceptLabel,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    setVisible(!accepted);
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:!bg-[#121212]"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <p className="mb-0 text-sm md:text-base">
            {message}
            <a
              href={privacyUrl}
              className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#121212] rounded"
            >
              {linkText}
            </a>
          </p>
          <button
            type="button"
            onClick={handleAccept}
            className="shrink-0 rounded border border-white bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#121212] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#121212]"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
