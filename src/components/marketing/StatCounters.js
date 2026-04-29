"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function formatValue(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M+`;
  if (value >= 1000) return `${Math.round(value / 100) / 10}K+`;
  return `${value}+`;
}

export default function StatCounters({ stats = [] }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  const [values, setValues] = useState(() => stats.map(() => 0));

  const normalizedStats = useMemo(() => stats, [stats]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const durationMs = 900;
    const start = performance.now();
    const targets = normalizedStats.map((s) => s.value);

    let rafId;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValues(targets.map((target) => Math.round(target * eased)));

      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, normalizedStats]);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-3">
      {normalizedStats.map((stat, idx) => (
        <div
          key={stat.label}
          className="rounded-[var(--radius-lg)] border border-foreground/10 bg-background/70 p-4 backdrop-blur"
        >
          <div className="text-2xl font-semibold text-foreground">
            {formatValue(values[idx] || 0)}
          </div>
          <div className="mt-2 text-sm text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

