import { Poppins } from "next/font/google";
import type React from "react";
import type { JSX } from "react";
import { MotionProvider } from "@/components/elements/behavior/motion-provider/motion-provider";
import { getLayoutData } from "@/contentful/lib/get-layout-data";

import "./globals.css";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const layoutData = await getLayoutData();
  const defaultTheme = layoutData?.defaultTheme?.toLowerCase() || "light";

  return (
    <html className="scrollbar-hide" data-theme={defaultTheme} lang="en">
      <head>
        <link
          crossOrigin="anonymous"
          href="https://images.ctfassets.net"
          rel="preconnect"
        />
        <link href="https://images.ctfassets.net" rel="dns-prefetch" />
      </head>
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
