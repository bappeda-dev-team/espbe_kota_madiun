import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/global/Sidebar/Sidebar";
import Header from "@/components/global/Header/Header";

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
        <div className="block w-screen">
          <Header />
          <main className="p-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
