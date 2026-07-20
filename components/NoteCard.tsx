"use client";

import { useState } from "react";
import { format } from "date-fns";
import { INote } from "@/types";
import {
  EyeOpenIcon,
  Cross2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => Promise<void>;
  accentIndex?: number;
}

// warm accent strip colors, cycled per card position
const ACCENTS = ["#ff9b45", "#d5451b", "#e8b04b", "#c97b63", "#a3b18a"];

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  accentIndex = 0,
}: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const accent = ACCENTS[accentIndex % ACCENTS.length];

  const wasUpdated =
    new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime();
  const dateLabel = wasUpdated
    ? `Updated ${format(new Date(note.updatedAt), "MMM d, yyyy · h:mm a")}`
    : `Created ${format(new Date(note.createdAt), "MMM d, yyyy · h:mm a")}`;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(note._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card-hover)">
      {/* accent strip */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
      />

      <div className="flex min-w-0 items-start justify-between gap-3 border-b border-line px-5 pb-3 pt-5">
        <h3 className="min-w-0 flex-1 font-display text-lg font-bold leading-snug text-ink wrap-anywhere">
          {note.title}
        </h3>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(note)}
            disabled={isDeleting}
            title="Edit note"
            className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-tertiary/15 hover:text-primary disabled:opacity-40"
          >
            <Pencil1Icon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>

          {/* Confirm Delete Dialog */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                disabled={isDeleting}
                title="Delete note"
                className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-secondary/10 hover:text-secondary disabled:opacity-40"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">
                  {isDeleting ? "Deleting..." : "Delete"}
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-pop) animate-in fade-in-0 zoom-in-95">
                <div className="p-5 sm:p-6">
                  <Dialog.Title className="font-display text-lg font-semibold text-ink">
                    Delete this note?
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-ink-soft wrap-anywhere">
                    “<strong>{note.title}</strong>” will be gone for good. This
                    action cannot be undone.
                  </p>
                </div>
                <div className="flex flex-col-reverse gap-2 border-t border-line bg-paper/60 p-4 sm:flex-row sm:justify-end sm:gap-3">
                  <Dialog.Close asChild>
                    <button className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper">
                      Keep it
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button
                      onClick={handleDelete}
                      className="rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/85"
                    >
                      {isDeleting ? "Deleting..." : "Yes, delete"}
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* content — wrap-anywhere keeps long URLs from overflowing on mobile */}
      <div className="mt-3 min-w-0 flex-1 px-5 text-base leading-relaxed text-ink-soft whitespace-pre-wrap wrap-anywhere line-clamp-4">
        {note.content}
      </div>

      <div className="mt-4 flex min-w-0 items-center justify-between gap-2 border-t border-dashed border-line px-5 py-3">
        <span className="truncate text-xs font-medium text-ink-soft">{dateLabel}</span>

        {/* View Full Note Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-secondary transition-colors hover:bg-secondary/10">
              <EyeOpenIcon className="h-3.5 w-3.5" /> Open
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[85dvh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-pop) animate-in fade-in-0 zoom-in-95">
              <span
                aria-hidden
                className="h-1 w-full shrink-0"
                style={{ background: accent }}
              />
              <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
                <Dialog.Title className="min-w-0 font-display text-xl font-semibold text-ink wrap-anywhere">
                  {note.title}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="shrink-0 rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink">
                    <Cross2Icon className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </button>
                </Dialog.Close>
              </div>
              <div className="note-scroll min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
                <div className="whitespace-pre-wrap wrap-anywhere text-base leading-relaxed text-ink-soft">
                  {note.content}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line bg-paper/60 p-4 sm:px-6">
                <span className="truncate text-xs font-medium text-ink-soft">
                  {dateLabel}
                </span>
                <Dialog.Close asChild>
                  <button
                    onClick={() => onEdit(note)}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/85"
                  >
                    <Pencil1Icon className="h-4 w-4" /> Edit note
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </article>
  );
}
