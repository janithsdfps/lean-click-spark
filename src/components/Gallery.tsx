import { useState } from "react";
import { useCakes, type CakeCategory } from "@/hooks/use-cakes";
import CakeCard from "./CakeCard";

const tabs: { value: "all" | CakeCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "birthdays", label: "Birthdays" },
  { value: "weddings", label: "Weddings" },
  { value: "everyday", label: "Everyday Cakes" },
];

const Gallery = () => {
  const { data: cakes = [], isLoading } = useCakes();
  const [active, setActive] = useState<"all" | CakeCategory>("all");

  const visible = active === "all" ? cakes : cakes.filter((c) => c.category === active);

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Full Gallery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A showcase of our most beloved creations, perfect for any occasion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Cake categories">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={active === tab.value}
              onClick={() => setActive(tab.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-200 ${
                active === tab.value
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading cakes...</p>
        ) : visible.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No cakes in this category yet — check back soon, or ask us on WhatsApp!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((cake) => (
              <CakeCard
                key={cake.id}
                name={cake.name}
                price={cake.price}
                image={cake.image_url ?? "/placeholder.svg"}
                description={cake.description ?? undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
