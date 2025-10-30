import { motion } from "framer-motion"
import React from "react"

interface FieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  icon?: React.ReactNode
  autoComplete?: string
  error?: string
  variant?: "default" | "rounded"
}

export default function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  icon,
  autoComplete,
  error,
  variant = "default",
}: FieldProps) {
  const radiusClass = variant === "rounded" ? "rounded-full" : "rounded-xl"

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 ${radiusClass} bg-[#121212] border ${
          error ? "border-red-500/60" : "border-white/10"
        } focus-within:border-blue-500/60 transition`}
      >
        {icon && <span className="pl-3 text-gray-400">{icon}</span>}

        <input
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full bg-transparent outline-none px-3 py-3 text-gray-200 placeholder:text-gray-500 ${
            variant === "rounded" ? "pl-1.5 pr-5 py-3.5" : ""
          }`}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-3 -bottom-5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
