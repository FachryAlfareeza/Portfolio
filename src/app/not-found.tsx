import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main>
      <Container className="flex min-h-screen flex-col items-start justify-center gap-5 py-24">
        <p className="font-mono text-micro uppercase text-blue-strong dark:text-orange">
          404
        </p>
        <h1 className="text-[clamp(36px,6vw,64px)] font-bold leading-[1.08] tracking-tightest">
          That page doesn&apos;t exist.
        </h1>
        <p className="max-w-[460px] text-[16px] leading-[1.8] text-muted dark:text-white/60">
          The link may be old or mistyped. The portfolio is on the home page.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[47px] items-center rounded-sm2 bg-blue-strong px-[18px] text-[12px] font-bold text-white transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-blue-deep dark:bg-orange dark:text-night-900 dark:hover:bg-orange-strong"
        >
          Back to home
        </Link>
      </Container>
    </main>
  );
}
