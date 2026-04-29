export default function Card({ className = "", ...props }) {
  return (
    <div
      className={[
        "rounded-[var(--radius-lg)] border border-foreground/10 bg-background shadow-[var(--shadow-soft)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

