import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
  await connectDB();
  const notes = await Note.find();
  return NextResponse.json(notes);
}

// CREATE note
export async function POST(request) {
  const body = await request.json();

  if (!body.title || !body.content) {
    return NextResponse.json(
      { message: "Title and content required" },
      { status: 400 }
    );
  }

  await connectDB();
  const note = await Note.create(body);

  return NextResponse.json(note, { status: 201 });
}
