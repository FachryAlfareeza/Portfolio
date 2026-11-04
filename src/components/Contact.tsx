"use client";

import { Container } from "./Container";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";
import { DownloadIcon } from "./icons";
import { useLanguage } from "./LanguageProvider";
import type { Profile } from "@/content";

const CV_PATH = "/assets/Fachry-Alfareeza-ATS-CV.pdf";

export function Contact({ profile: initialProfile }: { profile: Profile }) {
  const { data, ui } = useLanguage();
  const profile = data.profile ?? initialProfile;

  return (
    <section
      id="contact"
      className="contact-panel relative overflow-hidden bg-blue-deep py-20 text-[#eaf3fb] dark:bg-night-800 dark:text-[#F4EFEA]"
    >
      {/* Subtle Eja monogram pattern watermark faded across the left side */}
      <div
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "radial-gradient(65% 90% at 18% 50%, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(65% 90% at 18% 50%, black 0%, transparent 80%)",
        }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="brand-pattern h-full w-full text-blue/[0.08] dark:text-orange/[0.055]" />
      </div>

      <Container className="relative z-10 grid grid-cols-2 items-start gap-10 max-[800px]:grid-cols-1">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-orange">
            {ui.contact.kicker}
          </p>
          <h2 className="mt-3 text-[clamp(34px,5vw,54px)] leading-[1.1]">
            {ui.contact.headingPrefix}
            <em className="font-serif font-normal not-italic text-orange">
              {ui.contact.headingEm}
            </em>
            {ui.contact.headingSuffix}
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
              {ui.contact.downloadCv}
              <DownloadIcon className="h-[15px] w-[15px]" />
            </a>
            <CopyButton
              tone="onDark"
              label={ui.contact.copyEmail}
              copiedLabel={ui.contact.copied}
              className="min-h-[47px] text-[12px]"
              text={profile.email}
            />
          </div>
        </div>

        <ContactForm fallbackEmail={profile.email} />
      </Container>
    </section>
  );
}
