"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Инициализируем Lenis только если не на мобильном устройстве
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
      window.scrollTo(0, 0);

      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }
      }

      rafRef.current = requestAnimationFrame(raf);
    }

    return () => {
      // Очищаем RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      
      // Уничтожаем Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
