import HeroSection from "../components/homeSections/HeroSection";
import FeaturedProjects from "../components/homeSections/FeaturedProjects";
import WhatWeDo from "../components/homeSections/WhatWeDo";
import Specializations from "../components/homeSections/Specializations";
import ClientStories from "../components/homeSections/ClientStories";
import ContactUs from "../components/homeSections/ContactUs";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <WhatWeDo />
      <Specializations />
      <ClientStories />
      <ContactUs />
    </main>
  );
}