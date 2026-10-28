import type { ReactNode } from "react";
import { Container } from "./Container";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Legacy .section: two-column grid (190px label / content), top border.
// Collapses to a single column on mobile.
export function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line dark:border-white/10">
      <Container className="grid grid-cols-[190px_1fr] gap-[7%] py-20 max-[800px]:grid-cols-[130px_1fr] max-[800px]:gap-[5%] max-[600px]:block max-[600px]:py-[52px]">
        <div className="max-[600px]:mb-5">
          <SectionLabel index={index}>{label}</SectionLabel>
        </div>
        <Reveal className="min-w-0">{children}</Reveal>
      </Container>
    </section>
  );
}
