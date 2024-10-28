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
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
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
          <div className="w-1/2 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{item.year}</span>
              <h3 className="text-lg font-semibold mt-1">{item.role}</h3>
              <p className="text-blue-600 dark:text-blue-400">{item.company}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
