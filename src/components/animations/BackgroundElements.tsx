
import { motion } from 'framer-motion';
import React from 'react';

interface FloatingElementProps {
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement: React.FC<React.PropsWithChildren<FloatingElementProps>> = ({ 
  children, 
  x = 20, 
  y = 20, 
  delay = 0,
  duration = 8,
  className
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ 
        x: [0, x, 0, -x, 0],
        y: [0, -y, 0, y, 0],
        opacity: [0, 0.7, 0.5, 0.7, 0.5]
      }}
      transition={{ 
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const BackgroundElements = () => {
  const elements = [
    { icon: "📱", x: 30, y: 40, delay: 0, className: "text-4xl" },
    { icon: "💻", x: 20, y: 50, delay: 1, className: "text-3xl" },
    { icon: "🎮", x: 15, y: 25, delay: 2, className: "text-2xl" },
    { icon: "📊", x: 25, y: 35, delay: 3, className: "text-3xl" },
    { icon: "📚", x: 20, y: 30, delay: 2.5, className: "text-2xl" },
    { icon: "🚀", x: 35, y: 25, delay: 3.5, className: "text-4xl" }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          x={element.x}
          y={element.y}
          delay={element.delay}
          className={`absolute ${index % 2 === 0 ? 'left-[10%]' : 'right-[10%]'} ${
            index < 2 ? 'top-[15%]' : index < 4 ? 'top-[45%]' : 'top-[75%]'
          } opacity-20 dark:opacity-10 ${element.className} blur-[1px]`}
        >
          {element.icon}
        </FloatingElement>
      ))}
    </div>
  );
};

export default BackgroundElements;
