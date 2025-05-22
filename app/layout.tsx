import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteTaker App",
  description: "A simple application to take and manage notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen">
            <header className="bg-primary text-quaternary p-4 shadow-md">
              <div className="container mx-auto">
                <h1 className="text-2xl font-bold font-dynapuff">Farote</h1>
                <p className="text-white">Keep your thoughts organized</p>
              </div>
            </header>
            <main className=" container mx-auto py-8 px-4">{children}</main>
            <footer className=" py-4 text-center text-gray-600 text-sm">
              <p>© {new Date().getFullYear()} NoteTaker App</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
