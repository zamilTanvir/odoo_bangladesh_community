export default function Input({
  label,
  hint,
  error,
  as = "input",
  className = "",
  ...props
}) {
  const inputClasses =
    "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50";

  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")}>
      {label ? (
        <label className="block text-sm font-medium text-foreground">{label}</label>
      ) : null}

      {as === "textarea" ? (
        <textarea className={inputClasses} {...props} />
      ) : (
        <input className={inputClasses} {...props} />
      )}

      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      {!error && hint ? <div className="text-sm text-muted">{hint}</div> : null}
    </div>
  );
}

