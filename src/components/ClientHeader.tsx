'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ClientHeader({ navItems }: { navItems: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-tertiary/30 font-mono bg-secondary/95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-6xl mx-auto">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-foreground/90 hover:text-foreground transition-colors">
              Erik Goron
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-foreground hover:bg-tertiary/10 transition-all duration-200 ease-in-out flex items-center whitespace-nowrap"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-tertiary/10 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 w-56 bg-secondary/95 backdrop-blur-sm border-l border-b border-tertiary/30 rounded-bl-lg shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-tertiary/10 transition-colors whitespace-nowrap"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
