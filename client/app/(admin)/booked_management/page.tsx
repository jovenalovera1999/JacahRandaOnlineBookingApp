"use client";

import ClientsTable from "@/features/booked_management/ClientsTable";

export default function BookedManagementPage() {
  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Booked Management
      </h1>

      <ClientsTable />
    </>
  );
}
