import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { logout } from "../Features/authSlice";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <header className="fixed top-0 left-0 w-full bg-red-500 z-50">

      <div className="max-w-7xl mx-auto h-12 px-4 flex items-center justify-between text-white">

        {/* Left */}
        <div className="flex items-center gap-2">

          <button onClick={onMenuClick} className="text-lg">
            ☰
          </button>

          <FaShoppingBag size={22} />

          <span className="text-sm font-bold capitalize">{username || "Bosta"}</span>
        </div>

        {/* Right */}
        <nav className="flex items-center gap-4 text-sm">

          {username ? (
            <>
            <Link to="/cart" className="hover:opacity-80">
              <FiShoppingCart size={16} />
            </Link>
              <button
                onClick={() => dispatch(logout())}
                className="hover:opacity-80"
              >
                <FiLogOut size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:opacity-80">
              Login
            </Link>
          )}

        </nav>

      </div>
    </header>
  );
}
