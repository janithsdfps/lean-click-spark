import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nadeesha P.",
    area: "Kesbewa",
    quote: "The birthday cake for my daughter was stunning — the fondant work looked exactly like the photo I sent. Everyone at the party kept asking where we got it!",
  },
  {
    name: "Ruwan J.",
    area: "Maharagama",
    quote: "Ordered the chocolate fudge for our office celebration. Super moist, not too sweet, and it arrived on time to Maharagama. Ordering over WhatsApp took two minutes.",
  },
  {
    name: "Tharindu & Sanduni",
    area: "Kottawa",
    quote: "Our engagement cake was the highlight of the evening. Beautiful ribbon layers inside and a design that matched our theme perfectly. Thank you Miracle Cakes!",
  },
  {
    name: "Amaya S.",
    area: "Boralesgamuwa",
    quote: "Picked up our order from the Piliyandala studio — the butter cake was fresh out of the oven and still warm. This is now our family's go-to bakery.",
  },
];

const Testimonials = () => {
  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Feedback from cake lovers around Piliyandala and nearby areas.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm">
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <blockquote className="text-muted-foreground text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-border">
                <span className="block font-display font-semibold text-card-foreground">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.area}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
