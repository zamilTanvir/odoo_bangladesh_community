import Link from "next/link";
import BrandLogo from "@/components/site/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <BrandLogo />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">Odoo Bangladesh</div>
                <div className="text-xs text-muted">Community portal & learning hub</div>
              </div>
            </div>
            <p className="text-sm text-muted">
              Explore Odoo resources, training programs, and implementation guidance tailored for Bangladesh.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-muted transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/modules" className="text-muted transition-colors hover:text-foreground">
                  Modules Directory
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-muted transition-colors hover:text-foreground">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="text-muted transition-colors hover:text-foreground">
                  Comparisons
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Training</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/training/functional"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Functional Training
                </Link>
              </li>
              <li>
                <Link
                  href="/training/technical"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Technical Training
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted transition-colors hover:text-foreground">
                  Events & Webinars
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Community</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted transition-colors hover:text-foreground">
                  About the Community
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted transition-colors hover:text-foreground">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry/consultation"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Request Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/10 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted">
              © {new Date().getFullYear()} Odoo Bangladesh. Built as an independent learning and community hub.
            </div>
            <div className="text-sm">
              <Link href="/contact" className="text-primary hover:underline">
                Get help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

