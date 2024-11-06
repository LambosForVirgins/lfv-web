import { Bangers, Cherry_Bomb_One, Coming_Soon } from "next/font/google";

export enum FontVariable {
  Leading = "--font-leading",
  Headline = "--font-headline",
  Base = "--font-base",
}

export const fontLeading = Bangers({
  subsets: ["latin"],
  variable: FontVariable.Leading,
  weight: "400",
  display: "swap",
});

export const fontHeadline = Cherry_Bomb_One({
  subsets: ["latin"],
  variable: FontVariable.Headline,
  weight: "400",
  display: "swap",
});

export const fontBase = Coming_Soon({
  subsets: ["latin"],
  variable: FontVariable.Base,
  weight: "400",
  display: "swap",
});

export default [fontLeading.variable, fontHeadline.variable, fontBase.variable];
