import type { Metadata } from "next";
import templates from "@/app/assets/data/templates.json";
import Wedding3ClientTemplate from "./Wedding3ClientTemplate";
import { routing } from "@/i18n/routing";

const template = templates.find((template) => template.id === "wedding-3")!;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return {
		openGraph: {
			title: "Запрошення на весілля",
			images: template.ogImg,
			url:
				locale === routing.defaultLocale
					? "/wedding-3/${invitation.id}"
					: `/${locale}/wedding-3/${template.id}`,
			type: "website",
		},
	};
}

export default function Wedding3Template() {
	return <Wedding3ClientTemplate />;
}
