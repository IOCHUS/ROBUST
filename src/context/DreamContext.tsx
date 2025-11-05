// src/context/DreamContext.tsx
import { create } from 'zustand';

export interface Goal {
  id: string;
  name: string;
  done: boolean;
  tasks: any[];
}

interface DreamState {
  goals: Goal[];
}

export const useDreamStore = create<DreamState>(() => ({
  goals: JSON.parse(localStorage.getItem('dreamFrame') || '{"goals":[]}')?.goals || [],
}));