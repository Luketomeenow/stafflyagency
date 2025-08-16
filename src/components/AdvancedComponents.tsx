import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Floating Orb Component
export const FloatingOrb = ({ 
  size = 'w-64 h-64', 
  colors = 'from-purple-400 to-pink-500',
  delay = 0 
}: {
  size?: string;
  colors?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay }}
    className={`${size} bg-gradient-to-r ${colors} rounded-full blur-3xl opacity-30 absolute`}
    style={{
      animation: `float-up-down ${6 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
);

// Magnetic Card Component
export const MagneticCard = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <motion.div
    whileHover={{ y: -5, rotateX: 5, rotateY: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`magnetic-hover card-3d ${className}`}
  >
    {children}
  </motion.div>
);

// Shimmer Button Component
export const ShimmerButton = ({ 
  children, 
  onClick,
  className = '' 
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string; 
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`shimmer btn-modern relative overflow-hidden ${className}`}
  >
    {children}
  </motion.button>
);

// Gradient Border Card
export const GradientBorderCard = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <div className={`gradient-border ${className}`}>
    <div className="gradient-border-content">
      {children}
    </div>
  </div>
);

// Particle Field Component
export const ParticleField = ({ count = 20 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="particle absolute w-2 h-2 bg-white/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

// Glass Card Component
export const GlassCard = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`glass-card ${className}`}
  >
    {children}
  </motion.div>
);

// Animated Counter Component
export const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  suffix = '' 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration,
          ease: "easeOut",
        }}
        onUpdate={(latest) => {
          if (typeof latest.y === 'number') {
            const progress = 1 - (latest.y / 50);
            const currentValue = Math.floor(end * progress);
            const element = document.querySelector(`[data-counter="${end}"]`);
            if (element) {
              element.textContent = `${currentValue}${suffix}`;
            }
          }
        }}
        data-counter={end}
      >
        {end}{suffix}
      </motion.span>
    </motion.span>
  );
};

// Floating Profile Component
export const FloatingProfile = ({ 
  name, 
  role, 
  initials, 
  position, 
  delay = 0 
}: {
  name: string;
  role: string;
  initials: string;
  position: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`${position === 'relative' ? 'relative' : `absolute ${position}`} transform hover:scale-110 transition-all duration-300 ${position === 'relative' ? '' : 'float-animation'}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <GlassCard className="p-4 rounded-2xl">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-white/70 text-xs">{role}</p>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// Text Reveal Component
export const TextReveal = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="text-reveal"
  >
    {children}
  </motion.div>
);

// Loading Dots Component
export const LoadingDots = ({ className = '' }: { className?: string }) => (
  <div className={`flex space-x-2 ${className}`}>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="loading-dot w-2 h-2 bg-current rounded-full"
      />
    ))}
  </div>
);