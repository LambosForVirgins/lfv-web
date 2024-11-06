import { unstable_flag as flag } from "@vercel/flags/next";

export const showEntrySubmissions = flag({
  key: "entrySubmissions",
  decide: async () => false,
});
