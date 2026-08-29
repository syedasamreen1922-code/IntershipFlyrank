import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Settings App",
  description: "Responsive settings application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold">
              Settings App
            </Link>

            <div className="flex gap-4 text-sm font-medium">
              <Link href="/" className="hover:underline">
                Home
              </Link>

              <Link href="/settings" className="hover:underline">
                Settings
              </Link>

              <Link href="/health" className="hover:underline">
                Health
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}