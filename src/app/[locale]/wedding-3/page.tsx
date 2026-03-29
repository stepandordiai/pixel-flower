import type { Metadata } from "next";
import Wedding3ClientTemplate from "./Wedding3ClientTemplate";

export const metadata: Metadata = {
	openGraph: {
		title: "Запрошення на весілля",
		images: "/wedding-three/og-img.png",
		url: "/uk/wedding-3",
		type: "website",
	},
};

export default function Wedding3Template() {
	return <Wedding3ClientTemplate />;
}
