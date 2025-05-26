// app/components/SignOutButton.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useToast } from "@/lib/useToast";
import { useState } from "react";

export default function SignOutButton() {
  const [signingOut, setSigningOut] = useState(false);
  const { signOut } = useAuth();
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

  return (
    <button
      onClick={handleSignOut}
      disabled={signingOut}
      className="hover:bg-tertiary/80 text-white text-sm py-1 px-3 rounded bg-tertiary disabled:opacity-50 block min-w-max"
    >
      {signingOut ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
