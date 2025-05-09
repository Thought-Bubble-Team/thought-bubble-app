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

export const parseDateToMonthYear = (date: Date): string => {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
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

export const getMonthList = (): { id: number; date: string }[] => {
  return [
    { id: 0, date: "Jan" },
    { id: 1, date: "Feb" },
    { id: 2, date: "Mar" },
    { id: 3, date: "Apr" },
    { id: 4, date: "May" },
    { id: 5, date: "Jun" },
    { id: 6, date: "Jul" },
    { id: 7, date: "Aug" },
    { id: 8, date: "Sep" },
    { id: 9, date: "Oct" },
    { id: 10, date: "Nov" },
    { id: 11, date: "Dec" },
  ];
};

export const getDayMonth = (date: string): string[] => {
  const dateObj = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const day = days[dateObj.getDay()]; // e.g., "Saturday"
  const dayOfMonth = dateObj.getDate(); // e.g., 9
  const month = months[dateObj.getMonth()]; // e.g., "Nov"

  const formattedDate = `, ${dayOfMonth} ${month}`;

  return [day, formattedDate];
};

export const getDaysInMonth = (
  monthName: string
): { id: number; date: string }[] => {
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

  const monthIndex = monthMap[monthName];
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return [
    { id: -1, date: "All" },
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      id: i,
      date: (i + 1).toString(),
    })),
  ];
};

export const getSortOptions = (): { id: number; date: string }[] => {
  return [
    { id: 0, date: "asc" },
    { id: 1, date: "dsc" },
  ];
};
