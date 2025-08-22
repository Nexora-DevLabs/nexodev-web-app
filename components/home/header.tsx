"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="relative z-30 flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src="/logo.png"
            alt="Nexora DevLabs"
            width={40}
            height={40}
            className="relative z-10 h-10 w-auto brightness-110 contrast-125 drop-shadow-lg filter"
          />
        </div>
        <div className="text-white/90">
          <div className="font-heading hidden text-lg font-semibold sm:block">
            Nexora DevLabs
          </div>
        </div>
      </div>

      <nav className="flex items-center space-x-2">
        {/* <a
          href="#services"
          className="text-white/80 hover:text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Services
        </a>
        <a
          href="#about"
          className="text-white/80 hover:text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          About
        </a> 
        <a
          href="#contact"
          className="text-white/80 hover:text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Contact
        </a> */}
      </nav>
    </header>
  );
}
