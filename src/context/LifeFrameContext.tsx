// src/context/LifeFrameContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Goal {
  id: string;
  name: string;
  done: boolean;
  order_index: number;
  tasks: Task[];
}

interface Task {
  id: string;
  goal_id: string;
  name: string;
  done: boolean;
  linked_desire_id?: number;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  task_id: string;
  name: string;
  done: boolean;
}

interface Desire {
  id: number;
  name: string;
  cost_usd: number;
  saved_usd: number;
  type: string;
  priority: string;
  funding: string[];
  archived: boolean;
  linked_task_id?: string;
  unlocked_date?: string | null;  // ← Corrigé : compatible Supabase
}

interface LifeFrame {
  id?: string;
  vision: string;
  total_saved_nr?: number;
}

interface LifeFrameContextType {
  frame: LifeFrame;
  goals: Goal[];
  desires: Desire[];
  loadInitial: () => Promise<void>;

  updateVision: (text: string) => Promise<void>;

  addGoal: (name: string) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;

  addTask: (goalId: string, name: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  addSubtask: (taskId: string, name: string) => Promise<void>;
  toggleSubtask: (subtaskId: string) => Promise<void>;
  deleteSubtask: (subtaskId: string) => Promise<void>;

  addDesire: (data: Omit<Desire, 'id' | 'saved_usd' | 'archived' | 'unlocked_date'>) => Promise<Desire | null>;
  updateDesireSaved: (id: number, saved_usd: number) => Promise<void>;
  deleteDesire: (id: number) => Promise<void>;
  linkDesireToTask: (taskId: string, desireId: number) => Promise<void>;
}

const LifeFrameContext = createContext<LifeFrameContextType | undefined>(undefined);

export const LifeFrameProvider = ({ children }: { children: React.ReactNode }) => {
  const [frame, setFrame] = useState<LifeFrame>({ vision: '' });
  const [goals, setGoals] = useState<Goal[]>([]);
  const [desires, setDesires] = useState<Desire[]>([]);

  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return user.id;
  };

  // === REBUILD UN GOAL (tasks + subtasks) ===
  const rebuildGoal = async (goalId: string) => {
    const userId = await getUserId();
    const { data: tasks } = await supabase
      .from('life_tasks')
      .select('*')
      .eq('goal_id', goalId)
      .eq('user_id', userId);

    const taskIds = tasks?.map(t => t.id) || [];
    const { data: subs } = taskIds.length > 0
      ? await supabase.from('life_subtasks').select('*').in('task_id', taskIds)
      : { data: [] as Subtask[] };

    setGoals(prev => (prev || []).map(g => {
      if (g.id !== goalId) return g;
      const newTasks: Task[] = (tasks || []).map(t => ({
        ...t,
        subtasks: (subs || []).filter(s => s.task_id === t.id)
      }));
      return { ...g, tasks: newTasks };
    }));
  };

  // === CHARGEMENT INITIAL ===
  const loadInitial = async () => {
    const userId = await getUserId();

    const [frameRes, goalsRes, tasksRes, subtasksRes, desiresRes] = await Promise.all([
      supabase.from('life_frames').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('life_goals').select('*').eq('user_id', userId).order('order_index'),
      supabase.from('life_tasks').select('*').eq('user_id', userId),
      supabase.from('life_subtasks').select('*').eq('user_id', userId),
      supabase.from('life_desires').select('*').eq('user_id', userId),
    ]);

    const goalsMap = new Map<string, Goal>();
    goalsRes.data?.forEach((g: any) => goalsMap.set(g.id, { ...g, tasks: [] }));

    tasksRes.data?.forEach((t: any) => {
      const task: Task = { ...t, subtasks: [] };
      const goal = goalsMap.get(t.goal_id);
      if (goal) goal.tasks.push(task);
    });

    subtasksRes.data?.forEach((s: any) => {
      for (const goal of goalsMap.values()) {
        const task = goal.tasks.find(tt => tt.id === s.task_id);
        if (task) task.subtasks.push(s);
      }
    });

    setFrame(frameRes.data ?? { vision: '' });
    setGoals(Array.from(goalsMap.values()));
    setDesires(desiresRes.data ?? []);
  };

