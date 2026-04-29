export default function BrandLogo({ label = "Odoo Bangladesh" }) {
  return (
    <div
      aria-label={label}
      className="relative flex items-center justify-center"
      style={{ width: 38, height: 38 }}
    >
      {/* Outer gradient ring (placeholder logo that can be replaced later) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary2 opacity-95" />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-background/90 ring-1 ring-foreground/10">
        <span className="text-sm font-semibold text-foreground">O</span>
      </div>
    </div>
  );
}

