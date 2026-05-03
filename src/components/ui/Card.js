export default function Card({ className = "", ...props }) {
  return (
    <div
      className={[
        "rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-card)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

