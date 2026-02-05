import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/common/Footer/Footer";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	// TODO: ?
	const t = await getTranslations({ locale });
	const baseUrl = "https://www.pixelflower.studio";

	const lngUrls: Record<"uk" | "cs", string> = {
		uk: `${baseUrl}/uk`,
		cs: `${baseUrl}/cs`,
	};

	return {
		title: `${t("homeMetaTitle")} | pixel flower`,
		description: t("homeMetaDesc"),
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				...lngUrls,
				"x-default": `${baseUrl}/uk`,
			},
		},
	};
}

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;

	// TODO: ?
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<NextIntlClientProvider locale={locale}>
			{children}
			<Footer />
		</NextIntlClientProvider>
	);
}
