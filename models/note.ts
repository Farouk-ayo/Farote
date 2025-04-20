import mongoose, { Schema, Document } from "mongoose";
import { INote } from "@/types";

interface NoteDocument extends Omit<INote, "_id">, Document {}

const NoteSchema = new Schema<NoteDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    // Add userId field
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Note ||
  mongoose.model<NoteDocument>("Note", NoteSchema);
