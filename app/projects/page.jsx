import ProjectsIntro from "../../components/projects/ProjectsIntro";
import ProjectsFilter from "../../components/projects/ProjectsFilter";
import "../../components/pages/Editorial.css";

export const metadata = {
  title: "Projects | Syntrix Design",
  description:
    "Selected branding, website, and marketing projects by Syntrix Design.",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <ProjectsIntro />
      <ProjectsFilter />
    </main>
  );
}
