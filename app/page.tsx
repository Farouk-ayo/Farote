"use client";

import { useState, useEffect } from "react";
import { INote } from "@/types";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "@/lib/useToast";
import LandingPage from "@/components/LandingPage";
import WelcomeBack from "@/components/WelcomeBack";
import DashboardSection, { LoadingSpinner } from "@/components/Dashboard";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function HomePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [notesLoading, setNotesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const { notifySuccess, notifyError } = useToast();

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotesLoading(false);
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      setNotesLoading(true);
      const res = await fetch("/api/notes");

      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data: ApiResponse<INote[]> = await res.json();
      setNotes(data.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please refresh the page.");
    } finally {
      setNotesLoading(false);
    }
  };

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

  const handleNotesUpdate = (updatedNotes: INote[]) => {
    setNotes(updatedNotes);
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is not logged in, show landing page
  if (!user) {
    return <LandingPage />;
  }

  // If user is logged in, show welcome message and dashboard
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Welcome Section */}
        <WelcomeBack
          userName={user.name}
          notesCount={notesLoading ? 0 : notes.length}
        />

        {/* Dashboard Section */}
        <div data-dashboard>
          <DashboardSection
            userName={user.name}
            notes={notes}
            loading={notesLoading}
            error={error}
            onSignOut={handleSignOut}
            signingOut={signingOut}
            onNotesUpdate={handleNotesUpdate}
          />
        </div>
      </div>
    </div>
  );
}
