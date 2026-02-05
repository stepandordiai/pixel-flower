import { Montserrat_Alternates } from "next/font/google";
import "./globals.scss";

const montserratAlternates = Montserrat_Alternates({
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body className={montserratAlternates.variable}>{children}</body>
		</html>
	);
}
