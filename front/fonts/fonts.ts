import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  style: "normal",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
