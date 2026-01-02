import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, loading, disabled, ...props }, ref) => {
    const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setRipple(null), 600);
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "btn-glow relative w-full py-4 px-6 rounded-lg",
          "text-primary-foreground font-semibold text-base",
          "transform transition-all duration-300 ease-smooth",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {ripple && (
          <span
            className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_linear]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <span
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 transition-all duration-300",
            loading && "opacity-0"
          )}
        >
          {children}
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        )}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
