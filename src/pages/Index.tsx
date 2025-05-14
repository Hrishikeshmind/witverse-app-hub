
import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedApps from "@/components/FeaturedApps";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import { apps, categories } from "@/data/mockData";

const Index = () => {
  // Filter apps based on properties
  const featuredApps = apps.filter(app => app.isFeatured).slice(0, 4);
  const trendingApps = apps.filter(app => app.isTrending).slice(0, 4);
  const newApps = apps.filter(app => app.isNew).slice(0, 4);
  const facultyPicksApps = apps.filter(app => app.isFacultyPick).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <FeaturedApps 
          title="Featured Apps" 
          subtitle="Specially curated for WIT students"
          apps={featuredApps}
          viewAllLink="#"
        />
        
        <CategoriesSection categories={categories} />
        
        <FeaturedApps 
          title="Trending Now" 
          subtitle="Popular among students this week"
          apps={trendingApps}
          viewAllLink="#"
        />
        
        <div className="bg-gray-50 dark:bg-gray-900">
          <FeaturedApps 
            title="New Releases" 
            subtitle="Fresh apps for the campus community"
            apps={newApps}
            viewAllLink="#"
          />
        </div>
        
        <FeaturedApps 
          title="Faculty Picks" 
          subtitle="Recommended by professors"
          apps={facultyPicksApps}
          viewAllLink="#"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
