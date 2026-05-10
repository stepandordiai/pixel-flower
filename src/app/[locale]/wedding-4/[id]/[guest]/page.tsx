import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import invitations from "@/data/invitations/wedding-4.json";
import Wedding4Client from "./Wedding4Client";

// TODO: learn this
export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string; guest: string; locale: string }>;
}): Promise<Metadata> {
	const { id, guest, locale } = await params;

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
			images: [
				{
					url: invitation.ogImg,
					width: 1200,
					height: 630,
				},
			],
			url:
				locale === routing.defaultLocale
					? `/wedding-4/${invitation.id}/${guest}`
					: `/${locale}/wedding-4/${invitation.id}/${guest}`,
			type: "website",
		},
	};
}

export default function Wedding4() {
	return <Wedding4Client />;
}
