export const WHATSAPP_NUMBER = "94771234567";

export const heroImages = [
  "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893327/WhatsApp_Image_2025-06-25_at_15.06.04_c76dea8f_ljps2i.jpg",
  "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893326/WhatsApp_Image_2025-06-25_at_14.36.31_5fa8d436_xcsdsq.jpg",
  "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893326/WhatsApp_Image_2025-06-25_at_15.05.28_9e8c3769_e4zdtk.jpg",
];

export const spotlightVideo = "https://res.cloudinary.com/da0sfjp8x/video/upload/v1754893311/Chocolate_Fudge_Cake_Video_Ready_jck0zn.mp4";

export const cakes = [
  {
    id: 1,
    name: "Chocolate Paradise",
    price: 4500,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754894274/choclet_paradise_ylh27g.png",
    description: "Rich, decadent chocolate layers",
  },
  {
    id: 2,
    name: "Strawberry Dream",
    price: 4200,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893326/steberry_ejixum.png",
    description: "Fresh strawberries with cream",
  },
  {
    id: 3,
    name: "Velvet Cake",
    price: 4800,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893324/velvet_cake_ijdeve.png",
    description: "Classic red velvet elegance",
  },
  {
    id: 4,
    name: "Vegan Delight",
    price: 5000,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893327/vegan_qw7sql.png",
    description: "Plant-based perfection",
  },
  {
    id: 5,
    name: "Wedding Cake",
    price: 5500,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893334/weding_f6ajlj.png",
    description: "Elegant multi-tier beauty",
  },
  {
    id: 6,
    name: "Birthday Cake",
    price: 4000,
    image: "https://res.cloudinary.com/da0sfjp8x/image/upload/v1754893325/bd_ztvaus.png",
    description: "Celebration classic",
  },
];

export const unicornCake = {
  name: "The Unicorn Miracle",
  price: 6500,
  description: "Experience pure magic with our signature Unicorn Miracle cake. Featuring layers of vibrant ribbon cake, filled with cloud-like vanilla buttercream, and adorned with a handcrafted golden horn and whimsical swirls of pastel frosting.",
};

export const customCakeOptions = {
  sizes: [
    { label: '6-inch Round', serves: '8-10 people', price: 3500 },
    { label: '8-inch Round', serves: '15-20 people', price: 5000 },
    { label: '10-inch Square', serves: '25-30 people', price: 7000 },
  ],
  flavors: ['Classic Vanilla Bean', 'Decadent Chocolate Fudge', 'Velvety Red Velvet', 'Traditional Ribbon'],
  fillings: ['Chocolate Ganache', 'Strawberry Compote', 'Salted Caramel', 'Cream Cheese'],
  decorations: ['Rainbow Sprinkles', 'Chocolate Drips', 'Edible Pearls', 'Fresh Flowers'],
};

export const deliveryZones = [
  { area: 'Colombo 1-15', price: 500 },
  { area: 'Suburbs (Dehiwala, Nugegoda, etc.)', price: 800 },
  { area: 'Extended Suburbs (Moratuwa, Malabe)', price: 1200 },
];

export const formatPrice = (price: number) => `LKR ${price.toLocaleString()}`;

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getOrderMessage = (cakeName: string, price: number) => {
  return `Hi! I'd like to order the ${cakeName} (${formatPrice(price)}). Please let me know the availability and delivery options.`;
};

export const getCustomCakeMessage = () => {
  return `Hi! I'd like to discuss a custom cake order. Can you help me design my dream cake?`;
};