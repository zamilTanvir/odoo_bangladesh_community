"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LeadInquiryForm({
  submitUrl = "/api/inquiries",
  inquiryType = "CONSULTATION",
  title = "Request Consultation",
  defaultMessage,
  ctaLabel = "Submit",
  compact = false,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState(defaultMessage || "");
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
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hp: website,
          type: inquiryType,
          name: name.trim() || null,
          email: safeEmail,
          phone: phone.trim() || null,
          company: company.trim() || null,
          role: role.trim() || null,
          source: payloadSource,
          message: message.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Something went wrong.");
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
        <div className="mt-1 text-sm text-muted">
          Share your details and we’ll connect you with the right Odoo learning path in Bangladesh.
        </div>
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
            label="Full name"
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

        <div>
          <Input
            as="textarea"
            label="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you want to learn / implement"
            rows={4}
          />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        {success ? (
          <div className="text-sm text-foreground">
            Thanks. Your request has been submitted. We’ll get back soon.
          </div>
        ) : null}

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : ctaLabel}
        </Button>
      </form>
    </div>
  );
}

