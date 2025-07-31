import { FC, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  separator?: string;
  decimals?: number;
  decimal?: string;
  direction?: "up" | "down";
  className?: string;
  onComplete?: () => void;
}

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const CountUp: FC<CountUpProps> = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  separator = "",
  decimals = 0,
  decimal = ".",
  direction = "up",
  className = "",
  onComplete,
}) => {
  const [count, setCount] = useState<number>(from);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const hasCompletedRef = useRef<boolean>(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const formatNumber = useCallback(
    (num: number): string => {
      const fixedNum = num.toFixed(decimals);
      const [intPart, decPart] = fixedNum.split(".");

      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return decPart ? `${formattedInt}${decimal}${decPart}` : formattedInt;
    },
    [decimals, separator, decimal]
  );

  const animationConfig = useMemo(
    () => ({
      durationMs: duration * 1000,
      delayMs: delay * 1000,
      range: to - from,
      isCountingUp: direction === "up",
    }),
    [duration, delay, to, from, direction]
  );

  const animate = useCallback(
    (timestamp: number): void => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTimeRef.current) / animationConfig.durationMs,
        1
      );
      const easedProgress = easeOutExpo(progress);

      const currentValue = animationConfig.isCountingUp
        ? from + animationConfig.range * easedProgress
        : to + animationConfig.range * (1 - easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    },
    [from, to, animationConfig, onComplete]
  );

  const cleanup = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    startTimeRef.current = undefined;
    hasCompletedRef.current = false;
  }, []);

  useEffect(() => {
    if (inView) {
      cleanup();

      const timeoutId = setTimeout(() => {
        requestRef.current = requestAnimationFrame(animate);
      }, animationConfig.delayMs);

      return () => {
        clearTimeout(timeoutId);
        cleanup();
      };
    }
  }, [inView, animate, animationConfig.delayMs, cleanup]);

  useEffect(() => {
    setCount(from);
    hasCompletedRef.current = false;
  }, [from, to, direction]);

  const formattedCount = useMemo(
    () => formatNumber(count),
    [count, formatNumber]
  );

  return (
    <span ref={ref} className={className}>
      {formattedCount}
    </span>
  );
};

export default CountUp;
