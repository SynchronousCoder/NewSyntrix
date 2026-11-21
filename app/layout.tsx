import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import ContactUs from "../components/shared/ContactUs/ContactUs";
import MotionProvider from "../components/animations/MotionProvider";
import "../components/animations/motion.css";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syntrix Design",
  description:
    "Syntrix is an independent design agency building distinctive brands, digital experiences, and software.",
  openGraph: {
    title: "Syntrix Design",
    description:
      "Distinctive brands, digital experiences, and software by Syntrix.",
    siteName: "Syntrix Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bebasNeue.variable}`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider />
        <Navbar />
        {children}
        <ContactUs />
        <Footer />
      </body>
    </html>
  );
}
