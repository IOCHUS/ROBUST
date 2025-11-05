import { useState, useEffect } from 'react';
import { Download, Sparkles, Edit3, Plus, Trash2, Undo2, CheckCircle2 } from 'lucide-react';

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
}

interface Goal {
  id: string;
  name: string;
  tasks: Task[];
  done: boolean;
}

const MAX_GOAL_NAME = 60;
const MAX_TASK_NAME = 60;
const MAX_SUBTASK_NAME = 80;
const MAX_VISION = 280;

export default function Dream() {
  const [vision, setVision] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [planGenerated, setPlanGenerated] = useState(false);
  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ message: string; undo: () => void } | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dreamFrame');
    if (saved) {
      const data = JSON.parse(saved);
      setVision(data.vision?.slice(0, MAX_VISION) || '');
      setGoals(data.goals || []);
      setPlanGenerated(data.planGenerated || false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('dreamFrame', JSON.stringify({ vision, goals, planGenerated }));
  }, [vision, goals, planGenerated]);

  const showUndo = (message: string, undoFn: () => void) => {
    setToast({ message, undo: undoFn });
    setTimeout(() => setToast(null), 4000);
  };

  const truncate = (str: string, max: number) => str.length > max ? str.slice(0, max - 3) + '...' : str;

  const addGoal = () => {
    const trimmed = newGoalName.trim();
    if (trimmed && trimmed.length <= MAX_GOAL_NAME && goals.length < 12) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: trimmed,
        tasks: [],
        done: false,
      };
      const old = [...goals];
      setGoals([...old, newGoal]);
      setNewGoalName('');
      showUndo("Goal added", () => setGoals(old));
    }
  };

  const removeGoal = (goalId: string) => {
    const old = [...goals];
    setGoals(goals.filter(g => g.id !== goalId));
    showUndo("Goal deleted", () => setGoals(old));
  };

  const addTask = (goalId: string) => {
    const input = taskInputs[goalId]?.trim();
    if (input && input.length <= MAX_TASK_NAME) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: input,
        subtasks: [],
        done: false,
        showInput: false,
      };

      const oldGoals = [...goals];
      setGoals(prev =>
        prev.map(g =>
          g.id === goalId
            ? { ...g, tasks: [...g.tasks, newTask] }
            : g
        )
      );

      setTaskInputs(prev => {
        const next = { ...prev };
        delete next[goalId];
        return next;
      });

      showUndo("Task added", () => {
        setGoals(oldGoals);
        setTaskInputs(prev => ({ ...prev, [goalId]: input }));
      });
    }
  };

  const isTaskDone = (task: Task): boolean => {
    if (task.subtasks.length === 0) return task.done;
    return task.subtasks.every(s => s.done);
  };

  const updateGoalDone = (goal: Goal): boolean => {
    return goal.tasks.length > 0 && goal.tasks.every(t => isTaskDone(t));
  };

  const toggleTask = (goalId: string, taskId: string) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId ? { ...t, done: !t.done } : t
              ),
              done: updateGoalDone({
                ...g,
                tasks: g.tasks.map(t =>
                  t.id === taskId ? { ...t, done: !t.done } : t
                )
              })
            }
          : g
      )
    );
  };

  const toggleSubtask = (goalId: string, taskId: string, subId: string) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId
                  ? {
                      ...t,
                      subtasks: t.subtasks.map(s =>
                        s.id === subId ? { ...s, done: !s.done } : s
                      ),
                      done: t.subtasks.length > 0 && t.subtasks.every(s => s.id === subId ? !s.done : s.done)
                    }
                  : t
              ),
              done: updateGoalDone({
                ...g,
                tasks: g.tasks.map(t =>
                  t.id === taskId
                    ? {
                        ...t,
                        subtasks: t.subtasks.map(s =>
                          s.id === subId ? { ...s, done: !s.done } : s
                        ),
                        done: t.subtasks.length > 0 && t.subtasks.every(s => s.id === subId ? !s.done : s.done)
                      }
                    : t
                )
              })
            }
          : g
      )
    );
  };

  const toggleSubtaskInput = (goalId: string, taskId: string) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId ? { ...t, showInput: !t.showInput } : t
              ),
            }
          : g
      )
    );
  };

  const addSubtask = (goalId: string, taskId: string) => {
    const input = subtaskInputs[`${goalId}-${taskId}`]?.trim();
    if (input && input.length <= MAX_SUBTASK_NAME) {
      const newSub: Subtask = {
        id: Date.now().toString(),
        name: input,
        done: false,
      };
      setGoals(prev =>
        prev.map(g =>
          g.id === goalId
            ? {
                ...g,
                tasks: g.tasks.map(t =>
                  t.id === taskId
                    ? { ...t, subtasks: [...t.subtasks, newSub], showInput: false }
                    : t
                ),
              }
            : g
        )
      );
      setSubtaskInputs(prev => {
        const next = { ...prev };
        delete next[`${goalId}-${taskId}`];
        return next;
      });
    }
  };

  const removeSubtask = (goalId: string, taskId: string, subId: string) => {
    const old = [...goals];
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId
                  ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subId) }
                  : t
              ),
            }
          : g
      )
    );
    showUndo("Subtask deleted", () => setGoals(old));
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

  const exportPDF = () => window.print();

  const allDone = goals.length > 0 && goals.every(g => g.done);

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.done && !b.done) return 1;
    if (!a.done && b.done) return -1;
    return 0;
  });

  // Page 1: Build Mode
  if (!planGenerated) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Which life would you be proud to die in?
            </h1>

            <textarea
              placeholder="One truth. (e.g., I built a tool that helps 1M people live better.)"
              value={vision}
              onChange={(e) => setVision(e.target.value.slice(0, MAX_VISION))}
              maxLength={MAX_VISION}
              className="mt-8 w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 resize-none text-lg font-medium italic"
              rows={3}
            />
            <p className="text-xs text-gray-400 text-right -mt-2">{vision.length}/{MAX_VISION}</p>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">Break into 1–12 Goals</h2>
              <div className="flex gap-2 mb-6">
                <input
                  placeholder="e.g., Launch ROBUST app"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value.slice(0, MAX_GOAL_NAME))}
                  onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                  maxLength={MAX_GOAL_NAME}
                  className="flex-1 p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addGoal}
                  disabled={!newGoalName.trim() || goals.length >= 12}
                  className="px-5 py-3 bg-purple-600 text-white rounded-xl disabled:opacity-50 flex items-center gap-2 hover:shadow-lg transition"
                >
                  <Plus className="w-5 h-5" /> Add
                </button>
              </div>

              <div className="space-y-4">
                {goals.map((goal) => {
                  const hasTask = goal.tasks.length > 0;
                  return (
                    <div key={goal.id} className="p-5 bg-gray-700 rounded-xl border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-purple-300 break-words max-w-[85%]">
                          {truncate(goal.name, MAX_GOAL_NAME)}
                        </h3>
                        <button onClick={() => removeGoal(goal.id)} className="text-red-400 hover:text-red-300 transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex gap-2" key={`input-${goal.id}`}>
                        <input
                          placeholder="Task: e.g., Build landing page"
                          value={taskInputs[goal.id] || ''}
                          onChange={(e) => setTaskInputs({ ...taskInputs, [goal.id]: e.target.value.slice(0, MAX_TASK_NAME) })}
                          onKeyDown={(e) => e.key === 'Enter' && addTask(goal.id)}
                          maxLength={MAX_TASK_NAME}
                          className="flex-1 p-2 bg-gray-800 border border-gray-500 rounded-lg text-gray-100 text-sm focus:ring-2 focus:ring-purple-500"
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
                        <div className="mt-3 space-y-1">
                          {goal.tasks.map(task => (
                            <div key={task.id} className="text-sm text-gray-300 pl-2 break-words">
                              {truncate(task.name, MAX_TASK_NAME)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
              className="mt-10 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-bold flex items-center justify-center gap-3 hover:shadow-xl disabled:opacity-50 transition"
            >
              <Sparkles className="w-6 h-6" />
              Generate My Life Frame
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page 2: Life Frame
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl print:bg-white print:shadow-none">
          <div className="text-center mb-12 print:mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent print:text-black">
              My Life Frame
            </h1>
            <p className="mt-4 text-xl text-gray-200 italic print:text-black print:text-lg print:font-normal break-words">
              "{vision}"
            </p>
          </div>

          {allDone ? (
            <div className="text-center py-20">
              <CheckCircle2 className="w-24 h-24 mx-auto text-green-400 mb-6" />
              <h2 className="text-5xl font-bold text-green-400 mb-4">Congratulations!</h2>
              <p className="text-xl text-gray-300">You’ve built the life you’d be proud to die in.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
              {sortedGoals.map((goal) => {
                const doneTasks = goal.tasks.filter(t => isTaskDone(t)).length;
                const totalTasks = goal.tasks.length;
                const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

                return (
                  <div
                    key={goal.id}
                    className={`
                      p-5 md:p-6 rounded-xl border shadow-lg min-h-[120px] flex flex-col space-y-3 transition-all
                      ${goal.done 
                        ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500' 
                        : 'bg-gray-700/80 backdrop-blur-sm border-gray-600 hover:border-purple-500/50'
                      }
                      hover:shadow-xl print:p-4 print:bg-gray-50 print:border print:shadow-none print:break-inside-avoid
                    `}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-lg md:text-xl font-bold text-purple-300 break-words max-w-[80%] print:text-black">
                        {truncate(goal.name, MAX_GOAL_NAME)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs md:text-sm flex-shrink-0 print:text-black">
                        <span className="font-bold text-green-400 print:text-green-600">{pct}%</span>
                        <span className="text-gray-400 print:text-gray-700">{doneTasks}/{totalTasks}</span>
                      </div>
                    </div>

                    {goal.done ? (
                      <div className="text-center py-8">
                        <CheckCircle2 className="w-12 h-12 mx-auto text-green-400 mb-2" />
                        <p className="text-green-400 font-bold text-xl">Goal Complete!</p>
                      </div>
                    ) : (
                      <div className="space-y-3 flex-1">
                        {goal.tasks.map(task => {
                          const subDone = task.subtasks.filter(s => s.done).length;
                          const subTotal = task.subtasks.length;

                          return (
                            <div
                              key={task.id}
                              className={`p-3 bg-gray-900 rounded-lg ${isTaskDone(task) ? 'opacity-50 line-through' : ''} print:bg-gray-100 print:border print:p-2 print:opacity-100`}
                            >
                              <div 
                                className="font-medium text-sm md:text-base text-gray-100 cursor-pointer hover:text-white transition print:cursor-default print:text-black break-words"
                                onClick={() => toggleTask(goal.id, task.id)}
                              >
                                {truncate(task.name, MAX_TASK_NAME)}
                                {subTotal > 0 && (
                                  <span className="ml-2 text-xs text-gray-400 print:text-gray-700">
                                    ({subDone}/{subTotal})
                                  </span>
                                )}
                              </div>

                              <div className="ml-3 md:ml-4 mt-2 space-y-1.5">
                                {task.subtasks.map(sub => (
                                  <div key={sub.id} className="flex items-center justify-between group">
                                    <span
                                      className={`text-xs md:text-sm cursor-pointer text-gray-300 hover:text-white transition ${sub.done ? 'line-through opacity-50' : ''} print:text-gray-700 print:cursor-default break-words max-w-[85%]`}
                                      onClick={() => toggleSubtask(goal.id, task.id, sub.id)}
                                    >
                                      {truncate(sub.name, MAX_SUBTASK_NAME)}
                                    </span>
                                    <button
                                      onClick={() => removeSubtask(goal.id, task.id, sub.id)}
                                      className="opacity-0 group-hover:opacity-100 transition print:hidden"
                                    >
                                      <Trash2 className="w-3 h-3 text-red-400" />
                                    </button>
                                  </div>
                                ))}

                                {task.showInput ? (
                                  <input
                                    type="text"
                                    placeholder="New subtask..."
                                    value={subtaskInputs[`${goal.id}-${task.id}`] || ''}
                                    onChange={(e) => setSubtaskInputs({ ...subtaskInputs, [`${goal.id}-${task.id}`]: e.target.value.slice(0, MAX_SUBTASK_NAME) })}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') addSubtask(goal.id, task.id);
                                      if (e.key === 'Escape') toggleSubtaskInput(goal.id, task.id);
                                    }}
                                    maxLength={MAX_SUBTASK_NAME}
                                    className="w-full px-2 py-1 text-xs md:text-sm bg-gray-800 border border-gray-600 rounded text-gray-100 mt-1 print:hidden"
                                    autoFocus
                                  />
                                ) : (
                                  <button
                                    onClick={() => toggleSubtaskInput(goal.id, task.id)}
                                    className="text-xs md:text-sm text-purple-400 underline hover:text-purple-300 mt-1 self-start print:hidden"
                                  >
                                    + Add subtask
                                  </button>
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

          <div className="flex gap-4 justify-center mt-10 print:hidden">
            <button
              onClick={() => setPlanGenerated(false)}
              className="px-6 py-3 border border-gray-600 rounded-xl flex items-center gap-2 hover:bg-gray-700 text-gray-300 transition"
            >
              <Edit3 className="w-5 h-5" /> Edit
            </button>
            <button
              onClick={exportPDF}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex items-center gap-2 hover:shadow-lg font-medium transition"
            >
              <Download className="w-5 h-5" /> PDF
            </button>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-pulse z-50 print:hidden">
            <span>{toast.message}</span>
            <button onClick={() => { toast.undo(); setToast(null); }} className="underline flex items-center gap-1">
              <Undo2 className="w-4 h-4" /> Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}