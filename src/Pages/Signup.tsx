import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

//Fake signup (stored locally due to FakeStore API limitation)
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    phone: "",
  });

  const isFormValid =
    form.username &&
    form.password &&
    form.email &&
    form.gender &&
    form.phone &&
    form.email.includes("@") &&
    /^\d{10,}$/.test(form.phone);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please fill all fields correctly");
      return;
    }

    // Demo signup (FakeStore limitation)
    localStorage.setItem("signup_username", form.username);
    localStorage.setItem("signup_password", form.password);

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">

        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <FaShoppingBag size={28} className="text-red-500" />
          <h2 className="text-sm font-bold mt-2">Create Account</h2>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            name="username"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            name="email"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="phone"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <select
            name="gender"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="password"
            name="password"
            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            disabled={!isFormValid}
            className="bg-red-500 hover:bg-red-600 transition text-white text-xs py-2 rounded disabled:opacity-40"
          >
            Sign Up
          </button>

        </form>
        <p className="text-xs mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}
