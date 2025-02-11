const formatDate = (datetime: string): string => {
  const fixedDatetime = datetime.replace(" ", "T");
  const date = new Date(fixedDatetime);

  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });

  return `${weekday}, ${day} ${month}`;
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
  const match = formattedDate.match(/^([^,]+)(, .*)$/);

  if (match) {
    return [match[1], match[2]];
  }

  return [formattedDate, ""];
};

export { formatDate, formatTime, splitFormattedDate };
