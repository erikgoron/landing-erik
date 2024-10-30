import Header from "@/components/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Erik Goron - AI Engineer & Researcher",
  description: "Personal portfolio of Erik Goron, an AI engineer and researcher passionate about building AI solutions that enhance human capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Background SVG */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/Clouds.svg"
            alt="Background sky"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <Header />
        <main className="pt-16 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
