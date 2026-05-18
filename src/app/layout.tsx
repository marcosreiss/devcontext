// src/app/layout.tsx
import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

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
  metadataBase: new URL(
    "https://devcontext.app"
  ),

  title: {
    default: "DevContext",
    template: "%s | DevContext",
  },

  description:
    "Generate AI-ready project documentation automatically from ZIP uploads. DevContext creates structured markdown context for ChatGPT, Claude, Cursor and other LLMs.",

  keywords: [
    "AI documentation",
    "project context",
    "markdown generator",
    "LLM context",
    "codebase documentation",
    "Next.js",
    "developer tools",
    "ChatGPT context",
    "Claude context",
    "Cursor AI",
  ],

  authors: [
    {
      name: "Marcos Reis",
    },
  ],

  creator: "Marcos Reis",

  publisher: "DevContext",

  applicationName: "DevContext",

  category: "developer tools",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview":
        "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://devcontext.app",

    siteName: "DevContext",

    title: "DevContext",

    description:
      "Automatically generate structured AI-ready documentation from your codebase.",

    images: [
      {
        url: "/og-image.png",

        width: 1200,

        height: 630,

        alt: "DevContext",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "DevContext",

    description:
      "Generate AI-ready project documentation automatically.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
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
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}