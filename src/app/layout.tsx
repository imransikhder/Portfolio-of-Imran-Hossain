import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Imran Hossain | Marketing Professional & Digital Marketing Enthusiast",
  description:
    "Portfolio of Mohammad Imran Hossain — Marketing Graduate, Digital Marketing Enthusiast, and Business Development Aspirant from Bangladesh. Explore my skills, experience, projects, and certifications.",
  keywords: [
    "Mohammad Imran Hossain",
    "Marketing",
    "Digital Marketing",
    "Business Development",
    "Portfolio",
    "Bangladesh",
    "Facebook Ads",
    "Marketing Analytics",
  ],
  authors: [{ name: "Mohammad Imran Hossain" }],
  openGraph: {
    title: "Mohammad Imran Hossain | Marketing Professional",
    description:
      "Marketing Graduate & Digital Marketing Enthusiast. Explore my portfolio, projects, and professional journey.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
