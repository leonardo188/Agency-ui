import { motion } from "framer-motion";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  type?: "fade-up" | "slide-up" | "zoom";
  className?: string;
  cascade?: boolean;
  cascadeDelay?: number;
  immediate?: boolean; 
}

export default function Reveal({
  children,
  delay = 0,
  type = "fade-up",
  className,
  cascade = false,
  cascadeDelay = 0.15,
  immediate = false,
}: RevealProps) {
  const variants = {
    "fade-up": { opacity: 0, y: 30 },
    "slide-up": { opacity: 0, y: 60 },
    "zoom": { opacity: 0, scale: 0.9 },
  };

  const animateTo = {
    opacity: 1,
    y: 0,
    scale: 1,
  };

  if (cascade) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: cascadeDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={{
              hidden: variants[type],
              visible: {
                ...animateTo,
                transition: { duration: 0.7 },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={immediate ? { opacity: 1, y: 0, scale: 1 } : variants[type]} // 👈 kalau immediate=true, langsung tampil
      whileInView={{
        ...animateTo,
        transition: { duration: 0.7, delay },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
