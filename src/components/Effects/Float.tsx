import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

interface FloatProps {
  children: React.ReactNode;
  speed?: number;
  range?: number;
  className?: string;
}

export default function Float({
  children,
  speed = 0.5,
  range = 10,
  className,
}: FloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    const y = Math.sin(t / 1000 * speed) * range;
    const x = Math.cos(t / 1200 * speed) * range * 0.5;
    if (ref.current) {
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
