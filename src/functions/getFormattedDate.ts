export const getFormattedDate = (date: string) =>
  new Date(date).toLocaleDateString(navigator?.language || "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default getFormattedDate;
