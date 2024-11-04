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
    to: 'var(--tag-founder)',
    text: '#3D3417',
    border: 'var(--tag-founder-border)'
  },
  research: {
    from: 'var(--tag-research)',
    to: 'var(--tag-research)',
    text: '#1D3D3A',
    border: 'var(--tag-research-border)'
  },
  employee: {
    from: 'var(--tag-employee)',
    to: 'var(--tag-employee)',
    text: '#2D3256',
    border: 'var(--tag-employee-border)'
  },
  education: {
    from: 'var(--tag-education)',
    to: 'var(--tag-education)',
    text: '#4A2D2D',
    border: 'var(--tag-education-border)'
  },
  fullstack: {
    from: 'var(--tag-fullstack)',
    to: 'var(--tag-fullstack)',
    text: '#4A2D2D',
    border: 'var(--tag-fullstack-border)'
  },
  work: {
    from: 'var(--tag-work)',
    to: 'var(--tag-work)',
    text: '#2D1B3D',
    border: 'var(--tag-work-border)'
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
        text: 'Work',
        color: 'work',
        borderColor: 'var(--tag-work-border)',
      },
      right: {
        text: 'Education',
        color: 'education',
        borderColor: 'var(--tag-education-border)',
      }
    },
    'founder-other': {
      left: {
        text: 'Employee',
        color: 'employee',
        borderColor: 'var(--tag-employee-border)',
      },
      right: {
        text: 'Founder',
        color: 'founder',
        borderColor: 'var(--tag-founder-border)',
      }
    },
    'chronological': {
      text: 'Chronological',
      color: '#6B7280',
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
          ? item.tags.includes('education')
          : item.tags.includes('founder');
        
        const side = isRightSide ? 'right' : 'left';
        acc[side] = [...(acc[side] || []), item];
        return acc;
      }, { left: [], right: [] } as { left: TimelineItem[], right: TimelineItem[] });


  const getButtonStyle = (isActive: boolean, color: string, borderColor: string) => ({
    color: isActive ? TAG_COLORS[color]?.text || '#000000' : '#4B5563',
    background: isActive 
      ? `linear-gradient(to bottom, ${TAG_COLORS[color]?.from || color}, ${TAG_COLORS[color]?.to || color})`
      : 'transparent',
    borderRadius: '0.75rem',
    border: `1px solid ${isActive ? TAG_COLORS[color]?.border || borderColor : '#E5E7EB'}`,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isActive 
      ? 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.1)'
      : 'none',
  });

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-2 rounded-xl bg-background/50 backdrop-blur-sm">
          <button
            onClick={() => setOrderingMode('chronological')}
            className={`text-lg font-medium transition-all px-5 py-2 hover:bg-foreground/5 ${
              orderingMode === 'chronological' 
                ? 'opacity-100' 
                : 'opacity-70 hover:opacity-90'
            }`}
            style={getButtonStyle(
              orderingMode === 'chronological',
              modeConfig.chronological.color,
              modeConfig.chronological.borderColor
            )}
          >
            Chronological
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOrderingMode('work-study')}
              className={`inline-flex items-center gap-3 px-5 py-2 ${
                orderingMode === 'work-study' 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-90'
              }`}
            >
              <span 
                className="text-lg font-medium px-4 py-2 rounded-lg"
                style={getButtonStyle(
                  orderingMode === 'work-study',
                  modeConfig['work-study'].left.color,
                  modeConfig['work-study'].left.borderColor
                )}
              >
                Work
              </span>
              <span className="text-foreground/40">/</span>
              <span 
                className="text-lg font-medium px-4 py-2 rounded-lg"
                style={getButtonStyle(
                  orderingMode === 'work-study',
                  modeConfig['work-study'].right.color,
                  modeConfig['work-study'].right.borderColor
                )}
              >
                Education
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOrderingMode('founder-other')}
              className={`inline-flex items-center gap-3 px-5 py-2 ${
                orderingMode === 'founder-other' 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-90'
              }`}
            >
              <span 
                className="text-lg font-medium px-4 py-2 rounded-lg"
                style={getButtonStyle(
                  orderingMode === 'founder-other',
                  modeConfig['founder-other'].left.color,
                  modeConfig['founder-other'].left.borderColor
                )}
              >
                Employee
              </span>
              <span className="text-foreground/40">/</span>
              <span 
                className="text-lg font-medium px-4 py-2 rounded-lg"
                style={getButtonStyle(
                  orderingMode === 'founder-other',
                  modeConfig['founder-other'].right.color,
                  modeConfig['founder-other'].right.borderColor
                )}
              >
                Founder
              </span>
            </button>
          </div>
        </div>
      </div>

      {orderingMode !== 'chronological' ? (
        <div className="grid grid-cols-2 mb-8">
          <div className="text-center">
            <span 
              className="text-lg font-medium px-4 py-2 rounded-lg inline-block"
              style={getButtonStyle(
                true, // Always active for headers
                modeConfig[orderingMode].left.color,
                modeConfig[orderingMode].left.borderColor
              )}
            >
              {modeConfig[orderingMode].left.text}
            </span>
          </div>
          <div className="text-center">
            <span 
              className="text-lg font-medium px-4 py-2 rounded-lg inline-block"
              style={getButtonStyle(
                true, // Always active for headers
                modeConfig[orderingMode].right.color,
                modeConfig[orderingMode].right.borderColor
              )}
            >
              {modeConfig[orderingMode].right.text}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center mb-8">
          <h3 
            className="text-lg font-medium px-4 py-1 rounded-md inline-block"
            style={getButtonStyle(
              true, // Always active for headers
              modeConfig.chronological.color,
              modeConfig.chronological.borderColor
            )}
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
