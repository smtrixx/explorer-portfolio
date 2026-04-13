import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import PostHogProvider from "../components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soham Rathi | Machine Learning Engineer",
  description:
    "Portfolio of Soham Rathi showcasing machine learning projects including fashion semantic search and stock prediction systems.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Soham Rathi",
              url: "https://sohamrathi.com",
              sameAs: [
                "https://github.com/smtrixx",
                "https://linkedin.com/in/YOUR_LINKEDIN",
              ],
              jobTitle: "Machine Learning Engineer",
              description:
                "Machine learning engineer building AI systems including fashion semantic search and forex prediction.",
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}