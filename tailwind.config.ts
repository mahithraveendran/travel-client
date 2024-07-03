import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // "drd-page-starter-bg": "url('./asset/images/auth/login-img.jpg')",
      },
      colors: {
        drdBg: "#15151F",
        // drdPrimary: "#FDE723", // yellow
        drdPrimary: "#3A643B", // green
        "drd-green": "#3A643B",
        "drd-yellow": "#FFD700",
        "drd-light-yellow": "#FFF7E2",
        "drd-light-green": "#E6F4E0",
        "drd-dark-green": "#2E4D2B",
        "drd-dark-yellow": "#B5A642",
      },
    },
  },
  plugins: [],
};
export default config;
