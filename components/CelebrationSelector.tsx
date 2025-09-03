"use client";
import { useState } from "react";

interface CelebrationSelectorProps {
  onSelect: (type: string) => void;
  className?: string;
}

export default function CelebrationSelector({ onSelect, className = "" }: CelebrationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const celebrationOptions = [
    { key: 'teachersDay', label: '👨‍🏫 Teachers Day', desc: 'Honor our educators' },
    { key: 'birthday', label: '🎂 Birthday', desc: 'Celebrate another year' },
    { key: 'festival', label: '🪔 Festival', desc: 'Traditional celebrations' },
    { key: 'nationalDay', label: '🇮🇳 National Day', desc: 'Patriotic celebrations' },
    { key: 'achievement', label: '🏆 Achievement', desc: 'Success & victories' },
    { key: 'generic', label: '🎊 General', desc: 'Any special moment' },
  ];

  const handleSelect = (type: string) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="doodle-btn text-sm px-4 py-2"
        aria-label="Select celebration type"
      >
        🎨 Choose Celebration
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border-4 border-[#ff6b6b] z-50 min-w-[250px]">
          <div className="p-2">
            <h3 className="font-bold text-[#0f172a] mb-2 px-2">What are we celebrating?</h3>
            {celebrationOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSelect(option.key)}
                className="w-full text-left p-2 hover:bg-[#fff7d6] rounded text-[#0f172a] transition-colors"
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-xs opacity-75">{option.desc}</div>
              </button>
            ))}
          </div>
          <div className="border-t-2 border-[#ff6b6b] p-2 bg-[#fff7d6] rounded-b-lg">
            <p className="text-xs text-[#0f172a] opacity-75 text-center">
              Just like our school greenboard celebrations! 🎈
            </p>
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
