import type { MetadataRoute } from "next";

const BASE_URL = "https://www.pixelflower.studio";
const locales = ["uk", "cs"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	return locales.map((locale) => ({
		url: `${BASE_URL}/${locale}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 1,
		alternates: {
			languages: {
				uk: `${BASE_URL}/uk`,
				cs: `${BASE_URL}/cs`,
				"x-default": `${BASE_URL}/uk`,
			},
		},
	}));
}
