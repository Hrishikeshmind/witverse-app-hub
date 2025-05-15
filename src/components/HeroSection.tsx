
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Upload } from "lucide-react";
import AnimatedButton from './animations/AnimatedButton';
import TypewriterText from './animations/TypewriterText';
import AnimatedStatCard from './animations/AnimatedStatCard';
import BackgroundElements from './animations/BackgroundElements';
import GradientBackground from './animations/GradientBackground';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient background */}
      <GradientBackground />
      
      {/* Floating elements in background */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <TypewriterText 
              text="Welcome to WITVerse Store" 
              delay={0.4}
              speed={0.08}
            />
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Discover, download, and develop apps made exclusively for the 
            Walchand Institute of Technology community.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <AnimatedButton effect="lift" size="lg" className="bg-white text-primary-dark hover:bg-white/90">
              <Search className="w-5 h-5 mr-2" />
              Explore Apps
            </AnimatedButton>
            
            <AnimatedButton 
              variant="outline" 
              effect="pulse"
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              <Upload className="w-5 h-5 mr-2" />
              Publish Your App
            </AnimatedButton>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <AnimatedStatCard value={500} label="Apps" icon="📱" />
            <AnimatedStatCard value={200} label="Developers" icon="👨‍💻" />
            <AnimatedStatCard value={15000} label="Downloads" icon="📥" />
            <AnimatedStatCard value={6} label="Categories" icon="📂" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
