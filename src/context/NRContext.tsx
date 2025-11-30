// src/context/NRContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export type Timeframe = 'day' | 'month' | 'year';

export interface Outflow {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  period: Timeframe;
  category: string | null;
  runsOutOn: string | null;
  marketplace: string | null;
  optimizerNote: string | null;
  needLevel: 'essential' | 'good-to-have' | 'luxury' | 'cut' | null;
  created_at: string;
  dailyNR: number;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon: string;
}

export type PortfolioCategory = {
  id: string;
  name: string;
  icon: string;
};

export type PortfolioAsset = {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  amount: number;
  nr_value: number;
  yield_nr_per_day?: number | null;
  notes?: string | null;
  created_at: string;
};

export const GLOBAL_KWH_RATE = 0.26;

export type NRContextType = {
  outflows: Outflow[];
  categories: Category[];
  portfolioCategories: PortfolioCategory[];
  portfolioAssets: PortfolioAsset[];
  countryRate: number;
  calculateDailyNR: (amount: number, period: Timeframe) => number;
  addOutflow: (data: Omit<Outflow, 'id' | 'user_id' | 'dailyNR' | 'created_at'>) => Promise<void>;
  updateOutflow: (id: string, data: Partial<Outflow>) => Promise<void>;
  deleteOutflow: (id: string) => Promise<void>;
  addCategory: (data: Omit<Category, 'id' | 'user_id'>) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addPortfolioCategory: (data: Omit<PortfolioCategory, 'id'>) => Promise<void>;
  updatePortfolioCategory: (id: string, data: Partial<PortfolioCategory>) => Promise<void>;
  deletePortfolioCategory: (id: string) => Promise<void>;
  addPortfolioAsset: (data: Omit<PortfolioAsset, 'id' | 'user_id' | 'nr_value' | 'created_at'>) => Promise<void>;
  updatePortfolioAsset: (id: string, data: Partial<PortfolioAsset>) => Promise<void>;
  deletePortfolioAsset: (id: string) => Promise<void>;
  loadAll: () => Promise<void>;
};

const NRContext = createContext<NRContextType | undefined>(undefined);

