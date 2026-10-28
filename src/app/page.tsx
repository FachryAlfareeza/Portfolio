import { portfolio } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  const {
    profile,
    social,
    skillGroups,
    projects,
    experience,
    education,
    training,
    awards,
  } = portfolio;

  return (
    <>
      <a
        href="#about"
        className="absolute left-4 top-[-60px] z-[100] bg-white px-3 py-2 text-ink focus:top-3"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      {/* tabIndex=-1: programmatic focus target for "Back to top" (not a tab stop). */}
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero profile={profile} />

        <Section id="about" index="01" label="About">
          <About profile={profile} social={social} />
        </Section>

        <Section id="skills" index="02" label="Skills">
          <Skills groups={skillGroups} />
        </Section>

        {/* Projects keeps the numbered two-column layout but hosts a client filter */}
        <section id="projects" className="border-t border-line dark:border-white/10">
          <Container className="grid grid-cols-[190px_1fr] gap-[7%] py-20 pb-[90px] max-[800px]:grid-cols-[130px_1fr] max-[800px]:gap-[5%] max-[600px]:block max-[600px]:py-[52px]">
            <div className="max-[600px]:mb-5">
              <SectionLabel index="03">Projects</SectionLabel>
            </div>
            <Reveal className="min-w-0">
              <Projects projects={projects} />
            </Reveal>
          </Container>
        </section>

        <Section id="experience" index="04" label="Experience">
          <Timeline items={experience} />
        </Section>

        <Section id="credentials" index="05" label="Credentials">
          <Credentials
            education={education}
            training={training}
            awards={awards}
          />
        </Section>
      </main>

      <Contact profile={profile} />
      <Footer />
      <BackToTop />
    </>
  );
}
