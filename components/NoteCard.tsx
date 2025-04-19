"use client";

import { useState } from "react";
import { format } from "date-fns";
import { INote } from "@/types";

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      try {
        await onDelete(note._id);
      } catch (error) {
        console.error("Failed to delete note:", error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 disabled:text-gray-400"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="mt-2 text-gray-600 whitespace-pre-wrap">
        {note.content}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        {new Date(note.updatedAt).getTime() !==
        new Date(note.createdAt).getTime() ? (
          <span>
            Updated: {format(new Date(note.updatedAt), "MMM d, yyyy h:mm a")}
          </span>
        ) : (
          <span>
            Created: {format(new Date(note.createdAt), "MMM d, yyyy h:mm a")}
          </span>
        )}
      </div>
    </div>
  );
}
