'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ViewSelectorProps {
  onViewChange: (isTechnicalView: boolean) => void;
  label?: string;
}

export default function ViewSelector({ onViewChange, label = "View" }: ViewSelectorProps) {
  const [isTechnicalView, setIsTechnicalView] = useState(false);

  const toggleView = () => {
    setIsTechnicalView(!isTechnicalView);
    onViewChange(!isTechnicalView);
  };

  return (
    <button
      onClick={toggleView}
      className="fixed top-20 right-4 z-10 flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      {isTechnicalView ? (
        <>
          <EyeOff size={20} />
          <span>Switch to Simple {label}</span>
        </>
      ) : (
        <>
          <Eye size={20} />
          <span>Switch to Technical {label}</span>
        </>
      )}
    </button>
  );
}
