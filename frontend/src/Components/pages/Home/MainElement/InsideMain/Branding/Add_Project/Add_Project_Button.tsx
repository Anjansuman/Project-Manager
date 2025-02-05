import React, { useState } from "react";

export const Add_Project_Button = () => {
  const [midPosition, setMidPosition] = useState({ x: 0, y: 0 });
  const [inPosition, setInPosition] = useState({ x: 0, y: 0 });

  const handleBoundaryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const boundary = e.currentTarget;
    const rect = boundary.getBoundingClientRect();
    const boundaryRadius = rect.width / 2;
    const midSize = 24 * 4; // Mid element size (Tailwind "24" * 4px)
    const midRadius = midSize / 2;

    let x = e.clientX - (rect.left + boundaryRadius);
    let y = e.clientY - (rect.top + boundaryRadius);

    const distance = Math.sqrt(x * x + y * y);

    if (distance + midRadius > boundaryRadius) {
      const angle = Math.atan2(y, x);
      x = (boundaryRadius - midRadius) * Math.cos(angle);
      y = (boundaryRadius - midRadius) * Math.sin(angle);
    }

    setMidPosition({ x, y });
  };

  const handleMidMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mid = e.currentTarget;
    const rect = mid.getBoundingClientRect();
    const midRadius = rect.width / 2;
    const inSize = 20 * 4; // In element size (Tailwind "20" * 4px)
    const inRadius = inSize / 2;

    let x = e.clientX - (rect.left + midRadius);
    let y = e.clientY - (rect.top + midRadius);

    const distance = Math.sqrt(x * x + y * y);

    if (distance + inRadius > midRadius) {
      const angle = Math.atan2(y, x);
      x = (midRadius - inRadius) * Math.cos(angle);
      y = (midRadius - inRadius) * Math.sin(angle);
    }

    setInPosition({ x, y });
  };

  const handleBoundaryMouseLeave = () => {
    setMidPosition({ x: 0, y: 0 });
    setInPosition({ x: 0, y: 0 });
  };

  return (
    <div>
      {/* Outer Circle */}
      <div
        className="relative w-28 h-28 rounded-full shadow-lg flex justify-center items-center transition-transform duration-500 ease-out cursor-pointer"
        style={{ backgroundColor: "#1D1D3B69" }}
        onMouseMove={handleBoundaryMouseMove}
        onMouseLeave={handleBoundaryMouseLeave}
      >
        {/* Middle Circle */}
        <div
          className="relative w-24 h-24 rounded-full shadow-md flex justify-center items-center transition-transform duration-500 ease-out"
          style={{
            backgroundColor: "#1D1D3B69",
            transform: `translate(${midPosition.x}px, ${midPosition.y}px)`,
          }}
          onMouseMove={handleMidMouseMove}
        >
          {/* Inner Circle */}
          <div
            className="w-20 h-20 rounded-full shadow-sm flex justify-center items-center transition-transform duration-500 ease-out text-[white]"
            style={{
              backgroundColor: "#1D1D3B69",
              transform: `translate(${inPosition.x}px, ${inPosition.y}px)`,
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};
