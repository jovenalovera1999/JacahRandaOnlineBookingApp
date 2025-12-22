import Navbar from "@/components/shared/navbar/Navbar";
import RoomList from "@/features/home/RoomList";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-4 pb-4">
        <RoomList />
      </div>
    </>
  );
}
