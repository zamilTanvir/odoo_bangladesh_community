"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function NewsletterSignupForm({
  title = "Newsletter",
  subtitle = "Get new guides, training updates, and event announcements (no spam).",
  ctaLabel = "Subscribe",
  compact = false,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const payloadSource = useMemo(() => {
    if (typeof window === "undefined") return null;
    return "website";
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const safeEmail = email.trim();
    if (!safeEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hp: website,
          name: name.trim() || null,
          email: safeEmail,
          source: payloadSource,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to subscribe.");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "" : "rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[0_1px_0_rgba(15,23,42,0.03)]"}>
      <div className="mb-4">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-1 text-sm text-muted">{subtitle}</div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="hidden" aria-hidden="true">
          <label className="block text-sm font-medium text-foreground">
            Website
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rahim Hasan"
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
          />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        {success ? <div className="text-sm text-foreground">Subscribed. Thank you.</div> : null}

        <Button variant="primary" size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Subscribing..." : ctaLabel}
        </Button>
      </form>
    </div>
  );
}

