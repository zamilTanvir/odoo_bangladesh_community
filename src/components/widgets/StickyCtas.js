import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import WhatsAppChatButton from "@/components/widgets/WhatsAppChatButton";

export default function StickyCtas() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Reveal delayMs={0} className="pointer-events-auto">
        <Button
          href="/inquiry/consultation"
          variant="primary"
          size="md"
          className="shadow-[var(--shadow-soft)]"
        >
          Request Consultation
        </Button>
      </Reveal>

      <Reveal delayMs={80} className="pointer-events-auto">
        <WhatsAppChatButton />
      </Reveal>
    </div>
  );
}

