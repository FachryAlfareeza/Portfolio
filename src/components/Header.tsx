import { Container } from "./Container";
import { ArrowUpRight } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md dark:border-night-line dark:bg-night-900/85">
      <Container className="flex h-[76px] items-center justify-between max-[600px]:h-[65px]">
        <Logo />

        <NavLinks />

        <div className="flex items-center gap-2 max-[600px]:ml-auto">
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex min-h-[44px] items-center gap-[7px] rounded-sm2 border border-line px-[15px] text-[12px] font-bold tracking-[0.02em] transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:hover:border-orange dark:hover:text-orange max-[600px]:hidden"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-strong transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-orange" />
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
