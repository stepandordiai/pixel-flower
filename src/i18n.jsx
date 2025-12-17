import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import uk from "./translations/uk/translation.json";
import cs from "./translations/cs/translation.json";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		// TODO: LEARN THIS
		resources: {
			uk: {
				translation: uk,
			},
			cs: {
				translation: cs,
			},
		},

		fallbackLng: "uk",

		supportedLngs: ["uk", "cs"],

		// TODO: LEARN THIS
		detection: {
			order: ["path", "localStorage", "navigator"],
			lookupFromPathIndex: 0,
			caches: ["localStorage", "cookie"],
		},

		// TODO: LEARN THIS
		interpolation: {
			escapeValue: false,
		},

		// TODO: LEARN THIS
		react: {
			useSuspense: false,
		},
	});
