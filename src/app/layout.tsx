import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"], // Añadido más pesos para mejor versatilidad
});

export const metadata: Metadata = {
  title: "Ai Mori - Your Virtual AI Girlfriend",
  description:
    "Start your journey with your AI girlfriend and build a meaningful relationship through gifts and interactions.",
  keywords: [
    "AI girlfriend",
    "virtual relationship",
    "AI companion",
    "dating simulation",
  ],
  authors: [{ name: "Ai Mori" }],
  openGraph: {
    title: "Ai Mori - Your Virtual AI Girlfriend",
    description:
      "Start your journey with your AI girlfriend and build a meaningful relationship.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={roboto.variable}>
        <body className="font-sans antialiased min-h-screen flex flex-col">
          <div className="container mx-auto">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
