import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

// Define the props interface
interface EnhancedPhoneFrameProps {
  children?: ReactNode;
}

// Enhanced Phone Frame Component that serves as a container for custom content
const EnhancedPhoneFrame = ({ children }: EnhancedPhoneFrameProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse movement tilt effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate tilt with a maximum of 10 degrees for more noticeable effect
      const tiltX = (y / rect.height) * 10;
      const tiltY = -(x / rect.width) * 10;
      
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Add shake effect when component mounts
  useEffect(() => {
    // Ensure shake animation CSS exists
    addShakeAnimation();
    
    setIsShaking(true);
    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Inline shake animation styles as fallback
  const shakeKeyframes = isShaking ? {
    animation: 'phoneShake 0.8s ease-in-out'
  } : {};

  return (
    <>
      {/* Inject CSS styles directly into the document */}
      <style>{`
        @keyframes phoneShake {
          0% { transform: perspective(1000px) rotate(0deg) translateX(0); }
          10% { transform: perspective(1000px) rotate(1deg) translateX(3px); }
          20% { transform: perspective(1000px) rotate(-1deg) translateX(-3px); }
          30% { transform: perspective(1000px) rotate(1deg) translateX(3px); }
          40% { transform: perspective(1000px) rotate(-1deg) translateX(-3px); }
          50% { transform: perspective(1000px) rotate(0.5deg) translateX(2px); }
          60% { transform: perspective(1000px) rotate(-0.5deg) translateX(-2px); }
          70% { transform: perspective(1000px) rotate(0.25deg) translateX(1px); }
          80% { transform: perspective(1000px) rotate(-0.25deg) translateX(-1px); }
          90% { transform: perspective(1000px) rotate(0deg) translateX(0); }
          100% { transform: perspective(1000px) rotate(0deg) translateX(0); }
        }
        
        .animate-phone-shake {
          animation: phoneShake 0.8s ease-in-out;
        }
      `}</style>
      
      <div className="flex items-center justify-center w-full h-full p-8">
        <div
          ref={containerRef}
          className="relative w-64 h-[520px] transition-all duration-300"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.3s ease",
            filter: "drop-shadow(0px 20px 25px rgba(0, 0, 0, 0.3))",
            ...shakeKeyframes
          }}
        >
          {/* iPhone SVG Frame - Ensuring it's always visible */}
          <svg
            viewBox="0 0 300 600"
            className="absolute w-full h-full z-0"
            style={{ 
              filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2))",
              display: "block",
              pointerEvents: "none"
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Phone outer frame */}
            <rect
              x="10" 
              y="10" 
              width="280" 
              height="580" 
              rx="35" 
              ry="35" 
              fill="#1a1a1a" 
              stroke="none"
            />
            
            {/* Inner bezel */}
            <rect
              x="15" 
              y="15" 
              width="270" 
              height="570" 
              rx="30" 
              ry="30" 
              fill="#111111" 
              stroke="none"
            />
            
            {/* Screen frame */}
            <rect
              x="22" 
              y="22" 
              width="256" 
              height="556" 
              rx="25" 
              ry="25" 
              fill="#000000" 
              stroke="none"
            />
            
            {/* Screen area (actual display) */}
            <rect
              x="25" 
              y="25" 
              width="250" 
              height="550" 
              rx="22" 
              ry="22" 
              fill="white" 
              stroke="none"
            />
            
            {/* Notch at top */}
            <path
              d="M110,22 h80 a10,10 0 0 1 10,10 v15 a10,10 0 0 1 -10,10 h-80 a10,10 0 0 1 -10,-10 v-15 a10,10 0 0 1 10,-10 z"
              fill="#000000"
              stroke="none"
            />
            
            {/* Side button (right) */}
            <rect x="290" y="130" width="2" height="50" rx="1" fill="#333333" stroke="none" />
            
            {/* Volume buttons (left) */}
            <rect x="8" y="130" width="2" height="35" rx="1" fill="#333333" stroke="none" />
            <rect x="8" y="180" width="2" height="35" rx="1" fill="#333333" stroke="none" />
            
            {/* Subtle reflections */}
            <rect x="15" y="15" width="2" height="570" rx="1" fill="#444444" opacity="0.2" stroke="none" />
            <rect x="283" y="15" width="2" height="570" rx="1" fill="#444444" opacity="0.2" stroke="none" />
            
            {/* Bottom speaker and port */}
            <rect x="110" y="582" width="80" height="3" rx="1.5" fill="#333333" stroke="none" />
          </svg>

          {/* Content container - This is where users will add their custom content */}
          <div
            className="absolute top-[4.8%] left-[9%] w-[82%] h-[90.5%] overflow-auto rounded-2xl bg-white text-black z-10"
            style={{ 
              transformOrigin: "center"
            }}
          >
            {/* Status bar */}
            <div className="w-full h-6 bg-gray-100 flex justify-between items-center px-4 text-xs text-black">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
              </div>
            </div>
            
            {/* Content area - Children will be placed here */}
            <div className="p-4">
              {children || (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <h2 className="text-xl font-bold mb-2 text-black">Your Content Here</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Add your custom content as children to this component
                  </p>
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Images, text, and other elements can be displayed here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Improved CSS injection function
const addShakeAnimation = () => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    // Check if the style already exists
    const existingStyle = document.getElementById('phone-frame-animations');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'phone-frame-animations';
    style.textContent = `
      @keyframes phoneShake {
        0% { transform: perspective(1000px) rotate(0deg) translateX(0); }
        10% { transform: perspective(1000px) rotate(1deg) translateX(3px); }
        20% { transform: perspective(1000px) rotate(-1deg) translateX(-3px); }
        30% { transform: perspective(1000px) rotate(1deg) translateX(3px); }
        40% { transform: perspective(1000px) rotate(-1deg) translateX(-3px); }
        50% { transform: perspective(1000px) rotate(0.5deg) translateX(2px); }
        60% { transform: perspective(1000px) rotate(-0.5deg) translateX(-2px); }
        70% { transform: perspective(1000px) rotate(0.25deg) translateX(1px); }
        80% { transform: perspective(1000px) rotate(-0.25deg) translateX(-1px); }
        90% { transform: perspective(1000px) rotate(0deg) translateX(0); }
        100% { transform: perspective(1000px) rotate(0deg) translateX(0); }
      }
      
      .animate-phone-shake {
        animation: phoneShake 0.8s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }
};

// Example showing how to use the component with custom content including images
const ExampleUsage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <EnhancedPhoneFrame>
        {/* This is user-provided content - can be anything */}
        <div className="h-full flex flex-col">
          <h1 className="text-xl font-bold mb-4 text-black">My Custom App</h1>
          
          {/* Example of using an image within the phone frame */}
          <div className="mb-4">
            <h2 className="text-lg mb-2 text-black">Featured Image</h2>
            <img 
              src="data:image/svg+xml,%3Csvg width='250' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em'%3EExample Image%3C/text%3E%3C/svg%3E" 
              alt="Example image"
              className="w-full rounded-lg mb-2"
            />
            <p className="text-sm text-black">This is a custom image inside the phone frame</p>
          </div>
          
          <p className="mb-4 text-black">
            Users can put any content they want here - text, images, forms, etc.
          </p>
        </div>
      </EnhancedPhoneFrame>
    </div>
  );
};

export { EnhancedPhoneFrame, ExampleUsage };
export default EnhancedPhoneFrame;

/*
<EnhancedPhoneFrame>
       
       <img src={image} alt="Custom" />
       <h1>tfdds</h1>
       <p>Any content can go inside the phone frame!</p>
       <img src='data:image/png;base64,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' />
     </EnhancedPhoneFrame>
    
   
    </>
)}*/