import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://english.tudencafe.com"),

  title: {
    default: "English Từ Đến — Learn English for Real Life",
    template: "%s | English Từ Đến",
  },

  description:
    "Learn practical English through real-life situations, structured courses, lessons, speaking practice, and useful vocabulary with English Từ Đến.",

  applicationName: "English Từ Đến",

  keywords: [
    "learn English",
    "English learning",
    "English for beginners",
    "practical English",
    "English speaking practice",
    "English vocabulary",
    "English lessons",
    "English for work",
    "English for Singapore",
    "English Từ Đến",
  ],

  authors: [{ name: "English Từ Đến" }],
  creator: "English Từ Đến",
  publisher: "English Từ Đến",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://english.tudencafe.com",
    siteName: "English Từ Đến",
    title: "English Từ Đến — Learn English for Real Life",
    description:
      "Learn practical English through real-life situations, structured courses, lessons, speaking practice, and useful vocabulary.",
  },

  twitter: {
    card: "summary_large_image",
    title: "English Từ Đến — Learn English for Real Life",
    description:
      "Learn practical English through real-life situations, structured courses, lessons, speaking practice, and useful vocabulary.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}