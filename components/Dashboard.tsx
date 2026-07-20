import { useState } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { INote, NoteFormData } from "@/types";
import { useToast } from "@/lib/useToast";
import { PlusIcon } from "@radix-ui/react-icons";

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
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleCreateNewNote}
            data-create-note-trigger
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-(--shadow-card) transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-(--shadow-card-hover)"
          >
            <PlusIcon className="h-4 w-4" /> Create New Note
          </button>
        </div>
      )}

      {/* Note Form Section - Animated */}
      <div
        id="note-form-section"
        className={`mb-10 transition-all duration-300 ease-in-out overflow-hidden ${
          shouldShowForm
            ? "max-h-screen opacity-100 transform translate-y-0"
            : "max-h-0 opacity-0 transform -translate-y-4"
        }`}
      >
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-card)">
          <div className="h-1 w-full bg-gradient-to-r from-tertiary via-secondary to-tertiary" />
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-ink">
                {editingNote ? "Edit Note" : "Create a New Note"}
              </h3>
              {notes.length > 0 && (
                <button
                  onClick={() => {
                    setShowNoteForm(false);
                    setEditingNote(null);
                  }}
                  className="rounded-lg px-3 py-1 text-sm text-ink-soft transition-colors hover:bg-paper hover:text-ink"
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
      </div>

      {/* Notes List Section */}
      <div>
        <div className="mb-5 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold text-ink">
            Your Notes
          </h3>
          {notes.length > 0 && (
            <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-ink-soft">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : notes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="animate-rise min-w-0"
                style={{
                  animationDelay: `${Math.min(index, 8) * 60}ms`,
                }}
              >
                <NoteCard
                  note={note}
                  accentIndex={index}
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
        <span className="absolute w-full h-full rounded-full border-2 border-secondary opacity-50 animate-ping" />
        <span className="absolute w-full h-full rounded-full border-2 border-secondary" />
      </span>
      <p className="text-ink-soft">Loading notes...</p>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-4 text-secondary">
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-card/60 px-4 py-14 text-center">
      <div className="max-w-sm mx-auto">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary/15">
          <svg
            className="h-8 w-8 text-secondary"
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
        <h3 className="mb-2 font-display text-lg font-semibold text-ink">
          No notes yet
        </h3>
        <p className="text-ink-soft">
          Get started by creating your first note above!
        </p>
      </div>
    </div>
  );
}
