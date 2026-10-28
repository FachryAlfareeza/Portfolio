import { Container } from "./Container";
import { ArrowUpRight } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md dark:border-night-line dark:bg-night-900/85">
      <Container className="flex h-[76px] items-center justify-between max-[600px]:h-[65px]">
        <Logo />

        <nav
          aria-label="Primary"
          className="ml-auto mr-10 flex gap-[34px] max-[800px]:mr-5 max-[800px]:gap-[18px] max-[600px]:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-bold tracking-[0.02em] text-muted transition-colors hover:text-blue-strong dark:text-white/60 dark:hover:text-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 max-[600px]:ml-auto">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center gap-[7px] rounded-sm2 border border-line px-[15px] text-[12px] font-bold tracking-[0.02em] transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:hover:border-orange dark:hover:text-orange"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-strong dark:text-orange" />
          </a>
        </div>
      </Container>
    </header>
  );
}
