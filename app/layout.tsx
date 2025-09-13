import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alldent - Gabinet Stomatologiczny w Częstochowie",
  description:
    "Nowoczesny gabinet stomatologiczny w Częstochowie. Oferujemy kompleksową opiekę stomatologiczną: profilaktykę, leczenie, implantologię i stomatologię estetyczną.",
  keywords: [
    "dentysta Częstochowa",
    "gabinet stomatologiczny",
    "implantologia",
    "wybielanie zębów",
    "stomatologia estetyczna",
  ],
  openGraph: {
    title: "Alldent - Gabinet Stomatologiczny w Częstochowie",
    description: "Profesjonalna opieka stomatologiczna w sercu Częstochowy",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
