'use client';

import { useEffect, useRef } from "react";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export default function ClientJourneyTimeline({ timelineData }: { timelineData: TimelineItem[] }) {
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

  return (
    <div ref={timelineRef} className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-tertiary"></div>
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item mb-12 flex ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          } opacity-0 transition-opacity duration-500 ease-in-out`}
        >
          <div className="w-1/2"></div>
          <div
            className={`w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 z-10 ${
              index % 2 === 0 ? "mt-1" : "mt-1"
            }`}
          ></div>
          <div className="w-1/2 p-4 font-mono">
            <div className="backdrop-blur-[2px] border border-tertiary/30 bg-secondary/80 p-6 rounded-lg">
              <span className="text-sm font-bold text-accent">{item.year}</span>
              <h3 className="text-lg font-semibold mt-1 text-foreground">{item.role}</h3>
              <p className="text-accent">{item.company}</p>
              <p className="text-foreground/80 mt-2">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
