export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-br", {
    dateStyle: "short",
    timeZone: "UTC",
  }).format(date);
};
