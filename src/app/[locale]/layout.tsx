import { Montserrat_Alternates } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/layout/Footer/Footer";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ScrollToTop from "../utils/ScrollToTop";
import "@/app/scss/globals.scss";

const montserratAlternates = Montserrat_Alternates({
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "cyrillic"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return {
		metadataBase: new URL("https://www.pixelflower.studio"),
		// TODO: learn this
		openGraph: {
			title: "pixel flower",
			description: "Студія сайт-запрошень для весіль і подій",
			url: `/${locale}`,
			type: "website",
			images: "/pixel-flower-og-c.png",
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
		<html lang={locale}>
			{/* TODO: ? */}
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "OnlineBusiness",
							name: "pixel flower",
							description: "Студія сайт-запрошень для весіль і подій",
							url: `https://www.pixelflower.studio/${locale}`,
						}),
					}}
				/>
			</head>
			<body className={montserratAlternates.variable}>
				<ScrollToTop />
				<NextIntlClientProvider locale={locale}>
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
