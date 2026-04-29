"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SyllabusDownloadForm({
  topicSlug,
  topicTitle,
  downloadTitle = "Download Syllabus (PDF)",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requested, setRequested] = useState(false);

  async function onDownload(e) {
    e.preventDefault();
    setError(null);

    const safeEmail = email.trim();
    if (!safeEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/downloads/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicSlug,
          name: name.trim() || null,
          email: safeEmail,
          phone: phone.trim() || null,
          company: company.trim() || null,
          role: role.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to request syllabus.");
        return;
      }

      setRequested(true);
      window.location.href = data.downloadUrl;
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-foreground/10 bg-background p-6">
      <div className="mb-2 text-sm font-semibold text-foreground">{downloadTitle}</div>
      <div className="text-sm text-muted">
        Get the syllabus instantly after a quick form (educational resource download).
      </div>

      <form onSubmit={onDownload} className="mt-4 space-y-4">
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
        {requested ? (
          <div className="text-sm text-foreground">Download started.</div>
        ) : null}

        <Button variant="soft" size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Preparing PDF..." : `Download for: ${topicTitle || topicSlug}`}
        </Button>
      </form>
    </div>
  );
}

