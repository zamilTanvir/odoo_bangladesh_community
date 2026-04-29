export default function Section({ className = "", children, ...props }) {
  return (
    <section className={["py-12 sm:py-16", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </section>
  );
}

