import Link from "next/link";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="relative max-w-lg mx-auto rounded-xl p-5 text-white 
                    bg-gradient-to-br from-teal-500 to-emerald-600 
                    overflow-hidden">

      {/* Decorative shapes */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-4 right-6 w-10 h-10 bg-white/30 rounded"></div>

      <h3 className="text-lg font-semibold">
        {note.title}
      </h3>

      <p className="text-sm mt-2 opacity-90 line-clamp-3">
        {note.content}
      </p>

      <div className="mt-5 flex justify-between items-center text-sm">
        <Link
          href={`/edit/${note._id}`}
          className="hover:underline"
        >
          Edit →
        </Link>

        <button
          onClick={() => onDelete(note._id)}
          className="opacity-90 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
