import React from "react";

export interface NewspaperGridProps {
  children: React.ReactNode;
}

export const NewspaperGrid: React.FC<NewspaperGridProps> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {children}
  </div>
);
