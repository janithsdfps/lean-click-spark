import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spotlightVideo, unicornCake, formatPrice, getWhatsAppLink, getOrderMessage } from "@/lib/constants";

const Spotlight = () => {
  return (
    <section id="spotlight" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <video
              src={spotlightVideo}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg shadow-xl w-full aspect-video object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Product Spotlight
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
              {unicornCake.name}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {unicornCake.description}
            </p>
            <p className="text-2xl font-bold text-foreground mb-6">
              {formatPrice(unicornCake.price)}
            </p>
            <a
              href={getWhatsAppLink(getOrderMessage(unicornCake.name, unicornCake.price))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full px-8">
                <MessageCircle className="mr-2 h-5 w-5" />
                Order The Magic
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;