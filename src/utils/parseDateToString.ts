import { format, utcToZonedTime } from "date-fns-tz";

const parseDateToString = (date: Date): string => {
  const utcDate = utcToZonedTime(date, "UTC");
  return format(utcDate, "dd/MM/yyyy", { timeZone: "UTC" });
};

export { parseDateToString };
