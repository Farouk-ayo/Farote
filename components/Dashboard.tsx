import { useState } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { INote, NoteFormData } from "@/types";
import { useToast } from "@/lib/useToast";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface DashboardSectionProps {
  userName: string;
  notes: INote[];
  loading: boolean;
  error: string | null;
  onSignOut: () => Promise<void>;
  signingOut: boolean;
  onNotesUpdate: (notes: INote[]) => void;
}

export default function DashboardSection({
  notes,
  loading,
  error,

  onNotesUpdate,
}: DashboardSectionProps) {
  const [editingNote, setEditingNote] = useState<INote | null>(null);
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
  const { notifySuccess, notifyError, notifyInfo } = useToast();

  // Show form by default if there are no notes
  const shouldShowForm =
    showNoteForm || editingNote || (notes.length === 0 && !loading);

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
    onNotesUpdate([data, ...notes]);
    setShowNoteForm(false); // Hide form after creating
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
    onNotesUpdate(notes.map((note) => (note._id === id ? data : note)));
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
    onNotesUpdate(notes.filter((note) => note._id !== id));
  };

  const handleEditNote = (note: INote) => {
    notifyInfo("You can edit your note now");
    setEditingNote(note);
    setShowNoteForm(true);
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById("note-form-section");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowNoteForm(false);
  };

  const handleCreateNewNote = () => {
    setEditingNote(null);
    setShowNoteForm(true);
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById("note-form-section");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Create Note Button - Only show when form is hidden and there are notes */}
      {!shouldShowForm && notes.length > 0 && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleCreateNewNote}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            + Create New Note
          </button>
        </div>
      )}

      {/* Note Form Section - Animated */}
      <div
        id="note-form-section"
        className={`mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
          shouldShowForm
            ? "max-h-screen opacity-100 transform translate-y-0"
            : "max-h-0 opacity-0 transform -translate-y-4"
        }`}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {editingNote ? "Edit Note" : "Create a New Note"}
            </h3>
            {notes.length > 0 && (
              <button
                onClick={() => {
                  setShowNoteForm(false);
                  setEditingNote(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
          <NoteForm
            note={editingNote || undefined}
            onSave={handleSaveNote}
            onCancel={editingNote ? handleCancelEdit : undefined}
          />
        </div>
      </div>

      {/* Notes List Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            Your Notes {notes.length > 0 && `(${notes.length})`}
          </h3>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : notes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-3 transition-all duration-300">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="transform transition-all duration-200 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <NoteCard
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center space-x-2 py-8">
      <span className="relative w-4 h-4">
        <span className="absolute w-full h-full rounded-full border-2 border-primary opacity-50 animate-ping" />
        <span className="absolute w-full h-full rounded-full border-2 border-primary" />
      </span>
      <p className="text-gray-600">Loading notes...</p>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-sm mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-600 mb-4">
          Get started by creating your first note above!
        </p>
      </div>
    </div>
  );
}
