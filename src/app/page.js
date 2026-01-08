"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NoteCard from "@/components/NoteCard";

export default function Home() {
  
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function deleteNote(id) {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">My Notes</h2>
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Note
        </Link>
      </div>

      {notes.length === 0 && <p>No notes found.</p>}

      <div className="space-y-3">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
