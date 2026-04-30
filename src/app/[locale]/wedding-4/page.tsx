import type { Metadata } from "next";
import templates from "@/data/templates.json";
import Wedding4ClientTemplate from "./Wedding4ClientTemplate";
import { routing } from "@/i18n/routing";

const template = templates.find((template) => template.id === "wedding-4")!;

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

export default function Wedding4Template() {
	return <Wedding4ClientTemplate />;
}
