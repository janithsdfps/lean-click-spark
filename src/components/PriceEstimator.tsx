import { useState } from "react";
import { Calculator, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, formatPrice } from "@/lib/constants";

type Choice<T extends string> = { value: T; label: string; note?: string };

const baseOptions: Choice<string>[] = [
  { value: "Ribbon", label: "Ribbon", note: "Traditional" },
  { value: "Chocolate", label: "Chocolate", note: "Fudge" },
  { value: "Rich Cake", label: "Rich Cake", note: "Celebration" },
];

const weightOptions: Choice<string>[] = [
  { value: "500g", label: "500g", note: "Serves 4-6", factor: 0.5 },
  { value: "1kg", label: "1kg", note: "Serves 8-12", factor: 1 },
  { value: "1.5kg", label: "1.5kg", note: "Serves 15-18", factor: 1.5 },
  { value: "2kg+", label: "2kg+", note: "Serves 20+", factor: 2.2 },
] as Choice<string>[] & { factor: number }[];

const finishOptions: Choice<string>[] = [
  { value: "Buttercream", label: "Buttercream", note: "Soft & classic" },
  { value: "Fondant", label: "Fondant", note: "Sleek & sculpted" },
];

const deliveryOptions: Choice<string>[] = [
  { value: "Pickup", label: "Studio Pickup", note: "Free - Piliyandala" },
  { value: "Delivery", label: "Doorstep Delivery", note: "From LKR 500" },
];

const BASE_RATES: Record<string, number> = { Ribbon: 2800, Chocolate: 3200, "Rich Cake": 3800 };
const WEIGHT_FACTOR: Record<string, number> = { "500g": 0.5, "1kg": 1, "1.5kg": 1.5, "2kg+": 2.2 };
const FONDANT_FEE = 1500;
const DELIVERY_FEE = 500;

const PriceEstimator = () => {
  const [base, setBase] = useState("Ribbon");
  const [weight, setWeight] = useState("1kg");
  const [finish, setFinish] = useState("Buttercream");
  const [delivery, setDelivery] = useState("Pickup");

  const estimate = Math.round(
    (BASE_RATES[base] * WEIGHT_FACTOR[weight] + (finish === "Fondant" ? FONDANT_FEE : 0) + (delivery === "Delivery" ? DELIVERY_FEE : 0)) / 50
  ) * 50;

  const whatsappMessage = `Hi! I used the cake price estimator on your website.

- Base: ${base}
- Weight: ${weight}
- Finish: ${finish}
- ${delivery === "Pickup" ? "Pickup from Piliyandala studio" : "Doorstep delivery"}

Estimated price: ${formatPrice(estimate)}
Is this right, and can I confirm the order?`;

  const Chip = ({
    label,
    note,
    active,
    onClick,
  }: {
    label: string;
    note?: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-card-foreground hover:border-primary/50"
      }`}
    >
      <span className="block font-medium">{label}</span>
      {note && <span className={`block text-xs mt-0.5 ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{note}</span>}
    </button>
  );

  return (
    <section id="estimator" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cake Price Estimator
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pick your cake and get an instant estimate in LKR. Send it straight to us on WhatsApp to confirm.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-card-foreground mb-3">1. Cake Base</h3>
                <div className="grid grid-cols-3 gap-2">
                  {baseOptions.map((o) => (
                    <Chip key={o.value} label={o.label} note={o.note} active={base === o.value} onClick={() => setBase(o.value)} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-card-foreground mb-3">2. Weight</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {weightOptions.map((o) => (
                    <Chip key={o.value} label={o.label} note={o.note} active={weight === o.value} onClick={() => setWeight(o.value)} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-card-foreground mb-3">3. Finish</h3>
                <div className="grid grid-cols-2 gap-2">
                  {finishOptions.map((o) => (
                    <Chip key={o.value} label={o.label} note={o.note} active={finish === o.value} onClick={() => setFinish(o.value)} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-card-foreground mb-3">4. Delivery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryOptions.map((o) => (
                    <Chip key={o.value} label={o.label} note={o.note} active={delivery === o.value} onClick={() => setDelivery(o.value)} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-secondary rounded-xl p-6 text-center">
              <Calculator className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Estimated price</p>
              <p className="font-display text-4xl md:text-5xl font-bold text-foreground mb-1">
                {formatPrice(estimate)}
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                incl. {finish === "Fondant" ? "fondant finish" : "buttercream finish"}
                {delivery === "Delivery" ? " & standard delivery" : ", studio pickup"}
              </p>
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button size="lg" className="w-full rounded-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Estimate to WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <p className="flex items-start gap-2 text-xs text-muted-foreground mt-6">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            This is a rough guide only. Complex designs, toppers and add-ons may change the final price — we'll confirm everything on WhatsApp before you pay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimator;
