import React from 'react';

interface SkeletonLoaderProps {
  h?: string;
  w?: string;
  bg?: string;
  rounded?: string;
  loaderColor?: string;
}

export const SkeletonLoader = ({
  h = '100px',
  w = '200px',
  bg = '#f0f0f0',
  rounded = '8px',
  loaderColor = '#e0e0e0',
}: SkeletonLoaderProps) => {
  return (
    <div
      className="relative overflow-hidden animate-pulse"
      style={{ 
        height: h,
        width: w,
        backgroundColor: bg,
        borderRadius: rounded
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${bg}, ${loaderColor}, ${bg})`,
          animation: 'skeleton-loading 1.5s infinite',
        }}
      />
      <style>
        {`
          @keyframes skeleton-loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};
