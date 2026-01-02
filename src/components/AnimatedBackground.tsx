import * as React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: `
            linear-gradient(
              135deg,
              hsl(250 100% 8%) 0%,
              hsl(280 100% 6%) 25%,
              hsl(222 47% 6%) 50%,
              hsl(200 100% 8%) 75%,
              hsl(250 100% 8%) 100%
            )
          `,
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] animate-float"
        style={{
          background: "radial-gradient(circle, hsl(186 100% 50%) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[80px] animate-float"
        style={{
          background: "radial-gradient(circle, hsl(280 100% 50%) 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          animationDelay: "-2s",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[60px] animate-float"
        style={{
          background: "radial-gradient(circle, hsl(200 100% 50%) 0%, transparent 70%)",
          top: "50%",
          left: "60%",
          animationDelay: "-4s",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export { AnimatedBackground };
