"use client";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-skin-muted">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-secondary">
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className="text-lg font-semibold text-brand-foreground">
              Nexora DevLabs
            </span>
          </div>

          <div className="text-brand-foreground/70 text-sm">
            © {currentYear} Nexora DevLabs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
