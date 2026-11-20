import HeroSection from "../components/home/HeroSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import WhatWeDo from "../components/home/WhatWeDo";
import Specializations from "../components/home/Specializations";
import ClientStories from "../components/home/ClientStories";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <WhatWeDo />
      <Specializations />
      <ClientStories />
    </main>
  );
}
