
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GradientBackground: React.FC<{ className?: string }> = ({ className }) => {
  // Create a moving gradient with subtle animation
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute w-full h-full opacity-70"
        style={{
          background: 'linear-gradient(to bottom right, rgba(155, 135, 245, 0.8), rgba(110, 89, 165, 0.8))',
          filter: 'blur(60px)'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Additional gradient elements */}
      <motion.div
        className="absolute rounded-full w-[30vw] h-[30vw] top-[-10%] right-[-10%] opacity-50"
        style={{ 
          background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.4), rgba(156, 132, 249, 0.4))',
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.5, 0.4]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <motion.div
        className="absolute rounded-full w-[25vw] h-[25vw] bottom-[-10%] left-[-10%] opacity-40"
        style={{ 
          background: 'linear-gradient(45deg, rgba(156, 132, 249, 0.4), rgba(249, 115, 22, 0.4))',
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2
        }}
      />
    </div>
  );
};

export default GradientBackground;
