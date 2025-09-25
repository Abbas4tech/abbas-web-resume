import React, { JSX } from "react";
import { Poppins } from "next/font/google";

import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: ["400"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
