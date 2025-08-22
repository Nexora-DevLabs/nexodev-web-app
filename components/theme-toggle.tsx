"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ring-offset-skin-base relative rounded-lg bg-skin-muted p-2 ring-brand-secondary ring-offset-2 transition-all duration-200 hover:scale-105 hover:bg-skin-surface focus-visible:ring-2 active:scale-95"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div
        className={`relative transition-transform duration-300 ${
          theme === "light" ? "rotate-0" : "rotate-180"
        }`}
      >
        {theme === "light" ? (
          <div className="transition-all duration-200">
            <Sun className="h-5 w-5 text-brand-foreground" />
          </div>
        ) : (
          <div className="transition-all duration-200">
            <Moon className="h-5 w-5 text-brand-foreground" />
          </div>
        )}
      </div>
    </button>
  );
}
