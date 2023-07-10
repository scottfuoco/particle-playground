import type { Metadata } from "next";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Canvas Playground",
  description: "Messing around with canvas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
