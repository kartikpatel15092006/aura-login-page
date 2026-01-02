import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue;

    return (
      <div className="relative">
        <div
          className={cn(
            "glass-input relative rounded-lg transition-all duration-300",
            isFocused && "ring-2 ring-primary/30",
            error && "border-destructive ring-destructive/30",
            className
          )}
        >
          <input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full bg-transparent px-4 pt-6 pb-2 text-foreground placeholder-transparent",
              "outline-none transition-all duration-300",
              "text-base font-medium",
              isPassword && "pr-12"
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={label}
            {...props}
          />
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none",
              "text-muted-foreground",
              isLabelFloating
                ? "top-2 text-xs text-primary font-medium"
                : "top-1/2 -translate-y-1/2 text-base"
            )}
          >
            {label}
          </label>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "text-muted-foreground hover:text-foreground",
                "transition-all duration-300 hover:scale-110"
              )}
            >
              <div className="relative w-5 h-5">
                <Eye
                  className={cn(
                    "absolute inset-0 w-5 h-5 transition-all duration-300",
                    showPassword ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <EyeOff
                  className={cn(
                    "absolute inset-0 w-5 h-5 transition-all duration-300",
                    showPassword ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )}
                />
              </div>
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-destructive animate-fade-in-up">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
