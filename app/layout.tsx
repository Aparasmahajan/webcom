import type { Metadata } from "next";
import Layout from "../src/components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webcom",
  description: "Webcom Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
