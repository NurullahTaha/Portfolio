import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ... (imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pastel-black text-foreground`}
      >
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
