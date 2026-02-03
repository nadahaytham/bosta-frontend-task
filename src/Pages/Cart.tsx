import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { removeFromCart, updateQuantity } from "../Features/cartSlice";


//Displays selected products, quantities, and total price
export default function Cart() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Calculate total cart price
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!items.length)
    return <p className="pt-20 text-center">Cart is empty</p>;

  return (
    <div className="pt-16 px-3">

      <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">

        <h2 className="text-sm font-bold mb-4 text-center">Your Cart</h2>

        {items.map((item) => (
          <div key={item.id} className="flex gap-3 border-b py-3">

            <img
              src={item.image}
              className="h-12 w-12 object-contain"
            />

            <div className="flex-1">
              {/* Product Info */}
              <p className="text-xs font-semibold line-clamp-2">
                {item.title}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ${item.price}
              </p>

              <div className="flex items-center gap-2 mt-2">
                {/* Quantity */}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, Number(e.target.value)),
                      })
                    )
                  }
                  className="border w-12 text-xs text-center"/>
        
                <span className="text-xs">
                  = ${(item.price * item.quantity).toFixed(2)}
                </span>

              </div>
            </div>
        {/* Remove from cart */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 text-sm">
              ✕
            </button>
          </div>
        ))}
        {/* Total Amount */}
        <p className="text-sm font-bold mt-4 text-center">
          Total: ${total.toFixed(2)}
        </p>

      </div>

    </div>
  );
}
