import React, { useState } from "react";

// Interfaces
export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
  comment?: string; // Add comment property
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

// Gradient mapping
const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

// Component definition
export const GlassIcons = ({ items, className }: GlassIconsProps): JSX.Element => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<number, boolean>>({}); // Track comment visibility

  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  const handleIconClick = (index: number, label: string, hasComment: boolean, comment?: string) => {
    // If item has a specific comment, toggle its visibility
    if (hasComment && comment) {
      setComments(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    } else {
      // For all items (with or without comments), show coming soon popup
      setClickedItem(label);
      setShowComingSoon(true);
      
      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowComingSoon(false);
        setClickedItem(null);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <div
        className={`grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible ${
          className || ""
        }`}
      >
        {items.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <button
              type="button"
              aria-label={item.label}
              className={`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
                item.customClass || ""
              }`}
              onClick={() => handleIconClick(index, item.label, !!item.comment, item.comment)}
            >
              {/* Back layer */}
              <span
                className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
                style={{
                  ...getBackgroundStyle(item.color),
                  boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
                }}
              ></span>

              {/* Front layer */}
              <span
                className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
                style={{
                  boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
                }}
              >
                <span
                  className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </span>

              {/* Label */}
              <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
                {item.label}
              </span>
            </button>

            {/* Comment in red that disappears when clicked */}
            {item.comment && comments[index] && (
              <div 
                className="mt-2 px-3 py-2 bg-red-600/90 text-white text-sm rounded-lg backdrop-blur-sm shadow-lg cursor-pointer transition-all duration-300 border border-red-400 animate-bounce"
                style={{
                  boxShadow: "0 0 15px rgba(220, 38, 38, 0.5)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Remove comment after click
                  setComments(prev => ({
                    ...prev,
                    [index]: false
                  }));
                }}
              >
                <span className="font-bold">!</span> {item.comment}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowComingSoon(false)}
          ></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-cyan-200 mb-1">New Project:</p>
              <p className="text-xl font-semibold text-cyan-400 mb-4">{clickedItem}</p>
              <p className="text-gray-300 mb-6">
                This exciting project is currently in development. Stay tuned for updates!
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/30"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlassIcons;