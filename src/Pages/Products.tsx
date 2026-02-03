import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../Features/productsSlice";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../Features/cartSlice";

export default function Products() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  const [sort, setSort] = useState("none");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 10;
  const navigate = useNavigate();

  const categories = ["all", ...new Set(items.map((p) => p.category))];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort, category]);

  let filtered =
    category === "all" ? items : items.filter((p) => p.category === category);

  if (sort === "asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "desc")
    filtered = [...filtered].sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  if (loading)
    return (
      <div className="grid grid-cols-2 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-56 bg-gray-200 animate-pulse rounded"></div>
        ))}
      </div>
    );

  if (error) return <p className="pt-20 text-center">Error loading products</p>;
  if (!items.length)
    return <p className="pt-20 text-center">No products found</p>;

  return (
    <div className="pt-10 px-2 flex justify-center">
     <div className="bg-gray-200 rounded-lg p-4 max-w-7xl mx-auto">

        {/* Filters */}
        <div className="flex gap-3 mb-4 justify-items-left">

          <select
            className="border p-1 text-ss"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">Sort by price</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>

          <select
            className="border p-1 text-s"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4 justify-items-center">

          {paginated.map((p) => (
            <div
            key={p.id}
            className="bg-white border rounded p-2 flex flex-col relative w-[400px] h-[260px]"
          >
            <button
              className="absolute top-1 right-1 text-gray-500 hover:text-black"
              onClick={() => {
                dispatch(addToCart(p));
                navigate("/cart");
              }}
            >
              <FiShoppingCart size={16} />
            </button>
          

              <div className="w-full h-20 flex items-center justify-center shrink-0">
                <img
                  src={p.image}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-xs mt-2 line-clamp-2 text-center font-semibold min-h-[32px]">
                {p.title}
              </p>

              <p className="text-[14px] text-black-500 mt-1 text-center">
                "{p.category}"
              </p>

              <p className="text-m font-bold mt-1 text-center">${p.price}</p>

              <button
                className="mt-auto bg-black text-white text-xs py-1 rounded"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                View Details
              </button>
            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="border px-3 py-1 text-xs disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-xs">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="border px-3 py-1 text-xs disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}
