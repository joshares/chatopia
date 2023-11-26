type DateFormatOptions = {
  year: "2-digit";
  month: "2-digit";
  day: "2-digit";
  // hour: "2-digit";
  // minute: "2-digit";
};

export default function FormatDate(data: string) {
  const date = new Date(data);

  const options: DateFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  const result = `${formattedDate}, ${hour}:${minute}`;

  return result;
}
