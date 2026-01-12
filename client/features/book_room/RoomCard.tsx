import Image from "next/image";
import NoImage from "@/public/img/ui/NoImage.png";
import Button from "../../components/ui/Button";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useEffect, useState } from "react";
import { useNumberDecimalFormat } from "@/hooks/useNumberFormat";

interface RoomCardProps {
  onBookRoom: (selectedRoom: RoomColumns | null) => void;
  room: RoomColumns | null;
}

export default function RoomCard({ onBookRoom, room }: RoomCardProps) {
  const { user } = useGoogleAuth();

  const [imageFileUrl, setImageFileUrl] = useState<string | null>("");
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (room) {
      setImageFileUrl(room.room_image);
      setRoomNo(room.room_no);
      setRoomType(room.room_type.room_type);
      setCapacity(room.capacity);
      setDescription(room.description ?? "");
      setPrice(room.price);
    }
  }, [room]);

  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
          {/* Status Badge */}
          <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            Capacity: {capacity}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {roomNo} | {roomType}
            </h2>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-800">
              ₱{useNumberDecimalFormat(price)}
              <span className="text-sm font-normal text-gray-500">
                {" "}
                / night
              </span>
            </p>

            <Button
              tag="button"
              type="button"
              className="w-auto px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
              onClick={user ? () => onBookRoom(room) : redirectToGoogleLogin}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
