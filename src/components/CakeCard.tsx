import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getWhatsAppLink, getOrderMessage } from "@/lib/constants";

interface CakeCardProps {
  name: string;
  price: number;
  image: string;
  description?: string;
}

const CakeCard = ({ name, price, image, description }: CakeCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-card-foreground mb-1">{name}</h3>
        {description && (
          <p className="text-muted-foreground text-sm mb-3">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">{formatPrice(price)}</span>
          <a
            href={getWhatsAppLink(getOrderMessage(name, price))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              <MessageCircle className="mr-1 h-4 w-4" />
              Order
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;