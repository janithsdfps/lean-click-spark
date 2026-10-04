import { MapPin, Clock, Truck, Store } from "lucide-react";
import { deliveryZones } from "@/lib/constants";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Fix
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find us, get in touch, or learn about our delivery services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Location */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-foreground">Our Location</h3>
            </div>
            <p className="text-muted-foreground mb-2">123 Cake Lane, Piliyandala, Sri Lanka</p>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>Open: Mon - Sat, 9:00 AM - 6:00 PM</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Store className="h-4 w-4" />
              Free Pickup at our Piliyandala Studio
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31692.93633842417!2d79.9099894085449!3d6.828574161706698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a452f5348f5%3A0x232f2a7818987154!2sPiliyandala!5e0!3m2!1sen!2slk!4v1687950000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Miracle Cakes Location"
              />
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-foreground">Delivery Information</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              We deliver across Colombo and its suburbs. Delivery charges are based on your location.
            </p>
            
            <div className="space-y-3">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.area}
                  className="flex justify-between items-center p-4 bg-secondary rounded-lg"
                >
                  <span className="text-foreground">{zone.area}</span>
                  <span className="font-semibold text-primary">LKR {zone.price}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Please allow a lead time of 48 hours for standard orders and 72 hours for custom cakes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;