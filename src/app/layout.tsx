import { Poppins } from "next/font/google";
import { ApplicationData } from "@/lib/contentful";
import { fetchQuery } from "@/lib/api";
import { Layout } from "@/components/layout";

import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: ["400"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchQuery<ApplicationData>(
    process.env.CONTENTFUL_APPLICATION_DATA_ID!
  );
  return (
    <html
      lang="en"
      data-theme={data.defaultTheme.toLowerCase()}
      className="scrollbar-hide"
    >
      <body className={inter.className}>
        <Layout data={data}>{children}</Layout>
      </body>
    </html>
  );
}
