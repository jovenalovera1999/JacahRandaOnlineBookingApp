import { FoodCartItem } from "@/app/(client)/order_food/page";
import Button from "@/components/ui/Button";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import Spinner from "@/components/ui/Spinner";
import { OrderFieldsErrors } from "@/interfaces/OrderInterface";
import OrderService from "@/services/OrderService";
import { FormEvent, useCallback, useMemo, useState } from "react";

interface FoodCartProps {
  items: FoodCartItem[];
  onRemoveItem: (food_id: number) => void;
  onClearCart?: () => void;
  onOrderPlaced: (
    status: "success" | "warning" | "failed" | "others",
    message: string,
  ) => void;
}

export default function FoodCart({
  items,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}: FoodCartProps) {
  const [isStoring, setIsStoring] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [errors, setErrors] = useState<OrderFieldsErrors>({});

  const handleStoreOrder = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        additional_information: additionalInformation,
        items: items.map((item) => ({
          food_id: item.food_id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const { status, data } = await OrderService.storeOrder(payload);

      if (status !== 200) {
        console.error(
          "Unexpected status error during store order at FoodCart.tsx: ",
          status,
        );
        return;
      }

      onOrderPlaced("success", data.message);

      onClearCart && onClearCart();
      setAdditionalInformation("");
      setErrors({});
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected error during store order at FoodCart.tsx: ",
          error,
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
  };

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
    <Form onSubmit={handleStoreOrder} className="flex flex-col h-full">
      {/* ================= HEADER ================= */}
      <div className="px-5 py-4 border-b bg-white flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Food Cart</h3>

        {onClearCart && (
          <button
            type="button"
            onClick={onClearCart}
            className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* ================= ITEMS ================= */}
      <div className="flex-1 overflow-auto px-5 py-4 bg-gray-50">
        {items.length <= 0 ? (
          <div className="text-center mt-16 space-y-2">
            <p className="text-sm font-medium text-gray-600">
              Your cart is empty
            </p>
            <p className="text-xs text-gray-400">Add foods to place an order</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
            <table className="min-w-[360px] w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Food</th>
                  <th className="px-4 py-3 text-center font-medium">Qty</th>
                  <th className="px-4 py-3 text-right font-medium">Subtotal</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.food_id} className="border-t last:border-b">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-center">{item.quantity}</td>

                    <td className="px-4 py-3 text-right font-medium">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </td>

                    <td className="px-2 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.food_id)}
                        className="text-xs font-medium text-red-500 hover:text-red-600 hover:underline"
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

      {/* Items Error */}
      {/* {errors.items && errors.items.length > 0 && (
        <div className="mt-4 rounded-md bg-red-50 px-4 py-2">
          <p className="text-xs font-medium text-red-600">{errors.items[0]}</p>
        </div>
      )} */}

      {/* ================= SUMMARY ================= */}
      <div className="border-t bg-white px-5 py-4 space-y-4 sticky bottom-0">
        {/* Discount */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Discount</label>
          <select
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>None</option>
            <option value={10}>VIP</option>
            <option value={20}>PWD / Senior Citizen</option>
          </select>
        </div>

        {/* Totals */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>- ₱{discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-1">
          <FloatingLabelTextareaField
            label="Additional Information"
            name="additional_information"
            value={additionalInformation}
            onChange={(e) => setAdditionalInformation(e.target.value)}
            rows={3}
            errors={errors.additional_information}
          />
          <p className="text-xs text-gray-400 text-right">
            {additionalInformation.length}/500
          </p>
        </div>

        {/* Receipt Preview */}
        <div className="rounded-md border bg-gray-50 p-3 text-xs">
          <p className="font-semibold mb-2">Receipt Preview</p>

          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.food_id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full">
          <Button
            tag="button"
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            isLoading={isStoring}
            isLoadingChildren={
              <>
                <Spinner size="xs" />
                <span>Placing Order...</span>
              </>
            }
          >
            Place Order
          </Button>
        </div>
      </div>
    </Form>
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
