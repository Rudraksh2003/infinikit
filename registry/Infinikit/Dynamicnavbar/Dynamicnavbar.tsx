import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";

interface NavProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface ILandNavProps {
  children: ReactNode;
  autoCloseTimeout?: number;
  className?: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  darkModeBackgroundColor?: string;
  darkModeTextColor?: string;
  lightModeBackgroundColor?: string;
  lightModeTextColor?: string;
  forceDarkMode?: boolean;
  forceLightMode?: boolean;
}

export const Nav: React.FC<NavProps> = ({ 
  children, 
  href = "#", 
  onClick,
  className = ""
}) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className={`px-4 py-2 hover:opacity-80 rounded transition-opacity ${className}`}
    >
      {children}
    </a>
  );
};

export const ILandNav: React.FC<ILandNavProps> = ({ 
  children,
  autoCloseTimeout = 15000,
  className = "",
  expandedWidth = "100%",
  collapsedWidth = "100px",
  darkModeBackgroundColor = "bg-gray-900",
  darkModeTextColor = "text-white",
  lightModeBackgroundColor = "bg-white",
  lightModeTextColor = "text-gray-900",
  forceDarkMode = false,
  forceLightMode = false
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  let timeoutId: NodeJS.Timeout;
  
  // Check system preferences for dark/light mode
  useEffect(() => {
    // Skip preference detection if mode is forced
    if (forceDarkMode || forceLightMode) {
      setIsDarkMode(forceDarkMode);
      return;
    }
    
    // Check for system preference
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(darkModeQuery.matches);
      
      // Listen for changes
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      
      darkModeQuery.addEventListener('change', handleChange);
      return () => darkModeQuery.removeEventListener('change', handleChange);
    }
  }, [forceDarkMode, forceLightMode]);
  
  const openNavbar = () => {
    setIsOpen(true);
    resetAutoClose();
  };
  
  const closeNavbar = () => setIsOpen(false);
  
  const resetAutoClose = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(closeNavbar, autoCloseTimeout);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOpen(true);
      } else {
        closeNavbar();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    resetAutoClose();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Set background and text colors based on dark/light mode
  const backgroundColor = isDarkMode ? darkModeBackgroundColor : lightModeBackgroundColor;
  const textColor = isDarkMode ? darkModeTextColor : lightModeTextColor;
  
  // Additional hover color for nav items based on mode
  const hoverBgColor = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  
  return (
    <div className={`fixed top-0 left-0 w-full z-50 flex justify-center p-2 ${className}`}>
      <motion.div
        initial={{ width: collapsedWidth }}
        animate={{ width: isOpen ? expandedWidth : collapsedWidth }}
        transition={{ duration: 0.3 }}
        className={`${backgroundColor} ${textColor} p-2 rounded-lg shadow-lg cursor-pointer overflow-hidden transition-colors duration-300`}
        onClick={openNavbar}
      >
        {isOpen ? (
          <div className="flex justify-center gap-4 p-2">
            {React.Children.map(children, child => {
              if (React.isValidElement<NavProps>(child) && child.type === Nav) {
                return React.cloneElement(child, { 
                  className: `${hoverBgColor} ${child.props.className || ''}`
                });
              }
              return child;
            })}
          </div>
        ) : (
          <div className="text-center">☰</div>
        )}
      </motion.div>
    </div>
  );
};

// Example usage:
//import { ILandNav, Nav } from "./component/dynamicnavbar/Dynamicnavbar";

// <ILandNav autoCloseTimeout={10000}>
//   <Nav href="#home">Home</Nav>
//   <Nav href="#about">About</Nav>
//   <Nav href="#services">Services</Nav>
//   <Nav href="#contact">Contact</Nav>
// </ILandNav>

// Example with theme control:
// <ILandNav 
//   forceDarkMode={true} 
//   darkModeBackgroundColor="bg-blue-900"
//   lightModeBackgroundColor="bg-blue-100"
// >
//   <Nav href="#home">Home</Nav>
//   <Nav href="#about">About</Nav>
// </ILandNav>