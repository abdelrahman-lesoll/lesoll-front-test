import { useState, createContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import Arabic from "./Ar.json";
import English from "./En.json";

export const LangContext = createContext();

const LanguageProvider = ({ children }) => {
  const language = localStorage.getItem("Language") || "ar-EG";
  const [locale, setLocale] = useState(language);
  const [messages, setMessages] = useState(
    language === "ar-EG" ? Arabic : English
  );
  const selectLang = (lang) => {
    setLocale(lang);
    if (lang === "ar-EG") {
      setMessages(Arabic);
    } else {
      setMessages(English);
    }
    localStorage.setItem("Language", lang);
  };
  useEffect(() => {
    document.body.style.direction = locale === "ar-EG" ? "rtl" : "ltr";
    document.body.classList = locale === "ar-EG" ? "ar" : "en";
  }, [locale, messages]);

  return (
    <LangContext.Provider value={{ locale, selectLang }}>
      <IntlProvider {...{ messages, locale }}>{children}</IntlProvider>
    </LangContext.Provider>
  );
};

export default LanguageProvider;
