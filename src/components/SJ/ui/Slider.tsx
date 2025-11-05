// src/components/sj/ui/Slider.tsx
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  icon?: React.ReactNode;
  color?: string;
}

export default function Slider({ label, value, onChange, max, icon, color = 'amber' }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-1 font-medium text-gray-300">
          {icon} {label}
        </span>
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`font-bold text-${color}-400`}
        >
          {value.toFixed(1)}
        </motion.span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        step="0.1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-3 rounded-full appearance-none cursor-pointer slider-${color}`}
        style={{
          background: `linear-gradient(to right, #${color === 'emerald' ? '10b981' : color === 'orange' ? 'f97316' : color === 'purple' ? 'a855f7' : 'f59e0b'} ${(value / max) * 100}%, #1e293b ${(value / max) * 100}%)`,
        }}
      />
    </div>
  );
}