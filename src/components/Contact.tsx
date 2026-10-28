import { Container } from "./Container";
import { ContactForm } from "./ContactForm";
import { DownloadIcon } from "./icons";
import type { Profile } from "@/content";

const CV_PATH = "/assets/Fachry-Alfareeza-ATS-CV.pdf";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="bg-blue-deep py-20 text-[#eaf3fb] dark:bg-night-800 dark:text-[#F4EFEA]"
    >
      <Container className="grid grid-cols-2 items-start gap-10 max-[800px]:grid-cols-1">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-orange">
            Contact
          </p>
          <h2 className="mt-3 text-[clamp(34px,5vw,54px)] leading-[1.1]">
            Let&apos;s <em className="font-serif font-normal not-italic text-orange">work</em> together.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[47px] items-center rounded-sm2 bg-orange px-[18px] text-[12px] font-bold text-night-900 transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-orange-strong"
            >
              {profile.email}
            </a>
            <a
              href={CV_PATH}
              download
              className="inline-flex min-h-[47px] items-center gap-[10px] rounded-sm2 border border-white/25 px-[18px] text-[12px] font-bold text-[#f1f4ed] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Download CV
              <DownloadIcon className="h-[15px] w-[15px]" />
            </a>
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
