export const tags = {
  USER: "USER",
  TRAVEL: "TRAVEL",
  TRIP: "TRIP",
} as const;

// generate tags array
export const appTags = Object.values(tags);
