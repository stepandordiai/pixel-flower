import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

const pages = ["", "/templates"];

export default function sitemap(): MetadataRoute.Sitemap {
	return pages.map((page) => ({
		url: `${BASE_URL}${page}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: !page ? 1 : 0.9,
		alternates: {
			languages: {
				cs: `${BASE_URL}/cs${page}`,
				"x-default": "/",
			},
		},
	}));
}
