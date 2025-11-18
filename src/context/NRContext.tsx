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
  dailyNR: number; // Calculated client-side
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon: string;
}

// THIS IS THE ONE AND ONLY PLACE TO CHANGE THE RATE
export const GLOBAL_KWH_RATE = 0.28; // $0.28 per kWh → 1 NR = 1 kWh/day

interface NRContextType {
  outflows: Outflow[];
  categories: Category[];
  countryRate: number;
  calculateDailyNR: (amount: number, period: Timeframe) => number;
  addOutflow: (data: Omit<Outflow, 'id' | 'user_id' | 'dailyNR' | 'created_at'>) => Promise<void>;
  updateOutflow: (id: string, data: Partial<Outflow>) => Promise<void>;
  deleteOutflow: (id: string) => Promise<void>;
  addCategory: (data: Omit<Category, 'user_id'>) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  loadAll: () => Promise<void>;
}

const NRContext = createContext<NRContextType | undefined>(undefined);

export function NRProvider({ children }: { children: React.ReactNode }) {
  const [outflows, setOutflows] = useState<Outflow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const calculateDailyNR = (amount: number, period: Timeframe): number => {
    let dailyFiat = 0;
    switch (period) {
      case 'day':   dailyFiat = amount;           break;
      case 'month': dailyFiat = amount / 30.42;    break;
      case 'year':  dailyFiat = amount / 365;      break;
    }
    return Number((dailyFiat / GLOBAL_KWH_RATE).toFixed(3));
  };

  const loadAll = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [outflowRes, catRes] = await Promise.all([
      supabase.from('outflows').select('*').eq('user_id', user.id),
      supabase.from('categories').select('*').eq('user_id', user.id),
    ]);

    if (outflowRes.data) {
      const enriched = outflowRes.data.map((o: any) => ({
        ...o,
        dailyNR: calculateDailyNR(o.amount, o.period),
      }));
      setOutflows(enriched);
    }
    if (catRes.data) setCategories(catRes.data);
  };

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
    const { error } = await supabase.from('outflows')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const deleteOutflow = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('outflows')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const addCategory = async (data: Omit<Category, 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('categories').insert({ ...data, user_id: user.id });
    if (error) throw error;
    await loadAll();
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('categories')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) throw error;
    await loadAll();
  };

  const deleteCategory = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    await supabase.from('outflows').update({ category: 'uncategorized' }).eq('category', id).eq('user_id', user.id);
    await supabase.from('categories').delete().eq('id', id).eq('user_id', user.id);
    await loadAll();
  };

  useEffect(() => {
    loadAll();

    const channel = supabase.channel('nr-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'outflows' }, loadAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, loadAll)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <NRContext.Provider value={{
      outflows,
      categories,
      countryRate: GLOBAL_KWH_RATE,
      calculateDailyNR,
      addOutflow,
      updateOutflow,
      deleteOutflow,
      addCategory,
      updateCategory,
      deleteCategory,
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