type DateFormatOptions = {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day: "numeric" | "2-digit";
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second: "numeric" | "2-digit";
  timeZoneName: "short" | "long";
};

export default function FormatDate(data: string) {
  const date = new Date(data);

  const options: DateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  console.log(formattedDate);

  return formattedDate;
}
