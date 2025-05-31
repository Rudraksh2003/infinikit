import React from "react";

export interface NewsCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  subtitle,
  imageUrl,
  children,
}) => (
  <div className="relative w-[190px] h-[120px] p-2 bg-gray-300/40 rounded-lg backdrop-blur-sm border-b-[3px] border-white/50 border-l-[2px] border-white/60 shadow-[-40px_50px_30px_rgba(0,0,0,0.28)] transform skew-x-[10deg] transition-all duration-400 overflow-hidden text-black hover:h-[254px] hover:skew-x-0">
    <div className="flex gap-1 p-2 border-2 border-black">
      <span className="w-4.5 h-2.5 rounded-full text-xs">{title}</span>
      {subtitle && <span className="w-2.5 h-2.5 rounded-full text-s">{subtitle}</span>}
    </div>
    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-20 object-cover my-2 rounded transition-transform duration-300 hover:scale-105"
      />
    )}
    {children && <p className="px-2 text-sm text-black/80">{children}</p>}
  </div>
);
