'use client';

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ClientHeader({ navItems }: { navItems: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Blurred background with line */}
      <div className="absolute inset-0 h-20 backdrop-blur-sm bg-secondary/95" />
      
      {/* Hand-drawn line SVG */}
      <svg 
        className="absolute -bottom-[10px] left-0 w-full z-10"
        height="24" 
        viewBox="0 0 1000 24" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 12
             C150 12 100 8 200 12
             C300 16 350 8 450 12
             C550 16 600 8 700 12
             C800 16 850 8 1000 12"
          stroke="currentColor" 
          strokeWidth="1.5"
          fill="none"
          pathLength="1"
          className="text-foreground/30"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "drawLine 2s ease forwards"
          }}
        />
      </svg>

      {/* Nav content - added z-10 to bring it above the blur */}
      <nav className="container relative mx-auto px-4 sm:px-6 lg:px-8 h-20 z-10">
        <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
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
        <div className="lg:hidden absolute top-20 right-0 w-56 bg-secondary/95 backdrop-blur-sm border-l border-b border-tertiary/30 rounded-bl-lg shadow-lg">
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
