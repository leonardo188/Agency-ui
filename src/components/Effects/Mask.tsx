interface MaskProps {
  type?: "circle" | "rect" | "gradient";
  className?: string;
}

export default function Mask({ type = "circle", className }: MaskProps) {
  const base =
    type === "circle"
      ? "rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-3xl"
      : type === "rect"
      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
      : "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-[120px]";
  return <div className={`${base} ${className}`} />;
}
