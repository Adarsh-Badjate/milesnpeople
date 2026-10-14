import type { Metadata } from "next";
import { Anton, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miles & People — Community Run Club",
  description:
    "Free Sunday-morning community runs in Chhatrapati Sambhajinagar. 3K & 5K. Every pace welcome. Come for the miles. Stay for the people.",
  openGraph: {
    title: "Miles & People — Community Run Club",
    description: "Free Sunday-morning community runs. 3K & 5K. Every pace welcome.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
