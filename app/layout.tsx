import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farote",
  description: "NoteTaker App: A simple application to take and manage notes",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "pwa",
    "Farote",
    "note-taking",
    "notes",
    "app",
    "devfarouk note",
    "devfarouk note-taking",
  ],
  creator: "Faroukayo",
  applicationName: "Farote",
  themeColor: "#1e293b",
  colorScheme: "dark light",
  authors: [{ name: "Faroukayo" }],
  icons: [
    { rel: "apple-touch-icon", url: "/favicon.png" },
    { rel: "icon", url: "/favicon.png" },
  ],
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
            <main className=" container mx-auto py-8 px-4 my-8 ">
              {children}
            </main>
            <footer className=" py-4 text-center text-gray-600 text-sm fixed bottom-0 w-full  shadow-md bg-quaternary">
              <p>© {new Date().getFullYear()} NoteTaker App</p>
            </footer>
          </div>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
