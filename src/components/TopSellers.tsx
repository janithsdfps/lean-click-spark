import { useCakes } from "@/hooks/use-cakes";
import CakeCard from "./CakeCard";

const TopSellers = () => {
  const { data: cakes = [] } = useCakes();
  const featured = cakes.filter((c) => c.featured);
  const topSellers = (featured.length ? featured : cakes).slice(0, 3);

  if (!topSellers.length) return null;

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
            <CakeCard
              key={cake.id}
              name={cake.name}
              price={cake.price}
              image={cake.image_url ?? "/placeholder.svg"}
              description={cake.description ?? undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
