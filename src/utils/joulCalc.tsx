// src/utils/joulCalc.ts
export const JOUL_PER_BTC = 8_333_333; // $1M / $0.12
export const JOUL_PER_USD = 1 / 0.12;   // $1 = 8.333 JOUL

// USD/month → JOUL/day
export const usdPerMonthToJoulPerDay = (usd: number): number => {
  return (usd * JOUL_PER_USD) / 30;
};

// BTC → JOUL
export const btcToJoul = (btc: number): number => {
  return btc * JOUL_PER_BTC;
};

// Yield → JOUL/day
export const yieldToJoulPerDay = (btc: number, apy: number): number => {
  const dailyRate = apy / 100 / 365;
  const dailyBtc = btc * dailyRate;
  return dailyBtc * JOUL_PER_BTC;
};