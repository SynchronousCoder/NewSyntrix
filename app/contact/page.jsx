import RevealImage from "../../components/animations/RevealImage";
import PageHeader from "../../components/shared/PageHeader";
import ProjectRequestForm from "../../components/pages/ProjectRequestForm";
import "../../components/pages/Editorial.css";

export const metadata = { title: "Contact Us | Syntrix Design", description: "Tell Syntrix about your project and the next step you have in mind." };

export default function ContactPage() {
  return <main className="editorial-page contact-page">
    <section className="editorial-hero contact-page-hero" aria-labelledby="contact-title">
      <div className="editorial-hero-media"><RevealImage src="/image/futureHandsake.png" alt="An abstract handshake representing a creative partnership" width={458} height={814} priority/><div className="editorial-image-fade" aria-hidden="true"/></div>
      <PageHeader className="editorial-hero-copy" label="/ Contact Us" title="Let's Build Something Original" titleId="contact-title" description={<>Tell us where you&apos;re headed. Share your project and we&apos;ll map out the next step.<br/><br/>Or email us at <a href="mailto:wesyntrix@gmail.com">wesyntrix@gmail.com</a></>} />
      <a className="editorial-scroll" href="#project-request">Scroll Down</a>
    </section>
    <section className="contact-form-section" id="project-request"><div className="contact-form-intro"><h2>Get In Touch</h2><p>Do you need a website? A question, an idea, a project? Now is the time to <strong>contact us.</strong></p><p className="contact-form-note">Every client is different, each with their own unique needs and business objectives. <strong>SYNTRIX</strong> is here to listen.</p></div><ProjectRequestForm/></section>
  </main>;
}
