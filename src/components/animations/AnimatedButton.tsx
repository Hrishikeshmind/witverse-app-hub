
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  effect?: 'scale' | 'lift' | 'pulse';
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, effect = 'scale', children, ...props }, ref) => {
    // Animation variants
    const buttonVariants = {
      scale: {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      },
      lift: {
        rest: { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
        hover: { y: -3, boxShadow: "0 6px 10px rgba(0,0,0,0.15)" },
        tap: { y: -1, boxShadow: "0 5px 8px rgba(0,0,0,0.12)" }
      },
      pulse: {
        rest: { scale: 1 },
        hover: { 
          scale: [1, 1.04, 1.02],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 0.7, 1],
          }
        },
        tap: { scale: 0.95 }
      }
    };
    
    const variants = buttonVariants[effect];

    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        animate="rest"
        variants={variants}
        className="inline-block"
      >
        <Button 
          ref={ref} 
          className={cn("transition-all duration-300", className)} 
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
