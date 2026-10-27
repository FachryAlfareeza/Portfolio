import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="py-[21px] font-mono text-[9px] tracking-[0.03em] text-muted dark:text-white/40">
      <Container className="flex justify-between gap-5 max-[600px]:flex-col max-[600px]:gap-2">
        <span>© {new Date().getFullYear()} Muhammad Fachry Alfareeza</span>
        <span>Built with Next.js and Tailwind.</span>
      </Container>
    </footer>
  );
}
