"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button";
import NewsletterSignupForm from "@/components/forms/NewsletterSignupForm";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "odoo_bd_exit_intent_shown";
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      // ignore
    }

    const onMouseLeave = (e) => {
      // Exit-intent heuristic: user moves cursor toward the top edge.
      if (e.clientY <= 0) {
        setOpen(true);
        try {
          sessionStorage.setItem(key, "1");
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("mouseleave", onMouseLeave);
    return () => window.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-float)]">
        <div className="text-sm font-semibold text-foreground">
          Want the best Odoo learning path for you?
        </div>
        <div className="mt-2 text-sm text-muted">
          Request a free consultation and we’ll recommend functional/technical training options
          aligned with your goals in Bangladesh.
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            href="/inquiry/consultation"
            variant="primary"
            size="md"
            className="flex-1"
          >
            Request Consultation
          </Button>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground hover:bg-foreground/[0.03]"
          >
            Not now
          </Link>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <NewsletterSignupForm
            compact={true}
            title="Or subscribe instead"
            subtitle="Get new guides and workshop announcements."
            ctaLabel="Subscribe"
          />
        </div>
      </div>
    </div>
  );
}

