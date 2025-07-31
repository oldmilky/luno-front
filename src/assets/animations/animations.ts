export const topToBottom = {
  hidden: {
    y: -45,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const topToBottomHeader = {
  hidden: {
    y: -15,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const bottomToTopFooter = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const sidebarAnimate = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
};

export const bottomToTop = {
  hidden: {
    y: 45,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.03,
      type: "spring",
      stiffness: 80,

      damping: 12,

      duration: 0.6,
    },
  }),
};

export const leftToRight = {
  hidden: {
    x: -45,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const leftToRightHeader = {
  hidden: {
    x: -25,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const rightToLeft = {
  hidden: {
    x: 45,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.10, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const rightToLeftHeader = {
  hidden: {
    x: 25,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: [0.10, 1, 0.3, 1],
      type: "spring",
      stiffness: 50,
    },
  }),
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};
