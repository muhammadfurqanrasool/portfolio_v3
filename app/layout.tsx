import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Furqan | PortFolio | Next.JS",
  description: "Furqan's personal portfolio website built with Next.js, showcasing projects, skills, and experience in web development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
