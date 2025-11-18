'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Undo2, CheckCircle2, Shield, Package, Brain, Star, Settings2, AlertCircle, Info, Edit3, Archive, Sparkles, X } from 'lucide-react';
import { GLOBAL_KWH_RATE } from '../../context/NRContext';
import { supabase } from '@/supabaseClient';

interface Subtask {
  id: string;
  name: string;
  done: boolean;
}

interface Task {
  id: string;
  name: string;
  subtasks: Subtask[];
  done: boolean;
  showInput: boolean;
  linkedDesireId?: string;
}

interface Goal {
  id: string;
  name: string;
  tasks: Task[];
  done: boolean;
}

interface Desire {
  id: number;
  name: string;
  costUSD: number;
  costNR: number;
  savedUSD: number;
  savedNR: number;
  type: 'survival' | 'material' | 'skill' | 'epic' | 'system';
  priority: 'high' | 'med' | 'low';
  funding: string[];
  unlockedDate?: string;
  archived: boolean;
  linkedTaskId?: string;
}

const TYPE_CONFIG = {
  survival: { color: 'red-400', icon: Shield, label: 'Survival' },
  material: { color: 'amber-400', icon: Package, label: 'Material' },
  skill: { color: 'yellow-300', icon: Brain, label: 'Skill' },
  epic: { color: 'emerald-400', icon: Star, label: 'Epic' },
  system: { color: 'blue-400', icon: Settings2, label: 'System' },
} as const;

const PRIORITY_CONFIG = {
  high: {
    border: 'border-l-4 border-amber-800',
    badge: 'bg-amber-900/60 text-amber-200 border border-amber-500/60 shadow-sm px-2 py-0.5 text-xs font-bold rounded-full',
    label: 'HIGH'
  },
  med: {
    border: 'border-l-4 border-emerald-800',
    badge: 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/60 shadow-sm px-2 py-0.5 text-xs font-bold rounded-full',
    label: 'MEDIUM'
  },
  low: {
    border: 'border-l-4 border-gray-800',
    badge: 'bg-gray-900/60 text-gray-300 border border-gray-500/60 shadow-sm px-2 py-0.5 text-xs font-bold rounded-full',
    label: 'LOW'
  },
} as const;

const FUNDING_TAGS = ['PORTFOLIO', 'JOB', 'HUSTLE', 'YIELD', 'CHARITY', 'OTHER'];
const FUNDING_EXPLANATIONS: Record<string, string> = {
  PORTFOLIO: 'Investment portfolio returns',
  JOB: 'Salary from employment',
  HUSTLE: 'Side gigs, freelance, or entrepreneurship',
  YIELD: 'DeFi farming, staking, or yield strategies',
  CHARITY: 'Charitable grants or donations',
  OTHER: 'Any other income source'
};

const MAX_GOAL_NAME = 80;
const MAX_TASK_NAME = 80;
const MAX_SUBTASK_NAME = 100;
const MAX_VISION = 280;

