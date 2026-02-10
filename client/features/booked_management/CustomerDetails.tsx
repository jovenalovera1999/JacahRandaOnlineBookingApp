import CardComponent from "@/components/ui/CardComponent";
import Spinner from "@/components/ui/Spinner";
import { UserColumns } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { useCallback, useEffect, useState } from "react";

interface CustomerDetailsProps {
  userId: string | number;
}

export default function CustomerDetails({ userId }: CustomerDetailsProps) {
  const [user, setUser] = useState<UserColumns | null>(null);

  const handleGetUser = useCallback(async (userId: string | number) => {
    try {
      const { status, data } = await UserService.getUser(userId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during get user at CustomerDetails.tsx: ",
          status,
        );
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error(
        "Unexpected server error during get user at CustomerDetails.tsx: ",
        error,
      );
    }
  }, []);

  useEffect(() => {
    if (userId) {
      handleGetUser(userId);
    }
  }, [userId, handleGetUser]);

  return (
    <>
      <CardComponent title="Customer Details">
        <div className="grid grid-cols-1 gap-6 px-6 py-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {user?.email}
            </p>
          </div>
        </div>
      </CardComponent>
    </>
  );
}
