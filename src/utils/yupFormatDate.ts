import { format, isValid, parse } from "date-fns";

export default function yupFormatDate(value: string, originalValue: string) {
  const parsedDate = parse(originalValue, "dd/MM/yyyy", new Date());
  const isValidDate = isValid(parsedDate);
  if (!isValidDate) return originalValue;
  const formattedDate = format(parsedDate, "yyyy/MM/dd");
  return new Date(formattedDate);
}
