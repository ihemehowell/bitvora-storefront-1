export function AdireStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className="h-3.5 w-full"
      style={{
        backgroundImage: `radial-gradient(circle, ${
          dark ? "rgba(247,242,231,0.35)" : "rgba(231,160,56,0.55)"
        } 1.4px, transparent 1.6px)`,
        backgroundSize: "14px 14px",
        backgroundPosition: "0 4px",
      }}
    />
  );
}
