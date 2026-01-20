'use client'
import { FiX, FiTrash2 } from "react-icons/fi";

export default function DeleteModal({ open, onClose, onConfirm, productName }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-slate-400 hover:text-slate-700 transition"
        >
          <FiX size={20} />
        </button>

        <div className="text-center">
          <FiTrash2 className="mx-auto mb-4 text-red-500" size={36} />
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Delete Product
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Are you sure you want to delete <span className="font-semibold">{productName}</span>? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={onClose}
              className="px-8 cursor-pointer py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 cursor-pointer py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
