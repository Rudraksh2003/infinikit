import React, { ReactNode, useEffect } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

const Heading = ({ children, className = "" }: HeadingProps) => {
  // Create a unique ID for this instance's keyframes to avoid conflicts
  const uniqueId = React.useId().replace(/:/g, "");
  const animationName = `neonGlow-${uniqueId}`;
  
  // Inject styles into document head to ensure they persist
  useEffect(() => {
    const styleId = `neon-style-${uniqueId}`;
    
    // Check if style already exists
    if (document.getElementById(styleId)) {
      return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ${animationName} {
        0% {
          box-shadow: 
            0 0 5px rgba(255, 105, 180, 0.8),
            0 0 10px rgba(255, 223, 0, 0.6),
            0 0 15px rgba(64, 224, 208, 0.4);
        }
        50% {
          box-shadow: 
            0 0 10px rgba(255, 105, 180, 1),
            0 0 20px rgba(255, 223, 0, 0.8),
            0 0 30px rgba(64, 224, 208, 0.6);
        }
        100% {
          box-shadow: 
            0 0 5px rgba(255, 105, 180, 0.8),
            0 0 10px rgba(255, 223, 0, 0.6),
            0 0 15px rgba(64, 224, 208, 0.4);
        }
      }
      
      .neon-underline-${uniqueId} {
        animation: ${animationName} 2s ease-in-out infinite;
        transition: all 0.3s ease;
      }
      
      .neon-underline-${uniqueId}:hover {
        transform: scaleY(2);
        box-shadow: 
          0 0 15px rgba(255, 105, 180, 1),
          0 0 25px rgba(255, 223, 0, 1),
          0 0 35px rgba(64, 224, 208, 0.8) !important;
      }
      
      @media (prefers-color-scheme: dark) {
        @keyframes ${animationName} {
          0% {
            box-shadow: 
              0 0 8px rgba(255, 105, 180, 0.9),
              0 0 15px rgba(255, 223, 0, 0.7),
              0 0 20px rgba(64, 224, 208, 0.5);
          }
          50% {
            box-shadow: 
              0 0 15px rgba(255, 105, 180, 1),
              0 0 25px rgba(255, 223, 0, 0.9),
              0 0 35px rgba(64, 224, 208, 0.7);
          }
          100% {
            box-shadow: 
              0 0 8px rgba(255, 105, 180, 0.9),
              0 0 15px rgba(255, 223, 0, 0.7),
              0 0 20px rgba(64, 224, 208, 0.5);
          }
        }
      }
      
      @media (prefers-color-scheme: light) {
        @keyframes ${animationName} {
          0% {
            box-shadow: 
              0 0 5px rgba(236, 72, 153, 0.6),
              0 0 10px rgba(202, 138, 4, 0.4),
              0 0 15px rgba(37, 99, 235, 0.3);
          }
          50% {
            box-shadow: 
              0 0 10px rgba(236, 72, 153, 0.8),
              0 0 18px rgba(202, 138, 4, 0.6),
              0 0 25px rgba(37, 99, 235, 0.5);
          }
          100% {
            box-shadow: 
              0 0 5px rgba(236, 72, 153, 0.6),
              0 0 10px rgba(202, 138, 4, 0.4),
              0 0 15px rgba(37, 99, 235, 0.3);
          }
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [animationName, uniqueId]);
  
  return (
    <h1
      className={`relative inline-block text-3xl font-bold cursor-pointer group ${className}`}
    >
      {children}
      <span
        className={`neon-underline-${uniqueId} absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left rounded-sm`}
      />
    </h1>
  );
};

export default Heading;
/*
// Demo component
export default function NeonHeadingDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Heading>Welcome to Neon Heading</Heading>
      <Heading className="text-blue-600 dark:text-blue-400">Customizable Text Color</Heading>
      <Heading className="text-xl">Different Size</Heading>
      <p className="text-gray-600 dark:text-gray-300 mt-8">
        Hover over any heading to see the full neon effect
      </p>
    </div>
  );
}*/