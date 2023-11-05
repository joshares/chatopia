import React from "react";

export default function initials(username: string) {
  // Split the username by any non-alphabetical character (e.g., digits, special characters, etc.)
  const words = username.split(/[^a-zA-Z]+/).filter((word) => word);

  // Initialize an empty string to store the initials
  let initials = "";

  // Iterate through the words and add the first letter of each word to the initials
  for (const word of words) {
    initials += word.charAt(0).toUpperCase();
    if (initials.length >= 2) {
      break; // Stop after getting the first two initials
    }
  }

  // If there are no initials, use 'XX' as a default
  if (!initials) {
    initials = "XX";
  }

  return initials;
}
