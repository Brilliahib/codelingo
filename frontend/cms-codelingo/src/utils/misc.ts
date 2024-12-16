export const generateFallbackFromName = (name: string) => {
  const parts = name.split(" ").map((word) => word[0]);
  return parts.slice(0, 2).join("");
};

export const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
