import { language } from "settings";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "en",
      locale: "en",
      text: "en",
      icon: "/images/fa.svg"
    },
    {
      languageId: "fa",
      locale: "fa",
      text: "fa",
      icon: "/images/fa.svg"
    }
  ]
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
