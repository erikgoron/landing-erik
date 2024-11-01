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

type OrderingMode = 'work-study' | 'founder-other';

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
  }
};

export default function ClientJourneyTimeline({ timelineData }: { timelineData: TimelineItem[] }) {
  const [orderingMode, setOrderingMode] = useState<OrderingMode>('work-study');
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const modeConfig = {
    'work-study': {
      left: {
        text: 'Work',
        color: TAG_COLORS.employee.from,
      },
      right: {
        text: 'Study',
        color: TAG_COLORS.student.from,
      }
    },
    'founder-other': {
      left: {
        text: 'Employee',
        color: TAG_COLORS.employee.from,
      },
      right: {
        text: 'Founder',
        color: TAG_COLORS.founder.from,
      }
    }
  };

  const currentMode = modeConfig[orderingMode];

  const groupedItems = timelineData.reduce((acc, item) => {
    const isRightSide = orderingMode === 'work-study' 
      ? item.tags.includes('student')
      : item.tags.includes('founder');
    
    const side = isRightSide ? 'right' : 'left';
    acc[side] = [...(acc[side] || []), item];
    return acc;
  }, { left: [], right: [] } as { left: TimelineItem[], right: TimelineItem[] });

  return (
    <div>
      <div className="flex justify-center gap-6 mb-12">
        <div className="flex gap-6">
          <button
            onClick={() => setOrderingMode('work-study')}
            className={`flex gap-6 items-center ${
              orderingMode === 'work-study' ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <span 
              className="text-lg font-semibold transition-colors"
              style={{ color: TAG_COLORS.employee.from }}
            >
              Work
            </span>
            <span 
              className="text-lg font-semibold transition-colors"
              style={{ color: TAG_COLORS.student.from }}
            >
              Study
            </span>
          </button>
          <span className="text-foreground/30">|</span>
          <button
            onClick={() => setOrderingMode('founder-other')}
            className={`flex gap-6 items-center ${
              orderingMode === 'founder-other' ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <span 
              className="text-lg font-semibold transition-colors"
              style={{ color: TAG_COLORS.employee.from }}
            >
              Employee
            </span>
            <span 
              className="text-lg font-semibold transition-colors"
              style={{ color: TAG_COLORS.founder.from }}
            >
              Founder
            </span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mb-8 px-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: currentMode.left.color }}
        >
          {currentMode.left.text}
        </h3>
        <h3 
          className="text-lg font-semibold"
          style={{ color: currentMode.right.color }}
        >
          {currentMode.right.text}
        </h3>
      </div>

      <div ref={timelineRef} className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-tertiary"></div>
        <div className="flex">
          {/* Left Column */}
          <div className="w-1/2 pr-4 space-y-8">
            {groupedItems.left.map((item, index) => (
              <div
                key={`left-${index}`}
                className="timeline-item opacity-0 transition-opacity duration-500 ease-in-out"
              >
                <TimelineCardItem item={item} />
              </div>
            ))}
          </div>
          
          {/* Right Column */}
          <div className="w-1/2 pl-4 space-y-8">
            {groupedItems.right.map((item, index) => (
              <div
                key={`right-${index}`}
                className="timeline-item opacity-0 transition-opacity duration-500 ease-in-out"
              >
                <TimelineCardItem item={item} />
              </div>
            ))}
          </div>
        </div>
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
