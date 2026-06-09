import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H-4 EAD Career Navigator",
  description: "AI-powered career guidance for H-4 EAD visa holders",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}