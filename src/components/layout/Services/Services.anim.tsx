export const height = {
  initial: {
    height: 0,
  },
  enter: (i: any) => ({
    height: "100%",
    transition: { duration: 0.5, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] },
  }),
  exit: (i: any) => ({
    height: 0,
    transition: { duration: 0.3, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

export const background = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.5,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: (i: any) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: i },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

export const slideLeft = {
  initial: {
    x: 150,
  },
  enter: {
    x: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    x: 150,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

export const rotateX = {
  initial: {
    rotateX: 90,
    opacity: 0,
  },
  enter: (i: any) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.3 + i * 0.08,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

export const mountAnim = { initial: "initial", animate: "enter", exit: "exit" };
