import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import invitations from "@/app/assets/data/invitations/wedding-3.json";
import Wedding3Client from "./Wedding3Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
	const { id, locale } = await params;

	const invitation = invitations.find((i) => i.id === id);

	if (!invitation) {
		return {
			title: "404",
		};
	}

	return {
		title: `Запрошення на весілля`,
		openGraph: {
			title: `Запрошення на весілля`,
			images: "/wedding-three/og-c.png",
			url:
				locale === routing.defaultLocale
					? "/wedding-3/${invitation.id}"
					: `/${locale}/wedding-3/${invitation.id}`,
			type: "website",
		},
	};
}

export default function Wedding3() {
	return <Wedding3Client />;
}
