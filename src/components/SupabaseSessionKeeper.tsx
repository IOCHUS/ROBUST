// src/components/SupabaseSessionKeeper.tsx
'use client';

import { useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export default function SupabaseSessionKeeper() {
  useEffect(() => {
    // Refresh the session every 25 minutes → access token never expires while tab is open
    const interval = setInterval(async () => {
      const { error } = await supabase.auth.refreshSession();
      if (error) console.warn('Session refresh failed', error);
    }, 25 * 60 * 1000); // 25 minutes (Supabase default JWT = 60 min)

    return () => clearInterval(interval);
  }, []);

  // This component renders nothing
  return null;
}