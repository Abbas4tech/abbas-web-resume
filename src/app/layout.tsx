import { Poppins } from "next/font/google";
import type React from "react";
import type { JSX } from "react";
import { cache } from "react";
import { MotionProvider } from "@/components/elements/behavior/motion-provider/motion-provider";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";

import "./globals.css";

const inter = Poppins({ subsets: ["latin-ext"], weight: ["400", "700"] });

export const getLayoutData = cache(async () => {
  const response = await contentfulSdk.GetLayout();
  const rawLayout = response.data?.layoutCollection?.items?.[0];
  return adaptLayout(rawLayout);
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
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