export default function LifeFrame() {
  const [vision, setVision] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [planGenerated, setPlanGenerated] = useState(false);
  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ message: string; undo: () => void } | null>(null);

  const [desires, setDesires] = useState<Desire[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemUSD, setItemUSD] = useState('');
  const [itemType, setItemType] = useState<'survival' | 'material' | 'skill' | 'epic' | 'system'>('material');
  const [priority, setPriority] = useState<'high' | 'med' | 'low'>('med');
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showFundingInfo, setShowFundingInfo] = useState(false);

  const [activeTab, setActiveTab] = useState<'dream' | 'locker'>('dream');
  const [linkPopup, setLinkPopup] = useState<{ taskId: string; goalId: string } | null>(null);

  /* ==================== SUPABASE LOAD + REALTIME ==================== */
  useEffect(() => {
    let isMounted = true;

    const loadAll = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !isMounted) return;

      const [goalsRes, tasksRes, subtasksRes, desiresRes] = await Promise.all([
        supabase.from('life_goals').select('*').eq('user_id', user.id).order('order_index'),
        supabase.from('life_tasks').select('*').eq('user_id', user.id),
        supabase.from('life_subtasks').select('*').eq('user_id', user.id),
        supabase.from('life_desires').select('*').eq('user_id', user.id),
      ]);

      if (!isMounted) return;

      const goalsMap = new Map<string, Goal>();
      goalsRes.data?.forEach((g: any) => {
        goalsMap.set(g.id, { id: g.id, name: g.name, tasks: [], done: g.done });
      });

      const tasksMap = new Map<string, Task>();
      tasksRes.data?.forEach((t: any) => {
        const task: Task = {
          id: t.id,
          name: t.name,
          subtasks: [],
          done: t.done,
          showInput: false,
          linkedDesireId: t.linked_desire_id?.toString(),
        };
        tasksMap.set(t.id, task);
        const goal = goalsMap.get(t.goal_id);
        if (goal) goal.tasks.push(task);
      });

      subtasksRes.data?.forEach((s: any) => {
        const task = tasksMap.get(s.task_id);
        if (task) task.subtasks.push({ id: s.id, name: s.name, done: s.done });
      });

      setGoals(Array.from(goalsMap.values()));

      const mappedDesires = desiresRes.data?.map((d: any): Desire => ({
        id: d.id,
        name: d.name,
        costUSD: Number(d.cost_usd),
        costNR: Math.ceil(Number(d.cost_usd) / GLOBAL_KWH_RATE),
        savedUSD: Number(d.saved_usd),
        savedNR: Math.ceil(Number(d.saved_usd) / GLOBAL_KWH_RATE),
        type: d.type,
        priority: d.priority,
        funding: d.funding || [],
        unlockedDate: d.unlocked_date || undefined,
        archived: d.archived || false,
        linkedTaskId: d.linked_task_id || undefined,
      })) || [];

      setDesires(mappedDesires);
      setPlanGenerated((goalsRes.data?.length ?? 0) > 0 || (desiresRes.data?.length ?? 0) > 0);
    };

    loadAll();

    const channels = [
      supabase.channel('life-goals').on('postgres_changes', { event: '*', schema: 'public', table: 'life_goals' }, loadAll).subscribe(),
      supabase.channel('life-tasks').on('postgres_changes', { event: '*', schema: 'public', table: 'life_tasks' }, loadAll).subscribe(),
      supabase.channel('life-subtasks').on('postgres_changes', { event: '*', schema: 'public', table: 'life_subtasks' }, loadAll).subscribe(),
      supabase.channel('life-desires').on('postgres_changes', { event: '*', schema: 'public', table: 'life_desires' }, loadAll).subscribe(),
    ];

    return () => {
      isMounted = false;
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, []);

  /* ==================== SUPABASE HELPERS ==================== */
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not logged in');
    return user;
  };

  // Goals
  const addGoal = async () => {
    const trimmed = newGoalName.trim();
    if (!trimmed || trimmed.length > MAX_GOAL_NAME || goals.length >= 12) return;

    const user = await getUser();
    await supabase.from('life_goals').insert({
      user_id: user.id,
      name: trimmed,
      done: false,
      order_index: Date.now(),
    });
    setNewGoalName('');
  };

  const removeGoal = async (goalId: string) => {
    await supabase.from('life_goals').delete().eq('id', goalId);
  };

  // Tasks
  const addTask = async (goalId: string) => {
    const input = taskInputs[goalId]?.trim();
    if (!input || input.length > MAX_TASK_NAME) return;

    const user = await getUser();
    const { data: newTask } = await supabase.from('life_tasks').insert({
      user_id: user.id,
      goal_id: goalId,
      name: input,
      done: false,
      order_index: Date.now(),
    }).select().single();

    setTaskInputs(prev => ({ ...prev, [goalId]: '' }));

    if (input.toLowerCase().includes('buy') || input.toLowerCase().includes('purchase')) {
      setLinkPopup({ goalId, taskId: newTask.id });
    }
  };

  const toggleTask = async (taskId: string) => {
    const task = goals.flatMap(g => g.tasks).find(t => t.id === taskId);
    if (!task) return;
    await supabase.from('life_tasks').update({ done: !task.done }).eq('id', taskId);
  };

  // Subtasks
  const addSubtask = async (taskId: string) => {
    const input = subtaskInputs[taskId]?.trim();
    if (!input || input.length > MAX_SUBTASK_NAME) return;

    const user = await getUser();
    await supabase.from('life_subtasks').insert({
      user_id: user.id,
      task_id: taskId,
      name: input,
      done: false,
    });
    setSubtaskInputs(prev => ({ ...prev, [taskId]: '' }));
  };

  const toggleSubtask = async (subId: string) => {
    const sub = goals.flatMap(g => g.tasks).flatMap(t => t.subtasks).find(s => s.id === subId);
    if (!sub) return;
    await supabase.from('life_subtasks').update({ done: !sub.done }).eq('id', subId);
  };

  const removeSubtask = async (subId: string) => {
    await supabase.from('life_subtasks').delete().eq('id', subId);
  };

  // Desires
  const handleAddDesire = async (prefillName?: string) => {
    const name = (prefillName || itemName).trim();
    if (!name || !itemUSD || Number(itemUSD) <= 0) return;

    const usd = Number(itemUSD);
    const user = await getUser();

    const { data: newDesire } = await supabase
      .from('life_desires')
      .insert({
        user_id: user.id,
        name,
        cost_usd: usd,
        saved_usd: 0,
        type: itemType,
        priority,
        funding: selectedFunding.slice(0, 3),
        archived: false,
      })
      .select()
      .single();

    setItemName('');
    setItemUSD('');
    setSelectedFunding([]);

    if (linkPopup && newDesire) {
      await supabase.from('life_tasks').update({ linked_desire_id: newDesire.id }).eq('id', linkPopup.taskId);
      await supabase.from('life_desires').update({ linked_task_id: linkPopup.taskId }).eq('id', newDesire.id);
      setLinkPopup(null);
    }
  };

  const handleUpdateSaved = async (id: number, amountUSD: number) => {
    if (amountUSD < 0) return;

    const desire = desires.find(d => d.id === id);
    if (!desire) return;

    await supabase
      .from('life_desires')
      .update({
        saved_usd: amountUSD,
        archived: amountUSD >= desire.costUSD,
        unlocked_date: amountUSD >= desire.costUSD ? new Date().toISOString().split('T')[0] : null,
      })
      .eq('id', id);
  };

  const handleDeleteDesire = async (id: number) => {
    await supabase.from('life_desires').delete().eq('id', id);
    setDeleteConfirm(null);
  };

  const toggleFunding = (tag: string) => {
    setSelectedFunding(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag].slice(0, 3);
    });
  };

  /* ==================== UTILS ==================== */
  const showUndo = (message: string, undoFn: () => void) => {
    setToast({ message, undo: undoFn });
    setTimeout(() => setToast(null), 4000);
  };

  const isTaskDone = (task: Task): boolean => {
    if (task.subtasks.length === 0) return task.done;
    return task.subtasks.every(s => s.done);
  };

  const updateGoalDone = (goal: Goal): boolean => {
    return goal.tasks.length > 0 && goal.tasks.every(t => isTaskDone(t));
  };

  const generatePlan = () => {
    const valid = vision.trim() && 
                  goals.length >= 1 && 
                  goals.length <= 12 && 
                  goals.every(g => g.tasks.length >= 1);
    if (valid) {
      setPlanGenerated(true);
    }
  };

  const allDone = goals.length > 0 && goals.every(g => g.done);

  const sortedGoals = [...goals]
    .sort((a, b) => {
      if (a.done && !b.done) return 1;
      if (!a.done && b.done) return -1;
      return 0;
    });

  const sortedDesires = [...desires]
    .filter(d => !d.archived)
    .sort((a, b) => {
      const order = { high: 0, med: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });

  const totalSavedNR = desires.reduce((sum, d) => sum + d.savedNR, 0);
  const totalGoalNR = desires.reduce((sum, d) => sum + d.costNR, 0);

  const handleLinkSubmit = async () => {
    if (linkPopup) {
      await handleAddDesire(goals.find(g => g.id === linkPopup.goalId)?.tasks.find(t => t.id === linkPopup.taskId)?.name);
    }
  };

  /* ==================== RENDER ==================== */
  const renderTabBar = () => (
    <div className="flex justify-center mb-6 w-full max-w-3xl mx-auto">
      <div className="flex w-full sm:w-auto rounded-xl overflow-hidden border border-gray-700">
        <button
          onClick={() => setActiveTab('dream')}
          className={`flex-1 sm:flex-initial px-4 py-3 text-sm sm:text-base font-medium transition-all ${
            activeTab === 'dream' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Dream Frame
        </button>
        <button
          onClick={() => setActiveTab('locker')}
          className={`flex-1 sm:flex-initial px-4 py-3 text-sm sm:text-base font-medium transition-all ${
            activeTab === 'locker' 
              ? 'bg-amber-600 text-black' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Soul Locker
        </button>
      </div>
    </div>
  );

  const renderFundingInfoPopup = () => {
    if (!showFundingInfo) return null;
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 sm:p-6 max-w-md w-full backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-amber-400">Funding Sources</h3>
            <button onClick={() => setShowFundingInfo(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            {FUNDING_TAGS.map(tag => (
              <div key={tag} className="flex items-start gap-2">
                <span className="font-medium text-amber-400">{tag}:</span>
                <span>{FUNDING_EXPLANATIONS[tag]}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowFundingInfo(false)}
            className="mt-6 w-full bg-slate-700 text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderDreamContent = () => {
    if (!planGenerated) {
      return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
          {renderTabBar()}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Which life would you be proud to die in?
              </h1>

              <textarea
                placeholder="One truth. (e.g., I built a tool that helps 1M people live better.)"
                value={vision}
                onChange={(e) => setVision(e.target.value.slice(0, MAX_VISION))}
                maxLength={MAX_VISION}
                className="mt-6 sm:mt-8 w-full p-3 sm:p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 resize-none text-base sm:text-lg font-medium italic overflow-hidden text-ellipsis whitespace-nowrap"
                rows={3}
                title={vision}
              />
              <p className="text-xs text-gray-400 text-right -mt-1">{vision.length}/{MAX_VISION}</p>

              <div className="mt-8 sm:mt-10">
                <h2 className="text-lg sm:text-xl font-semibold text-purple-300 mb-4">Break into 1–12 Goals</h2>
                <div className="flex flex-col sm:flex-row gap-2 mb-6">
                  <input
                    placeholder="e.g., Launch ROBUST app"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value.slice(0, MAX_GOAL_NAME))}
                    onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                    maxLength={MAX_GOAL_NAME}
                    className="flex-1 p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap"
                    title={newGoalName}
                  />
                  <button
                    onClick={addGoal}
                    disabled={!newGoalName.trim() || goals.length >= 12}
                    className="px-4 py-3 bg-purple-600 text-white rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg transition text-sm sm:text-base"
                  >
                    <Plus className="w-5 h-5" /> Add
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {goals
                    .filter(g => !g.done)
                    .map((goal) => {
                      const hasTask = goal.tasks.length > 0;
                      return (
                        <div key={goal.id} className="p-4 sm:p-5 bg-gray-700 rounded-xl border border-gray-600">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                            <h3 className="text-base sm:text-lg font-bold text-purple-300 overflow-hidden text-ellipsis whitespace-nowrap flex-1" title={goal.name}>
                              {goal.name}
                            </h3>
                            <button onClick={() => removeGoal(goal.id)} className="text-red-400 hover:text-red-300 transition">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              placeholder="Task: e.g., Build landing page"
                              value={taskInputs[goal.id] || ''}
                              onChange={(e) => setTaskInputs({ ...taskInputs, [goal.id]: e.target.value.slice(0, MAX_TASK_NAME) })}
                              onKeyDown={(e) => e.key === 'Enter' && addTask(goal.id)}
                              maxLength={MAX_TASK_NAME}
                              className="flex-1 p-2 bg-gray-800 border border-gray-500 rounded-lg text-gray-100 text-sm focus:ring-2 focus:ring-purple-500 overflow-hidden text-ellipsis whitespace-nowrap"
                              title={taskInputs[goal.id] || ''}
                            />
                            <button
                              onClick={() => addTask(goal.id)}
                              disabled={!taskInputs[goal.id]?.trim()}
                              className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm disabled:opacity-50 transition"
                            >
                              Add Task
                            </button>
                          </div>

                          {!hasTask && (
                            <p className="text-xs text-red-400 mt-2 italic">Add at least 1 task</p>
                          )}

                          {goal.tasks.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {goal.tasks
                                .filter(t => !isTaskDone(t))
                                .map(task => (
                                  <div key={task.id} className="text-sm text-gray-300 pl-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap" title={task.name}>
                                      {task.name}
                                    </div>

                                    <button
                                      onClick={() => setLinkPopup({ goalId: goal.id, taskId: task.id })}
                                      className={`
                                        flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                                        ${task.linkedDesireId 
                                          ? 'bg-amber-500 text-black shadow-sm' 
                                          : 'bg-gray-700 text-amber-400 hover:bg-amber-600 hover:text-black'
                                        }
                                      `}
                                      title={task.linkedDesireId ? 'Linked to Locker (click to edit)' : 'Link to Locker'}
                                    >
                                      <Shield className="w-5 h-5" />
                                      {task.linkedDesireId ? 'Linked' : 'Link'}
                                    </button>

                                    {task.subtasks.length > 0 && (
                                      <div className="ml-6 mt-1 space-y-1 w-full">
                                        {task.subtasks
                                          .filter(s => !s.done)
                                          .map(sub => (
                                            <div key={sub.id} className="flex items-center justify-between group">
                                              <span
                                                className="text-xs cursor-pointer text-gray-300 hover:text-white transition overflow-hidden text-ellipsis whitespace-nowrap flex-1"
                                                onClick={() => toggleSubtask(sub.id)}
                                                title={sub.name}
                                              >
                                                {sub.name}
                                              </span>
                                              <button
                                                onClick={() => removeSubtask(sub.id)}
                                                className="opacity-0 group-hover:opacity-100 transition ml-2"
                                              >
                                                <Trash2 className="w-3 h-3 text-red-400" />
                                              </button>
                                            </div>
                                          ))}
                                      </div>
                                    )}

                                    <button
                                      onClick={() => {
                                        setGoals(prev =>
                                          prev.map(g =>
                                            g.id === goal.id
                                              ? {
                                                  ...g,
                                                  tasks: g.tasks.map(t =>
                                                    t.id === task.id ? { ...t, showInput: !t.showInput } : t
                                                  ),
                                                }
                                              : g
                                          )
                                        );
                                      }}
                                      className="text-xs text-purple-400 underline hover:text-purple-300 mt-1"
                                    >
                                      + Add subtask
                                    </button>
                                    {task.showInput && (
                                      <input
                                        type="text"
                                        placeholder="New subtask..."
                                        value={subtaskInputs[`${goal.id}-${task.id}`] || ''}
                                        onChange={(e) => setSubtaskInputs({ ...subtaskInputs, [`${goal.id}-${task.id}`]: e.target.value.slice(0, MAX_SUBTASK_NAME) })}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') addSubtask(task.id);
                                        }}
                                        maxLength={MAX_SUBTASK_NAME}
                                        className="w-full px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-gray-100 mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                                        autoFocus
                                        title={subtaskInputs[`${goal.id}-${task.id}`] || ''}
                                      />
                                    )}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {goals.some(g => g.done) && (
                    <div className="mt-6 p-4 bg-green-900/30 border border-green-500 rounded-xl text-center">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-green-400 mb-2" />
                      <p className="text-green-300 font-medium text-sm sm:text-base">
                        {goals.filter(g => g.done).length} goal{goals.filter(g => g.done).length > 1 ? 's' : ''} completed
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={generatePlan}
                disabled={
                  !vision.trim() || 
                  goals.length < 1 || 
                  goals.length > 12 || 
                  goals.some(g => g.tasks.length === 0)
                }
                className="mt-8 sm:mt-10 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg sm:text-xl font-bold flex items-center justify-center gap-3 hover:shadow-xl disabled:opacity-50 transition"
              >
                <Sparkles className="w-6 h-6" />
                Generate My Life Frame
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Plan generated view
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        {renderTabBar()}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Life Frame
              </h1>
              <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-200 italic break-words px-2">
                "{vision}"
              </p>
            </div>

            {allDone ? (
              <div className="text-center py-16 sm:py-20">
                <CheckCircle2 className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-green-400 mb-4 sm:mb-6" />
                <h2 className="text-3xl sm:text-5xl font-bold text-green-400 mb-3 sm:mb-4">Congratulations!</h2>
                <p className="text-base sm:text-xl text-gray-300">You’ve built the life you’d be proud to die in.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {sortedGoals.map((goal) => {
                  const doneTasks = goal.tasks.filter(t => isTaskDone(t)).length;
                  const totalTasks = goal.tasks.length;
                  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

                  return (
                    <div
                      key={goal.id}
                      className={`
                        p-4 sm:p-6 rounded-xl border shadow-lg min-h-[120px] flex flex-col space-y-3 transition-all
                        ${goal.done 
                          ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500' 
                          : 'bg-gray-700/80 backdrop-blur-sm border-gray-600 hover:border-purple-500/50'
                        }
                        hover:shadow-xl
                      `}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-purple-300 overflow-hidden text-ellipsis whitespace-nowrap flex-1" title={goal.name}>
                          {goal.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm flex-shrink-0">
                          <span className="font-bold text-green-400">{pct}%</span>
                          <span className="text-gray-400">{doneTasks}/{totalTasks}</span>
                        </div>
                      </div>

                      {goal.done ? (
                        <div className="text-center py-6 sm:py-8">
                          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-green-400 mb-2" />
                          <p className="text-green-400 font-bold text-lg sm:text-xl">Goal Complete!</p>
                        </div>
                      ) : (
                        <div className="space-y-3 flex-1">
                          {goal.tasks.map(task => {
                            const subDone = task.subtasks.filter(s => s.done).length;
                            const subTotal = task.subtasks.length;

                            return (
                              <div
                                key={task.id}
                                className={`p-3 bg-gray-900 rounded-lg ${isTaskDone(task) ? 'opacity-50 line-through' : ''}`}
                              >
                                <div 
                                  className="font-medium text-sm md:text-base text-gray-100 cursor-pointer hover:text-white transition overflow-hidden text-ellipsis whitespace-nowrap flex flex-col sm:flex-row items-start sm:items-center gap-2"
                                  onClick={() => toggleTask(task.id)}
                                  title={task.name}
                                >
                                  <span className="flex-1">{task.name}</span>
                                  {subTotal > 0 && (
                                    <span className="text-xs text-gray-400">
                                      ({subDone}/{subTotal})
                                    </span>
                                  )}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setLinkPopup({ goalId: goal.id, taskId: task.id }); }}
                                    className={`
                                      flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                                      ${task.linkedDesireId 
                                        ? 'bg-amber-500 text-black shadow-sm' 
                                        : 'bg-gray-700 text-amber-400 hover:bg-amber-600 hover:text-black'
                                      }
                                    `}
                                  >
                                    <Shield className="w-5 h-5" />
                                    {task.linkedDesireId ? 'Linked' : 'Link'}
                                  </button>
                                </div>

                                <div className="ml-0 sm:ml-4 mt-2 space-y-1.5">
                                  {task.subtasks.map(sub => (
                                    <div key={sub.id} className="flex items-center justify-between group">
                                      <span
                                        className={`text-xs sm:text-sm cursor-pointer text-gray-300 hover:text-white transition ${sub.done ? 'line-through opacity-50' : ''} overflow-hidden text-ellipsis whitespace-nowrap flex-1`}
                                        onClick={() => toggleSubtask(sub.id)}
                                        title={sub.name}
                                      >
                                        {sub.name}
                                      </span>
                                      <button
                                        onClick={() => removeSubtask(sub.id)}
                                        className="opacity-0 group-hover:opacity-100 transition ml-2"
                                      >
                                        <Trash2 className="w-3 h-3 text-red-400" />
                                      </button>
                                    </div>
                                  ))}

                                  <button
                                    onClick={() => {
                                      setGoals(prev =>
                                        prev.map(g =>
                                          g.id === goal.id
                                            ? {
                                                ...g,
                                                tasks: g.tasks.map(t =>
                                                  t.id === task.id ? { ...t, showInput: !t.showInput } : t
                                                ),
                                              }
                                            : g
                                        )
                                      );
                                    }}
                                    className="text-xs sm:text-sm text-purple-400 underline hover:text-purple-300 mt-1"
                                  >
                                    + Add subtask
                                  </button>
                                  {task.showInput && (
                                    <input
                                      type="text"
                                      placeholder="New subtask..."
                                      value={subtaskInputs[`${goal.id}-${task.id}`] || ''}
                                      onChange={(e) => setSubtaskInputs({ ...subtaskInputs, [`${goal.id}-${task.id}`]: e.target.value.slice(0, MAX_SUBTASK_NAME) })}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') addSubtask(task.id);
                                      }}
                                      maxLength={MAX_SUBTASK_NAME}
                                      className="w-full px-2 py-1 text-xs sm:text-sm bg-gray-800 border border-gray-600 rounded text-gray-100 mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                                      autoFocus
                                      title={subtaskInputs[`${goal.id}-${task.id}`] || ''}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-center mt-8 sm:mt-10">
              <button
                onClick={() => setPlanGenerated(false)}
                className="px-5 py-3 border border-gray-600 rounded-xl flex items-center gap-2 hover:bg-gray-700 text-gray-300 transition text-sm sm:text-base"
              >
                <Edit3 className="w-5 h-5" /> Edit
              </button>
            </div>
          </div>

          {toast && (
            <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md bg-gray-800 text-white px-4 py-3 rounded-full shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 animate-pulse z-50 text-sm">
              <span>{toast.message}</span>
              <button onClick={() => { toast.undo(); setToast(null); }} className="underline flex items-center gap-1">
                <Undo2 className="w-4 h-4" /> Undo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLockerContent = () => (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      {renderTabBar()}
      <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-amber-400 mb-2">
            Soul Fuel Locker
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Lock desires. Fund aliveness.</p>
        </div>

        <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Desire"
              className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap"
              title={itemName}
            />
            <input
              type="number"
              value={itemUSD}
              onChange={(e) => setItemUSD(e.target.value)}
              placeholder="$ Cost"
              className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm"
            />
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value as any)}
              className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm"
            >
              <option value="survival">Survival</option>
              <option value="material">Material</option>
              <option value="skill">Skill</option>
              <option value="epic">Epic</option>
              <option value="system">System</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm"
            >
              <option value="high">HIGH</option>
              <option value="med">MEDIUM</option>
              <option value="low">LOW</option>
            </select>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm text-gray-400">Funding Sources (max 3)</span>
              <button
                onClick={() => setShowFundingInfo(true)}
                className="text-gray-500 hover:text-amber-400 transition-colors"
              >
                <Info size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {FUNDING_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleFunding(tag)}
                  disabled={selectedFunding.length >= 3 && !selectedFunding.includes(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-all font-medium whitespace-nowrap ${
                    selectedFunding.includes(tag)
                      ? 'bg-amber-500 text-black'
                      : selectedFunding.length >= 3
                      ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-slate-700/80 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {selectedFunding.length > 0 && (
              <p className="text-xs text-gray-500 mt-2 italic">
                Funded by: {selectedFunding.join(', ')}
              </p>
            )}
          </div>

          <button
            onClick={() => handleAddDesire()}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
          >
            <Plus size={20} />
            <span>Add to Locker</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedDesires.length === 0 ? (
            <div className="col-span-full text-center py-12 sm:py-16 text-gray-400">
              <Package className="mx-auto mb-4" size={48} />
              <p className="text-sm sm:text-base">Your vault awaits its first desire.</p>
            </div>
          ) : (
            sortedDesires.map((desire) => {
              const config = TYPE_CONFIG[desire.type];
              const pConfig = PRIORITY_CONFIG[desire.priority];
              const Icon = config.icon;
              const progress = desire.costUSD > 0 ? (desire.savedUSD / desire.costUSD) * 100 : 0;
              const isReady = progress >= 100;

              return (
                <div
                  key={desire.id}
                  className={`relative rounded-2xl p-4 sm:p-6 bg-slate-900/70 border border-slate-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col backdrop-blur-sm ${pConfig.border}`}
                >
                  <button
                    onClick={() => setDeleteConfirm(desire.id)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-red-400 hover:text-red-300 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-1 flex-wrap justify-center">
                    {desire.funding.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-amber-500 text-black font-bold shadow-md whitespace-nowrap sm:max-w-none max-w-[60px] overflow-hidden text-ellipsis"
                        title={tag}
                      >
                        <span className="block truncate sm:truncate-none">{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 mb-3 mt-6">
                    <Icon className={`text-${config.color}`} size={18} />
                    <h3 className="text-sm sm:text-base font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap flex-1" title={desire.name}>
                      {desire.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={pConfig.badge}>
                      {pConfig.label}
                    </span>
                    <span className="text-xs text-gray-400">{config.label}</span>
                  </div>

                  <div className="mb-3">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {desire.costNR.toLocaleString()} NR
                    </div>
                    <div className="text-xs text-gray-500">
                      ${desire.costUSD.toLocaleString()}
                    </div>
                  </div>

                  <input
                    type="number"
                    value={desire.savedUSD}
                    onChange={(e) => handleUpdateSaved(desire.id, parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500"
                    placeholder="Saved USD"
                  />

                  <div className="flex justify-center mt-4">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="50%" cy="50%" r="45%" stroke="#1e293b" strokeWidth="10" fill="none" />
                        <circle
                          cx="50%" cy="50%" r="45%"
                          stroke="url(#progress-gradient)"
                          strokeWidth="10" fill="none"
                          strokeDasharray="283" strokeDashoffset={283 * (1 - progress / 100)}
                          className="transition-all duration-700 ease-out"
                        />
                        <defs>
                          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#f97316" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-amber-400">{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>

                  {isReady && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-green-400 font-bold text-xs flex items-center gap-1">
                      <Archive size={12} />
                      UNLOCKED
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {deleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 sm:p-6 max-w-sm w-full backdrop-blur-sm">
              <div className="flex items-center gap-2 text-red-400 mb-3">
                <AlertCircle size={20} />
                <p className="font-medium text-sm sm:text-base">Delete Desire?</p>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-5">
                "{desires.find(d => d.id === deleteConfirm)?.name}" will be gone forever.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleDeleteDesire(deleteConfirm)}
                  className="flex-1 bg-red-500/20 text-red-300 border border-red-500/40 py-2 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-slate-700 text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {desires.length > 0 && (
          <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-5 sm:p-6 text-center max-w-2xl mx-auto backdrop-blur-sm">
            <p className="text-amber-300 text-xs sm:text-sm mb-1">Total Progress</p>
            <p className="text-2xl sm:text-3xl font-bold text-amber-400">
              {totalSavedNR.toLocaleString()} / {totalGoalNR.toLocaleString()} NR
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {totalGoalNR > 0 ? ((totalSavedNR / totalGoalNR) * 100).toFixed(1) : 0}% of all desires
            </p>
          </div>
        )}
      </div>

      {renderFundingInfoPopup()}
    </div>
  );

  const renderLinkPopup = () => {
    if (!linkPopup) return null;
    const taskName = goals.find(g => g.id === linkPopup.goalId)?.tasks.find(t => t.id === linkPopup.taskId)?.name || '';

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 sm:p-6 max-w-md w-full backdrop-blur-sm my-4">
          <h3 className="text-lg font-bold text-amber-400 mb-4">Link Task to New Desire</h3>
          <p className="text-sm text-gray-300 mb-4 overflow-hidden text-ellipsis whitespace-nowrap" title={taskName}>
            Create a desire for "{taskName}" and link it.
          </p>
          <div className="space-y-3">
            <input
              type="number"
              value={itemUSD}
              onChange={(e) => setItemUSD(e.target.value)}
              placeholder="$ Cost"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm"
            />
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value as any)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm"
            >
              <option value="survival">Survival</option>
              <option value="material">Material</option>
              <option value="skill">Skill</option>
              <option value="epic">Epic</option>
              <option value="system">System</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm"
            >
              <option value="high">HIGH</option>
              <option value="med">MEDIUM</option>
              <option value="low">LOW</option>
            </select>
            <div>
              <span className="text-xs sm:text-sm text-gray-400 mb-2 block">Funding (max 3)</span>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {FUNDING_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleFunding(tag)}
                    disabled={selectedFunding.length >= 3 && !selectedFunding.includes(tag)}
                    className={`px-2 py-0.5 text-xs rounded-full transition-all font-medium whitespace-nowrap min-w-0 ${
                      selectedFunding.includes(tag) ? 'bg-amber-500 text-black' : 'bg-slate-700/80 text-gray-300 hover:bg-slate-600'
                    }`}
                    style={{ maxWidth: '80px' }}
                  >
                    <span className="truncate block">{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <button
              onClick={handleLinkSubmit}
              className="flex-1 bg-amber-500 text-black py-2.5 rounded-lg font-medium hover:bg-amber-600 text-sm"
            >
              Add & Link
            </button>
            <button
              onClick={() => setLinkPopup(null)}
              className="flex-1 bg-slate-700 text-gray-300 py-2.5 rounded-lg font-medium hover:bg-slate-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeTab === 'dream' ? renderDreamContent() : renderLockerContent()}
      {renderLinkPopup()}
      {toast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md bg-gray-800 text-white px-4 py-3 rounded-full shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 animate-pulse z-50 text-sm">
          <span>{toast.message}</span>
          <button onClick={() => { toast.undo(); setToast(null); }} className="underline flex items-center gap-1">
            <Undo2 className="w-4 h-4" /> Undo
          </button>
        </div>
      )}
    </>
  );
}