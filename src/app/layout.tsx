import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Devoiler — Bilimsel Formülasyon, Sade Etkinlik",
  description:
    "Kanıta dayalı dermo-kozmetik formülasyonlar. Cildinizin ihtiyacına göre kişiselleştirilmiş aktif içerik protokolleri.",
  keywords: "dermo-kozmetik, aktif içerik, retinol, vitamin c, hyaluronik asit, leke, akne, gözenek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
