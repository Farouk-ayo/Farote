"use client";

import { useState } from "react";
import { format } from "date-fns";
import { INote } from "@/types";
import { EyeOpenIcon } from "@radix-ui/react-icons";

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 relative">
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

        <div className="mt-2 text-gray-600 whitespace-pre-wrap line-clamp-4">
          {note.content}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-blue-500 mt-2 flex items-center"
        >
          <EyeOpenIcon className="w-4 h-4 mr-1" /> View Full
        </button>

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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-sm"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className="whitespace-pre-wrap text-gray-700">{note.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
