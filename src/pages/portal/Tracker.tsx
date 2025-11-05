// src/pages/portal/Tracker.tsx
'use client';

import BudgetTab from '@/components/SJ/tabs/BudgetTab';   // ← correct path

export default function Tracker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Budget</h1>
        <BudgetTab />
      </div>
    </div>
  );
}