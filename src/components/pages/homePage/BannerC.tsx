import { useEffect, useRef, useState, useCallback } from "react";
import { Banners } from "@/constants/banners";

function BannerC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Physics constants
  const DECELERATION = 0.0034;
  const BOUNCE_DAMPING = 0.25;
  const SNAP_DURATION = 300;

  // Update scroll progress
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    setScrollProgress(scrollLeft / containerWidth);
  }, []);

  // Animation loop
  const animate = useCallback(
    (time: number) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - containerWidth;

      updateScrollProgress();

      if (isDraggingRef.current) {
        // Update velocity during drag
        const deltaTime = time - lastTimeRef.current;
        if (deltaTime > 0) {
          velocityRef.current =
            (currentScroll - lastPosRef.current) / deltaTime;
        }
        lastPosRef.current = currentScroll;
        lastTimeRef.current = time;
      } else {
        // Apply momentum after release
        if (Math.abs(velocityRef.current) > 0.1) {
          velocityRef.current *= 1 - DECELERATION;
          let newScroll = currentScroll + velocityRef.current;

          // Handle boundaries with bounce
          if (newScroll < 0) {
            newScroll = 0 - (0 - newScroll) * BOUNCE_DAMPING;
            velocityRef.current *= -0.5;
          } else if (newScroll > maxScroll) {
            newScroll = maxScroll + (newScroll - maxScroll) * BOUNCE_DAMPING;
            velocityRef.current *= -0.5;
          }

          container.scrollLeft = newScroll;
        } else {
          // Snap to nearest slide
          const targetIndex = Math.round(currentScroll / containerWidth);
          const targetScroll = targetIndex * containerWidth;

          if (Math.abs(currentScroll - targetScroll) > 1) {
            const progress = Math.min(
              1,
              (time - lastTimeRef.current) / SNAP_DURATION
            );
            container.scrollLeft =
              currentScroll +
              (targetScroll - currentScroll) * easeOut(progress);
          } else {
            container.scrollLeft = targetScroll;
            setActiveIndex(targetIndex);
            return; // Stop animation when settled
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [updateScrollProgress]
  );

  // Calculate dot scale based on scroll position
  const getDotScale = (index: number) => {
    const distance = scrollProgress - index;
    const absDistance = Math.abs(distance);

    if (absDistance < 0.5) {
      // Current and adjacent dots
      if (index === Math.floor(scrollProgress)) {
        // Current dot (scaling down)
        return 1 + 0.5 * (1 - absDistance * 2);
      } else {
        // Next dot (scaling up)
        return 1 + 0.5 * (1 - (1 - absDistance) * 2);
      }
    }
    return 1; // Default scale
  };

  // Easing function for smooth snapping
  const easeOut = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Start drag
  const startDrag = (clientX: number) => {
    if (!containerRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = clientX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    velocityRef.current = 0;
    lastTimeRef.current = performance.now();
    lastPosRef.current = scrollLeftRef.current;

    cancelAnimationFrame(animationRef.current!);
    containerRef.current.style.scrollBehavior = "auto";
    containerRef.current.style.cursor = "grabbing";
  };

  // During drag
  const moveDrag = (clientX: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const deltaX = clientX - startXRef.current;
    containerRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  };

  // End drag
  const endDrag = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    containerRef.current!.style.scrollBehavior = "";
    containerRef.current!.style.cursor = "";

    // Start momentum animation
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  };

  // Event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientX);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    moveDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    endDrag();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    moveDrag(e.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    endDrag();
  };

  // Initialize
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current!);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [animate]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDraggingRef.current && containerRef.current) {
        const nextIndex = (activeIndex + 1) % Banners.length;
        setActiveIndex(nextIndex);
        containerRef.current.scrollTo({
          left: nextIndex * containerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="relative overflow-hidden select-none">
      <div
        ref={containerRef}
        className="flex overflow-x-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      >
        {Banners.map((banner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full px-3"
            style={{ flex: "0 0 100%" }}
          >
            <div className="flex justify-center rounded-md aspect-triangle items-center overflow-hidden relative">
              <img
                className="object-contain w-full"
                src={banner.url}
                alt={`Banner ${index}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Banners.map((_, index) => {
          const scale = getDotScale(index);
          const isActive = index === Math.round(scrollProgress);

          return (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 ${
                isActive ? "bg-black" : "bg-gray-300"
              }`}
              style={{
                width: `${scale * 12}px`,
                height: "12px",
              }}
              onClick={() => {
                setActiveIndex(index);
                containerRef.current?.scrollTo({
                  left: index * (containerRef.current?.clientWidth || 0),
                  behavior: "smooth",
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BannerC;
