import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + ".env" });

export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://server-dream-destinations.vercel.app/api",
  imgKey: process.env.NEXT_PUBLIC_IMG_KEY,
};
