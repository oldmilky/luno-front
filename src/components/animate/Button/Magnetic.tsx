import React, { useEffect, useRef } from "react";
import { loadGSAP } from "@/utils/dynamicImports";

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    let xTo: any;
    let yTo: any;

    loadGSAP().then((gsap) => {
      xTo = gsap.quickTo(magnetic.current, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      yTo = gsap.quickTo(magnetic.current, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
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
    // Event listeners will be added after GSAP is loaded
    const addListeners = () => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    };

    if (xTo && yTo) {
      addListeners();
    } else {
      // Fallback: wait until GSAP finishes loading
      const interval = setInterval(() => {
        if (xTo && yTo) {
          addListeners();
          clearInterval(interval);
        }
      }, 50);
    }
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
