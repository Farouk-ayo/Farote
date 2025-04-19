// app/api/notes/route.ts
import connectToDatabase from "@/lib/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find().sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const note = await Note.create({ title, content });
    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
