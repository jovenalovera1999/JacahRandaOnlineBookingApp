"use client";

import Spinner from "@/components/ui/Spinner";

interface BookingSummaryCardProps {
  isLoading: boolean;
  totalPending: number;
  totalApproved: number;
  totalCancelled: number;
  totalCompleted: number;
}

export default function BookingSummaryCard({
  isLoading,
  totalPending,
  totalApproved,
  totalCancelled,
  totalCompleted,
}: BookingSummaryCardProps) {
  const cards = [
    { title: "Pending", value: totalPending },
    { title: "Approved", value: totalApproved },
    { title: "Cancelled", value: totalCancelled },
    { title: "Completed", value: totalCompleted },
  ];

  return (
    <>
      <h1 className="text-xl text-gray-800 font-semibold mb-2">
        Booking Summary
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.length > 0 &&
          !isLoading &&
          cards.map((card) => {
            // Determine color classes based on title
            const colorClass =
              card.title === "Approved"
                ? "bg-green-100 text-green-700"
                : card.title === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : card.title === "Completed"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700";

            return (
              <div
                className={`flex flex-col justify-between rounded-lg border border-gray-200 p-6 shadow-sm w-full ${colorClass}`}
                key={card.title}
              >
                <div className="text-sm font-medium">{card.title}</div>
                <div className="flex justify-end text-3xl font-semibold mt-2">
                  {isLoading ? (
                    <Spinner
                      size="sm"
                      className={`${
                        card.title === "Approved"
                          ? "fill-green-700"
                          : card.title === "Cancelled"
                            ? "fill-red-700"
                            : card.title === "Completed"
                              ? "fill-yellow-700"
                              : "fill-gray-700"
                      }`}
                    />
                  ) : card.value > 0 ? (
                    card.value
                  ) : (
                    0
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
