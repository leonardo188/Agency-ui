import { motion } from "framer-motion";
import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
  className?: string;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  className = "",
}: SelectFieldProps) {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full appearance-none rounded-xl bg-[#121212] border ${
            error ? "border-red-500/60" : "border-white/10"
          } focus:border-blue-500/60 outline-none px-4 py-3 pr-10 text-gray-200 transition`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#121212]">
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
