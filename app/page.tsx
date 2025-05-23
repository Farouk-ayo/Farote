"use client";

import { useState, useEffect } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { INote, NoteFormData } from "@/types";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "@/lib/useToast";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function Home() {
  const { user, signOut } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<INote | null>(null);
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const { notifySuccess, notifyError, notifyInfo } = useToast();

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleSaveNote = async (noteData: NoteFormData) => {
    if (editingNote) {
      await updateNote(editingNote._id, noteData);
    } else {
      await createNote(noteData);
    }
  };

  const createNote = async (noteData: NoteFormData) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!res.ok) {
      notifyError("Failed to create note");
      throw new Error("Failed to create note");
    }

    notifySuccess("Note created successfully");
    const { data }: ApiResponse<INote> = await res.json();
    setNotes([data, ...notes]);
  };

  const updateNote = async (id: string, noteData: NoteFormData) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!res.ok) {
      notifyError("Failed to update note");
      throw new Error("Failed to update note");
    }
    notifySuccess("Note updated successfully");

    const { data }: ApiResponse<INote> = await res.json();
    setNotes(notes.map((note) => (note._id === id ? data : note)));
    setEditingNote(null);
  };

  const handleDeleteNote = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      notifyError("Failed to delete note");
      throw new Error("Failed to delete note");
    }
    notifySuccess("Note deleted successfully");
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleEditNote = (note: INote) => {
    notifyInfo("You can edit your note now");
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
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

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* User profile section */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Notes</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="hover:bg-tertiary/80 text-gray-800 text-sm py-1 px-3 rounded bg-tertiary disabled:opacity-50"
            >
              {signingOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 ">
          {editingNote ? "Edit Note" : "Create a New Note"}
        </h2>
        <NoteForm
          note={editingNote || undefined}
          onSave={handleSaveNote}
          onCancel={editingNote ? handleCancelEdit : undefined}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Notes</h2>

        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <span className="relative w-4 h-4">
              <span className="absolute w-full h-full rounded-full border-2 border-primary opacity-50 animate-ping" />
              <span className="absolute w-full h-full rounded-full border-2 border-primary" />
            </span>
            <p className="text-gray-600">Loading notes...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
        ) : notes.length === 0 ? (
          <div className=" p-8 text-center rounded-lg">
            <p className="text-black">
              You don't have any notes yet. Create one above!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
