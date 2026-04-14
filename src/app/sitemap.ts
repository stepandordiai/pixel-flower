import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";

const pages = [
	{
		path: "",
		changeFrequency: "weekly",
		priority: 1,
	},
	{
		path: "/templates",
		changeFrequency: "monthly",
		priority: 0.9,
	},
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	return pages.map((page) => ({
		url: `${BASE_URL}${page.path}`,
		lastModified: new Date(),
		changeFrequency: page.changeFrequency,
		priority: page.priority,
		alternates: {
			languages: {
				cs: `${BASE_URL}/cs${page.path}`,
				"x-default": `${BASE_URL}/${routing.defaultLocale}${page.path}`,
			},
		},
	}));
}
