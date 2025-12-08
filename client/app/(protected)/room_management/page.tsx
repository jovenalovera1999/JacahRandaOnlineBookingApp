import { Table, TableBody, TableHead } from "@/components/ui/Table";

export default function RoomManagement() {
  return (
    <>
      <Table
        filter={
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded"
          />
        }
      >
        <TableHead>
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Role</th>
          </tr>
        </TableHead>

        <TableBody>
          <tr>
            <td className="px-3 py-2">John Doe</td>
            <td className="px-3 py-2">john@example.com</td>
            <td className="px-3 py-2">Admin</td>
          </tr>

          <tr>
            <td className="px-3 py-2">Jane Smith</td>
            <td className="px-3 py-2">jane@example.com</td>
            <td className="px-3 py-2">User</td>
          </tr>
        </TableBody>
      </Table>
    </>
  );
}
