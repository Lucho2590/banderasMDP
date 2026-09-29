import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Benefits from "@/components/home/Benefits";
import AboutShort from "@/components/home/AboutShort";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCategories />
      <Benefits />
      <AboutShort />
      <WhatsAppCTA />
    </div>
  );
}
