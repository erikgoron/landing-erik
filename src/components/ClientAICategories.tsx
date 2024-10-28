'use client';

import { useState } from "react";
import { Code, Brain, Building } from "lucide-react";

interface Category {
  name: string;
  icon: string;
  description: string;
  gradient: string;
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Code':
      return <Code className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Building':
      return <Building className={className} />;
    default:
      return null;
  }
};

export default function ClientAICategories({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative">
      <svg className="w-full h-auto" viewBox="0 0 400 300">
        {/* Central AI node */}
        <circle cx="200" cy="150" r="30" fill="#333" />
        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="14">
          AI
        </text>

        {/* Category nodes and connecting lines */}
        {categories.map((category, index) => {
          const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2;
          const x = 200 + 120 * Math.cos(angle);
          const y = 150 + 120 * Math.sin(angle);

          return (
            <g key={category.name}>
              <line
                x1="200"
                y1="150"
                x2={x}
                y2={y}
                stroke={activeCategory === category.name ? "#3B82F6" : "#E5E7EB"}
                strokeWidth={activeCategory === category.name ? "3" : "1"}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="30"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </line>
              <circle
                cx={x}
                cy={y}
                r="45"
                fill={activeCategory === category.name ? `url(#${category.name.replace(/\s+/g, '')})` : "white"}
                stroke={activeCategory === category.name ? "transparent" : "#E5E7EB"}
                strokeWidth="2"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
                className="cursor-pointer transition-all duration-300"
              />
              <foreignObject x={x - 20} y={y - 20} width="40" height="40">
                <div className="flex items-center justify-center w-full h-full">
                  <IconComponent
                    name={category.icon}
                    className={`w-6 h-6 ${
                      activeCategory === category.name ? "text-white" : `text-${category.gradient.split("-")[1]}`
                    }`}
                  />
                </div>
              </foreignObject>
              <defs>
                <linearGradient id={category.name.replace(/\s+/g, '')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`var(--${category.gradient.split("-")[1]})`} />
                  <stop offset="100%" stopColor={`var(--${category.gradient.split("-")[3]})`} />
                </linearGradient>
              </defs>
            </g>
          );
        })}
      </svg>
      <div className="mt-8 text-center h-24">
        <p className="text-lg">
          {activeCategory
            ? categories.find((c) => c.name === activeCategory)?.description
            : "Hover over a category to learn more"}
        </p>
      </div>
    </div>
  );
}
