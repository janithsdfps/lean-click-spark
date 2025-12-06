import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

const WhatsAppButton = () => {
  return (
    <a
      href={getWhatsAppLink("Hi! I'd like to enquire about your cakes.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;