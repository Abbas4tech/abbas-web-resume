import { Poppins } from "next/font/google";
import type React from "react";
import type { JSX } from "react";
import { MotionProvider } from "@/components/elements/behavior/motion-provider/motion-provider";

import "./globals.css";

const inter = Poppins({ subsets: ["latin-ext"], weight: ["400", "700"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  return (
    <html className="scrollbar-hide" lang="en">
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
