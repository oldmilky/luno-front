// Import dynamic at the top
import dynamic from "next/dynamic";

// Optimized dynamic imports utility with caching

// GSAP with caching
let gsapCache: any = null;
export const loadGSAP = async () => {
  if (gsapCache) return gsapCache;

  const gsap = (await import("gsap")).default;
  gsapCache = gsap;
  return gsap;
};

// GSAP ScrollTrigger with caching
let scrollTriggerCache: any = null;
export const loadScrollTrigger = async () => {
  if (scrollTriggerCache) return scrollTriggerCache;

  const [gsap, ScrollTrigger] = await Promise.all([
    loadGSAP(),
    import("gsap/ScrollTrigger"),
  ]);

  scrollTriggerCache = ScrollTrigger.default;
  gsap.registerPlugin(scrollTriggerCache);
  return scrollTriggerCache;
};

// Heavy animation components with SSR optimization
export const DynamicModal = dynamic(
  () => import("@/components/layout/Portfolio/Modal/Modal"),
  {
    ssr: false,
  }
);

export const DynamicMedia = dynamic(
  () => import("@/components/layout/Case/Media/Media"),
  {
    ssr: false,
  }
);

// Animation components optimization
export const DynamicTypeAnimation = dynamic(
  () =>
    import("react-type-animation").then((mod) => ({
      default: mod.TypeAnimation,
    })),
  { ssr: false }
);

export const DynamicAnimatePresence = dynamic(
  () =>
    import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })),
  { ssr: false }
);

export const DynamicSplitText = dynamic(
  () => import("@/components/animate/SplitText/SplitText2"),
  {
    ssr: false,
  }
);

export const DynamicCountUp = dynamic(
  () => import("@/components/animate/CountUp/CountUp"),
  {
    ssr: false,
  }
);

// UI components optimization
export const DynamicOrder = dynamic(
  () => import("@/components/ui/Order/Order"),
  {
    ssr: true, // Важно для SEO
  }
);

export const DynamicPlanet = dynamic(
  () => import("@/components/ui/Planet/Planet"),
  {
    ssr: false,
  }
);

// React Query for conditional loading
let reactQueryCache: any = null;
export const loadReactQuery = async () => {
  if (reactQueryCache) return reactQueryCache;

  const { QueryClient, QueryClientProvider } = await import("react-query");
  reactQueryCache = { QueryClient, QueryClientProvider };
  return reactQueryCache;
};

// Framer Motion utility functions
export const loadFramerMotion = async () => {
  return import("framer-motion");
};

// React Hot Toast optimization
let toastCache: any = null;
export const loadToast = async () => {
  if (toastCache) return toastCache;

  const toast = await import("react-hot-toast");
  toastCache = toast;
  return toast;
};

// Media query hook optimization
export const loadMediaQuery = async () => {
  return import("react-responsive");
};
