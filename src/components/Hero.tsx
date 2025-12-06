import { useEffect, useState } from "react";
import { heroImages, getWhatsAppLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Signature cake ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 drop-shadow-lg animate-fade-in-up">
          Baking Moments into Memories
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Exquisite, handcrafted cakes from the heart of Piliyandala, for your most cherished celebrations.
        </p>
        <a
          href={getWhatsAppLink("Hi! I'd like to order a cake from Miracle Cakes.")}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-in-up inline-block"
          style={{ animationDelay: '0.4s' }}
        >
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
            <MessageCircle className="mr-2 h-5 w-5" />
            Order via WhatsApp
          </Button>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;