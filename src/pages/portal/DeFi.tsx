'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
  NodeProps,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/base.css';
import {
  Clock,
  Zap,
  RefreshCw,
  Target,
  StickyNote,
  TrendingUp,
  Star,
  Timer,
  Edit2,
  Folder,
  FolderPlus,
  Plus,
  X,        // ← FIXED: WAS MISSING
  Trash2,
} from 'lucide-react';
import { create } from 'zustand';

// === TYPES ===
type FlowTab = {
  id: string;
  name: string;
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
};

type FlowNodeData = {
  label?: string;
  hrsPerWeek?: number;
  usdPerDay?: number;
  costUsd?: number;
  skill?: string;
  platform?: string;
  tool?: string;
  rss?: string;

  automationType?: 'delegate' | 'delete' | 'automate';
  costUsdAuto?: number;
  timeSavedHrsPerWeek?: number;
  delegateTo?: string;
  deleteAction?: string;
  toolName?: string;

  condition?: string;
  dataSource?: string;
  action?: string;
  fallback?: string;

  noteText?: string;
  priority?: 'low' | 'medium' | 'high';
};

type FlowNode = Node<FlowNodeData> & {
  type: 'hustle' | 'automation' | 'iteration' | 'note';
};

// === ZUSTAND STORE ===
const useFlowStore = create<{
  tabs: FlowTab[];
  activeTabId: string | null;
  addTab: (name: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, nodes: Node<FlowNodeData>[], edges: Edge[]) => void;
  renameTab: (id: string, name: string) => void;
  copySystem: (tabId: string) => void;
  deleteTab: (id: string) => void;
  deleteNode: (tabId: string, nodeId: string) => void;
}>((set, get) => ({
  tabs: [],
  activeTabId: null,

  addTab: (name) =>
    set((state) => {
      const newTab: FlowTab = { id: Date.now().toString(), name, nodes: [], edges: [] };
      return { tabs: [...state.tabs, newTab], activeTabId: newTab.id };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTab: (id, nodes, edges) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, nodes, edges } : t)),
    })),

  renameTab: (id, name) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, name } : t)),
    })),

  copySystem: (tabId) => {
    const tab = get().tabs.find((t) => t.id === tabId);
    if (!tab) return;
    const newTab: FlowTab = {
      id: Date.now().toString(),
      name: `${tab.name} (Copy)`,
      nodes: tab.nodes.map((n) => ({ ...n, id: `${n.id}-copy-${Date.now()}` })),
      edges: tab.edges.map((e) => ({ ...e, id: `${e.id}-copy-${Date.now()}` })),
    };
    set((state) => ({ tabs: [...state.tabs, newTab], activeTabId: newTab.id }));
  },

  deleteTab: (id) =>
    set((state) => {
      const filtered = state.tabs.filter((t) => t.id !== id);
      const newActive = state.activeTabId === id ? filtered[0]?.id || null : state.activeTabId;
      return { tabs: filtered, activeTabId: newActive };
    }),

  deleteNode: (tabId, nodeId) =>
    set((state) => {
      const tab = state.tabs.find((t) => t.id === tabId);
      if (!tab) return state;
      const updatedNodes = tab.nodes.filter((n) => n.id !== nodeId);
      const updatedEdges = tab.edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
      return {
        tabs: state.tabs.map((t) =>
          t.id === tabId ? { ...t, nodes: updatedNodes, edges: updatedEdges } : t
        ),
      };
    }),
}));

