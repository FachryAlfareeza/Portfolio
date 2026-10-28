import data from "./data.json";
import type { PortfolioData } from "./types";

// Single typed content source for the whole site. Edit data.json to change content.
export const portfolio: PortfolioData = data as PortfolioData;

export * from "./types";
