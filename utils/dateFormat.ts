const formatDate = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
};

const formatTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const splitFormattedDate = (formattedDate: string): [string, string] => {
  const [day, rest] = formattedDate.split(/(?<=\w{3,}),\s/); // Splits at ", " while keeping the comma
  return [day, rest];
};

export { formatDate, formatTime, splitFormattedDate };
