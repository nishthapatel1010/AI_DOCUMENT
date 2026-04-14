import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rect', 
  width, 
  height 
}) => {
  const baseClasses = 'animate-pulse bg-white/[0.05] border border-white/[0.05] overflow-hidden relative group';
  
  const variantClasses = {
    circle: 'rounded-full',
    text: 'rounded',
    rect: 'rounded-2xl',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    >
      {/* Shimmer overlay effect */}
      <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
      
      {/* Subtle holo glow */}
      <div className="absolute inset-0 bg-indigo-500/5 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default Skeleton;
