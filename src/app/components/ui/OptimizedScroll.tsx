// components/ui/OptimizedScroll.tsx - Scroll otimizado com snap-to-grid
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedScrollProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  snap?: boolean;
  className?: string;
  showScrollbar?: boolean;
}

export const OptimizedScroll: React.FC<OptimizedScrollProps> = ({
  children,
  direction = 'vertical',
  snap = false,
  className = '',
  showScrollbar = true,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Otimização para scroll suave em mobile
    element.style.webkitOverflowScrolling = 'touch';
    element.style.scrollBehavior = 'smooth';

    // Prevenção de scroll bounce em iOS
    element.style.overscrollBehavior = 'contain';
  }, []);

  const scrollClasses = direction === 'horizontal'
    ? 'flex overflow-x-auto'
    : 'overflow-y-auto';

  const snapClasses = snap
    ? direction === 'horizontal'
      ? 'scroll-snap-x-mandatory'
      : 'scroll-snap-y-mandatory'
    : '';

  const scrollbarClasses = showScrollbar
    ? ''
    : direction === 'horizontal'
      ? 'scrollbar-hide'
      : 'scrollbar-hide';

  return (
    <motion.div
      ref={scrollRef}
      className={`${scrollClasses} ${snapClasses} ${scrollbarClasses} ${className}`}
      style={{
        scrollSnapType: snap ? (direction === 'horizontal' ? 'x mandatory' : 'y mandatory') : 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={snap ? 'scroll-snap-align-start flex-shrink-0' : ''}
        >
          {child}
        </div>
      ))}
    </motion.div>
  );
};

// Hook para detectar scroll suave
export const useSmoothScroll = () => {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Previne comportamento padrão para scroll mais suave
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
};