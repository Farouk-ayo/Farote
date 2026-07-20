import "./globals.css";
import { Fraunces, Karla, DynaPuff } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import SignOutButton from "@/components/SignoutButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const dynapuff = DynaPuff({
  subsets: ["latin"],
  variable: "--font-dynapuff",
});

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
  authors: [{ name: "Faroukayo" }],
  icons: [
    { rel: "apple-touch-icon", url: "/favicon.png" },
    { rel: "icon", url: "/favicon.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#521c0d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${karla.variable} ${dynapuff.variable} font-body antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
              <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-baseline gap-3 min-w-0">
                  <h1 className="font-dynapuff text-2xl text-primary leading-none">
                    farote
                    <span className="text-secondary">.</span>
                  </h1>
                  <p className="hidden sm:block text-sm text-ink-soft truncate">
                    Keep your thoughts organized
                  </p>
                </div>
                <SignOutButton />
              </div>
            </header>

            <main className="container mx-auto flex-1 px-4 py-8">
              {children}
            </main>

            <footer className="border-t border-line/70 py-5 text-center text-sm text-ink-faint">
              <p>
                © {new Date().getFullYear()} farote — made with warm thoughts
              </p>
            </footer>
          </div>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
