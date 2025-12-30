export function useFullDateFormat(date: string) {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(newDate);
}

export function useFullDateTimeFormat(dateTime: string) {
  if (!dateTime) return null;

  const newDateTime = new Date(dateTime);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(newDateTime);
}
