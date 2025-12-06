import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopSellers from "@/components/TopSellers";
import Spotlight from "@/components/Spotlight";
import Gallery from "@/components/Gallery";
import CustomCake from "@/components/CustomCake";
import OurStory from "@/components/OurStory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <TopSellers />
      <Spotlight />
      <Gallery />
      <CustomCake />
      <OurStory />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;