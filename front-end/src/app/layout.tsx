import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseWrapper from "@/wrappers/BaseWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art Fusion AI Hub",
  description: "Art Fusion AI Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseWrapper>{children}</BaseWrapper>
      </body>
    </html>
  );
}
