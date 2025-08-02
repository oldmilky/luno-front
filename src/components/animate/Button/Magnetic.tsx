import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    // Cache element bounds to avoid getBoundingClientRect on every mousemove
    let cachedBounds: DOMRect | null = null;
    let isMouseInside = false;

    const updateBounds = () => {
      if (magnetic.current) {
        cachedBounds = magnetic.current.getBoundingClientRect();
      }
    };

    const handleMouseEnter = () => {
      isMouseInside = true;
      updateBounds();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current || !cachedBounds || !isMouseInside) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = cachedBounds;
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      xTo(0);
      yTo(0);
    };

    // Update bounds on resize
    const handleResize = () => {
      if (isMouseInside) {
        updateBounds();
      }
    };

    const element = magnetic.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
}
