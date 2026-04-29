import Link from "next/link";

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/40",
  secondary:
    "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground/30",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/[0.04] focus-visible:ring-foreground/20",
  soft:
    "bg-primary/10 text-primary hover:bg-primary/15 focus-visible:ring-primary/30",
};

const sizeClasses = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-12 px-6 text-base rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

