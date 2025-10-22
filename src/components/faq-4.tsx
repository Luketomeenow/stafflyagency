import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Staffly right for my organization?",
    answer:
      "Yes. If your organization has more than 5 employees, Staffly fits right into your workflow.",
  },
  {
    question: "Is Staffly secure?",
    answer:
      "We use SSL and 256-bit encryption for all data transfers, plus a built-in firewall that blocks logins from unknown IPs.",
  },
  {
    question: "Are there per-user fees?",
    answer:
      "No per-user fees. The only extra costs occur if you change plans or exceed monthly thresholds for usage.",
  },
  {
    question: "Do you charge for text messaging?",
    answer:
      "Most text messages are included in the Staffly Crew plan. If you exceed the monthly amount (e.g., 500), small surcharges apply.",
  },
  {
    question: "What if we have 1,000 employees?",
    answer:
      "Great—Staffly scales from 10 to 10,000+ employees. Contact us for enterprise plans.",
  },
  {
    question: "How does Staffly save us money?",
    answer:
      "Staffly consolidates multiple tools into one integrated platform, reducing subscription sprawl and overall cost.",
  },
  {
    question: "Do you charge setup fees?",
    answer:
      "No setup fees. The only extras are usage overages or optional customizations and training beyond standard support.",
  },
  {
    question: "What kind of support is offered?",
    answer:
      "We provide a detailed knowledge base plus training and support during business hours. You can book sessions with our team.",
  },
]

export function Component() {
  return (
    <section id="faq">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h2 className="text-primary font-mono text-[14px] font-medium tracking-tight">
            FAQ
          </h2>
          <h4 className="mx-auto mb-2 max-w-3xl text-[42px] font-medium tracking-tighter text-balance">
            Frequently Asked Questions
          </h4>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-2xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
