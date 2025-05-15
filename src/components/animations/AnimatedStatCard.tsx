
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface AnimatedStatCardProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ value, label, icon, className }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      className={`bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && <div className="text-white text-xl">{icon}</div>}
        <div>
          <p className="text-white font-medium">
            <CountUp
              end={value}
              duration={2.5}
              prefix={value > 1000 ? "" : ""}
              suffix={value === 6 ? "" : "+"}
            />
          </p>
          <p className="text-white/75 text-sm">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedStatCard;
