"use client";

import { useState } from "react";

const scopes = ["Create / Redesign My Website", "Brand Strategy & Identity", "Improve My SEO", "Software & Automation", "Advertising (Meta Ads)"];

export default function ProjectRequestForm() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedScopes = new FormData(form).getAll("scope");
    setSubmitted(true);
    setFeedback(`Your details passed validation${selectedScopes.length ? ` with ${selectedScopes.length} service${selectedScopes.length === 1 ? "" : "s"} selected` : ""}, but this form is not connected to a submission service yet. Please email wesyntrix@gmail.com to send your request.`);
  }

  return <form className="project-form" onSubmit={handleSubmit}>
    <h2>Fill out the form</h2>
    <div className="form-grid">
      <div className="form-field form-field--wide"><fieldset><legend>Your scope</legend><div className="scope-options">{scopes.map((scope) => <label className="scope-option" key={scope}><input type="checkbox" name="scope" value={scope}/><span>{scope}</span></label>)}</div></fieldset></div>
      <div className="form-field"><label htmlFor="budget">Your budget</label><input id="budget" name="budget" placeholder="Enter Your Budget" required/></div>
      <div className="form-field"><label htmlFor="timeline">Your timeline</label><input id="timeline" name="timeline" placeholder="Enter Your Timeline" required/></div>
      <div className="form-field"><label htmlFor="contact-name">Your contact name</label><input id="contact-name" name="name" placeholder="Enter Your Name" autoComplete="name" required/></div>
      <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" placeholder="Enter Your Email" autoComplete="email" required/></div>
      <div className="form-field form-field--wide"><label htmlFor="project-details">Tell us about the project</label><textarea id="project-details" name="details" placeholder="Tell Us More Details About The Project" required/></div>
      <button className="form-submit" type="submit" disabled={submitted}>Submit project request</button>
    </div>
    <p className="form-feedback" role="status" aria-live="polite">{feedback}</p>
  </form>;
}
