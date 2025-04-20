import { DefaultSession } from "next-auth";

// Extend the existing INote interface
export interface INote {
  _id: string;
  title: string;
  content: string;
  userId: string; // Add userId to track note ownership
  createdAt: Date;
  updatedAt: Date;
}

// Add user related types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  title: string;
  content: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

// Extend the default session type to include userId
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