export function NRProvider({ children }: { children: React.ReactNode }) {
  const [outflows, setOutflows] = useState<Outflow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [portfolioCategories, setPortfolioCategories] = useState<PortfolioCategory[]>([]);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);

  const calculateDailyNR = (amount: number, period: Timeframe): number => {
    let dailyFiat = 0;
    switch (period) {
      case 'day': dailyFiat = amount; break;
      case 'month': dailyFiat = amount / 30.42; break;
      case 'year': dailyFiat = amount / 365; break;
    }
    return Number((dailyFiat / GLOBAL_KWH_RATE).toFixed(3));
  };

  // NEW: simple USD → NR conversion for all assets
  const calculateAssetNR = (usdValue: number): number => {
    return Number((usdValue / GLOBAL_KWH_RATE).toFixed(0));
  };

  const loadAll = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const [outflowRes, catRes, portfolioCatRes, portfolioAssetRes] = await Promise.all([
        supabase.from('outflows').select('*').eq('user_id', user.id),
        supabase.from('categories').select('*').eq('user_id', user.id),
        supabase.from('portfolio_categories').select('*').eq('user_id', user.id),
        supabase.from('portfolio_assets').select('*').eq('user_id', user.id),
      ]);

      // Outflows
      if (outflowRes.data) {
        const enriched = outflowRes.data.map((o: any) => ({
          ...o,
          dailyNR: calculateDailyNR(o.amount, o.period),
        }));
        setOutflows(enriched);
      }

      // Tracker Categories
      if (catRes.data) {
        setCategories(catRes.data || []);
      }

      // Portfolio Categories
      if (portfolioCatRes.data) {
        setPortfolioCategories(portfolioCatRes.data || []);
      }

      // Assets – now nr_value is simply amount_in_usd / 0.26
      if (portfolioAssetRes.data) {
        const enriched = portfolioAssetRes.data.map((a: any) => ({
          ...a,
          nr_value: calculateAssetNR(a.amount),
        }));
        setPortfolioAssets(enriched);
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  useEffect(() => {
    const initDefaults = async () => {
      // Init tracker categories
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: allCats } = await supabase.from('categories').select('*').eq('user_id', user.id);
      const DEFAULT_TRACKER_CATEGORIES = [
        { name: 'Food', icon: '🍎' },
        { name: 'Home', icon: '🏠' },
        { name: 'Move', icon: '🚗' },
        { name: 'Joy', icon: '😊' },
        { name: 'Learn', icon: '📖' },
        { name: 'Uncategorized', icon: '❓' },
      ];

      const currentTrackerNames = new Set((allCats || []).map(c => c.name.toUpperCase()));
      const missingTracker = DEFAULT_TRACKER_CATEGORIES.filter(c => !currentTrackerNames.has(c.name.toUpperCase()));

      if (missingTracker.length > 0) {
        await supabase.from('categories').insert(missingTracker.map(d => ({ 
          ...d,
          id: window.crypto.randomUUID(), 
          user_id: user.id
        })));
      }

      // Init portfolio categories hard-coded
      const DEFAULT_PORTFOLIO_CATEGORIES = [
        { name: 'Reserve', icon: '💰' },
        { name: 'Commodities', icon: '🥇' },
        { name: 'Securities', icon: '📈' },
        { name: 'TGA', icon: '💎' },
        { name: 'Emergency', icon: '🛡️' },
        { name: 'Uncategorized', icon: '❓' },
      ];

      const { data: userPortfolioCats } = await supabase.from('portfolio_categories').select('*').eq('user_id', user.id);

      const currentPortfolioNames = new Set((userPortfolioCats || []).map(c => c.name.toUpperCase()));

      const missingPortfolio = DEFAULT_PORTFOLIO_CATEGORIES.filter(d => !currentPortfolioNames.has(d.name.toUpperCase()));

      if (missingPortfolio.length > 0) {
        await supabase.from('portfolio_categories').insert(missingPortfolio.map(d => ({
          ...d,
          id: window.crypto.randomUUID(),
          user_id: user.id,
          is_default: true,
        })));
      }

      await loadAll();
    };

    initDefaults();
  }, []);

  const addOutflow = async (data: Omit<Outflow, 'id' | 'user_id' | 'dailyNR' | 'created_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('outflows').insert({ ...data, user_id: user.id });
    if (error) throw error;
    await loadAll();
  };

  const updateOutflow = async (id: string, data: Partial<Outflow>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('outflows').update(data).eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const deleteOutflow = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('outflows').delete().eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const addCategory = async (data: Omit<Category, 'id' | 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('categories').insert({ ...data, id: window.crypto.randomUUID(), user_id: user.id });
    if (error) throw error;
    await loadAll();
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('categories').update(data).eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const deleteCategory = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: uncat, error: uncatError } = await supabase.from('categories').select('id').eq('user_id', user.id).eq('name', 'Uncategorized').single();

    let uncatId = uncat?.id || null;

    if (uncatError || !uncat) {
      const { data: newUncat, error: insertError } = await supabase.from('categories').insert({ user_id: user.id, id: window.crypto.randomUUID(), name: 'Uncategorized', icon: '❓' }).select('id').single();
      if (insertError) throw insertError;
      uncatId = newUncat.id;
    }

    await supabase.from('outflows').update({ category: uncatId }).eq('category', id).eq('user_id', user.id);

    const { error } = await supabase.from('categories').delete().eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const addPortfolioCategory = async (data: Omit<PortfolioCategory, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('portfolio_categories').insert({ ...data, id: window.crypto.randomUUID(), user_id: user.id, is_default: false });
    if (error) throw error;
    await loadAll();
  };

  const updatePortfolioCategory = async (id: string, data: Partial<PortfolioCategory>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('portfolio_categories').update(data).eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const deletePortfolioCategory = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: uncat, error: uncatError } = await supabase.from('portfolio_categories').select('id').eq('user_id', user.id).eq('name', 'Uncategorized').single();

    let uncatId = uncat?.id || null;

    if (uncatError || !uncat) {
      const { data: newUncat, error: insertError } = await supabase.from('portfolio_categories').insert({ id: window.crypto.randomUUID(), user_id: user.id, name: 'Uncategorized', icon: '❓', is_default: true }).select('id').single();
      if (insertError) throw insertError;
      uncatId = newUncat.id;
    }

    await supabase.from('portfolio_assets').update({ category_id: uncatId }).eq('category_id', id).eq('user_id', user.id);

    const { error } = await supabase.from('portfolio_categories').delete().eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const addPortfolioAsset = async (data: Omit<PortfolioAsset, 'id' | 'user_id' | 'nr_value' | 'created_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const nr_value = calculateAssetNR(data.amount);

    const { error } = await supabase
      .from('portfolio_assets')
      .insert({
        user_id: user.id,
        category_id: data.category_id,
        name: data.name,
        amount: data.amount,
        nr_value,
        yield_nr_per_day: data.yield_nr_per_day || null,
        notes: data.notes || null,
      });

    if (error) {
      console.error('Add asset error:', error);
      throw error;
    }
    await loadAll();
  };

  const updatePortfolioAsset = async (id: string, data: Partial<PortfolioAsset>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const updates: any = { ...data };

    if (data.amount !== undefined) {
      updates.nr_value = calculateAssetNR(data.amount);
    }

    const { error } = await supabase
      .from('portfolio_assets')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Update asset error:', error);
      throw error;
    }
    await loadAll();
  };

  const deletePortfolioAsset = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('portfolio_assets').delete().eq('id', id).eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  useEffect(() => {
    loadAll();

    const channel = supabase
      .channel('nr-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'outflows' }, loadAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, loadAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_categories' }, loadAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_assets' }, loadAll)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <NRContext.Provider value={{
      outflows,
      categories,
      portfolioCategories,
      portfolioAssets,
      countryRate: GLOBAL_KWH_RATE,
      calculateDailyNR,
      addOutflow,
      updateOutflow,
      deleteOutflow,
      addCategory,
      updateCategory,
      deleteCategory,
      addPortfolioCategory,
      updatePortfolioCategory,
      deletePortfolioCategory,
      addPortfolioAsset,
      updatePortfolioAsset,
      deletePortfolioAsset,
      loadAll,
    }}>
      {children}
    </NRContext.Provider>
  );
}

export const useNR = () => {
  const context = useContext(NRContext);
  if (!context) throw new Error('useNR must be used within NRProvider');
  return context;
};