import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CPG: Gift Wrapping Service",
  description: "Christmas Present Group - Custom Gift Wrapping Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-amber-50 min-h-screen">{children}</body>
    </html>
  );
}
