import { loadSite } from "@/lib/content/loadContent";

export default function WhatsAppChatButton({ className = "" }) {
  const site = loadSite();
  const link = site.whatsappLink;

  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground transition-colors hover:bg-foreground/[0.03]",
        className,
      ].join(" ")}
      aria-label="Chat on WhatsApp"
      title="WhatsApp chat"
    >
      <span className="text-sm font-semibold">WA</span>
    </a>
  );
}

