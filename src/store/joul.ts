// src/store/joul.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SAT_PER_BTC = 100_000_000;
export const BTC_USD_PRICE = 110_000;
export const RESERVE_TARGET_SAT = 481_000;
export const DAILY_JOUL_NEED = 4;

// === BACKWARD-COMPATIBLE ASSET (for Portfolio) ===
export type Asset = {
  id: string;
  category: string;
  name: string;
  amount: number;           // ← Legacy
  satValue: number;
  yieldSatPerDay?: number;  // ← Legacy (for Portfolio)
  dateAdded: string;
  notes?: string;
  
  // NEW FIELDS (for FLOW + Dashboard)
  initialCostUsd?: number;
  yieldJoulPerDay?: number;
  effortHoursPerWeek?: number;
  isActive?: boolean;
};

// === CATEGORY ===
export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

// === STORE STATE ===
type JoulState = {
  assets: Asset[];
  categories: Category[];
  satPerJoul: number;

  // Legacy (for Portfolio)
  totalSat: number;
  passiveSatPerDay: number;
  passiveJoul: number;
  reservePct: number;

  // New (for FLOW + Dashboard)
  totalJoulPerDay: number;
  totalEffortHoursPerWeek: number;

  // Actions
  addAsset: (asset: Partial<Asset>) => void;  // ← Flexible
  deleteAsset: (id: string) => void;
  addCategory: (cat: Category) => void;
  deleteCategory: (id: string) => void;
  setSatPerJoul: (value: number) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
};

// === DEFAULT CATEGORIES ===
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'crypto',      name: 'CRYPTO',        icon: '₿', color: 'from-orange-500 to-yellow-500' },
  { id: 'commodities', name: 'COMMODITIES',   icon: '🪙', color: 'from-yellow-500 to-amber-500' },
  { id: 'reserve',     name: 'RESERVE',       icon: '$', color: 'from-green-500 to-emerald-600' },
  { id: 'tga',         name: 'TGA',           icon: '📍', color: 'from-blue-500 to-indigo-500' },
  { id: 'emergency',   name: 'EMERGENCY',     icon: '🚨', color: 'from-red-500 to-orange-500' },
  { id: 'realestate',  name: 'REAL ESTATE',   icon: '🏠', color: 'from-purple-500 to-pink-600' },
  { id: 'farmland',    name: 'FARMLAND',      icon: '🌾', color: 'from-amber-700 to-amber-900' },
  { id: 'yield',       name: 'YIELD',         icon: '📈', color: 'from-teal-500 to-cyan-500' },
  { id: 'income',      name: 'INCOME',        icon: '💸', color: 'from-green-500 to-lime-500' },
];

export const useJoulStore = create<JoulState>()(
  persist(
    (set, get) => ({
      // Initial State
      assets: [],
      categories: DEFAULT_CATEGORIES,
      satPerJoul: 1,

      // === LEGACY COMPUTED (for Portfolio) ===
      get totalSat() {
        return get().assets.reduce((sum, a) => sum + (a.satValue || 0), 0);
      },
      get passiveSatPerDay() {
        return get().assets.reduce((sum, a) => sum + (a.yieldSatPerDay || 0), 0);
      },
      get passiveJoul() {
        return get().passiveSatPerDay / get().satPerJoul;
      },
      get reservePct() {
        return Math.min(100, (get().totalSat / RESERVE_TARGET_SAT) * 100);
      },

      // === NEW COMPUTED (for FLOW + Dashboard) ===
      get totalJoulPerDay() {
        return get().assets.reduce((sum, a) => {
          if (a.isActive && a.yieldJoulPerDay) return sum + a.yieldJoulPerDay;
          // Fallback to legacy yield
          if (a.yieldSatPerDay) return sum + a.yieldSatPerDay / get().satPerJoul;
          return sum;
        }, 0);
      },
      get totalEffortHoursPerWeek() {
        return get().assets.reduce((sum, a) => sum + (a.effortHoursPerWeek || 0), 0);
      },

      // === ACTIONS ===
      addAsset: (input) => {
        const satValue = input.initialCostUsd 
          ? Math.floor((input.initialCostUsd * SAT_PER_BTC) / BTC_USD_PRICE)
          : input.amount || 0;
        
        const asset: Asset = {
          id: Date.now().toString(),
          category: input.category || 'yield',
          name: input.name || 'Unnamed Asset',
          amount: input.amount || 0,
          satValue,
          yieldSatPerDay: input.yieldSatPerDay, // Legacy
          dateAdded: new Date().toISOString(),
          notes: input.notes,
          initialCostUsd: input.initialCostUsd,
          yieldJoulPerDay: input.yieldJoulPerDay,
          effortHoursPerWeek: input.effortHoursPerWeek || 0,
          isActive: input.isActive !== undefined ? input.isActive : true,
        };

        set((state) => ({ assets: [...state.assets, asset] }));
      },

      updateAsset: (id, updates) =>
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      deleteAsset: (id) =>
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== id),
        })),

      addCategory: (cat) =>
        set((state) => ({
          categories: [...state.categories, cat],
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          assets: state.assets.filter((a) => a.category !== id),
        })),

      setSatPerJoul: (value) => set({ satPerJoul: value }),
    }),
    {
      name: 'sat-vault-storage',
      partialize: (state) => ({
        assets: state.assets,
        categories: state.categories,
        satPerJoul: state.satPerJoul,
      }),
    }
  )
);