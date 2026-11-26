import ContactIntro from "../../components/pages/ContactIntro";
import "../../components/pages/Editorial.css";

export const metadata = {
  title: "Contact Us | Syntrix Design",
  description:
    "Tell Syntrix about your project and the next step you have in mind.",
};

export default function ContactPage() {
  return (
    <main className="editorial-page contact-page">
      <ContactIntro />
    </main>
  );
}
