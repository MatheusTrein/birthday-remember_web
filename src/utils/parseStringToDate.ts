const parseStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/");

  return new Date(Number(year), Number(month) - 1, Number(day));
};

export { parseStringToDate };
