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
        panels: "repeat(auto-fit, minmax(320px, 1fr))",
        layout:
          "[full-start] minmax(0, 1fr) [content-start] minmax(320px, 960px) [content-end] minmax(0, 1fr) [full-end]",
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
