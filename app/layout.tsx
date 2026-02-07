import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pantherhacks.com"),
  title: "Panther Hacks 2026 | Free Hackathon for Students",
  description:
    "Panther Hacks 2026 is a free hackathon for students ages 11-18 at Pinewood Upper Campus on April 19, 2026. Build, learn, and compete for prizes.",
  keywords: ["hackathon", "students", "coding", "Pinewood", "Panther Hacks"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Panther Hacks 2026",
    description:
      "A free, one-day hackathon for middle and high school students at Pinewood Upper Campus.",
    url: "https://pantherhacks.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Panther Hacks 2026",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rhd2nio.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
