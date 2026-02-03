import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api/productend";
import { useAppDispatch } from "../Store/hooks";
import { loginSuccess } from "../Features/authSlice";
import { FaShoppingBag } from "react-icons/fa";

//Authenticates user using FakeStore API
export default function Login() {
  const [username, setUsername] = useState(localStorage.getItem("signup_username") || "mor_2314");
  const [password, setPassword] = useState(localStorage.getItem("signup_password") || "83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ username, password });

      // Save auth data to Redux + localStorage
      dispatch(loginSuccess({ token: res.data.token, username }));

      navigate("/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">

        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <FaShoppingBag size={28} className="text-red-500" />
          <h2 className="text-sm font-bold mt-2">Welcome Back</h2>
          <p className="text-xs text-gray-500">Login to continue</p>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 transition text-white text-xs py-2 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
        {/* Signup */}
        <p className="text-xs mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-red-500 underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>

    </div>
  );
}
