// export const formatDate = (date: any) => {
//   const dateObj = date["$d"];
//   return moment(dateObj).format("YYYY-MM-DD");
// };

export const formatDate = (date: any) => {
  const startDate = date["$d"];
  const customDate = startDate.toLocaleDateString("en-US");
  const [month, day, year] = customDate.split("/");
  const formattedDateNew = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  return formattedDateNew;
};
