import RevealText from "../animations/RevealText";

/** Shared copy block keeps the four interior page headers on one baseline. */
export default function PageHeader({ label, title, description, titleId, className = "", descriptionClassName = "", delay = 0.12 }) {
  return (
    <div className={`page-header ${className}`}>
      <span className="page-header-label">{label}</span>
      <RevealText as="h1" id={titleId} className="page-header-title">{title}</RevealText>
      <RevealText as="p" className={`page-header-description ${descriptionClassName}`} delay={delay}>{description}</RevealText>
    </div>
  );
}
