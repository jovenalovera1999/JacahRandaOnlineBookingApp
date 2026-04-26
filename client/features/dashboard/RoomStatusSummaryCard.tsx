import Spinner from "@/components/ui/Spinner";

interface RoomStatusSummaryProps {
  isLoading: boolean;
  totalAvailable: number;
  totalUnavailable: number;
  totalOccupied: number;
  totalMaintenance: number;
}

export default function RoomStatusSummaryCard({
  isLoading,
  totalAvailable,
  totalUnavailable,
  totalOccupied,
  totalMaintenance,
}: RoomStatusSummaryProps) {
  const cards = [
    { title: "Available", value: totalAvailable },
    { title: "Unavailable", value: totalUnavailable },
    { title: "Occupied", value: totalOccupied },
    { title: "Maintenance", value: totalMaintenance },
  ];

  const getColor = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes("available")) return "text-green-600 bg-green-50";

    if (t.includes("unavailable")) return "text-red-600 bg-red-50";

    if (t.includes("occupied")) return "text-yellow-600 bg-yellow-50";

    return "text-gray-600 bg-gray-100";
  };

  return (
    <>
      <h1 className="text-xl text-gray-800 font-semibold mb-2">
        Room Status Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const color = getColor(card.title);

          return (
            <div
              key={card.title}
              className="group relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Accent bar */}
              <div
                className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl ${color}`}
              />

              {/* Value */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-gray-900">
                  {isLoading ? <Spinner size="sm" /> : card.value || 0}
                </h2>

                {/* Indicator badge */}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}
                >
                  {card.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
