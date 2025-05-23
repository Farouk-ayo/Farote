"use client";

import { useState } from "react";
import { format } from "date-fns";
import { INote } from "@/types";
import { EyeOpenIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(note._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="text-black hover:text-black/80 transition-colors"
            disabled={isDeleting}
          >
            Edit
          </button>

          {/* Confirm Delete Dialog */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                disabled={isDeleting}
                className="text-red-500 hover:text-red-800 disabled:text-gray-400"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-in fade-in-0" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl animate-in fade-in-0 zoom-in-95">
                <div className="p-6">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Confirm Delete
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete the note "
                    <strong>{note.title}</strong>"? This action cannot be
                    undone.
                  </p>
                </div>
                <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none transition-colors"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      <div className="mt-2 text-gray-600 whitespace-pre-wrap line-clamp-4">
        {note.content}
      </div>

      {/* View Full Note Dialog */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-sm text-blue-600 mt-2 flex items-center hover:text-blue-500 transition-colors">
            <EyeOpenIcon className="w-4 h-4 mr-1" /> View Full
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-in fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                {note.title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none  transition-opacity">
                  <Cross2Icon className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {note.content}
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <Dialog.Close asChild>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none  transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  onClick={() => onEdit(note)}
                  className="px-4 py-2 text-sm font-medium text-white bg-tertiary rounded-md hover:bg-tertiary/80 focus:outline-none  transition-colors"
                >
                  Edit Note
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

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
