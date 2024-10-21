import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Layout } from "@components";
import { ApplicationDataProvider } from "@context";
import { ApplicationData } from "@utils/contentful";
import "./globals.css";
import { fetchQuery } from "@utils/api";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <ApplicationDataProvider initialData={data}>
          <Layout>{children}</Layout>
        </ApplicationDataProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
