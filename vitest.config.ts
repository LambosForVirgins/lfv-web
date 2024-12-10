import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./src/**/*.test.(ts|tsx)"],
    coverage: {
      include: ["src"],
      exclude: ["**/index.ts"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      skipFull: true,
    },
  },
});
