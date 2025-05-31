import React, { ReactNode, useEffect } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

const NeonHeading = ({ children, className = "" }: HeadingProps) => {
  const uniqueId = React.useId().replace(/:/g, "");
  const animationName = `neonGlow-${uniqueId}`;
  
  useEffect(() => {
    const styleId = `neon-style-${uniqueId}`;
    
    if (document.getElementById(styleId)) {
      return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ${animationName} {
        0% {
          text-shadow: 
            0 0 5px rgba(255, 105, 180, 0.6),
            0 0 10px rgba(255, 223, 0, 0.6),
            0 0 15px rgba(64, 224, 208, 0.6),
            0 0 20px rgba(255, 105, 180, 0.3);
        }
        50% {
          text-shadow: 
            0 0 10px rgba(255, 105, 180, 0.8),
            0 0 20px rgba(255, 223, 0, 0.8),
            0 0 30px rgba(64, 224, 208, 0.8),
            0 0 40px rgba(255, 105, 180, 0.5);
        }
        100% {
          text-shadow: 
            0 0 5px rgba(255, 105, 180, 0.6),
            0 0 10px rgba(255, 223, 0, 0.6),
            0 0 15px rgba(64, 224, 208, 0.6),
            0 0 20px rgba(255, 105, 180, 0.3);
        }
      }
      
      .neon-text-${uniqueId} {
        animation: ${animationName} 2s ease-in-out infinite;
        transition: all 0.3s ease;
      }
      
      .neon-text-${uniqueId}:hover {
        transform: scale(1.05);
        text-shadow: 
          0 0 15px rgba(255, 105, 180, 1),
          0 0 25px rgba(255, 223, 0, 1),
          0 0 35px rgba(64, 224, 208, 1),
          0 0 45px rgba(255, 105, 180, 0.7) !important;
      }
      
      @media (prefers-color-scheme: dark) {
        .neon-text-${uniqueId} {
          color: #ffffff;
        }
      }
      
      @media (prefers-color-scheme: light) {
        .neon-text-${uniqueId} {
          color: #1f2937;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [animationName, uniqueId]);
  
  return (
    <h1
      className={`neon-text-${uniqueId} relative inline-block text-3xl font-bold cursor-pointer group ${className}`}
    >
      {children}
      <span
      />
    </h1>
  );
};
export default NeonHeading;
/*
// Demo component to test the heading
const HeadingDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Heading>Neon Glow Effect</Heading>
      <Heading className="text-4xl">Larger Heading</Heading>
      <Heading className="text-purple-600">Custom Color</Heading>
      <p className="text-gray-600 dark:text-gray-300 mt-8 text-center">
        The headings should have a pulsing neon glow effect.<br/>
        Hover over them to see the enhanced glow and underline animation.
      </p>
    </div>
  );
};

export default HeadingDemo;*/