// === NODES ===
const HustleNode = ({ data, id }: NodeProps<FlowNodeData>) => {
  const { updateTab, activeTabId, tabs, deleteNode } = useFlowStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const nodes = activeTab?.nodes || [];
  const edges = activeTab?.edges || [];

  const save = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === id ? { ...n, data: { ...data, ...form } } : n
    );
    updateTab(activeTabId!, updatedNodes, edges);
    setEditing(false);
  };

  return (
    <div
      className="bg-gradient-to-br from-cyan-900/90 to-cyan-800/90 backdrop-blur-md rounded-2xl p-6 w-96 shadow-xl border border-cyan-700/50"
      onContextMenu={(e) => {
        e.preventDefault();
        if (confirm('Delete this Hustle block?')) deleteNode(activeTabId!, id);
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-300" />
          <span className="font-bold text-cyan-200 text-sm">HUSTLE</span>
        </div>
        <button onClick={() => setEditing(true)} className="text-cyan-300 hover:text-white">
          <Edit2 size={14} />
        </button>
      </div>

      {editing ? (
        <div className="space-y-3 text-sm">
          <input
            className="w-full p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
            value={form.label || ''}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="What do you do?"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              inputMode="decimal"
              className="p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
              value={form.hrsPerWeek ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ ...form, hrsPerWeek: val === '' ? undefined : Number(val) || 0 });
              }}
              placeholder="hrs/wk"
            />
            <input
              type="text"
              inputMode="decimal"
              className="p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
              value={form.usdPerDay ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ ...form, usdPerDay: val === '' ? undefined : Number(val) || 0 });
              }}
              placeholder="$/day"
            />
          </div>
          <input
            type="text"
            inputMode="decimal"
            className="w-full p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
            value={form.costUsd ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, costUsd: val === '' ? undefined : Number(val) || 0 });
            }}
            placeholder="Cost $/mo"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
              value={form.skill || ''}
              onChange={(e) => setForm({ ...form, skill: e.target.value })}
              placeholder="Skill"
            />
            <input
              className="p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
              value={form.platform || ''}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              placeholder="Platform"
            />
          </div>
          <input
            className="w-full p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
            value={form.tool || ''}
            onChange={(e) => setForm({ ...form, tool: e.target.value })}
            placeholder="Tool"
          />
          <input
            className="w-full p-2 bg-cyan-800/50 rounded border border-cyan-600 text-white"
            value={form.rss || ''}
            onChange={(e) => setForm({ ...form, rss: e.target.value })}
            placeholder="RSS / Follow"
          />
          <button onClick={save} className="w-full bg-cyan-500 text-black text-xs py-1.5 rounded font-bold">
            SAVE
          </button>
        </div>
      ) : (
        <>
          <p className="font-bold text-white text-lg">{data.label}</p>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <span className="text-cyan-300">{data.hrsPerWeek}h/wk</span>
            <span className="text-green-400 font-bold">${data.usdPerDay}/d</span>
          </div>
          {data.costUsd !== undefined && data.costUsd > 0 && (
            <div className="text-xs text-orange-300 mt-1">Cost: ${data.costUsd}/mo</div>
          )}
          {(data.skill || data.platform || data.tool || data.rss) && (
            <div className="mt-3 text-xs text-cyan-200 space-y-1">
              {data.skill && <div>Skill: {data.skill}</div>}
              {data.platform && <div>Platform: {data.platform}</div>}
              {data.tool && <div>Tool: {data.tool}</div>}
              {data.rss && <div>RSS: {data.rss}</div>}
            </div>
          )}
        </>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

// === AUTOMATION NODE ===
const AutomationNode = ({ data, id }: NodeProps<FlowNodeData>) => {
  const { updateTab, activeTabId, tabs, deleteNode } = useFlowStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const nodes = activeTab?.nodes || [];
  const edges = activeTab?.edges || [];

  const save = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === id ? { ...n, data: { ...data, ...form } } : n
    );
    updateTab(activeTabId!, updatedNodes, edges);
    setEditing(false);
  };

  return (
    <div
      className="bg-gradient-to-br from-purple-900/90 to-purple-800/90 backdrop-blur-md rounded-2xl p-5 w-80 shadow-xl border border-purple-700/50"
      onContextMenu={(e) => {
        e.preventDefault();
        if (confirm('Delete this Automation block?')) deleteNode(activeTabId!, id);
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-300" />
          <span className="font-bold text-purple-200 text-sm">AUTOMATION</span>
        </div>
        <button onClick={() => setEditing(true)} className="text-purple-300 hover:text-white">
          <Edit2 size={14} />
        </button>
      </div>

      {editing ? (
        <div className="space-y-3 text-sm">
          <select
            className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
            value={form.automationType || ''}
            onChange={(e) => setForm({ ...form, automationType: e.target.value as any })}
          >
            <option value="">Choose type...</option>
            <option value="delegate">Delegate</option>
            <option value="delete">Delete</option>
            <option value="automate">Automate</option>
          </select>
          {form.automationType === 'delegate' && (
            <input
              className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
              value={form.delegateTo || ''}
              onChange={(e) => setForm({ ...form, delegateTo: e.target.value })}
              placeholder="Delegate to..."
            />
          )}
          {form.automationType === 'delete' && (
            <input
              className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
              value={form.deleteAction || ''}
              onChange={(e) => setForm({ ...form, deleteAction: e.target.value })}
              placeholder="Delete action..."
            />
          )}
          {form.automationType === 'automate' && (
            <input
              className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
              value={form.toolName || ''}
              onChange={(e) => setForm({ ...form, toolName: e.target.value })}
              placeholder="Tool name..."
            />
          )}
          <input
            type="text"
            inputMode="decimal"
            className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
            value={form.costUsdAuto ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, costUsdAuto: val === '' ? undefined : Number(val) || 0 });
            }}
            placeholder="Cost $"
          />
          <input
            type="text"
            inputMode="decimal"
            className="w-full p-2 bg-purple-800/50 rounded border border-purple-600 text-white"
            value={form.timeSavedHrsPerWeek ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, timeSavedHrsPerWeek: val === '' ? undefined : Number(val) || 0 });
            }}
            placeholder="Time saved hrs/wk"
          />
          <button onClick={save} className="w-full bg-purple-500 text-black text-xs py-1.5 rounded font-bold">
            SAVE
          </button>
        </div>
      ) : (
        <>
          <p className="font-bold text-white text-lg">{data.label || 'Automation'}</p>
          <p className="text-purple-300 text-sm mt-1">
            {data.automationType === 'delegate' && `to ${data.delegateTo}`}
            {data.automationType === 'delete' && `Delete ${data.deleteAction}`}
            {data.automationType === 'automate' && `Automate ${data.toolName}`}
          </p>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-purple-300">${data.costUsdAuto} cost</span>
            <span className="text-green-400">+{data.timeSavedHrsPerWeek}h/wk</span>
          </div>
        </>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

// === ITERATION & NOTE NODES (unchanged) ===
const IterationNode = ({ data, id }: NodeProps<FlowNodeData>) => {
  const { updateTab, activeTabId, tabs, deleteNode } = useFlowStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const nodes = activeTab?.nodes || [];
  const edges = activeTab?.edges || [];

  const save = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === id ? { ...n, data: { ...data, ...form } } : n
    );
    updateTab(activeTabId!, updatedNodes, edges);
    setEditing(false);
  };

  return (
    <div
      className="bg-gradient-to-br from-orange-900/90 to-orange-800/90 backdrop-blur-md rounded-2xl p-5 w-80 shadow-xl border border-orange-700/50"
      onContextMenu={(e) => {
        e.preventDefault();
        if (confirm('Delete this Iteration block?')) deleteNode(activeTabId!, id);
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-orange-300" />
          <span className="font-bold text-orange-200 text-sm">ITERATION</span>
        </div>
        <button onClick={() => setEditing(true)} className="text-orange-300 hover:text-white">
          <Edit2 size={14} />
        </button>
      </div>

      {editing ? (
        <div className="space-y-3 text-sm">
          <input
            className="w-full p-2 bg-orange-800/50 rounded border border-orange-600 text-white"
            value={form.condition || ''}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            placeholder="If condition..."
          />
          <input
            className="w-full p-2 bg-orange-800/50 rounded border border-orange-600 text-white"
            value={form.dataSource || ''}
            onChange={(e) => setForm({ ...form, dataSource: e.target.value })}
            placeholder="Data source"
          />
          <input
            className="w-full p-2 bg-orange-800/50 rounded border border-orange-600 text-white"
            value={form.action || ''}
            onChange={(e) => setForm({ ...form, action: e.target.value })}
            placeholder="Then action..."
          />
          <input
            className="w-full p-2 bg-orange-800/50 rounded border border-orange-600 text-white"
            value={form.fallback || ''}
            onChange={(e) => setForm({ ...form, fallback: e.target.value })}
            placeholder="Else..."
          />
          <button onClick={save} className="w-full bg-orange-500 text-black text-xs py-1.5 rounded font-bold">
            SAVE
          </button>
        </div>
      ) : (
        <>
          <p className="font-bold text-white text-lg">Test & Scale</p>
          <div className="text-xs text-orange-200 mt-2 space-y-1">
            <div>If: {data.condition}</div>
            <div>to {data.action}</div>
            <div>Else: {data.fallback}</div>
          </div>
        </>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const NoteNode = ({ data, id }: NodeProps<FlowNodeData>) => {
  const { updateTab, activeTabId, tabs, deleteNode } = useFlowStore();
  const [form, setForm] = useState(data);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const nodes = activeTab?.nodes || [];
  const edges = activeTab?.edges || [];

  const save = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === id ? { ...n, data: { ...data, ...form } } : n
    );
    updateTab(activeTabId!, updatedNodes, edges);
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-xl p-4 w-64 shadow-lg border border-gray-600"
      onContextMenu={(e) => {
        e.preventDefault();
        if (confirm('Delete this Note?')) deleteNode(activeTabId!, id);
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <StickyNote className="w-4 h-4 text-gray-300" />
        <span className="text-xs font-bold text-gray-200">NOTE</span>
      </div>
      <textarea
        className="w-full p-2 bg-gray-700/50 rounded text-white text-xs resize-none"
        value={form.noteText || ''}
        onChange={(e) => {
          setForm({ ...form, noteText: e.target.value });
          save();
        }}
        placeholder="Add note..."
        rows={3}
      />
      <select
        className="mt-1 w-full p-1 bg-gray-700/50 rounded text-xs text-white"
        value={form.priority || 'medium'}
        onChange={(e) => {
          setForm({ ...form, priority: e.target.value as any });
          save();
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

const nodeTypes = {
  hustle: HustleNode,
  automation: AutomationNode,
  iteration: IterationNode,
  note: NoteNode,
};

// === MAIN CANVAS ===
function FlowCanvas() {
  const { tabs, activeTabId, addTab, setActiveTab, updateTab, renameTab, copySystem, deleteTab } = useFlowStore();
  const activeTab = useMemo(() => tabs.find((t) => t.id === activeTabId) || tabs[0], [tabs, activeTabId]);

  const [goal, setGoal] = useState({ monthly: 10000, pr: 5, workWeek: 30 });
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalForm, setGoalForm] = useState(goal);
  const [showCreator, setShowCreator] = useState(false);
  const [nodeType, setNodeType] = useState<'hustle' | 'automation' | 'iteration' | 'note'>('hustle');
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');

  const nodes = activeTab?.nodes || [];
  const edges = activeTab?.edges || [];

  const calculateMetrics = (nodes: Node<FlowNodeData>[]) => {
    let totalHrs = 0;
    let totalUsdPerWeek = 0;
    let totalCost = 0;

    nodes.forEach((node) => {
      if (node.type === 'hustle') {
        totalHrs += node.data.hrsPerWeek || 0;
        totalUsdPerWeek += (node.data.usdPerDay || 0) * 7;
        totalCost += (node.data.costUsd || 0) / 4;
      }
      if (node.type === 'automation') {
        totalCost += (node.data.costUsdAuto || 0) / 4;
      }
    });

    const prRatio = totalCost > 0 ? totalUsdPerWeek / totalCost : totalUsdPerWeek > 0 ? Infinity : 0;
    const monthlyRevenue = totalUsdPerWeek * 4;

    const prScore = prRatio === Infinity ? 1 : Math.min(1, prRatio / goal.pr);
    const workScore = Math.min(1, goal.workWeek / Math.max(totalHrs, 1));
    const starScore = Math.floor(prScore * workScore * 5);
    const stars = '★'.repeat(Math.max(1, starScore)) + '☆'.repeat(5 - Math.max(1, starScore));

    return {
      monthlyRevenue: monthlyRevenue.toFixed(0),
      prRatio: prRatio === Infinity ? '∞' : prRatio.toFixed(1),
      workWeek: totalHrs,
      stars,
      starCount: Math.max(1, starScore),
      progress: Math.min(100, Math.round((monthlyRevenue / goal.monthly) * 100)),
    };
  };

  const metrics = useMemo(() => calculateMetrics(nodes), [nodes, goal]);

  const bgClass = metrics.starCount >= 5 ? 'bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-black' :
                  metrics.starCount >= 4 ? 'bg-gradient-to-br from-green-900/20 to-black' :
                  metrics.starCount >= 3 ? 'bg-gradient-to-br from-yellow-900/15 to-black' :
                  metrics.starCount >= 2 ? 'bg-gradient-to-br from-orange-900/15 to-black' :
                  'bg-gradient-to-br from-red-900/15 to-black';

  const saveGoal = () => {
    setGoal(goalForm);
    setEditingGoal(false);
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => updateTab(activeTabId!, applyNodeChanges(changes, nodes), edges),
    [nodes, edges, activeTabId, updateTab]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => updateTab(activeTabId!, nodes, applyEdgeChanges(changes, edges)),
    [nodes, edges, activeTabId, updateTab]
  );

  const onConnect = useCallback(
    (connection: Connection) => updateTab(activeTabId!, nodes, addEdge(connection, edges)),
    [edges, activeTabId, nodes, updateTab]
  );

  const createNode = () => {
    const newNode: FlowNode = {
      id: Date.now().toString(),
      type: nodeType,
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: {
        label: nodeType === 'hustle' ? 'New Hustle' : undefined,
        hrsPerWeek: nodeType === 'hustle' ? 5 : undefined,
        usdPerDay: nodeType === 'hustle' ? 50 : undefined,
        costUsd: nodeType === 'hustle' ? 0 : undefined,
        automationType: nodeType === 'automation' ? 'automate' as const : undefined,
        condition: nodeType === 'iteration' ? 'If...' : undefined,
        noteText: nodeType === 'note' ? 'New note' : undefined,
      },
    };
    updateTab(activeTabId!, [...nodes, newNode], edges);
    setShowCreator(false);
  };

  useEffect(() => {
    if (tabs.length === 0) addTab('My System');
  }, [tabs.length, addTab]);

  return (
    <div className={`min-h-screen text-white ${bgClass} transition-all duration-1000`}>
      {/* HEADER */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-full mx-auto flex items-center gap-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 flex-shrink-0">
            <Zap className="w-8 h-8 text-cyan-400" />
            FLOW
          </h1>

          <div className="flex items-center gap-2 overflow-x-auto py-1 pr-4 scrollbar-hide-tabs whitespace-nowrap flex-1 min-w-0">
            {tabs.map((tab) => {
              const m = calculateMetrics(tab.nodes);
              return (
                <div key={tab.id} className="flex items-center gap-1 flex-shrink-0 group">
                  {renamingTabId === tab.id ? (
                    <input
                      autoFocus
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      onBlur={() => {
                        if (renameInput.trim()) renameTab(tab.id, renameInput.trim());
                        setRenamingTabId(null);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                      className="px-3 py-1.5 bg-zinc-800 rounded text-sm font-medium text-white"
                    />
                  ) : (
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      onDoubleClick={() => {
                        setRenamingTabId(tab.id);
                        setRenameInput(tab.name);
                      }}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                        activeTabId === tab.id
                          ? 'bg-cyan-500 text-black'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                      }`}
                    >
                      <Folder size={16} />
                      {tab.name}
                      <span className="ml-1">{m.stars}</span>
                    </button>
                  )}
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete "${tab.name}"?`)) deleteTab(tab.id);
                      }}
                      className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              );
            })}

            <button onClick={() => addTab('New System')} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center gap-1 text-sm text-zinc-300 flex-shrink-0">
              <FolderPlus size={16} /> New
            </button>

            <button onClick={() => copySystem(activeTabId!)} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center gap-1 text-sm flex-shrink-0">
              Copy
            </button>

            <button onClick={() => setShowCreator(true)} className="px-6 py-2 bg-cyan-500 text-black rounded-xl font-bold hover:scale-105 transition flex items-center gap-2 flex-shrink-0">
              <Plus size={18} /> Add Block
            </button>
          </div>
        </div>
      </div>

      {/* CANVAS */}
      <div className="relative h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          panOnScroll
          selectionOnDrag
        >
          <Background color="#27272a" gap={20} />
          <Controls />
        </ReactFlow>

        {/* GOAL BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 p-5 z-10">
          <div className="max-w-none mx-auto flex items-center justify-center gap-10 text-lg font-medium">
            {editingGoal ? (
              <>
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <input type="text" inputMode="decimal" value={goalForm.monthly} onChange={(e) => setGoalForm({ ...goalForm, monthly: Number(e.target.value) || 0 })} className="w-24 bg-zinc-800 text-white rounded px-2" />/mo
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  P/R ≥ <input type="text" inputMode="decimal" value={goalForm.pr} onChange={(e) => setGoalForm({ ...goalForm, pr: Number(e.target.value) || 0 })} className="w-16 bg-zinc-800 text-white rounded px-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-6 h-6 text-cyan-400" />
                  ≤ <input type="text" inputMode="decimal" value={goalForm.workWeek} onChange={(e) => setGoalForm({ ...goalForm, workWeek: Number(e.target.value) || 0 })} className="w-16 bg-zinc-800 text-white rounded px-1" />h/wk
                </div>
                <button onClick={saveGoal} className="px-4 py-1 bg-cyan-500 text-black rounded font-bold text-sm">Save</button>
                <button onClick={() => { setEditingGoal(false); setGoalForm(goal); }} className="px-4 py-1 bg-zinc-700 rounded text-sm">Cancel</button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <span>${metrics.monthlyRevenue}/mo</span>
                  <div className="w-40 bg-zinc-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${metrics.progress}%` }} />
                  </div>
                  <span className="text-emerald-400">{metrics.progress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <span>P/R: {metrics.prRatio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-6 h-6 text-cyan-400" />
                  <span>{metrics.workWeek}h/wk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span>{metrics.stars}</span>
                </div>
                <button onClick={() => { setEditingGoal(true); setGoalForm(goal); }} className="text-zinc-400 hover:text-white">
                  <Edit2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* BLOCK CREATOR */}
      {showCreator && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-zinc-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Block</h2>
              <button onClick={() => setShowCreator(false)} className="text-zinc-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(['hustle', 'automation', 'iteration', 'note'] as const).map((t) => (
                <button key={t} onClick={() => { setNodeType(t); createNode(); }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    nodeType === t
                      ? t === 'hustle' ? 'border-cyan-500 bg-cyan-900/30'
                      : t === 'automation' ? 'border-purple-500 bg-purple-900/30'
                      : t === 'iteration' ? 'border-orange-500 bg-orange-900/30'
                      : 'border-gray-500 bg-gray-900/30'
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  {t === 'hustle' && <Clock className="w-8 h-8 mx-auto mb-2 text-cyan-400" />}
                  {t === 'automation' && <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />}
                  {t === 'iteration' && <RefreshCw className="w-8 h-8 mx-auto mb-2 text-orange-400" />}
                  {t === 'note' && <StickyNote className="w-8 h-8 mx-auto mb-2 text-gray-400" />}
                  <span className="block text-sm font-medium capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeFi() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}