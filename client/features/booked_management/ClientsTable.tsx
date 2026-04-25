"use client";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { UserColumns } from "@/interfaces/UserInterface";
import BookingService from "@/services/BookingService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ClientsTable() {
  // Hooks
  const router = useRouter();

  // States
  const [clients, setClients] = useState<UserColumns[]>([]);

  const handleLoadClients = useCallback(async () => {
    try {
      const { status, data } = await BookingService.loadClients();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load clients at BookedTable.tsx: ",
          status,
        );
        return;
      }

      setClients(data.clients);
    } catch (error) {
      console.error(
        "Unexpected server error during load clients at BookedTable.tsx: ",
        error,
      );
    }
  }, []);

  const headers = ["No.", "Client's Name", "Email", "Actions"];

  useEffect(() => {
    handleLoadClients();
  }, [handleLoadClients]);

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent">
        <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
          <Table>
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
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <TableRow
                    key={index}
                    className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{client.name}</TableCell>

                    <TableCell>{client.email}</TableCell>

                    <TableCell>
                      <Button
                        tag="button"
                        type="button"
                        className="bg-transparent text-gray-800 hover:bg-blue-200 hover:text-blue-600 text-xs font-medium transition-colors duration-200 w-32"
                        onClick={() =>
                          router.push(
                            `/booked_management/bookings/${client.user_id}`,
                          )
                        }
                      >
                        View Bookings
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : clients.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center items-center justify-center"
                  >
                    No Clients Booked Yet
                  </TableCell>
                </TableRow>
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
        </div>
      </div>
    </>
  );
}
