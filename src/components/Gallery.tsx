import { useCakes } from "@/hooks/use-cakes";
import CakeCard from "./CakeCard";

const Gallery = () => {
  const { data: cakes = [], isLoading } = useCakes();

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

        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading cakes...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cakes.map((cake) => (
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
