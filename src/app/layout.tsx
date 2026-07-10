import "./globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Clean Energy Fund",
  description:
    "Nigeria's first dedicated local-currency clean energy fund, mobilising domestic capital for renewable energy and climate infrastructure across Africa.",
  icons: {
    icon: "https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/03/Clean-Energy-Logo-1.svg",
    shortcut: "https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/03/Clean-Energy-Logo-1.svg",
    apple: "https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/03/Clean-Energy-Logo-1.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

/**
 * RootLayout is the main layout component that wraps all pages with Navbar and Footer.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - The content to be rendered within the layout.
 */
export default function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head />
      <body className={`${outfit.className} bg-white text-black antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}