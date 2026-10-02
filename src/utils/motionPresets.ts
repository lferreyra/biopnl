import { Variants } from 'framer-motion';

/**
 * Premium easing curves and transition definitions
 * calibrated for a calm, organic, mindful feel.
 */
export const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const cardHoverMotion = {
  whileHover: {
    y: -4,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  },
  whileTap: {
    scale: 0.985,
    transition: { duration: 0.15 }
  }
};
