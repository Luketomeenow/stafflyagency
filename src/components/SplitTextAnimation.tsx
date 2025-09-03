import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  gradient?: boolean;
  gradientColors?: string;
}

const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  gradient = false,
  gradientColors = "from-blue-600 to-purple-600"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");
  const characters = text.split("");

  return (
    <div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            delay: delay + wordIndex * stagger,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={`inline-block mr-2 ${gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''}`}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default SplitTextAnimation;
