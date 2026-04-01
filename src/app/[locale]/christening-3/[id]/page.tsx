import { Metadata } from "next";
import invitations from "@/data/invitations/christening-3.json";
import Christening3Client from "./Christening3Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const invitation = invitations.find((i) => i.id === id);

	if (!invitation) {
		return {
			title: "404",
		};
	}

	return {
		title: `Запрошення на хрестини ${invitation.genitiveName}`,
		openGraph: {
			title: `Запрошення на хрестини ${invitation.genitiveName}`,
			images: "/christening-3/og.png",
			url: `/uk/christening-3/${invitation.id}`,
			type: "website",
		},
	};
}

export default function Christening3() {
	return <Christening3Client />;
}
