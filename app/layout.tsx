import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miklášovi | 5. 9. 2026",
  description:
    "Svatební web s informacemi o obřadu, oslavě, harmonogramu a potvrzení účasti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
