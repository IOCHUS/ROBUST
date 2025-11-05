// src/context/SJContext.tsx
import { create } from 'zustand';
import { ENERGY_RATES } from '@/data/energyRates';

export type Timeframe = 'day' | 'month' | 'year' | 'meal' | 'km';

export interface Outflow {
  id: string;
  name: string;
  amount: number;
  period: Timeframe;
  category: string;
  dailySJ: number;
}

export interface Income {
  id: string;
  name: string;
  amount: number;
  period: Timeframe;
  category: string;   // ← added
  dailySJ: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  satoshi: number;
}

export interface CurrentLife {
  foodSJ: number;
  homeSJ: number;
  moveSJ: number;
  joySJ: number;
  lifeSJ: number;
}

export interface SJStore {
  countryRate: number;
  btcPrice: number;
  targetBtcPrice: number;

  outflows: Outflow[];
  current: CurrentLife | null;   // ← renamed from currentLife

  incomes: Income[];
  savings: number;
  portfolio: PortfolioItem[];

  setCountryRate: (rate: number) => void;
  setBtcPrice: (price: number) => void;
  setTargetBtcPrice: (price: number) => void;

  addOutflow: (o: Omit<Outflow, 'id' | 'dailySJ'>) => void;
  updateOutflow: (id: string, o: Partial<Outflow>) => void;
  deleteOutflow: (id: string) => void;

  addIncome: (i: Omit<Income, 'id' | 'dailySJ'>) => void;
  updateIncome: (id: string, i: Partial<Income>) => void;
  deleteIncome: (id: string) => void;

  setSavings: (usd: number) => void;

  addPortfolio: (p: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, p: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  calculateDailySJ: (amount: number, period: Timeframe) => number;
  calculateCurrentLife: (outflows: Outflow[]) => CurrentLife;
  recalculateAll: () => void;   // ← added
}

const DAYS: Record<Timeframe, number> = {
  day: 1,
  month: 30,
  year: 365,
  meal: 3,
  km: 50,
};

const sumByCat = (items: (Outflow | Income)[], cat: string) =>
  items.filter(i => i.category === cat).reduce((s, i) => s + i.dailySJ, 0);

export const useSJ = create<SJStore>((set, get) => ({
  countryRate: ENERGY_RATES[0].rate,
  btcPrice: 100000,
  targetBtcPrice: 1000000,

  outflows: [],
  current: null,
  incomes: [],
  savings: 0,
  portfolio: [],

  setCountryRate: (rate) => {
    set({ countryRate: rate });
    get().recalculateAll();
  },

  setBtcPrice: (price) => set({ btcPrice: price }),
  setTargetBtcPrice: (price) => set({ targetBtcPrice: price }),

  calculateDailySJ: (amount, period) => {
    const dailyFiat = amount / DAYS[period];
    const dailyKWh = dailyFiat * get().countryRate;
    return Number(dailyKWh.toFixed(3));
  },

  calculateCurrentLife: (outflows) => {
    const foodSJ = sumByCat(outflows, 'food') + sumByCat(outflows, 'drink');
    const homeSJ = sumByCat(outflows, 'home') + sumByCat(outflows, 'energy');
    const moveSJ = sumByCat(outflows, 'move');
    const joySJ = sumByCat(outflows, 'joy') + sumByCat(outflows, 'learn') + sumByCat(outflows, 'give');
    const lifeSJ = foodSJ + homeSJ + moveSJ + joySJ;
    return { foodSJ, homeSJ, moveSJ, joySJ, lifeSJ };
  },

  recalculateAll: () => {
    const { outflows, incomes, calculateDailySJ, calculateCurrentLife } = get();
    const updatedOut = outflows.map(o => ({ ...o, dailySJ: calculateDailySJ(o.amount, o.period) }));
    const updatedIn = incomes.map(i => ({ ...i, dailySJ: calculateDailySJ(i.amount, i.period) }));
    set({
      outflows: updatedOut,
      incomes: updatedIn,
      current: calculateCurrentLife(updatedOut),
    });
  },

  addOutflow: (o) => {
    const dailySJ = get().calculateDailySJ(o.amount, o.period);
    set((s) => {
      const newOut = [...s.outflows, { ...o, id: Date.now().toString(), dailySJ }];
      return { outflows: newOut, current: get().calculateCurrentLife(newOut) };
    });
  },

  updateOutflow: (id, updates) => {
    set((s) => {
      const newOut = s.outflows.map(o => {
        if (o.id !== id) return o;
        const updated = { ...o, ...updates };
        updated.dailySJ = get().calculateDailySJ(updated.amount, updated.period);
        return updated;
      });
      return { outflows: newOut, current: get().calculateCurrentLife(newOut) };
    });
  },

  deleteOutflow: (id) => {
    set((s) => {
      const newOut = s.outflows.filter(o => o.id !== id);
      return { outflows: newOut, current: get().calculateCurrentLife(newOut) };
    });
  },

  addIncome: (i) => {
    const dailySJ = get().calculateDailySJ(i.amount, i.period);
    set((s) => ({ incomes: [...s.incomes, { ...i, id: Date.now().toString(), dailySJ }] }));
  },

  updateIncome: (id, updates) => {
    set((s) => ({
      incomes: s.incomes.map(i => {
        if (i.id !== id) return i;
        const updated = { ...i, ...updates };
        updated.dailySJ = get().calculateDailySJ(updated.amount, updated.period);
        return updated;
      }),
    }));
  },

  deleteIncome: (id) => set((s) => ({ incomes: s.incomes.filter(i => i.id !== id) })),

  setSavings: (usd) => set({ savings: usd }),

  addPortfolio: (p) => set((s) => ({ portfolio: [...s.portfolio, { ...p, id: Date.now().toString() }] })),
  updatePortfolio: (id, updates) => set((s) => ({
    portfolio: s.portfolio.map(p => (p.id === id ? { ...p, ...updates } : p)),
  })),
  deletePortfolio: (id) => set((s) => ({ portfolio: s.portfolio.filter(p => p.id !== id) })),
}));