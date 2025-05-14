
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Upload } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-purple/90 to-primary-dark">
      {/* Abstract shapes for background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Welcome to <span className="text-accent-orange">WITVerse Store</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.1s"}}>
            Discover, download, and develop apps made exclusively for the 
            Walchand Institute of Technology community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.2s"}}>
            <Button size="lg" className="bg-white text-primary-dark hover:bg-white/90">
              <Search className="w-5 h-5 mr-2" />
              Explore Apps
            </Button>
            
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Upload className="w-5 h-5 mr-2" />
              Publish Your App
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg">
              <p className="text-white font-medium">500+ Apps</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg">
              <p className="text-white font-medium">200+ Developers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg">
              <p className="text-white font-medium">15k+ Downloads</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg">
              <p className="text-white font-medium">6 Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
