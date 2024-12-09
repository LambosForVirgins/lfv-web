import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      leading: [`var(--font-leading)`, ...defaultTheme.fontFamily.sans],
      headline: [`var(--font-headline)`, ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: [`var(--font-body)`, ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-body)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          100: "var(--bg-red-100)",
          // 200: "var(--bg-red-200)",
          // 300: "var(--bg-red-300)",
          400: "var(--bg-red-400)",
          500: "var(--bg-red-500)",
        },
      },
      backgroundImage: {
        "texture-cash": "url('/images/cash-texture.png')",
        "texture-lambo": "url('/images/lambo-texture.png')",
      },
      gridTemplateColumns: {
        panels: "var(--panel-layout)",
        layout: "var(--column-layout)",
        actions: "repeat(auto-fit, minmax(60px, 1fr))",
      },
      gridColumn: {
        full: "full",
        content: "content",
        "gutter-left": "full-start / content-start",
        "gutter-right": "content-end / full-end",
      },
    },
  },
  plugins: [tailwindForms],
};
export default config;
