import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.pixelflower.studio";
const pages = ["", "/templates"];

const languages = (page = "") =>
	Object.fromEntries(
		routing.locales.map((l) => [l, `${BASE_URL}/${l}${page}`]),
	);

export default function sitemap(): MetadataRoute.Sitemap {
	return routing.locales.flatMap((l) =>
		pages.map((page) => ({
			url: `${BASE_URL}/${l}${page}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1,
			alternates: {
				languages: {
					...languages(page),
					"x-default": `${BASE_URL}/${routing.defaultLocale}${page}`,
				},
			},
		})),
	);
}
