import * as React from "react";
import { cn } from "@/lib/utils";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { AnimatedCheckbox } from "@/components/ui/AnimatedCheckbox";
import { GlowButton } from "@/components/ui/GlowButton";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";

const LoginCard: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "glass-card w-full max-w-md p-8 md:p-10 rounded-2xl",
        "shadow-card transition-all duration-500 ease-smooth",
        "animate-scale-in",
        isHovered && "shadow-card-hover"
      )}
      style={{
        transitionProperty: "transform, box-shadow",
      }}
    >
      {/* Glow effect behind card */}
      <div
        className={cn(
          "absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 -z-10 blur-xl",
          isHovered && "opacity-100"
        )}
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(280 100% 50% / 0.1))",
        }}
      />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 relative group">
          <Sparkles className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-glow-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to continue to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <FloatingInput
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <FloatingInput
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div
          className="flex items-center justify-between animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <AnimatedCheckbox
            id="remember"
            checked={rememberMe}
            onChange={setRememberMe}
            label="Remember me"
          />
          <a
            href="#"
            className="text-sm text-primary link-hover transition-colors duration-300 hover:text-primary/80"
          >
            Forgot password?
          </a>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <GlowButton type="submit" loading={isLoading}>
            Sign in
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </GlowButton>
        </div>
      </form>

      {/* Footer */}
      <div
        className="mt-8 text-center animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-primary font-medium link-hover transition-colors duration-300 hover:text-primary/80"
          >
            Create one
          </a>
        </p>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden rounded-tl-2xl pointer-events-none">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden rounded-br-2xl pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export { LoginCard };
