import Link from "next/link";
import "./Services.css";

export default function ServiceBlock({ service }) {
  return (
    <section
      className="service-block container"
      id={`service-${service.index}`}
    >
      <div className="service-topline">
        <span>
          {service.index} / {service.eyebrow}
        </span>
      </div>
      <div className="service-heading">
        <h2>{service.title}</h2>
      </div>
      <div className="service-details">
        <div className="service-direction">
          <h3>{service.direction}</h3>
          <p>{service.summary}</p>
          <div className="service-metrics">
            <div>
              <span>Timeline</span>
              <strong>{service.timeline}</strong>
            </div>
            <div>
              <span>Investment</span>
              <strong>{service.investment}</strong>
            </div>
          </div>
        </div>
        <div className="service-list">
          <h3>{service.listTitle}</h3>
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="service-visuals">
        {[0, 1, 2].map((slot) => (
          <div className="service-placeholder" key={slot} aria-hidden="true" />
        ))}
        <Link
          className={`service-cta service-cta--${service.color}`}
          href="/#contact"
        >
          <span>{service.cta}</span>
          <strong>
            Start Project <b aria-hidden="true">+</b>
          </strong>
        </Link>
      </div>
    </section>
  );
}
