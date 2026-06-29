export default function BrandLogo({ label = "Odoo Bangladesh" }) {
  return (
    <div
      aria-label={label}
      className="relative flex items-center justify-center"
      style={{ width: 38, height: 38 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary2 opacity-95" />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-background/90 ring-1 ring-foreground/10">
        <i className="oi oi-odoo text-lg text-primary" aria-hidden="true" />
      </div>
    </div>
  );
}

