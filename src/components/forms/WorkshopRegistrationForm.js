"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function WorkshopRegistrationForm({
  track,
  topic,
  cohort = "Next Batch",
  title = "Register for Free Workshop",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      const res = await fetch("/api/workshops/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hp: website,
          track,
          topic,
          cohort,
          name: name.trim() || null,
          email: safeEmail,
          phone: phone.trim() || null,
          company: company.trim() || null,
          role: role.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to register.");
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
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className="mb-1 text-sm font-semibold text-foreground">{title}</div>
      <div className="text-sm text-muted">
        Join the learning session for <span className="font-medium text-foreground">{topic}</span>.
      </div>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
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
            label="Full name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rahim Hasan"
          />
          <Input
            label="Email (required)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXXXXXXXX"
          />
          <Input
            label="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company / Organization"
          />
        </div>

        <div>
          <Input
            label="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Accountant, Developer, Owner..."
          />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        {success ? (
          <div className="text-sm text-foreground">
            Registration received. We’ll share session details soon.
          </div>
        ) : null}

        <Button variant="primary" size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </Button>
      </form>
    </div>
  );
}

