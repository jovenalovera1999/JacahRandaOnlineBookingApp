import Image from "next/image";
import NoImage from "@/public/img/ui/NoImage.png";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useEffect, useState } from "react";
import { useNumberDecimalFormat } from "@/hooks/useNumberFormat";

interface RoomCardProps {
  room: RoomColumns | null;
}

export default function RoomCard({ room }: RoomCardProps) {
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

  useEffect(() => {
    if (!room) {
      setImageFileUrl(null);
      setRoomNo("");
      setRoomType("");
      setCapacity("");
      setDescription("");
      setPrice("");
    }
  }, [room]);

  return (
    <>
      <div className="group w-full max-w-sm bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={imageFileUrl ? imageFileUrl : NoImage}
            alt="Room Image"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            unoptimized
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          {/* Top Pick Badge */}
          <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            ⭐ Top Pick
          </span>

          {/* Capacity */}
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
            👥 {capacity} Guests
          </span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              Room {roomNo}
            </h2>
            <p className="text-sm text-gray-500">{roomType}</p>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}

          {/* Price + Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xl font-bold text-gray-900">
                ₱{useNumberDecimalFormat(price)}
              </p>
              <span className="text-xs text-gray-500">per night</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
