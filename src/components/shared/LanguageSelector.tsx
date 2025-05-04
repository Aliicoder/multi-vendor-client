import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector = () => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    };

    if (!window.google?.translate) {
      addGoogleTranslateScript();
    }

    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
  }, []);

  const getCurrentLanguage = (): string => {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    if (match && match[1]) {
      return match[1]; // "en" or "ar"
    }
    return "en"; // default
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    if (selectedLang === "en") {
      setGoogleTranslate("en");
    } else if (selectedLang === "ar") {
      setGoogleTranslate("ar");
    }
  };

  const setGoogleTranslate = (lang: string) => {
    const googTransCookie = `/en/${lang}`;

    document.cookie = `googtrans=${googTransCookie};path=/`;
    document.cookie = `googtrans=${googTransCookie};domain=${window.location.hostname};path=/`;

    window.location.reload();
  };

  return (
    <div>
      <select
        className="rounded"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>

      {/* Hidden div for Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </div>
  );
};

export default LanguageSelector;
