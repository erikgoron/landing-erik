'use client';

import { Bot, Building, Microscope, Wrench } from "lucide-react";
import { useState } from "react";

interface Category {
  name: string;
  icon: string;
  description: string;
  gradient: string;
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Microscope':
      return <Microscope className={className} />;
    case 'Building':
      return <Building className={className} />;
    default:
      return null;
  }
};

export default function ClientAICategories({ categories }: { categories: Category[] }) {
  const [rotation, setRotation] = useState(0);

  const handleCenterClick = () => {
    setRotation(prev => prev + 120);
  };

  const handleCategoryClick = (index: number) => {
    const currentPosition = (rotation + (index * 120)) % 360;
    const rotationNeeded = (360 - currentPosition) % 360;
    setRotation(prev => prev + rotationNeeded);
  };

  // Cloud-like path for nodes
  const cloudPath = `
    M -20 0 
    C -20 -10, -10 -15, 0 -15
    C 10 -15, 20 -10, 20 0
    C 20 10, 10 15, 0 15
    C -10 15, -20 10, -20 0
    Z
  `;

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full text-center h-20">
        {categories.map((category, index) => {
          const isActive = (rotation + (index * 120)) % 360 === 0;
          if (!isActive) return null;
          return (
            <div key={category.name} className="animate-fadeIn">
              <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
              <p className="text-muted-foreground text-lg">{category.description}</p>
            </div>
          );
        })}
      </div>

      <svg className="w-full h-auto mt-24" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--tertiary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <filter id="cloudGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '200px 150px', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {/* Connecting lines */}
          {categories.map((_, index) => {
            const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2;
            const x = 200 + 100 * Math.cos(angle);
            const y = 150 + 100 * Math.sin(angle);
            const controlX = 200 + 60 * Math.cos(angle);
            const controlY = 150 + 60 * Math.sin(angle);

            return (
              <path
                key={`line-${index}`}
                d={`M 200 150 C ${controlX} ${controlY}, ${controlX} ${controlY}, ${x} ${y}`}
                fill="none"
                stroke="var(--tertiary)"
                strokeWidth="2"
                className="particle-line opacity-40"
              />
            );
          })}

          {/* Category nodes */}
          {categories.map((category, index) => {
            const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2;
            const x = 200 + 100 * Math.cos(angle);
            const y = 150 + 100 * Math.sin(angle);

            return (
              <g 
                key={category.name} 
                onClick={() => handleCategoryClick(index)}
                className="cursor-pointer"
                filter="url(#softShadow)"
              >
                <g transform={`translate(${x}, ${y})`}>
                  <path
                    d={cloudPath}
                    fill="var(--background)"
                    stroke="var(--tertiary)"
                    strokeWidth="1.5"
                    className="opacity-90"
                  />
                  <foreignObject x="-12" y="-12" width="24" height="24">
                    <div 
                      className="flex items-center justify-center w-full h-full"
                      style={{ transform: `rotate(-${rotation}deg)` }}
                    >
                      <IconComponent
                        name={category.icon}
                        className="w-5 h-5 text-accent"
                      />
                    </div>
                  </foreignObject>
                </g>
              </g>
            );
          })}

          {/* Central AI node */}
          <g onClick={handleCenterClick} className="cursor-pointer" filter="url(#cloudGlow)">
            <path
              d={`
                M 200 120
                C 220 120, 235 135, 235 150
                C 235 165, 220 180, 200 180
                C 180 180, 165 165, 165 150
                C 165 135, 180 120, 200 120
                Z
              `}
              fill="url(#centerGradient)"
              className="opacity-90"
            />
            <foreignObject x="175" y="125" width="50" height="50">
              <div 
                className="flex flex-col items-center justify-center w-full h-full"
                style={{ transform: `rotate(-${rotation}deg)` }}
              >
                <Bot className="w-6 h-6 text-background mb-0.5" />
                <span className="text-background text-[10px] font-medium">AI</span>
              </div>
            </foreignObject>
          </g>
        </g>
      </svg>
    </div>
  );
}
