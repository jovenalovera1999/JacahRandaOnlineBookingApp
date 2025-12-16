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

interface RoomsTableProps {
  onAddRoom: () => void;
  reloadRooms: boolean;
}

export default function RoomsTable({
  onAddRoom,
  reloadRooms,
}: RoomsTableProps) {
  const [rooms, setRooms] = useState<RoomColumns[]>([]);

  // Load rooms from tbl_rooms with relationships from tbl_room_types and tbl_room_statuses at RoomController.php
  const handleLoadRooms = useCallback(async () => {
    try {
      const { status, data } = await RoomService.loadRooms();

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

  const headers = ["Room No", "Room Type", "Description", "Price", "Status"];

  useEffect(() => {
    handleLoadRooms();
  }, [reloadRooms]);

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
                />
              </div>
            </div>
          </>
        }
      >
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell isHeader key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <TableRow key={room.room_id}>
                <TableCell>{room.room_no}</TableCell>
                <TableCell>{room.room_type.room_type}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.room_status.room_status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
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
