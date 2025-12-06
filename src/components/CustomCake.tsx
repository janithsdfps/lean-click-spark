import { MessageCircle, Cake, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customCakeOptions, getWhatsAppLink, getCustomCakeMessage } from "@/lib/constants";

const CustomCake = () => {
  return (
    <section id="custom" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Creation Station
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Become the artist. Design your perfect cake with our custom options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Size Options */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cake className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Sizes</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {customCakeOptions.sizes.map((size) => (
                  <li key={size.label} className="flex justify-between">
                    <span>{size.label}</span>
                    <span className="font-medium text-foreground">LKR {size.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flavor Options */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Flavors</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {customCakeOptions.flavors.map((flavor) => (
                  <li key={flavor}>{flavor}</li>
                ))}
              </ul>
            </div>

            {/* Decoration Options */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Decorations</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {customCakeOptions.decorations.map((deco) => (
                  <li key={deco}>{deco}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-secondary rounded-2xl p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
              Tell Us Your Dream Cake
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Share your vision with us and we'll create something magical. Custom designs, themes, and flavors — we make it happen!
            </p>
            <a
              href={getWhatsAppLink(getCustomCakeMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full px-8">
                <MessageCircle className="mr-2 h-5 w-5" />
                Discuss Your Custom Cake
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCake;