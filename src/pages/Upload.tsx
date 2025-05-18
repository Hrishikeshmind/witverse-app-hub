
import React from 'react';
import { Sparkles } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadWizard from "@/components/upload/UploadWizard";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">
                Upload Your App
              </h1>
              <p className="text-gray-400 max-w-xl">
                Share your innovative application with the WITVerse community and reach thousands of users looking for great apps.
              </p>
            </div>
            <div className="flex gap-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <UploadWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
