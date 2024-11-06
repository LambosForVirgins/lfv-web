import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["./src/**/*.test.(ts|tsx)"],
    coverage: {
      include: ["src"],
      exclude: ["**/index.ts"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      skipFull: true,
    },
  },
});
