
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedApps from "@/components/FeaturedApps";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { apps, categories } from "@/data/mockData";

const Index = () => {
  // Filter apps based on properties
  const featuredApps = apps.filter(app => app.isFeatured).slice(0, 4);
  const trendingApps = apps.filter(app => app.isTrending).slice(0, 4);
  const newApps = apps.filter(app => app.isNew).slice(0, 4);
  const facultyPicksApps = apps.filter(app => app.isFacultyPick).slice(0, 4);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <HeroSection />
        
        <motion.div variants={itemVariants} viewport={{ once: true }}>
          <FeaturedApps 
            title="Featured Apps" 
            subtitle="Specially curated for WIT students"
            apps={featuredApps}
            viewAllLink="#"
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          viewport={{ once: true }}
        >
          <CategoriesSection categories={categories} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          viewport={{ once: true }}
        >
          <FeaturedApps 
            title="Trending Now" 
            subtitle="Popular among students this week"
            apps={trendingApps}
            viewAllLink="#"
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          viewport={{ once: true }}
        >
          <Testimonials />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="bg-gray-50 dark:bg-gray-900" 
          viewport={{ once: true }}
        >
          <FeaturedApps 
            title="New Releases" 
            subtitle="Fresh apps for the campus community"
            apps={newApps}
            viewAllLink="#"
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          viewport={{ once: true }}
        >
          <FeaturedApps 
            title="Faculty Picks" 
            subtitle="Recommended by professors"
            apps={facultyPicksApps}
            viewAllLink="#"
          />
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Index;
