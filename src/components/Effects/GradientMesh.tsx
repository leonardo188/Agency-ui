export default function GradientMesh() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-linear-to-br from-blue-500/40 to-purple-500/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-linear-to-tl from-purple-500/30 via-pink-400/20 to-transparent rounded-full blur-[140px] animate-pulse-slow" />
    </div>
  );
}
