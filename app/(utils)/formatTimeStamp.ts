export const formatTimeStamp = (timestamp?: string) => {
  if (!timestamp) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const newDate = new Date(timestamp);
  const formattedDate = newDate.toLocaleString("en-US", options);

  return formattedDate;
};
