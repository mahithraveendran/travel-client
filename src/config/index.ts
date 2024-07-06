import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + ".env" });

export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/api",
  imgKey:  "0e94becd9a97039b2ee17fa5cc2e1039",
};
