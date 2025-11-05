// src/context/SJContext.tsx
import { create } from 'zustand';

export interface DayEntry {
  date: string;
  lifeSJ: number;
  foodSJ: number;
  homeSJ: number;
  moveSJ: number;
  joySJ: number;
  kcal: number;
  water: number;
  solarKWh: number;
  totalJoules: number;
  isFree: boolean;
}

interface SJStore {
  current: DayEntry | null;
  future: any;
  history: DayEntry[];
  setCurrent: (data: DayEntry) => void;
  setFuture: (data: any) => void;
  addToHistory: (entry: DayEntry) => void;
  load: () => void;
}

export const useSJ = create<SJStore>((set, get) => ({
  current: null,
  future: null,
  history: [],

  setCurrent: (data) => {
    localStorage.setItem('sj_current', JSON.stringify(data));
    set({ current: data });
  },

  setFuture: (data) => {
    localStorage.setItem('sj_future', JSON.stringify(data));
    set({ future: data });
  },

  addToHistory: (entry) => {
    const history = [entry, ...get().history].slice(0, 15);
    localStorage.setItem('sj_history', JSON.stringify(history));
    set({ history });
  },

  load: () => {
    const current = localStorage.getItem('sj_current');
    const future = localStorage.getItem('sj_future');
    const history = localStorage.getItem('sj_history');
    if (current) set({ current: JSON.parse(current) });
    if (future) set({ future: JSON.parse(future) });
    if (history) set({ history: JSON.parse(history) });
  },
}));