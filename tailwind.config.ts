import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text1: "rgb(var(--color-text1) / <alpha-value>)",
        text2: "rgb(var(--color-text2) / <alpha-value>)",
        themeColor1: "rgb(var(--color-themeColor1) / <alpha-value>)",
        themeColor2: "rgb(var(--color-themeColor2) / <alpha-value>)",
        themeColor3: "rgb(var(--color-themeColor3) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
