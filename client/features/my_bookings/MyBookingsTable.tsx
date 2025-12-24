import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
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

export default function MyBookingsTable() {
  const headers = [
    "Booked Room",
    "Check-In Date",
    "Check-Out Date",
    "Status",
    "Actions",
  ];

  return (
    <>
      <Table
        filter={
          <>
            <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
              <div className="md:w-32">
                <Button tag="button" type="button">
                  Add Booking
                </Button>
              </div>
              <div className="md:w-72">
                <FloatingLabelInputField
                  label="Search"
                  type="text"
                  name="search"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
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
                      // onClick={() => onEditRoom(room)}
                    >
                      Edit
                    </Button>
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                      // onClick={() => onDeleteRoom(room)}
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
