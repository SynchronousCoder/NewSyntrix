"use client";

import { useState } from "react";

const QUESTIONS = [
  { question: "What is your pricing structure?", answer: "Pricing depends on scope, timeline and deliverables. Most projects are quoted as fixed-fee engagements after discovery." },
  { question: "How do we get started?", answer: "Send a project request with a little context about your goals. We can then discuss the right next step together." },
  { question: "Do you work with small budgets?", answer: "The best fit depends on the goals and scope. We can talk through priorities and see what is practical for your project." },
  { question: "Can you work with an existing brand?", answer: "Yes. We can work with your current brand and build the digital experience or supporting work around it." },
  { question: "What timeline should we expect?", answer: "Timing depends on the scope, feedback and deliverables. We will outline a project schedule after learning more about the work." },
];

export default function FaqAccordion() {
 const [openIndex,setOpenIndex]=useState(0);
 return <div className="faq-list">{QUESTIONS.map((item,index)=>{const open=openIndex===index;const panelId=`faq-answer-${index}`;return <section className="faq-item" key={item.question}><h2 className="faq-question"><button className="faq-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpenIndex(open?-1:index)}><span>{item.question}</span><span className="faq-symbol" aria-hidden="true">{open?"−":"+"}</span></button></h2><div id={panelId} className="faq-answer" hidden={!open}><div className="faq-answer-inner"><p>{item.answer}</p></div></div></section>})}</div>;
}
