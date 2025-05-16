
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Explore Apps</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Discover all the applications available in the WITVerse Store.
        </p>
        
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-purple/10 mb-4">
            <span className="text-3xl">🚧</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            We're working on building a comprehensive explore page. Check back soon!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
