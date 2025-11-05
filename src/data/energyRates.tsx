// src/data/energyRates.ts
export interface CountryRate {
  name: string;
  code: string;
  rate: number; // $1 = X kWh
}

export const ENERGY_RATES: CountryRate[] = [
  { name: "USA", code: "US", rate: 0.0858 },
  { name: "Germany", code: "DE", rate: 0.11 },
  { name: "Japan", code: "JP", rate: 0.095 },
  { name: "Brazil", code: "BR", rate: 0.065 },
  { name: "India", code: "IN", rate: 0.04 },
  { name: "France", code: "FR", rate: 0.09 },
  { name: "Canada", code: "CA", rate: 0.07 },
  { name: "Australia", code: "AU", rate: 0.08 },
  // Add more as needed
];