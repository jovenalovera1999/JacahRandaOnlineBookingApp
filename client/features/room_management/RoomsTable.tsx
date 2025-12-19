"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { RoomColumns } from "@/interfaces/RoomInterface";
import RoomService from "@/services/RoomService";
import { useCallback, useEffect, useState } from "react";
import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import { useDebounce } from "@/hooks/useDebounce";

interface RoomsTableProps {
  onAddRoom: () => void;
  onEditRoom: (selectedRoom: RoomColumns | null) => void;
  onDeleteRoom: (selectedRoom: RoomColumns | null) => void;
  reloadRooms: boolean;
}

export default function RoomsTable({
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  reloadRooms,
}: RoomsTableProps) {
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState<RoomColumns[]>([]);
  const [roomsActionOpenDropdown, setRoomsActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const debouncedSearch = useDebounce(search);

  // Load rooms from tbl_rooms with relationships from tbl_room_types and tbl_room_statuses at RoomController.php
  const handleLoadRooms = useCallback(async (searchValue: string) => {
    try {
      const { status, data } = await RoomService.loadRooms(searchValue);

      if (status !== 200) {
        console.error(
          "Unexpected status error during load rooms at RoomsTable.tsx: ",
          status
        );
        return;
      }

      setRooms(data.rooms);
    } catch (error) {
      console.error(
        "Unexpected server error during load rooms at RoomsTable.tsx: ",
        error
      );
    }
  }, []);

  const headers = [
    "Room No",
    "Room Type",
    "Description",
    "Price",
    "Status",
    "Action",
  ];

  useEffect(() => {
    if (!debouncedSearch) {
      handleLoadRooms("");
      return;
    }

    handleLoadRooms(debouncedSearch);
  }, [debouncedSearch, reloadRooms, handleLoadRooms]);

  return (
    <>
      <Table
        filter={
          <>
            <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
              <div className="md:w-32">
                <Button tag="button" type="button" onClick={onAddRoom}>
                  Add Room
                </Button>
              </div>
              <div className="md:w-72">
                <FloatingLabelInputField
                  label="Search"
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          </>
        }
      >
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell className="text-blue-600" isHeader key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <TableRow
                key={room.room_id}
                className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
              >
                <TableCell>{room.room_no}</TableCell>
                <TableCell>{room.room_type.room_type}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.room_status.room_status}</TableCell>
                <TableCell className="relative overflow-visible">
                  <ActionButtonDropdown
                    id={room.room_id}
                    openDropdownId={roomsActionOpenDropdown}
                    setOpenDropdownId={setRoomsActionOpenDropdown}
                  >
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-green-200 hover:text-green-600 text-xs font-medium transition-colors duration-200 w-20"
                      onClick={() => onEditRoom(room)}
                    >
                      Edit
                    </Button>
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                      onClick={() => onDeleteRoom(room)}
                    >
                      Delete
                    </Button>
                  </ActionButtonDropdown>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center items-center justify-center"
              >
                <Spinner size="md" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
