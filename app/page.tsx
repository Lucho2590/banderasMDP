import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProjectsGallery from "@/components/home/ProjectsGallery";
import ClientsStrip from "@/components/home/ClientsStrip";
import AboutShort from "@/components/home/AboutShort";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <ProjectsGallery />
      <ClientsStrip />
      <AboutShort />
    </div>
  );
}
