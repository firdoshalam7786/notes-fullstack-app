import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET single note
export async function GET(request, context) {
  const { id } = await context.params;

  await connectDB();
  const note = await Note.findById(id);

  if (!note) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(note);
}

// UPDATE note
export async function PUT(request, context) {
  const { id } = await context.params; // ✅ FINAL FIX
  const data = await request.json();

  await connectDB();
  const updatedNote = await Note.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updatedNote);
}

// DELETE note
export async function DELETE(request, context) {
  const { id } = await context.params; 

  await connectDB();
  await Note.findByIdAndDelete(id);

  return NextResponse.json({ message: "Note deleted" });
}
