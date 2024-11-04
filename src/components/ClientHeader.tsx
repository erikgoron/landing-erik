'use client';

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

function CloudUnderline() {
  return (
    <svg
      className="absolute top-1/2 -translate-y-1/2 -left-4 w-[calc(100%+2rem)] h-12 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 24
           C 12 24, 6 20, 8 16
           C 10 12, 18 8, 28 8
           C 38 8, 48 12, 58 10
           C 68 8, 78 6, 88 8
           C 98 6, 108 8, 112 12
           C 116 16, 118 20, 114 24
           C 118 28, 116 32, 112 36
           C 108 40, 98 42, 88 40
           C 78 42, 68 40, 58 38
           C 48 36, 38 40, 28 40
           C 18 40, 10 36, 8 32
           C 6 28, 12 24, 15 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#4a90e2] cloud-draw fill-[#fef3e0] group-hover:fill-[#fef3e0] transition-[fill]"
      />
    </svg>
  );
}

function LogoCloud() {
  return (
    <svg
      className="absolute top-1/2 -translate-y-1/2 -left-6 w-[calc(100%+3rem)] h-16 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 24
           C 12 24, 6 20, 8 16
           C 10 12, 18 8, 28 8
           C 38 8, 48 12, 58 10
           C 68 8, 78 6, 88 8
           C 98 6, 108 8, 112 12
           C 116 16, 118 20, 114 24
           C 118 28, 116 32, 112 36
           C 108 40, 98 42, 88 40
           C 78 42, 68 40, 58 38
           C 48 36, 38 40, 28 40
           C 18 40, 10 36, 8 32
           C 6 28, 12 24, 15 24"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#4a90e2] cloud-draw fill-[#fef3e0] group-hover:fill-[#fef3e0] transition-[fill]"
      />
    </svg>
  );
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
            <Link href="/" className="group relative flex items-center">
              <Image 
                src="/logos/erik_logo.png" 
                alt="Erik Goron Logo" 
                width={294}
                height={64}
                className="h-14 w-auto relative z-10"
                quality={100}
              />
              <LogoCloud />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 rounded-md text-sm font-medium",
                    "text-foreground hover:text-accent transition-all duration-200 ease-in-out",
                    "flex items-center whitespace-nowrap"
                  )}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className="relative z-10">{item.name}</span>
                  <CloudUnderline />
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
                className="group relative px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-tertiary/10 transition-colors whitespace-nowrap flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="relative z-10">{item.name}</span>
                <CloudUnderline />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
