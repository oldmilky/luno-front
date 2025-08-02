import React, { useEffect, useRef } from "react";
import { loadGSAP } from "@/utils/dynamicImports";

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    let gsapRef: any = null;
    let xTo: any;
    let yTo: any;

    // Cache element bounds to avoid redundant computations
    let cachedBounds: DOMRect | null = null;
    let isMouseInside = false;

    const updateBounds = () => {
      cachedBounds = element.getBoundingClientRect();
    };

    const element = magnetic.current;

    const ensureGSAP = async () => {
      if (gsapRef) return gsapRef;
      gsapRef = await loadGSAP();
      xTo = gsapRef.quickTo(element, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      yTo = gsapRef.quickTo(element, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      return gsapRef;
    };

    const handleMouseEnter = async () => {
      isMouseInside = true;
      await ensureGSAP();
      updateBounds();
    };

    const handleMouseMove = async (e: MouseEvent) => {
      if (!cachedBounds || !isMouseInside) return;
      await ensureGSAP();
      const { clientX, clientY } = e;
      const { height, width, left, top } = cachedBounds;
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = async () => {
      isMouseInside = false;
      await ensureGSAP();
      xTo(0);
      yTo(0);
    };

    // Update bounds on resize
    const handleResize = () => {
      if (isMouseInside) {
        updateBounds();
      }
    };

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
