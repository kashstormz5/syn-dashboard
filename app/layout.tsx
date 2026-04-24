import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syn Discord Dashboard",
  description: "Minimal Discord bot dashboard MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
