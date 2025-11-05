// src/components/sj/ui/Input.tsx
interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  icon?: React.ReactNode;
}

export default function Input({ label, value, onChange, step = 1, icon }: Props) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1 text-sm text-gray-400">
        {icon} {label}
      </label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
      />
    </div>
  );
}