import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "E-SPBE",
  description: "Aplikasi E-SPBE Kota Madiun",
  icons: [{ rel: 'icon', url: '/logo.png' }]
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-start`}>
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
