import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LoginCard } from "@/components/LoginCard";

const Index = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <LoginCard />
        
        {/* Bottom branding */}
        <p className="mt-8 text-xs text-muted-foreground/50 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          Secured with end-to-end encryption
        </p>
      </div>
    </main>
  );
};

export default Index;
