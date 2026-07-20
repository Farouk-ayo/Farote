"use client";

import { useEffect, useState } from "react";
import { INote, NoteFormData } from "@/types";
import { InputField } from "./InputField";
import Button from "./Button";

interface NoteFormProps {
  note?: INote;
  onSave: (data: NoteFormData) => Promise<void>;
  onCancel?: () => void;
}

export default function NoteForm({ note, onSave, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSave({ title, content });

      // Only clear form if not editing an existing note
      if (!note) {
        setTitle("");
        setContent("");
      }
    } catch (err) {
      setError("Failed to save note. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-3 text-sm text-secondary">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Title
        </label>
        <InputField
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-line bg-paper/50 p-3 text-ink placeholder:text-ink-faint transition-shadow focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          placeholder="Write your note here..."
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper focus:outline-none"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}

        <Button
          type="submit"
          className="w-max rounded-xl bg-primary px-5 hover:bg-primary/90 focus:ring-primary/30"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : note ? "Update Note" : "Save Note"}
        </Button>
      </div>
    </form>
  );
}
