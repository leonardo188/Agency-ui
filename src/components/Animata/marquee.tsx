import { cn } from "../../lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

export default function Marquee({
  children,
  vertical = false,
  repeat = 5,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative flex h-full w-full overflow-hidden [--duration:15s] [--gap:24px] gap-(--gap)",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`marquee-item-${index}`}
          className={cn(
            "flex shrink-0 gap-(--gap)",
            {
              "animate-marquee-horizontal flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "[animation-direction:reverse]": reverse,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            }
          )}
        >
          {children}
        </div>
      ))}

      {applyMask && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute top-0 left-0 h-full w-24 z-1 bg-linear-to-r from-baseColor via-baseColor/50 to-transparent",
              vertical && "hidden"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute top-0 right-0 h-full w-24 z-1 bg-linear-to-l from-baseColor via-baseColor/50 to-transparent",
              vertical && "hidden"
            )}
          />
        </>
      )}
    </div>
  );
}
