import { Metadata } from "next";
import OrderFoodPage from "./page";

const metadata: Metadata = {
  title: "Order Food",
};

export default function OrderFoodLayout() {
  return (
    <>
      <OrderFoodPage />
    </>
  );
}
