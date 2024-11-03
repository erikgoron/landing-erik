'use client';

import { Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 font-mono">
      {/* Hand-drawn horizontal line with natural curves */}
      <div className="relative w-full h-[24px] mb-8"> {/* Increased height to accommodate curves */}
        <svg 
          width="100%" 
          height="24" 
          className="opacity-90 w-full"
          viewBox="0 0 1000 24" 
          preserveAspectRatio="xMidYMid stretch"
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
            className="text-foreground"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: "drawLine 2s ease forwards"
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Link 
              href="mailto:erikgoron@gmail.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={20} />
              <span>erikgoron@gmail.com</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="https://linkedin.com/in/your-profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </Link>
            <Link 
              href="https://twitter.com/your-profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Twitter size={24} />
            </Link>
            <Link 
              href="/contact"
              className="px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 