import React, { ReactNode, useState } from 'react';

interface PendulumTooltipProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  swingDirection?: 'left' | 'right' | 'alternate';
  swingSpeed?: number;
  swingAngle?: number;
  stringLength?: number;
  children: ReactNode;
}

const PendulumTooltip: React.FC<PendulumTooltipProps> = ({
  text,
  backgroundColor = '#333',
  textColor = 'white',
  swingDirection = 'alternate',
  swingSpeed = 3,
  swingAngle = 15,
  stringLength = 6,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  
  const showTooltip = () => {
    setIsVisible(true);
    
    if (swingDirection === 'left') {
      setAnimationClass('swing-left');
    } else if (swingDirection === 'right') {
      setAnimationClass('swing-right');
    } else {
      setAnimationClass(Math.random() > 0.5 ? 'swing-left' : 'swing-right');
    }
  };
  
  const hideTooltip = () => {
    setIsVisible(false);
    setAnimationClass('');
  };
  
  const animationVars = {
    '--swing-duration': `${swingSpeed}s`,
    '--swing-angle': `${swingAngle}deg`,
  } as React.CSSProperties;
  
  // Define CSS for animations as a string
  const animationStyles = `
    .swing-left {
      animation: swingLeft var(--swing-duration) ease-in-out infinite;
    }
    
    .swing-right {
      animation: swingRight var(--swing-duration) ease-in-out infinite;
    }
    
    @keyframes swingLeft {
      0% { transform: rotate(0deg) translateX(-50%); }
      25% { transform: rotate(calc(var(--swing-angle) * -1)) translateX(-50%); }
      75% { transform: rotate(var(--swing-angle)) translateX(-50%); }
      100% { transform: rotate(0deg) translateX(-50%); }
    }
    
    @keyframes swingRight {
      0% { transform: rotate(0deg) translateX(-50%); }
      25% { transform: rotate(var(--swing-angle)) translateX(-50%); }
      75% { transform: rotate(calc(var(--swing-angle) * -1)) translateX(-50%); }
      100% { transform: rotate(0deg) translateX(-50%); }
    }
  `;
  
  return (
    <div className="relative inline-block">
      <div 
        className="cursor-pointer inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      
      {isVisible && (
        <div 
          className={`absolute z-50 transform -translate-x-1/2 left-1/2 mt-1 origin-top ${animationClass}`}
          style={animationVars}
        >
          {/* Thread/string */}
          <div 
            className="w-px bg-gray-400 mx-auto" 
            style={{ height: `${stringLength}px` }}
          ></div>
          
          {/* Tooltip bubble */}
          <div 
            className="px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
            style={{
              backgroundColor,
              color: textColor,
            }}
          >
            {text}
            
            {/* Pointer */}
            <div 
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* CSS for pendulum animation - using standard style tag */}
      <style>{animationStyles}</style>
    </div>
  );
};

export default PendulumTooltip;

/* Usage example:
<PendulumTooltip 
  text="kuch nahi"
  backgroundColor="#8A33FF"
  textColor="white"
  swingDirection="left"
  swingSpeed={2.5}
  swingAngle={20}
  stringLength={8}
>
  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
  <h1>hiiii</h1>
</PendulumTooltip>
*/