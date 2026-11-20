import ServicesIntro from "../../components/services/ServicesIntro";
import ServiceBlock from "../../components/services/ServiceBlock";
import { services } from "../../data/services";
import FaqAccordion from "../../components/pages/FaqAccordion";
import CurveTransition from "../../components/shared/CurveTransition/CurveTransition";
import "../../components/pages/Editorial.css";

export const metadata = {
  title: "Services | Syntrix Design",
  description:
    "Brand strategy, digital experiences, software, and growth services from Syntrix Design.",
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <ServicesIntro />
      {services.map((service) => (
        <ServiceBlock key={service.index} service={service} />
      ))}
      <section className="faq-section service-faq" id="faqs">
        <div>
          <span className="service-topline">05 / FAQs</span>
          <h2 className="faq-heading">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion />
      </section>
      <CurveTransition />
    </main>
  );
}
