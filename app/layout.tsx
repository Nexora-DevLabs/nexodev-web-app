import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { DynamicIsland } from "@/components/ui/dynamic-island";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexora-devlabs.com"),
  title: "Nexora DevLabs - Build smart. Ship fast.",
  description:
    "We craft lean, modern software for teams who value clarity, velocity, and reliability.",
  keywords: [
    "software development",
    "product engineering",
    "platform engineering",
    "developer experience",
    "consulting",
  ],
  authors: [{ name: "Nexora DevLabs" }],
  creator: "Nexora DevLabs",
  publisher: "Nexora DevLabs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexora-devlabs.com",
    title: "Nexora DevLabs - Build smart. Ship fast.",
    description:
      "We craft lean, modern software for teams who value clarity, velocity, and reliability.",
    siteName: "Nexora DevLabs",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nexora DevLabs - Modern software development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora DevLabs - Build smart. Ship fast.",
    description:
      "We craft lean, modern software for teams who value clarity, velocity, and reliability.",
    images: ["/logo.png"],
    creator: "@nexoradevlabs",
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = getInitialTheme();

  return (
    <html lang="en" className={initialTheme}>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${poppins.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider initialTheme={initialTheme}>
          <DynamicIsland />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
