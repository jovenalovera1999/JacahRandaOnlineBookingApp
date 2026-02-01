import { FoodCartItem } from "@/app/(client)/order_food/page";
import Button from "@/components/ui/Button";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import { useMemo, useState } from "react";

interface FoodCartProps {
  items: FoodCartItem[];
  onRemoveItem: (food_id: number) => void;
  onClearCart?: () => void;
}

export default function FoodCart({
  items,
  onRemoveItem,
  onClearCart,
}: FoodCartProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  /* ===============================
     SHARED CART CONTENT
  =============================== */
  const CartContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Food Cart</h3>
        {onClearCart && (
          <button
            onClick={onClearCart}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto p-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">
            Your cart is empty
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[360px] w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-2 text-left">Food</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Subtotal</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.food_id} className="border-b">
                    <td className="py-3">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </td>

                    <td className="text-center">{item.quantity}</td>

                    <td className="text-right font-medium">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </td>

                    <td className="pl-2">
                      <button
                        onClick={() => onRemoveItem(item.food_id)}
                        className="text-red-500 text-xs px-2 py-1 rounded hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t p-4 space-y-4 bg-white sticky bottom-0">
        {/* Discount */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Discount</label>
          <select
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border rounded-md text-sm px-2 py-1"
          >
            <option value={0}>None</option>
            <option value={10}>VIP</option>
            <option value={20}>PWD / Senior Citizen</option>
          </select>
        </div>

        {/* Totals */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>- ₱{discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Receipt Preview */}
        <div className="border rounded-md p-3 text-xs bg-gray-50">
          <p className="font-semibold mb-2">Receipt Preview</p>
          {items.map((item) => (
            <div key={item.food_id} className="flex justify-between">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            tag="button"
            type="button"
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
          >
            Print
          </Button>
          <Button
            tag="button"
            type="button"
            className="flex-1 bg-blue-600 text-white"
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );

  /* ===============================
     RENDER
  =============================== */
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed right-0 top-24 w-[420px] h-[calc(100vh-4rem)] bg-white border-l shadow-lg flex-col">
        {CartContent}
      </aside>

      {/* MOBILE BOTTOM CART */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full px-4 py-3 bg-white border-t shadow-lg flex justify-between items-center"
        >
          <span className="font-semibold">Cart ({items.length})</span>
          <span className="font-bold text-blue-600">₱{total.toFixed(2)}</span>
        </button>

        {mobileOpen && (
          <div className="bg-white max-h-[75vh] overflow-y-auto shadow-xl">
            {CartContent}
          </div>
        )}
      </div>
    </>
  );
}
