import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";

interface RoomsTableProps {
  onAddRoom: () => void;
}

export default function RoomsTable({ onAddRoom }: RoomsTableProps) {
  const headers = ["Room Id", "Room Type", "Price", "Status"];
  const dummyDatas = [
    { room_id: 47155, room_type: "Deluxe", price: 500.0, status: "Available" },
    {
      room_id: 34701,
      room_type: "Standard",
      price: 200.0,
      status: "Maintenance",
    },
  ];

  return (
    <>
      <Table
        filter={
          <>
            <div className="flex items-center justify-between">
              <Button tag="button" type="button" onClick={onAddRoom}>
                Add Room
              </Button>
              <div className="w-72">
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
          {dummyDatas.map((data) => (
            <TableRow className="hover:bg-gray-100" key={data.room_id}>
              <TableCell>{data.room_id}</TableCell>
              <TableCell>{data.room_type}</TableCell>
              <TableCell>{data.price}</TableCell>
              <TableCell>{data.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
