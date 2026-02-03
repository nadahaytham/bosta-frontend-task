import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../Types/products";
import { getProductById } from "../Api/productend";
import { addToCart } from "../Features/cartSlice";
import { useAppDispatch, useAppSelector} from "../Store/hooks";
import { FiShoppingCart } from "react-icons/fi";

//Displays full product info and allows adding to cart

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Calculate cart badge count
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // Fetch product
  useEffect(() => {
    getProductById(id!)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="pt-20 text-center">Loading product...</p>;

  if (error || !product)
    return <p className="pt-20 text-center text-red-500">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">

        {/* Back */}
        <div className="flex justify-between items-center mb-3"> 
        <button
         onClick={() => navigate("/")}
         className="text-xs underline"> 
         ← Back to Products
        </button>
   
       <button
         className="relative hover:opacity-80"
         onClick={() => dispatch(addToCart(product))}>
        <FiShoppingCart size={18} />
        {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-red-500 text-[10px] rounded-full px-1">
        {cartCount}
        </span>)}
      </button>

     </div>
        {/* Image */}
        <div className="bg-gray-50 rounded p-4 flex justify-center">
          <img
            src={product.image}
            className="h-52 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-sm font-semibold mt-4 text-center">
          {product.title}
        </h1>

        {/* Category */}
        <p className="text-xs text-gray-500 text-center mt-1">
          {product.category}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-center mt-2">
          ${product.price}
        </p>
        {/* Description */}
        <p className="text-xs mt-4 text-center leading-relaxed text-gray-600">
          {product.description}
        </p>

      </div>

    </div>
  );
}
