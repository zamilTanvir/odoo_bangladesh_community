import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtas from "@/components/widgets/StickyCtas";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/schemaOrg";
import { loadSite } from "@/lib/content/loadContent";
import ExitIntentPopup from "@/components/widgets/ExitIntentPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-accent",
  subsets: ["latin"],
});

export const metadata = {
  title: "Odoo Bangladesh Community Platform",
  description:
    "Learn Odoo in Bangladesh with functional & technical training resources, implementation guidance, and a community hub.",
};

export default function RootLayout({ children }) {
  const site = loadSite();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <JsonLd data={organizationJsonLd(site)} />
        <JsonLd data={websiteJsonLd(site)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCtas />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
