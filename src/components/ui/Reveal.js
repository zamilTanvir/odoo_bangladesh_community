"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delayMs = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

