import Section from "@/components/ui/Section";
import LeadInquiryForm from "@/components/forms/LeadInquiryForm";

export default function ConsultationInquiryPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Section className="pb-6">
        <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          Book a Free Career Consultation
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Tell us your learning or implementation goals. We’ll recommend relevant functional &
          technical training paths in Bangladesh.
        </p>
      </Section>

      <LeadInquiryForm
        inquiryType="CONSULTATION"
        title="Request Consultation"
        ctaLabel="Submit Request"
      />
    </div>
  );
}

