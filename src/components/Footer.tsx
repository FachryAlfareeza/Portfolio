"use client";

import { Container } from "./Container";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { ui } = useLanguage();

  return (
    <footer className="py-[21px] font-mono text-[12px] tracking-[0.03em] text-muted dark:text-white/40">
      <Container className="flex justify-between gap-5 max-[600px]:flex-col max-[600px]:gap-2">
        <span>© {new Date().getFullYear()} Muhammad Fachry Alfareeza</span>
        <div className="flex flex-wrap items-center gap-3">
          <span>{ui.footer.builtWith}</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <a
            href="/llms.txt"
            className="transition-colors hover:text-blue-strong hover:underline dark:hover:text-orange"
          >
            {ui.footer.llmsTxt}
          </a>
        </div>
      </Container>
    </footer>
  );
}
