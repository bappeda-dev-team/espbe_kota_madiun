"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/global/Sidebar/Sidebar";
import Header from "@/components/global/Header/Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Provider store={store}>
          <head>
            <title>E-SPBE</title>
            <meta name="description" content="Aplikasi E-SPBE Kota Madiun" />
            <link rel="icon" href="/logo.png" />
          </head>
          <body className={`${inter.className} flex`}>
            <Sidebar />
            <div className="pl-[17rem] w-full">
              <Header />
              <main className="p-5">{children}</main>
            </div>
          </body>
        </Provider>
    </html>
  );
}
