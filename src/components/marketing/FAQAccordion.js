"use client";

import { useMemo, useState } from "react";

export default function FAQAccordion({ items = [] }) {
  const normalized = useMemo(() => items.filter((i) => i?.q && i?.a), [items]);
  const [openIndex, setOpenIndex] = useState(0);

  if (!normalized.length) return null;

  return (
    <div className="space-y-3">
      {normalized.map((item, idx) => {
        const open = idx === openIndex;
        return (
          <div key={`${item.q}-${idx}`} className="rounded-[var(--radius-lg)] border border-foreground/10 bg-background p-4">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-foreground">{item.q}</span>
              <span className="mt-1 text-sm text-muted">{open ? "−" : "+"}</span>
            </button>

            {open ? (
              <div className="mt-3 text-sm leading-7 text-muted">{item.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

