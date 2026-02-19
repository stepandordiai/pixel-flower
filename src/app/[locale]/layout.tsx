import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/layout/Footer/Footer";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat_Alternates } from "next/font/google";
import ScrollToTop from "../utils/ScrollToTop";
import "@/app/globals.scss";

const montserratAlternates = Montserrat_Alternates({
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "cyrillic"],
});

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
