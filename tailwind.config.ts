import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "Source Code Pro",
          "Menlo",
          "Consolas",
          "Monaco",
          "Liberation Mono",
          "Lucida Console",
          "monospace",
        ],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
      },
    },
  },
  plugins: [],
};

export default config;
