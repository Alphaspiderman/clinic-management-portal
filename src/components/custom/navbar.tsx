"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";

// Typehint for a dict having a className and props key
interface Entries {
  name: string;
  href: string;
}

interface NavbarProps {
  entries: Array<Entries>;
  navbarColor?: string;
}

export function Navbar({ entries, navbarColor = "white" }: NavbarProps) {
  // Get page url
  const url = "";
  const defaultClass =
    "text-sm font-medium transition-colors hover:text-primary text-white";
  const activeClass = "text-primary text-white";
  return (
    <div
      className="hidden flex-col md:flex"
      style={{ backgroundColor: navbarColor }}
    >
      <div className="border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div></div>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {entries.map((entry, index) => (
              <Link
                key={index}
                href={entry.href}
                className={cn(url === entry.href ? activeClass : defaultClass)}
              >
                {entry.name}
              </Link>
            ))}
          </nav>
          <div></div>
        </div>
      </div>
    </div>
  );
}
