import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // External SEO-friendly patterns -> internal Next.js dynamic routes
  // 1) /odoo-for-{industry}-industry -> /odoo-for/{industry}/industry
  const industryMatch = pathname.match(/^\/odoo-for-(.+)-industry\/?$/);
  if (industryMatch) {
    const industry = industryMatch[1];
    const url = req.nextUrl.clone();
    url.pathname = `/odoo-for/${industry}/industry`;
    return NextResponse.rewrite(url);
  }

  // 2) /odoo-{module}-bangladesh -> /odoo-module/{module}
  const moduleMatch = pathname.match(/^\/odoo-(.+)-bangladesh\/?$/);
  if (moduleMatch) {
    const moduleSlug = moduleMatch[1];
    const url = req.nextUrl.clone();
    url.pathname = `/odoo-module/${moduleSlug}`;
    return NextResponse.rewrite(url);
  }

  // 3) /odoo-vs-{slug} -> /comparisons/{slug}
  const comparisonMatch = pathname.match(/^\/odoo-vs-(.+)\/?$/);
  if (comparisonMatch) {
    const slug = comparisonMatch[1];
    const url = req.nextUrl.clone();
    url.pathname = `/comparisons/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Limit middleware to only Odoo-like paths (keep it cheap).
export const config = {
  matcher: ["/odoo-for-:path*", "/odoo-:path*", "/odoo-vs-:path*"],
};

