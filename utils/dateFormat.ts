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

const formatDayOnly = (datetime: string): string => {
  const fixedDatetime = datetime.replace(" ", "T");
  const date = new Date(fixedDatetime);

  return date.toLocaleDateString("en-GB", { day: "2-digit" });
};

export { formatDate, formatTime, splitFormattedDate, formatDayOnly };

export const parseInitialDate = (initialDate: string | Date): Date => {
  if (typeof initialDate === "string") {
    const [month, year] = initialDate.split(" ");

    const monthMap: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const monthIndex = monthMap[month];
    const parsedYear = parseInt(year, 10);

    if (monthIndex === undefined || isNaN(parsedYear)) {
      console.error("Invalid date string format:", initialDate);
      return new Date(); // Default to current date if parsing fails
    }

    return new Date(Date.UTC(parsedYear, monthIndex, 1));
  }

  return new Date(initialDate);
};

export const getMonthYearList = (): { id: number; date: string }[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const dateOptions: { id: number; date: string }[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (year === currentYear && monthIndex > currentMonth) break;
      dateOptions.push({
        id: dateOptions.length,
        date: `${months[monthIndex]} ${year}`,
      });
    }
  }

  return dateOptions;
};
