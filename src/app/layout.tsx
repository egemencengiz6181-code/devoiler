import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { OrderProvider } from "@/context/OrderContext";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import ToastContainer from "@/components/ToastContainer";

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
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <ToastProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <CartDrawer />
                <AuthModal />
                <ToastContainer />
              </ToastProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
