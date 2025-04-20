import connectToDatabase from "@/lib/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/[...nextauth]/route";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectToDatabase();
    const note = await Note.findOne({ _id: id, userId: session.user.id });

    if (!note) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { title, content } = await request.json();

    if (!title && !content) {
      return NextResponse.json(
        { success: false, error: "Please provide title or content to update" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        ...(title && { title }),
        ...(content && { content }),
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedNote });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectToDatabase();
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedNote) {
      return NextResponse.json(
        { success: false, error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
