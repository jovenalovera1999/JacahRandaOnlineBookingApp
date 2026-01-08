"use client";

import Button from "@/components/ui/Button";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/Table";

interface FoodsTableProps {
  onFoodAdd: () => void;
}

export default function FoodsTable({ onFoodAdd }: FoodsTableProps) {
  const headers = ["Food", "Description", "Price", "Action"];

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent">
        <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
          <Table
            filter={
              <>
                <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
                  <div className="md:w-32">
                    <Button tag="button" type="button" onClick={onFoodAdd}>
                      Add Food
                    </Button>
                  </div>
                  <div className="md:w-72">
                    <FloatingLabelSelectField
                      label="Filter"
                      name="search"
                      autoFocus
                    >
                      <option value="">All Foods Status</option>
                    </FloatingLabelSelectField>
                  </div>
                </div>
              </>
            }
          >
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    className="bg-blue-100 text-blue-600"
                    isHeader
                    key={header}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </div>
      </div>
    </>
  );
}
