import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

// Create a cn utility function that combines clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const UnderHeading: React.FC<HeadingProps> = ({ 
  children, 
  className
}) => {
  // Create a unique ID for this instance's keyframes to avoid conflicts
  const uniqueId = React.useId().replace(/:/g, "");
  const animationName = `neonGlow-${uniqueId}`;
  
  return (
    <h1 
      className={cn(
        "relative inline-block text-3xl font-bold cursor-pointer group",
        className
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500",
          "transition-all duration-500 scale-x-0 group-hover:scale-x-100"
        )}
        style={{
          animation: `${animationName} 1.5s infinite alternate`
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animationName} {
              from {
                box-shadow: 0 0 5px rgba(255, 105, 180, 0.6), 0 0 10px rgba(255, 223, 0, 0.6), 0 0 15px rgba(64, 224, 208, 0.6);
              }
              to {
                box-shadow: 0 0 10px rgba(255, 105, 180, 0.8), 0 0 20px rgba(255, 223, 0, 0.8), 0 0 30px rgba(64, 224, 208, 0.8);
              }
            }
            
            @media (prefers-color-scheme: dark) {
              @keyframes ${animationName} {
                from {
                  box-shadow: 0 0 5px rgba(255, 105, 180, 0.7), 0 0 10px rgba(255, 223, 0, 0.7), 0 0 15px rgba(64, 224, 208, 0.7);
                }
                to {
                  box-shadow: 0 0 10px rgba(255, 105, 180, 0.9), 0 0 20px rgba(255, 223, 0, 0.9), 0 0 30px rgba(64, 224, 208, 0.9);
                }
              }
            }
            
            @media (prefers-color-scheme: light) {
              @keyframes ${animationName} {
                from {
                  box-shadow: 0 0 3px rgba(236, 72, 153, 0.4), 0 0 7px rgba(202, 138, 4, 0.4), 0 0 10px rgba(37, 99, 235, 0.4);
                }
                to {
                  box-shadow: 0 0 7px rgba(236, 72, 153, 0.6), 0 0 14px rgba(202, 138, 4, 0.6), 0 0 20px rgba(37, 99, 235, 0.6);
                }
              }
            }
          `
        }}
      />
    </h1>
  );
};
export default UnderHeading;

/* Usage example:
import { Heading } from "./Heading";

function MyComponent() {
  return (
    <div>
      <Heading>Welcome to My Website</Heading>
      <Heading className="text-4xl text-purple-600">Custom Styled Heading</Heading>
    </div>
  );
}
*/