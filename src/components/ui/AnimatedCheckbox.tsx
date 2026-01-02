import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
  label,
  id,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "w-5 h-5 rounded-md border-2 transition-all duration-300",
            "flex items-center justify-center",
            checked
              ? "bg-primary border-primary"
              : "border-muted-foreground/50 group-hover:border-primary/50"
          )}
        >
          <Check
            className={cn(
              "w-3 h-3 text-primary-foreground transition-all duration-300",
              checked
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0"
            )}
            strokeWidth={3}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 rounded-md transition-all duration-300",
            checked && "animate-ping bg-primary/30"
          )}
          style={{ animationIterationCount: 1, animationDuration: "0.4s" }}
        />
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {label}
      </span>
    </label>
  );
};

export { AnimatedCheckbox };
