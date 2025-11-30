'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Shield, 
  Package, 
  Brain, 
  Star, 
  Settings2, 
  Link2,
  CheckCircle2,
  Crown,
  RotateCcw,
  Target
} from 'lucide-react';
import { useLifeFrame } from '@/context/LifeFrameContext';
import { GLOBAL_KWH_RATE } from '@/context/NRContext';

const TYPE_CONFIG = {
  survival: { color: 'text-red-400', icon: Shield, label: 'Survival' },
  material: { color: 'text-amber-400', icon: Package, label: 'Material' },
  skill: { color: 'text-yellow-300', icon: Brain, label: 'Skill' },
  epic: { color: 'text-emerald-400', icon: Star, label: 'Epic' },
  system: { color: 'text-blue-400', icon: Settings2, label: 'System' },
} as const;

type DesireType = keyof typeof TYPE_CONFIG;
type PriorityType = 'high' | 'med' | 'low';

const PRIORITY_BORDER = {
  high: 'border-l-8 border-amber-800',
  med: 'border-l-8 border-emerald-700',
  low: 'border-l-8 border-gray-600',
};

const FUNDING_TAGS = ['PORTFOLIO', 'JOB', 'HUSTLE', 'YIELD', 'CHARITY', 'OTHER'];

export default function Dream() {
  const {
    frame, goals = [], desires = [],
    updateVision, addGoal, deleteGoal,
    addTask, deleteTask, toggleTask,
    addSubtask, deleteSubtask, toggleSubtask,
    addDesire, updateDesireSaved, deleteDesire,
    linkDesireToTask,
  } = useLifeFrame() || {};

  const [newGoalName, setNewGoalName] = useState('');
  const [taskInput, setTaskInput] = useState<Record<string, string>>({});
  const [subtaskInput, setSubtaskInput] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [visionInput, setVisionInput] = useState(frame?.vision || '');

  const [itemName, setItemName] = useState('');
  const [itemUSD, setItemUSD] = useState('');
  const [itemType, setItemType] = useState<DesireType>('material');
  const [priority, setPriority] = useState<PriorityType>('med');
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);

  const [linkPopup, setLinkPopup] = useState<{ taskId: string; goalId: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'dream' | 'locker'>('dream');
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'goal' | 'desire'; id: string | number } | null>(null);

  useEffect(() => {
    setVisionInput(frame?.vision || '');
  }, [frame?.vision]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visionInput !== frame?.vision) {
        updateVision?.(visionInput);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [visionInput]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddGoal = async () => {
    if (!newGoalName.trim() || goals.length >= 12) return;
    await addGoal?.(newGoalName.trim());
    setNewGoalName('');
    showToast('Goal forged in fire');
  };

  const handleDeleteGoal = async (id: string) => {
    await deleteGoal?.(id);
    setDeleteConfirm(null);
    showToast('Goal released');
  };

  const handleDeleteDesire = async (id: number) => {
    await deleteDesire?.(id);
    setDeleteConfirm(null);
    showToast('Desire removed');
  };

  const handleAddDesire = async (fromPopup = false) => {
    if (!itemName.trim() || !itemUSD || Number(itemUSD) <= 0) return;

    const newDesire = await addDesire?.({
      name: itemName.trim(),
      cost_usd: Number(itemUSD),
      type: itemType,
      priority,
      funding: selectedFunding.slice(0, 3),
    });

    if (linkPopup && newDesire) {
      await linkDesireToTask?.(linkPopup.taskId, newDesire.id);
      setLinkPopup(null);
      showToast('Task linked');
    }

    if (!fromPopup) {
      setItemName('');
      setItemUSD('');
      setSelectedFunding([]);
      setItemType('material');
      setPriority('med');
    }
    showToast('Desire locked');
  };

  const handleToggleSubtask = async (subtaskId: string, taskId: string) => {
    await toggleSubtask?.(subtaskId);
    const goal = goals.find(g => g.tasks?.some((t: any) => t.id === taskId));
    const task = goal?.tasks?.find((t: any) => t.id === taskId);
    if (!task || !task.subtasks) return;
    const allDone = task.subtasks.every((s: any) => s.done);
    if (allDone !== task.done) {
      await toggleTask?.(taskId);
    }
  };

  const reopenGoal = async (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || !goal.tasks || goal.tasks.length === 0) return;

    const taskToReopen = goal.tasks.find(t => t.done || (t.subtasks && t.subtasks.some(s => s.done)));
    if (!taskToReopen) return;

    if (taskToReopen.subtasks && taskToReopen.subtasks.length > 0) {
      const lastDoneSubtask = [...taskToReopen.subtasks].reverse().find(s => s.done);
      if (lastDoneSubtask) {
        await toggleSubtask?.(lastDoneSubtask.id);
      }
    } else {
      if (taskToReopen.done) {
        await toggleTask?.(taskToReopen.id);
      }
    }

    showToast('Goal reopened — continue the legend');
  };

  const reopenDesire = async (desireId: number) => {
    await updateDesireSaved?.(desireId, 0);
    showToast('Desire reopened');
  };

  const isGoalComplete = (goal: any) => {
    if (!goal.tasks || goal.tasks.length === 0) return false;
    return goal.tasks.every((task: any) => {
      if (task.subtasks && task.subtasks.length > 0) {
        return task.subtasks.every((s: any) => s.done);
      }
      return task.done;
    });
  };

  const activeGoals = goals.filter(g => !isGoalComplete(g));
  const completedGoals = goals.filter(isGoalComplete);

  const activeDesires = desires.filter(d => (d.saved_usd || 0) < d.cost_usd);
  const completedDesires = desires.filter(d => (d.saved_usd || 0) >= d.cost_usd);

  const priorityOrder = {
    high: 1,
    med: 2,
    low: 3,
  };

  const sortedActiveDesires = [...activeDesires].sort((a, b) => priorityOrder[a.priority as PriorityType] - priorityOrder[b.priority as PriorityType]);
  const sortedCompletedDesires = [...completedDesires].sort((a, b) => priorityOrder[a.priority as PriorityType] - priorityOrder[b.priority as PriorityType]);

  return (
    <>
      {/* TABS */}
      <div className="flex justify-center my-6">
        <div className="flex rounded-lg overflow-hidden border border-gray-800 bg-gray-900/80 backdrop-blur">
          <button onClick={() => setActiveTab('dream')} className={`px-6 py-2 font-bold text-lg ${activeTab === 'dream' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
            Dream Frame
          </button>
          <button onClick={() => setActiveTab('locker')} className={`px-6 py-2 font-bold text-lg ${activeTab === 'locker' ? 'bg-amber-600 text-black' : 'text-gray-400'}`}>
            Desire Locker
          </button>
        </div>
      </div>

      {/* DREAM FRAME */}
      {activeTab === 'dream' && (
        <div className="p-4 max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              What life would you be proud to die in?
            </h1>
            <textarea
              value={visionInput}
              onChange={(e) => setVisionInput(e.target.value)}
              placeholder="One truth that burns in your soul..."
              className="w-full p-4 bg-gray-900/60 border-2 border-purple-600/50 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 resize-y text-lg font-medium leading-relaxed shadow-lg"
              rows={4}
              maxLength={2000}
            />
          </div>

          {/* ACTIVE GOALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGoals.map(goal => {
              const totalTasks = goal.tasks?.length || 0;
              const doneTasks = goal.tasks?.filter((t: any) => 
                t.subtasks?.length > 0 ? t.subtasks.every((s: any) => s.done) : t.done
              ).length || 0;
              const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

              return (
                <div key={goal.id} className="bg-gradient-to-br from-gray-900/90 to-black border-2 border-gray-800 rounded-2xl p-6 shadow-2xl relative group hover:border-amber-600/50 transition-all">
                  <button onClick={() => setDeleteConfirm({ type: 'goal', id: goal.id })} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition z-10">
                    <Trash2 size={20} />
                  </button>

                  <h2 className="text-2xl font-black text-white mb-6 pr-8 truncate" title={goal.name}>
                    {goal.name}
                  </h2>

                  <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                  </div>

                  <div className="space-y-4">
                    {goal.tasks?.map((task: any) => (
                      <div key={task.id} className="group/task relative">
                        <div className="flex items-center justify-between bg-gray-800/50 rounded-xl px-4 py-3 hover:bg-gray-800/80 transition">
                          <div 
                            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                            onClick={() => toggleTask?.(task.id)}
                          >
                            <span className={`text-lg truncate ${task.done ? 'line-through text-gray-500' : 'text-gray-200'}`} title={task.name}>
                              {task.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover/task:opacity-100 transition">
                            {!task.linked_desire_id && (
                              <button onClick={(e) => { e.stopPropagation(); setLinkPopup({ taskId: task.id, goalId: goal.id }); }} className="text-blue-400 hover:text-blue-300">
                                <Link2 size={18} />
                              </button>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); deleteTask?.(task.id); }} className="text-red-400 hover:text-red-300">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* SUBTASKS */}
                        {task.subtasks?.length > 0 && (
                          <div className="ml-9 mt-2 space-y-2">
                            {task.subtasks.map((sub: any) => (
                              <div key={sub.id} className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-3 py-2 overflow-hidden">
                                <div 
                                  className="cursor-pointer flex-1 min-w-0 overflow-hidden"
                                  onClick={() => handleToggleSubtask(sub.id, task.id)}
                                >
                                  <span className={`text-base truncate block ${sub.done ? 'line-through text-gray-600' : 'text-gray-400'}`} title={sub.name}>
                                    {sub.name}
                                  </span>
                                </div>
                                <button onClick={() => deleteSubtask?.(sub.id)} className="ml-auto text-red-400 opacity-0 hover:opacity-100 transition">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ADD SUBTASK */}
                        <div className="ml-9 mt-2">
                          <input
                            placeholder="+ subtask"
                            value={subtaskInput[task.id] || ''}
                            onChange={e => setSubtaskInput({ ...subtaskInput, [task.id]: e.target.value })}
                            onKeyDown={async (e) => {
                              if (e.key === 'Enter' && subtaskInput[task.id]?.trim()) {
                                await addSubtask?.(task.id, subtaskInput[task.id].trim());
                                setSubtaskInput({ ...subtaskInput, [task.id]: '' });
                              }
                            }}
                            className="w-full px-3 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-400 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                            maxLength={100}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ADD TASK */}
                  <div className="mt-6">
                    <input
                      placeholder="+ Add task"
                      value={taskInput[goal.id] || ''}
                      onChange={e => setTaskInput({ ...taskInput, [goal.id]: e.target.value })}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && taskInput[goal.id]?.trim()) {
                          await addTask?.(goal.id, taskInput[goal.id].trim());
                          setTaskInput({ ...taskInput, [goal.id]: '' });
                        }
                      }}
                      className="w-full px-4 py-3 bg-gray-800/50 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>
              );
            })}

            {/* ADD GOAL */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black border-2 border-dashed border-gray-800 rounded-2xl p-6 shadow-2xl hover:border-amber-600/50 transition-all cursor-pointer" onClick={handleAddGoal}>
              <input
                placeholder="+ Goal"
                value={newGoalName}
                onChange={e => setNewGoalName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddGoal()}
                className="w-full bg-transparent text-2xl font-black text-gray-400 placeholder-gray-500 focus:outline-none"
                maxLength={50}
              />
            </div>
          </div>

          {/* COMPLETED GOALS */}
          {completedGoals.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-black text-emerald-400 mb-8 text-center flex items-center justify-center gap-4">
                <CheckCircle2 size={36} /> Completed Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedGoals.map(goal => (
                  <div key={goal.id} className="bg-gradient-to-br from-emerald-900/50 via-black to-emerald-900/50 border-2 border-emerald-600/70 rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all relative group">
                    <button onClick={() => setDeleteConfirm({ type: 'goal', id: goal.id })} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition z-10">
                      <Trash2 size={20} />
                    </button>

                    <h2 className="text-2xl font-black text-emerald-300 mb-6 pr-8 truncate" title={goal.name}>
                      {goal.name}
                    </h2>

                    <div className="w-full bg-emerald-800/50 rounded-full h-3 mb-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full" style={{ width: '100%' }} />
                    </div>

                    <button 
                      onClick={() => reopenGoal(goal.id)}
                      className="absolute bottom-6 right-6 bg-emerald-600/30 rounded-full p-3 hover:bg-emerald-600/50 transition group/reopen"
                    >
                      <RotateCcw size={24} className="text-emerald-300 group-hover/reopen:rotate-180 transition-transform duration-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Desire LOCKER */}
      {activeTab === 'locker' && (
        <div className="p-4 max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-8">
              What do you want to unlock?
            </h1>
          </div>

          {/* ADD DESIRE */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black border-2 border-amber-600/50 rounded-2xl p-8 shadow-2xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input placeholder="Desire name" value={itemName} onChange={e => setItemName(e.target.value)} className="px-6 py-4 bg-gray-900/70 border border-amber-600/50 rounded-xl text-xl text-white" maxLength={50} />
              <input type="number" placeholder="$ Cost" value={itemUSD} onChange={e => setItemUSD(e.target.value)} className="px-6 py-4 bg-gray-900/70 border border-amber-600/50 rounded-xl text-xl text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <select value={itemType} onChange={e => setItemType(e.target.value as DesireType)} 
                className="px-6 py-4 bg-gray-900/70 border border-amber-600/50 rounded-xl text-xl text-white"
              >
                {Object.entries(TYPE_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value as PriorityType)} 
                className="px-6 py-4 bg-gray-900/70 border border-amber-600/50 rounded-xl text-xl text-white"
              >
                <option value="high">HIGH</option>
                <option value="med">MEDIUM</option>
                <option value="low">LOW</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
              {FUNDING_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedFunding(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag) 
                      : prev.length < 3 ? [...prev, tag] : prev
                  )}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                    selectedFunding.includes(tag) 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg scale-110' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => handleAddDesire()} 
                className="px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-2xl rounded-full hover:scale-105 transition shadow-2xl"
              >
                LOCK THIS DESIRE
              </button>
            </div>
          </div>

          {/* ACTIVE DESIRES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedActiveDesires.map(desire => {
              const config = TYPE_CONFIG[desire.type as DesireType] || TYPE_CONFIG.material;
              const Icon = config.icon;
              const saved = desire.saved_usd || 0;
              const cost = desire.cost_usd || 1;
              const progress = Math.min((saved / cost) * 100, 100);

              return (
                <div key={desire.id} className="relative group">
                  <div className={`bg-gradient-to-br from-gray-900 to-black border-4 border-gray-800 rounded-2xl p-6 shadow-2xl overflow-hidden ${PRIORITY_BORDER[desire.priority as PriorityType] || ''} flex flex-col h-full`}>
                    <button onClick={() => setDeleteConfirm({ type: 'desire', id: desire.id })} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition z-10">
                      <Trash2 size={24} />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <Icon className={`${config.color} drop-shadow-lg`} size={36} />
                      <h3 className="text-2xl font-black text-white truncate flex-1" title={desire.name}>
                        {desire.name}
                      </h3>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-4xl font-black text-amber-400">
                        {Math.ceil(cost / GLOBAL_KWH_RATE).toLocaleString()} NR
                      </div>
                      <div className="text-lg text-gray-400 mt-2">
                        <span className="text-amber-300">${saved.toLocaleString()}</span> / ${cost.toLocaleString()}
                      </div>
                    </div>

                    <input
                      type="number"
                      value={saved}
                      onChange={e => updateDesireSaved?.(desire.id, Math.min(Number(e.target.value) || 0, cost))}
                      className="w-full px-6 py-4 bg-gray-800/70 rounded-xl text-3xl font-bold text-center text-white mb-6 focus:outline-none focus:ring-4 focus:ring-amber-500"
                      min="0"
                      max={cost}
                    />

                    <div className="flex flex-wrap gap-3 justify-center items-center mb-6 min-h-[60px]">
                      {(desire.funding || []).map((tag: string) => (
                        <span key={tag} className="px-5 py-2 bg-amber-600 text-black font-bold rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="relative w-32 h-32 mx-auto mt-auto">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="14" fill="none" />
                        <circle
                          cx="64" cy="64" r="56"
                          stroke="#f59e0b"
                          strokeWidth="14"
                          fill="none"
                          strokeDasharray="352"
                          strokeDashoffset={352 * (1 - progress / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000 drop-shadow-lg"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black text-amber-400 drop-shadow-2xl">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* COMPLETED DESIRES */}
          {completedDesires.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-black text-emerald-400 mb-8 text-center flex items-center justify-center gap-4">
                <Crown size={36} /> Unlocked Desires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCompletedDesires.map(desire => {
                  const config = TYPE_CONFIG[desire.type as DesireType] || TYPE_CONFIG.material;
                  const Icon = config.icon;

                  return (
                    <div key={desire.id} className="relative group">
                      <div className="bg-gradient-to-br from-emerald-900/50 via-black to-emerald-900/50 border-4 border-emerald-600/70 rounded-2xl p-8 text-center shadow-2xl hover:scale-105 transition-transform flex flex-col h-full">
                        <button onClick={() => setDeleteConfirm({ type: 'desire', id: desire.id })} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition">
                          <Trash2 size={24} />
                        </button>
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <Icon className={`${config.color} drop-shadow-lg`} size={36} />
                          <h3 className="text-2xl font-black text-emerald-300 truncate" title={desire.name}>
                            {desire.name}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center items-center mb-6 min-h-[60px]">
                          {(desire.funding || []).map((tag: string) => (
                            <span key={tag} className="px-5 py-2 bg-amber-600 text-black font-bold rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => reopenDesire(desire.id)}
                          className="mx-auto w-20 h-20 bg-emerald-600/30 rounded-full flex items-center justify-center hover:bg-emerald-600/50 transition group/reopen mt-auto"
                        >
                          <RotateCcw size={36} className="text-emerald-300 group-hover/reopen:rotate-180 transition-transform duration-700" />
                        </button>
                        <p className="mt-4 text-emerald-400 font-bold text-lg">REOPEN</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-4">
              <Trash2 size={48} className="text-red-400" />
            </div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-center mb-4">
              Confirm Deletion?
            </h3>
            <p className="text-gray-400 text-center text-lg mb-8">
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => deleteConfirm.type === 'goal' ? handleDeleteGoal(deleteConfirm.id as string) : handleDeleteDesire(deleteConfirm.id as number)}
                className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl rounded-xl hover:opacity-90 transition shadow-md"
              >
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold text-xl rounded-xl hover:opacity-90 transition shadow-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LINK POPUP */}
      {linkPopup && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-amber-900/50 to-black border-4 border-amber-600 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-3xl font-black text-amber-400 text-center mb-6">Link to New Desire</h3>
            <div className="space-y-4">
              <input placeholder="Desire name" value={itemName} onChange={e => setItemName(e.target.value)} className="w-full px-4 py-3 bg-gray-900/70 rounded-xl text-xl" maxLength={50} />
              <input type="number" placeholder="$ Cost" value={itemUSD} onChange={e => setItemUSD(e.target.value)} className="w-full px-4 py-3 bg-gray-900/70 rounded-xl text-xl" />
              <div className="grid grid-cols-2 gap-4">
                <select value={itemType} onChange={e => setItemType(e.target.value as DesireType)} className="px-4 py-3 bg-gray-900/70 rounded-xl text-lg">
                  {Object.entries(TYPE_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <select value={priority} onChange={e => setPriority(e.target.value as PriorityType)} className="px-4 py-3 bg-gray-900/70 rounded-xl text-lg">
                  <option value="high">HIGH</option>
                  <option value="med">MEDIUM</option>
                  <option value="low">LOW</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {FUNDING_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedFunding(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag) 
                        : prev.length < 3 ? [...prev, tag] : prev
                    )}
                    className={`px-5 py-2 rounded-full font-bold text-lg ${selectedFunding.includes(tag) ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => handleAddDesire(true)} className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black text-2xl font-bold rounded-xl hover:scale-105 transition">
                CREATE & LINK
              </button>
              <button onClick={() => setLinkPopup(null)} className="px-8 py-4 bg-gray-800 text-xl rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-12 py-6 rounded-full shadow-2xl z-50 text-2xl font-black animate-pulse border-4 border-white/30">
          {toast}
        </div>
      )}
    </>
  );
}