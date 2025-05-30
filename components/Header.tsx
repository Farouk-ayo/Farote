// app/components/Header.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();

  // Don't show header on login/register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">NoteTaker</h1>
          <p className="text-blue-100">Keep your thoughts organized</p>
        </div>

        {!loading && user && (
          <div className="flex items-center space-x-4">
            <span className="text-blue-100 hidden md:inline">
              Welcome, {user.name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-secondary hover:bg-secondary/80  text-white text-sm py-1 px-3 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
