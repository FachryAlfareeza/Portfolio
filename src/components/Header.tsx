import { Container } from "./Container";
import { ArrowUpRight } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md dark:border-white/10 dark:bg-forest-900/85">
      <Container className="flex h-[76px] items-center justify-between max-[600px]:h-[65px]">
        <a
          href="#top"
          className="text-xl font-extrabold tracking-[-0.07em] transition-colors hover:text-green"
        >
          Portfolio<span className="text-green">.</span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-auto mr-10 flex gap-[34px] max-[800px]:mr-5 max-[800px]:gap-[18px] max-[600px]:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-bold tracking-[0.02em] text-muted transition-colors hover:text-green dark:text-white/60 dark:hover:text-lime"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 max-[600px]:ml-auto">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center gap-[7px] rounded-sm2 border border-line px-[15px] text-[12px] font-bold tracking-[0.02em] transition-colors hover:border-green hover:text-green dark:border-white/15 dark:hover:border-lime dark:hover:text-lime"
          >
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5 text-green dark:text-lime" />
          </a>
        </div>
      </Container>
    </header>
  );
}