  // === REAL-TIME ===
  useEffect(() => {
    loadInitial();

    const channels: RealtimeChannel[] = [];

    const subscribe = (table: string, handler: (payload: any) => void) => {
      const ch = supabase.channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, handler)
        .subscribe();
      channels.push(ch);
    };

    subscribe('life_goals', (p) => {
      if (p.eventType === 'INSERT') setGoals(g => [...(g || []), { ...p.new, tasks: [] }]);
      if (p.eventType === 'UPDATE') setGoals(g => (g || []).map(gg => gg.id === p.new.id ? { ...gg, ...p.new } : gg));
      if (p.eventType === 'DELETE') setGoals(g => (g || []).filter(gg => gg.id !== p.old.id));
    });

    subscribe('life_tasks', (p) => {
      const goalId = p.new?.goal_id || p.old?.goal_id;
      if (goalId) rebuildGoal(goalId);
    });

    subscribe('life_subtasks', async (p) => {
      const { data } = await supabase
        .from('life_tasks')
        .select('goal_id')
        .eq('id', p.new?.task_id || p.old?.task_id)
        .single();
      if (data?.goal_id) rebuildGoal(data.goal_id);
    });

    subscribe('life_desires', (p) => {
      if (p.eventType === 'INSERT') setDesires(d => [...(d || []), p.new]);
      if (p.eventType === 'UPDATE') setDesires(d => (d || []).map(dd => dd.id === p.new.id ? p.new : dd));
      if (p.eventType === 'DELETE') setDesires(d => (d || []).filter(dd => dd.id !== p.old.id));
    });

    subscribe('life_frames', (p) => {
      if (p.eventType === 'INSERT' || p.eventType === 'UPDATE') setFrame(p.new);
    });

    return () => channels.forEach(ch => supabase.removeChannel(ch));
  }, []);

  // === FONCTIONS CRUD ===
  const updateVision = async (text: string) => {
    setFrame(f => ({ ...f, vision: text }));
    const userId = await getUserId();

    const { data: existing } = await supabase.from('life_frames').select('id').eq('user_id', userId).maybeSingle();

    if (existing?.id) {
      await supabase.from('life_frames').update({ vision: text }).eq('id', existing.id);
    } else {
      await supabase.from('life_frames').insert({ user_id: userId, vision: text });
    }
  };

  const addGoal = async (name: string) => {
    const tempId = crypto.randomUUID();
    setGoals(g => [...(g || []), { id: tempId, name, done: false, order_index: Date.now(), tasks: [] }]);

    const userId = await getUserId();
    const { data, error } = await supabase
      .from('life_goals')
      .insert({ user_id: userId, name, done: false })
      .select()
      .single();

    if (error) {
      setGoals(g => (g || []).filter(gg => gg.id !== tempId));
    } else if (data) {
      setGoals(g => (g || []).map(gg => gg.id === tempId ? data : gg));
    }
  };

  const deleteGoal = async (id: string) => {
    setGoals(g => (g || []).filter(gg => gg.id !== id));
    await supabase.from('life_goals').delete().eq('id', id);
  };

  const addTask = async (goalId: string, name: string) => {
    const userId = await getUserId();
    const { error } = await supabase.from('life_tasks').insert({ user_id: userId, goal_id: goalId, name, done: false });
    if (error) {
      console.error('Error adding task:', error);
      // You can add a toast or alert here if needed
      return;
    }
    rebuildGoal(goalId);
  };

  const toggleTask = async (taskId: string) => {
    const task = goals.flatMap(g => g.tasks).find(t => t.id === taskId);
    if (!task) return;

    setGoals(prev => (prev || []).map(g => ({
      ...g,
      tasks: g.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
    })));

    await supabase.from('life_tasks').update({ done: !task.done }).eq('id', taskId);
  };

  const deleteTask = async (taskId: string) => {
    const goalId = goals.flatMap(g => g.tasks).find(t => t.id === taskId)?.goal_id;
    await supabase.from('life_tasks').delete().eq('id', taskId);
    if (goalId) rebuildGoal(goalId);
  };

  const addSubtask = async (taskId: string, name: string) => {
    const userId = await getUserId();
    await supabase.from('life_subtasks').insert({ user_id: userId, task_id: taskId, name, done: false });
    const { data } = await supabase.from('life_tasks').select('goal_id').eq('id', taskId).single();
    if (data?.goal_id) rebuildGoal(data.goal_id);
  };

  const toggleSubtask = async (subtaskId: string) => {
    const sub = goals.flatMap(g => g.tasks).flatMap(t => t.subtasks).find(s => s.id === subtaskId);
    if (!sub) return;
    await supabase.from('life_subtasks').update({ done: !sub.done }).eq('id', subtaskId);
    // rebuild pas nécessaire, juste toggle local
    setGoals(prev => (prev || []).map(g => ({
      ...g,
      tasks: g.tasks.map(t => ({
        ...t,
        subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, done: !s.done } : s)
      }))
    })));
  };

  const deleteSubtask = async (subtaskId: string) => {
    await supabase.from('life_subtasks').delete().eq('id', subtaskId);
    // rebuild léger via parent
    loadInitial();
  };

  const addDesire = async (data: Omit<Desire, 'id' | 'saved_usd' | 'archived' | 'unlocked_date'>) => {
    const userId = await getUserId();
    const { data: newDesire } = await supabase
      .from('life_desires')
      .insert({ ...data, user_id: userId, saved_usd: 0, archived: false })
      .select()
      .single();
    return newDesire;
  };

  const updateDesireSaved = async (id: number, saved_usd: number) => {
    const desire = desires.find(d => d.id === id);
    if (!desire) return;

    const archived = saved_usd >= desire.cost_usd;
    const unlocked_date = archived ? new Date().toISOString().split('T')[0] : null;

    setDesires(d => (d || []).map(dd => dd.id === id ? { ...dd, saved_usd, archived, unlocked_date } : dd));
    await supabase.from('life_desires').update({ saved_usd, archived, unlocked_date }).eq('id', id);
  };

  const deleteDesire = async (id: number) => {
    setDesires(d => (d || []).filter(dd => dd.id !== id));
    await supabase.from('life_desires').delete().eq('id', id);
  };

  const linkDesireToTask = async (taskId: string, desireId: number) => {
    await Promise.all([
      supabase.from('life_tasks').update({ linked_desire_id: desireId }).eq('id', taskId),
      supabase.from('life_desires').update({ linked_task_id: taskId }).eq('id', desireId),
    ]);
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    setGoals(g => (g || []).map(gg => gg.id === id ? { ...gg, ...updates } : gg));
    await supabase.from('life_goals').update(updates).eq('id', id);
  };

  return (
    <LifeFrameContext.Provider value={{
      frame,
      goals,
      desires,
      loadInitial,
      updateVision,
      addGoal,
      updateGoal,
      deleteGoal,
      addTask,
      toggleTask,
      deleteTask,
      addSubtask,
      toggleSubtask,
      deleteSubtask,
      addDesire,
      updateDesireSaved,
      deleteDesire,
      linkDesireToTask,
    }}>
      {children}
    </LifeFrameContext.Provider>
  );
};

export const useLifeFrame = () => {
  const context = useContext(LifeFrameContext);
  if (!context) throw new Error('useLifeFrame must be used within LifeFrameProvider');
  return context;
};