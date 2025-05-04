import React, { PropsWithChildren, useRef } from "react";

interface IDraggableScroll extends PropsWithChildren {
  className?: string;
}

const DraggableScroll = ({ className, children }: IDraggableScroll) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const hasMoved = useRef<boolean>(false); // Track if movement occurred

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!containerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    e.preventDefault(); // Prevent default to help with text selection
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging.current || !containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;

    // Only consider it a drag if movement exceeds a threshold
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
      e.preventDefault();
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUpOrLeave = (): void => {
    isDragging.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // Use capture phase to catch the event early
    if (hasMoved.current) {
      e.stopPropagation();
      e.preventDefault();
    }
    // Reset after processing
    setTimeout(() => {
      hasMoved.current = false;
    }, 0);
  };

  return (
    <div
      className={`${className} flex overflow-scroll hide-scrollbar select-none`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseUp={handleMouseUpOrLeave}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
};

export default DraggableScroll;
