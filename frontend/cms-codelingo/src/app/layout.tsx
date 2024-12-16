import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organism/GlobalProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Codelingo - Belajar Coding Menjadi Mudah dan Menyenangkan",
  description:
    "CodeLingo adalah program pembelajaran coding yang dirancang khusus untuk anak-anak, mulai dari pemula hingga level intermediate. ",
  icons: [
    { rel: "icon", url: "/images/favicon.ico", sizes: "16x16" },
    { rel: "icon", url: "/images/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/images/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/images/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/images/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
};

const baloo2 = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${baloo2.variable} antialiased`}>
      <body>
        <GlobalProvider>
          <main className="font-baloo2">{children}</main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  );
}
