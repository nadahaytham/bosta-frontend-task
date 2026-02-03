import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, createProduct } from "../Api/productend";

//Allows authenticated users to add new products
export default function CreateProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch categories
  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !price || !category || !image) {
      setError("All fields are required.");
      return;
    }

    if (Number(price) <= 0) {
      setError("Price must be positive.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createProduct({
        title,
        description,
        price: Number(price),
        category,
        image,
        id: 0 // FakeStore requires id field
      });

      setSuccess(true);
      setLoading(false);

      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Failed to create product.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
  
        <h2 className="text-sm font-bold mb-4 text-center">
          Create Product
        </h2>
  
        {success && (
          <p className="text-green-600 text-xs mb-2 text-center">
            Product created successfully!
          </p>
        )}
  
        {error && (
          <p className="text-red-500 text-xs mb-2 text-center">
            {error}
          </p>
        )}
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
  
          <input
            className="border rounded p-2 text-xs"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <textarea
            className="border rounded p-2 text-xs resize-none h-20"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
  
          <input
            type="number"
            className="border rounded p-2 text-xs"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
  
          <select
            className="border rounded p-2 text-xs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
  
          <input
            className="border rounded p-2 text-xs"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
  
          <button
            disabled={
              loading ||
              !title ||
              !description ||
              !price ||
              !category ||
              !image ||
              Number(price) <= 0
            }
            className="mt-2 bg-red-500 hover:bg-red-600 transition text-white text-xs py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
  
        </form>
  
      </div>
  
    </div>
  );
};  
