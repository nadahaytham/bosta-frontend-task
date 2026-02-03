import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

//Appears when menu button is clicked
export default function Sidebar({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className="fixed top-12 left-0 h-full w-56 sm:w-48 bg-red-500 p-4 z-50 shadow-lg">

        {/* Sidebar Header */}
        <div className="text-white text-sm font-bold mb-4">
          Menu
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm text-white">
          <Link
            to="/create"
            onClick={onClose}
            className="px-2 py-2 rounded hover:bg-red-600 transition"
          >
            Create Product
          </Link>

          <Link
            to="/"
            onClick={onClose}
            className="px-2 py-2 rounded hover:bg-red-600 transition"
          >
            Products
          </Link>

        </nav>

      </aside>
    </>
  );
}
