import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import TemplatesClient from "./TemplatesClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "templates.meta" });
	const page = "templates";

	return {
		title: t("title"),
		description: t("desc"),
		alternates: {
			canonical:
				locale === routing.defaultLocale ? `/${page}` : `/${locale}/${page}`,
			languages: {
				cs: `/cs/${page}`,
				"x-default": `/${page}`,
			},
		},
	};
}

export default function Templates() {
	return <TemplatesClient />;
}
