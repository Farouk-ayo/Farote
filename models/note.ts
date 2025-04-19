import { INote } from "@/types";
import mongoose, { Schema, Document } from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model exists before creating it to prevent overwriting
export default mongoose.models.Note ||
  mongoose.model<NoteDocument>("Note", NoteSchema);
