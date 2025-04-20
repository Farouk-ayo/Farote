"use client";

import { useState, useEffect } from "react";
import NoteForm from "../../../components/NoteForm";
import NoteCard from "../../../components/NoteCard";
import { INote } from "@/types";
import { useAuth } from "../../contexts/AuthContext";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<INote | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

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

  const handleSaveNote = async (noteData: INote) => {
    if (editingNote) {
      await updateNote(editingNote._id, noteData);
    } else {
      await createNote(noteData);
    }
  };

  const createNote = async (noteData: INote) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!res.ok) {
      throw new Error("Failed to create note");
    }

    const { data }: ApiResponse<INote> = await res.json();
    setNotes([data, ...notes]);
  };

  const updateNote = async (id: string, noteData: INote) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!res.ok) {
      throw new Error("Failed to update note");
    }

    const { data }: ApiResponse<INote> = await res.json();
    setNotes(notes.map((note) => (note._id === id ? data : note)));
    setEditingNote(null);
  };

  const handleDeleteNote = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete note");
    }

    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleEditNote = (note: INote) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Notes</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1 px-3 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
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
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading notes...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
        ) : notes.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <p className="text-gray-600">
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
