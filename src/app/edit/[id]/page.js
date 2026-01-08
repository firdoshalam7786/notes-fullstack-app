"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchNote() {
      const res = await fetch(`/api/notes/${id}`);
      if (!res.ok) return;

      const data = await res.json();
      setTitle(data.title);
      setContent(data.content);
    }

    if (id) fetchNote();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    router.push("/");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">Edit Note</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2 h-28"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
