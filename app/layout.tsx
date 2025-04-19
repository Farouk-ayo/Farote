import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "NoteTaker App",
  description: "A simple application to take and manage notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">NoteTaker</h1>
              <p className="text-blue-100">Keep your thoughts organized</p>
            </div>
          </header>
          <main className="container mx-auto py-8 px-4">{children}</main>
          <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} NoteTaker App</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
