import Image from "next/image";
import NoImage from "@/public/img/ui/NoImage.png";
import Button from "../../components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";

interface RoomCardProps {
  imageFileUrl?: string | null;
  roomNo: string;
  roomType: string;
  description?: string;
  price: string;
}

export default function RoomCard({
  imageFileUrl,
  roomNo,
  roomType,
  description,
  price,
}: RoomCardProps) {
  const { user, loading, handleLogout } = useAuth();

  return (
    <div className="w-full max-w-sm bg-white border border-gray-100 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image
          src={imageFileUrl ? imageFileUrl : NoImage}
          alt="Room Image"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority
          unoptimized
        />
        {/* Status Badge
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {roomStatus}
        </span> */}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {roomNo} | {roomType}
          </h2>
          {description && (
            <p className="text-sm text-gray-500">
              Comfortable room with basic amenities
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-800">
            ₱{price}
            <span className="text-sm font-normal text-gray-500"> / night</span>
          </p>

          <Button
            tag="button"
            type="button"
            className="w-auto px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
            onClick={redirectToGoogleLogin}
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
