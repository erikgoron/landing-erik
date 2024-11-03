import AICategoriesComponent from "@/components/AICategoriesComponent";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JourneyTimeline from "@/components/JourneyTimeline";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AICategoriesComponent />
      <JourneyTimeline />
      <Footer />
    </div>
  );
}
