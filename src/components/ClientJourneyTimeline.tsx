'use client';

import { TimelineCard, TimelineCardContent } from "@/components/Cards/timeline-card";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  logo: string;
  country: string;
}

type OrderingMode = 'work-study' | 'founder-other' | 'chronological';

const TAG_COLORS: Record<string, { from: string; to: string; text: string; border: string }> = {
  founder: {
    from: 'var(--tag-founder)',
    to: '#e6bc2f',
    text: '#3D3417',
    border: '#d4ab1d'
  },
  research: {
    from: 'var(--tag-research)',
    to: '#7dcdc0',
    text: '#1D3D3A',
    border: '#68b5a9'
  },
  employee: {
    from: 'var(--tag-employee)',
    to: '#8e9efa',
    text: '#2D3256',
    border: '#7a8bf8'
  },
  student: {
    from: 'var(--tag-student)',
    to: '#ffc0ad',
    text: '#4A2D2D',
    border: '#ffb199'
  },
  fullstack: {
    from: 'var(--tag-fullstack)',
    to: '#93c5fd',
    text: '#4A2D2D',
    border: '#6ba6e9'
  },
  work: {
    from: '#9333ea',
    to: '#a855f7',
    text: '#2D1B3D',
    border: '#7928c9'
  }
};

export default function ClientJourneyTimeline({ timelineData }: { timelineData: TimelineItem[] }) {
  const [orderingMode, setOrderingMode] = useState<OrderingMode>('chronological');
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => {
      item.classList.remove("opacity-100");
      item.classList.add("opacity-0");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [orderingMode]);

  const modeConfig = {
    'work-study': {
      left: {
        text: 'WORK',
        color: TAG_COLORS.work.from,
        borderColor: TAG_COLORS.work.border,
      },
      right: {
        text: 'EDUCATION',
        color: TAG_COLORS.student.from,
        borderColor: TAG_COLORS.student.border,
      }
    },
    'founder-other': {
      left: {
        text: 'EMPLOYEE',
        color: TAG_COLORS.employee.from,
        borderColor: TAG_COLORS.employee.border,
      },
      right: {
        text: 'FOUNDER',
        color: TAG_COLORS.founder.from,
        borderColor: TAG_COLORS.founder.border,
      }
    },
    'chronological': {
      text: 'CHRONOLOGICAL',
      color: '#374151',
      borderColor: '#000000',
    }
  };

  const groupedItems = orderingMode === 'chronological'
    ? {
        left: timelineData.filter((_, index) => index % 2 === 0),
        right: timelineData.filter((_, index) => index % 2 === 1)
      }
    : timelineData.reduce((acc, item) => {
        const isRightSide = orderingMode === 'work-study' 
          ? item.tags.includes('student')
          : item.tags.includes('founder');
        
        const side = isRightSide ? 'right' : 'left';
        acc[side] = [...(acc[side] || []), item];
        return acc;
      }, { left: [], right: [] } as { left: TimelineItem[], right: TimelineItem[] });

  // Helper function for text stroke style with matching border color
  const getTextStyle = (color: string, borderColor: string) => ({
    color: color,
    WebkitTextStroke: `1.0px ${borderColor}`, // Using the border color for text outline
  });

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={() => setOrderingMode('chronological')}
            className={`text-lg font-semibold transition-all px-4 py-1 rounded-md ${
              orderingMode === 'chronological' 
                ? 'opacity-100 scale-105' 
                : 'opacity-50 hover:opacity-90 hover:scale-105'
            }`}
            style={getTextStyle(modeConfig.chronological.color, modeConfig.chronological.borderColor)}
          >
            Chronological
          </button>
                    
          <button
            onClick={() => setOrderingMode('work-study')}
            className={`inline-flex items-center ${
              orderingMode === 'work-study' 
                ? 'opacity-100 scale-105' 
                : 'opacity-50 hover:opacity-90 hover:scale-105'
            }`}
          >
            <span 
              className="text-lg font-semibold px-3 py-1"
              style={getTextStyle(modeConfig['work-study'].left.color, modeConfig['work-study'].left.borderColor)}
            >
              Work
            </span>
            <span className="mx-2 text-foreground/80 relative">
              <svg 
                width="2" 
                height="24" 
                className="opacity-100"
                viewBox="0 0 2 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1 0C1 0 -0.5 6 1 12C2.5 18 1 24 1 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <span 
              className="text-lg font-semibold px-3 py-1"
              style={getTextStyle(modeConfig['work-study'].right.color, modeConfig['work-study'].right.borderColor)}
            >
              Education
            </span>
          </button>
                    
          <button
            onClick={() => setOrderingMode('founder-other')}
            className={`inline-flex items-center ${
              orderingMode === 'founder-other' 
                ? 'opacity-100 scale-105' 
                : 'opacity-50 hover:opacity-90 hover:scale-105'
            }`}
          >
            <span 
              className="text-lg font-semibold px-3 py-1"
              style={getTextStyle(modeConfig['founder-other'].left.color, modeConfig['founder-other'].left.borderColor)}
            >
              Employee
            </span>
            <span className="mx-2 text-foreground/80 relative">
              <svg 
                width="2" 
                height="24" 
                className="opacity-90"
                viewBox="0 0 2 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1 0C1 0 -0.5 6 1 12C2.5 18 1 24 1 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <span 
              className="text-lg font-semibold px-3 py-1"
              style={getTextStyle(modeConfig['founder-other'].right.color, modeConfig['founder-other'].right.borderColor)}
            >
              Founder
            </span>
          </button>
        </div>
      </div>

      {orderingMode !== 'chronological' ? (
        <div className="grid grid-cols-2 mb-8">
          <div className="text-center">
            <h3 
              className="text-lg font-semibold px-4 py-1 rounded-md inline-block"
              style={getTextStyle(modeConfig[orderingMode].left.color, modeConfig[orderingMode].left.borderColor)}
            >
              {modeConfig[orderingMode].left.text}
            </h3>
          </div>
          <div className="text-center">
            <h3 
              className="text-lg font-semibold px-4 py-1 rounded-md inline-block"
              style={getTextStyle(modeConfig[orderingMode].right.color, modeConfig[orderingMode].right.borderColor)}
            >
              {modeConfig[orderingMode].right.text}
            </h3>
          </div>
        </div>
      ) : (
        <div className="text-center mb-8">
          <h3 
            className="text-lg font-semibold px-4 py-1 rounded-md inline-block"
            style={getTextStyle(modeConfig.chronological.color, modeConfig.chronological.borderColor)}
          >
            {modeConfig.chronological.text}
          </h3>
        </div>
      )}

      <div ref={timelineRef} className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
          <svg 
            width="2" 
            height="100%" 
            className="opacity-90"
            viewBox="0 0 2 100%" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M1 0C1 0 0 20 1 40C2.5 60 1 80 1 100" 
              stroke="black" 
              strokeWidth="1.5"
              pathLength="1"
              className="text-foreground"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
              }}
            >
            </path>
            <pattern id="curve" x="0" y="0" width="2" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M1 0C1 0 0 20 1 40C2.5 60 1 80 1 100" 
                stroke="black" 
                strokeWidth="1.5"
              />
            </pattern>
            <rect width="2" height="100%" fill="url(#curve)" style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: "drawLine 2s ease forwards"
            }} />
          </svg>
        </div>
        
        {orderingMode === 'chronological' ? (
          <div className="relative">
            {timelineData.map((item, index) => (
              <div
                key={`chronological-${index}`}
                className="timeline-item opacity-0 transition-all duration-500 ease-in-out flex"
                style={{
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginTop: index === 0 ? '0' : '4rem'
                }}
              >
                <div className={`w-[calc(50%-1rem)] ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                  <TimelineCardItem item={item} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex">
            <div className="w-1/2 pr-4 space-y-8">
              {groupedItems.left.map((item, index) => (
                <div
                  key={`${orderingMode}-left-${index}`}
                  className="timeline-item opacity-0 transition-all duration-500 ease-in-out"
                >
                  <TimelineCardItem item={item} />
                </div>
              ))}
            </div>
            
            <div className="w-1/2 pl-4 space-y-8">
              {groupedItems.right.map((item, index) => (
                <div
                  key={`${orderingMode}-right-${index}`}
                  className="timeline-item opacity-0 transition-all duration-500 ease-in-out"
                >
                  <TimelineCardItem item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineCardItem({ item }: { item: TimelineItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const isTruncated = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
        setIsTextTruncated(isTruncated);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [item.description]);

  return (
    <TimelineCard>
      <TimelineCardContent>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-accent">{item.year}</span>
            <Image
              src={`/flags/${item.country}`}
              alt={`Country flag`}
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="space-y-3 flex-grow">
            <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
            <p className="text-accent">{item.company}</p>
            <div className="relative">
              <p 
                ref={descriptionRef}
                className={`text-foreground/80 ${
                  isExpanded ? '' : 'h-[120px] overflow-hidden'
                }`}
              >
                {item.description}
              </p>
              {isTextTruncated && !isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-xs text-accent hover:text-accent/80 mt-1 font-medium"
                >
                  Read more
                </button>
              )}
              {isExpanded && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-accent hover:text-accent/80 mt-1 font-medium"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-4">
            {item.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className={`
                  px-3 py-1 
                  text-xs 
                  font-mono 
                  font-medium 
                  uppercase 
                  rounded-md 
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.4),_0_1px_3px_rgba(0,0,0,0.1)]
                `}
                style={{
                  background: TAG_COLORS[tag] 
                    ? `linear-gradient(to bottom, ${TAG_COLORS[tag].from}, ${TAG_COLORS[tag].to})`
                    : 'linear-gradient(to bottom, var(--secondary-9), var(--secondary-8))',
                  color: TAG_COLORS[tag]?.text || 'var(--foreground)',
                  border: `1px solid ${TAG_COLORS[tag]?.border || 'var(--secondary-7)'}`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TimelineCardContent>
    </TimelineCard>
  );
}
