"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useToast } from "@/lib/useToast";
import { useState } from "react";

export default function SignOutButton() {
  const [signingOut, setSigningOut] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { notifySuccess, notifyError } = useToast();

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      notifySuccess("Signed out successfully.");
    } catch (error) {
      notifyError("Failed to sign out.");
    } finally {
      setSigningOut(false);
    }
  };

  // Hide button while loading or if no user is logged in
  if (loading || !user) return null;

  return (
    <button
      onClick={handleSignOut}
      disabled={signingOut}
      className="block min-w-max rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-secondary/85 disabled:opacity-50"
    >
      {signingOut ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
