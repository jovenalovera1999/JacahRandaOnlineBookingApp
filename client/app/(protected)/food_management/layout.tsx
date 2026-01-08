import { Metadata } from "next";
import FoodManagementPage from "./page";

export const metadata: Metadata = {
  title: "Food Management",
};

export default function FoodManagementLayout() {
  return (
    <>
      <FoodManagementPage />
    </>
  );
}
