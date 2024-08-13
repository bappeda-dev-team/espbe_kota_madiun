"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/global/Sidebar/Sidebar";
import Header from "@/components/global/Header/Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { usePathname } from "next/navigation";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();
  const isLoginPage = pathname === "/Login";
  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <html lang="en">
        <Provider store={store}>
          <head>
            <title>E-SPBE</title>
            <meta name="description" content="Aplikasi E-SPBE Kota Madiun" />
            <link rel="icon" href="/logo.png" />
          </head>
          <body className={`${inter.className} flex`}>
              {!isLoginPage && <Sidebar isCollapse={isCollapse} toggleCollapse={toggleCollapse} />}
              <div className={`${!isLoginPage ? (isCollapse ? "pl-[6rem] w-full transition-all duration-300 ease-in-out" : "pl-[17rem] w-full transition-all duration-100") : "w-full"}`}>
                {!isLoginPage && <Header />}
                <main className={`${isLoginPage ? "" :"p-5" }`}>
                  {children}
                </main>
              </div>
          </body>
        </Provider>
    </html>
  );
}
