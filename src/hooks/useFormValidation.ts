import { useState } from "react";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule;
};

export function useFormValidation<T>(schema: ValidationSchema<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const rules = schema[name as keyof T];
    let error = "";

    if (!rules) return "";

    if (rules.required && !value.trim()) {
      error = rules.message || "This field is required.";
    }

    else if (rules.minLength && value.trim().length < rules.minLength) {
      error = `Must be at least ${rules.minLength} characters.`;
    }

    else if (rules.maxLength && value.trim().length > rules.maxLength) {
      error = `Must be less than ${rules.maxLength} characters.`;
    }

    else if (rules.pattern && !rules.pattern.test(value)) {
      error = rules.message || "Invalid format.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = (values: T) => {
    const newErrors: Record<string, string> = {};
    for (const key in schema) {
      const value = (values as any)[key];
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    }
    setErrors(newErrors);
    return newErrors;
  };

  const isValid = Object.values(errors).every((e) => !e);

  return { errors, setErrors, validateField, validateAll, isValid };
}
