"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { ActionButtons } from "@/components/action-buttons";

export function SiteHeader() {
  return (
    <header className="bg-skin-base/80 sticky top-0 z-50 w-full border-b border-brand-border backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Nexora DevLabs"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <span className="text-xl font-bold text-brand-foreground">
                Nexora DevLabs
              </span>
            </Link>
          </div>

          {/* Navigation - Placeholder for future */}
          <nav className="hidden items-center space-x-8 md:flex">
            {/* Future nav items will go here */}
          </nav>

          {/* Right side - CTA and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ActionButtons />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
