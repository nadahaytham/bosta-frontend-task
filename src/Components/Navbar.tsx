import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { logout } from "../Features/authSlice";

interface NavbarProps {
  onMenuClick: () => void;
}

/**
 * Displays username, cart icon, and logout
 */
export default function Navbar({ onMenuClick }: NavbarProps) {
  const { username } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  // Calculate products quantity
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full bg-red-500 z-50">

      <div className="max-w-7xl mx-auto h-12 px-4 flex items-center justify-between text-white">

        {/* Left Section: Menu + Logo + Username */}
        <div className="flex items-center gap-2">

          <button onClick={onMenuClick} className="text-lg">
            ☰
          </button>

          <FaShoppingBag size={22} />

          <span className="text-sm font-bold capitalize">
            {username || "Bosta"}
          </span>

        </div>

        {/* Right Section: Cart + Logout*/}
        <nav className="flex items-center gap-4 text-sm">

          {username ? (
            <>
              {/* Cart Icon */}
              <Link to="/cart" className="relative hover:opacity-80">
                <FiShoppingCart size={16} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-500 text-[10px] rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Logout */}
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
