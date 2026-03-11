import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/motion";
import CookieConsent from "@/components/cookie-consent";
import FloatingContact from "@/components/floating-contact";
import { JsonLd, organizationSchema } from "@/components/structured-data";
import { SerwistProvider } from "./serwist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alldent-stomatologia.pl"),
  title: {
    default: "Alldent - Gabinet Stomatologiczny w Częstochowie",
    template: "%s | Alldent Częstochowa",
  },
  description:
    "Nowoczesny gabinet stomatologiczny w Częstochowie. Oferujemy kompleksową opiekę stomatologiczną: profilaktykę, leczenie, implantologię i stomatologię estetyczną.",
  keywords: [
    "dentysta Częstochowa",
    "gabinet stomatologiczny",
    "implantologia",
    "wybielanie zębów",
    "stomatologia estetyczna",
    "ortodoncja Częstochowa",
    "stomatolog dziecięcy Częstochowa",
  ],
  openGraph: {
    title: "Alldent - Gabinet Stomatologiczny w Częstochowie",
    description: "Profesjonalna opieka stomatologiczna w sercu Częstochowy",
    type: "website",
    locale: "pl_PL",
    siteName: "Alldent Częstochowa",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  applicationName: "Alldent",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alldent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SerwistProvider swUrl="/serwist/sw.js">
          <Navigation />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <FloatingContact />
          <CookieConsent />
          <Analytics />
        </SerwistProvider>
      </body>
    </html>
  );
}
