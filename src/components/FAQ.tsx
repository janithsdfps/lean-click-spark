import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you deliver to Katubedda?",
    a: "Yes! We deliver to Katubedda, Kesbewa, Madapatha, Maharagama, Boralesgamuwa, Kottawa and across Colombo. Delivery charges depend on your area — pickup from our Piliyandala studio is always free.",
  },
  {
    q: "How many days' notice do you need for a custom birthday cake?",
    a: "For custom designs we ask for 72 hours' notice. Simple cakes can usually be ready in 48 hours. Message us on WhatsApp and we'll tell you straight away if we can make your date.",
  },
  {
    q: "How do I place an order?",
    a: "Everything happens over WhatsApp. Tap any \"Order via WhatsApp\" button, send us the cake you like (or your own idea), and we'll confirm the design, price and delivery within the same day.",
  },
  {
    q: "How much do cakes cost?",
    a: "Prices start around LKR 3,500 for a 6-inch cake and go up with size, finish and custom work. Try our Cake Price Estimator above for an instant estimate, or ask us for a quote.",
  },
  {
    q: "Can I pick up my cake instead of having it delivered?",
    a: "Of course. Free pickup is available at our Piliyandala studio — choose \"Studio Pickup\" in the estimator or just mention it when you order.",
  },
  {
    q: "How do I pay?",
    a: "We take a small advance to lock in your date and the balance on delivery or pickup. Payment options are confirmed with you on WhatsApp when you order.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything Piliyandala bakers' customers usually ask before ordering.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl px-6">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-card-foreground hover:text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
