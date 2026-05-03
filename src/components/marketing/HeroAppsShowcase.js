import Link from "next/link";

function AppGlyph({ variant = "a" }) {
  if (variant === "b") {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="color-mix(in srgb, var(--brand-primary-2) 85%, white)" />
            <stop offset="1" stopColor="color-mix(in srgb, var(--brand-accent) 82%, white)" />
          </linearGradient>
        </defs>
        <path
          d="M12 28c0-8 6-14 14-14h10v10c0 8-6 14-14 14H12V28z"
          fill="url(#g2)"
          opacity="0.92"
        />
        <path
          d="M12 16h10c6.6 0 12 5.4 12 12v10H24c-6.6 0-12-5.4-12-12V16z"
          fill="color-mix(in srgb, var(--brand-primary) 70%, white)"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (variant === "c") {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="color-mix(in srgb, var(--brand-accent) 85%, white)" />
            <stop offset="1" stopColor="color-mix(in srgb, var(--brand-primary) 78%, white)" />
          </linearGradient>
        </defs>
        <path
          d="M10 26c0-10 8-18 18-18h10v10c0 10-8 18-18 18H10V26z"
          fill="url(#g3)"
          opacity="0.92"
        />
        <circle cx="18" cy="18" r="6" fill="color-mix(in srgb, var(--brand-primary-2) 72%, white)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="color-mix(in srgb, var(--brand-primary) 82%, white)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--brand-primary-2) 82%, white)" />
        </linearGradient>
      </defs>
      <path
        d="M12 12h24v24H12z"
        rx="8"
        fill="url(#g1)"
        opacity="0.92"
      />
      <path
        d="M18 30l12-12"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M19 19h10"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

export default function HeroAppsShowcase({ eventLabel, eventHref = "/events" }) {
  const apps = [
    { label: "Accounting", variant: "a" },
    { label: "Knowledge", variant: "b" },
    { label: "Sign", variant: "c" },
    { label: "CRM", variant: "a" },
    { label: "Studio", variant: "b" },
    { label: "Subscriptions", variant: "c" },
    { label: "AI", variant: "b" },
    { label: "Point of Sale", variant: "a" },
    { label: "Discuss", variant: "c" },
    { label: "Documents", variant: "b" },
    { label: "Project", variant: "a" },
    { label: "Timesheets", variant: "c" },
    { label: "Field Service", variant: "a" },
    { label: "Planning", variant: "b" },
    { label: "Helpdesk", variant: "c" },
    { label: "eCommerce", variant: "a" },
    { label: "Website", variant: "b" },
    { label: "Email Marketing", variant: "c" },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[26px] bg-gradient-to-b from-surface2/80 to-background blur-0" />

      <div className="rounded-[26px] border border-border bg-surface/70 p-5 backdrop-blur sm:p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-center">
          <Link
            href={eventHref}
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-medium text-muted shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:text-foreground"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-primary2" aria-hidden="true" />
            <span className="text-balance">{eventLabel || "Community workshop — register for the next session"}</span>
            <span className="text-primary group-hover:underline">Register →</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {apps.map((app) => (
            <div key={app.label} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] border border-border bg-background shadow-[0_1px_0_rgba(15,23,42,0.04)]">
                <AppGlyph variant={app.variant} />
              </div>
              <div className="mt-2 text-[11px] font-medium text-foreground/90">{app.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[18px] border border-border bg-surface2 p-4">
          <div className="text-xs text-muted">
            Explore how these apps connect across workflows in Bangladesh—module-by-module, industry-by-industry.
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link href="/modules" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
              Browse modules
            </Link>
            <Link href="/industries" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
              Browse industries
            </Link>
            <Link href="/training/functional" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
              Functional training
            </Link>
            <Link href="/training/technical" className="rounded-full border border-border bg-surface px-3 py-1 text-muted hover:text-foreground">
              Technical training
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

