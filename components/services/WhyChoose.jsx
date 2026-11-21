import { whySyntrix } from "../../data/services";
import "./Services.css";

export default function WhyChoose() {
  return (
    <section className="why-section container">
      <div className="why-left"><h2>Why<br />Syntrix?</h2><div className="why-art" role="img" aria-label="A person stepping through an open door"><span className="motion-background-layer" aria-hidden="true" /></div></div>
      <div className="why-right"><div className="why-copy"><span>05 / Why choose us?</span><p>A small, focused studio for companies that need more than better visuals. They need a clearer way forward.</p></div><div className="why-cards">{whySyntrix.map((item) => <div className={`why-card why-card--${item.color}`} key={item.title} aria-label={item.title} />)}</div></div>
    </section>
  );
}
