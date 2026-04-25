"use client";

import { DayPicker, DateRange } from "react-day-picker";

interface Props {
  bookedRanges: DateRange[];
}

export default function RoomAvailabilityCalendar({ bookedRanges }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 shadow-sm">
      <p className="text-sm font-semibold mb-2">Room Availability</p>

      <DayPicker
        mode="single"
        numberOfMonths={1}
        disabled={[
          { before: new Date() },
          (date) =>
            bookedRanges.some(
              (range) =>
                range.from &&
                range.to &&
                date >= range.from &&
                date <= range.to,
            ),
        ]}
        modifiers={{ booked: bookedRanges }}
        modifiersClassNames={{
          booked: "bg-red-400 text-white",
        }}
      />

      {/* Legend */}
      <div className="mt-3 text-xs flex items-center gap-2">
        <div className="w-3 h-3 bg-red-400 rounded"></div>
        <span>Booked Dates</span>
      </div>

      {/* Optional: show ranges */}
      <div className="mt-2 text-xs space-y-1 max-h-24 overflow-auto">
        {bookedRanges.map((range, i) => (
          <p key={i}>
            {range.from?.toLocaleDateString()} →{" "}
            {range.to?.toLocaleDateString()}
          </p>
        ))}
      </div>
    </div>
  );
}
