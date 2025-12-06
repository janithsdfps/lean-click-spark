import { cakes } from "@/lib/constants";
import CakeCard from "./CakeCard";

const Gallery = () => {
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
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} {...cake} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;