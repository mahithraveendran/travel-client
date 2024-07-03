import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AllProviders from "@/providers/All-Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Destinations",
  description: "Created by Dream Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        scrollBehavior: "smooth",
        // horizontal scrolling hidden
        overflowX: "hidden",
      }}
    >
      <body className={inter.className}>
        <AntdRegistry>
          <AllProviders>{children}</AllProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
