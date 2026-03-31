"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/rankings", label: "Rankings" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-bg-border bg-bg/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan text-sm font-bold">
            C
          </div>
          <span className="hidden sm:block text-accent-cyan font-bold tracking-wider uppercase text-sm">Cobblemon Arena</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-cyan/15 text-accent-cyan"
                    : "text-gray-400 hover:text-white hover:bg-bg-hover"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Server info */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">193.31.31.225:3712</span>
        </div>
      </nav>
    </header>
  );
}
