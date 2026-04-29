import Link from "next/link";
import BrandLogo from "@/components/site/BrandLogo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Odoo Bangladesh</div>
            <div className="text-xs text-muted">Learn, implement & connect</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/about" className="text-muted transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/blog" className="text-muted transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/modules" className="text-muted transition-colors hover:text-foreground">
            Modules
          </Link>
          <Link href="/training/functional" className="text-muted transition-colors hover:text-foreground">
            Training
          </Link>
          <Link href="/faq" className="text-muted transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>

        {/* Mobile menu placeholder (no JS handler in MVP scaffold). */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/[0.03] md:inline-flex"
          >
            Request Consultation
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-5 translate-y-[-4px] rounded bg-foreground" />
            <span className="block h-0.5 w-5 rounded bg-foreground" />
            <span className="block h-0.5 w-5 translate-y-[4px] rounded bg-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}

