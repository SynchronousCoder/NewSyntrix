import RevealImage from "../../components/animations/RevealImage";
import PageHeader from "../../components/shared/PageHeader";
import CurveTransition from "../../components/shared/CurveTransition/CurveTransition";
import "../../components/pages/Editorial.css";

export const metadata = {
  title: "About Us | Syntrix Design",
  description:
    "Meet Syntrix, a close-knit creative team bringing strategy, design and development together.",
};

export default function AboutPage() {
  return (
    <main className="editorial-page about-page">
      <section className="editorial-hero" aria-labelledby="about-title">
        <div className="editorial-hero-media">
          <RevealImage
            src="/image/blueDoor.png.png"
            alt="A blue door standing in an open landscape"
            width={458}
            height={724}
            priority
          />
          <div className="editorial-image-fade" aria-hidden="true" />
        </div>
        <PageHeader
          className="editorial-hero-copy"
          label="/ About Us"
          title="Creativity Backed By Clarity."
          titleId="about-title"
          description="We're a creative agency driven by thoughtful design, meaningful ideas, and a genuine commitment to the brands and businesses we work with."
        />
        <div className="editorial-scroll">Scroll Down</div>
      </section>
      <section className="about-intro">
        <h2 className="about-statement">
          We&apos;re a close-knit creative team bringing strategy, design and
          development together. We work hands-on, think collaboratively, and
          take every project from the first idea to the final experience.
        </h2>
      </section>
      <figure className="about-team">
        <RevealImage
          src="/image/teamMeet.png"
          alt="Two creative collaborators working together at a screen"
          width={1400}
          height={616}
          sizes="100vw"
        />
        <div className="editorial-image-fade" aria-hidden="true" />
      </figure>
      <section className="about-manifesto">
        <RevealImage
          src="/image/cameraGirl.png"
          alt="A filmmaker shines a bright yellow beam across a light background"
          width={583}
          height={512}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className="about-manifesto-copy">
          <span className="editorial-label">01 / Manifesto</span>
          <p>
            Every business has somewhere it wants to go. What matters is having
            the clarity to know how to get there. Without direction, ideas lose
            focus, brands lose their voice, and experiences lose their purpose.
          </p>
          <p>
            We believe progress happens when strategy, creativity, and
            technology work together with intention.
          </p>
          <p>
            That&apos;s why Syntrix exists. To bring clarity to ambition, turn
            ideas into experiences, and help businesses move forward.
          </p>
        </div>
      </section>
      <CurveTransition />
    </main>
  );
}
