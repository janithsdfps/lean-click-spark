import { cakes } from "@/lib/constants";
import CakeCard from "./CakeCard";

const TopSellers = () => {
  const topSellers = cakes.slice(0, 3);

  return (
    <section id="top-sellers" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Top Sellers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Loved by many, baked for you. Discover the favorites!
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topSellers.map((cake) => (
            <CakeCard key={cake.id} {...cake} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;