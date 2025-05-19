
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, Download, Star, Clock, User, Tag, Info, ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";

// Define a more specific type for the app data
interface AppDetails {
  id: string;
  name: string;
  description?: string | null;
  file_url?: string | null;
  logo_url?: string | null;
  downloads: number;
  version?: string | null;
  updated_at: string;
  category_id?: string | null;
  developer_id: string;
  is_featured?: boolean | null;
  is_trending?: boolean | null;
  is_new?: boolean | null;
  is_faculty_pick?: boolean | null;
  categories?: {
    id: string;
    name: string;
    description?: string | null;
    icon_name?: string | null;
  } | null;
  profiles?: {
    id: string;
    username?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
    department?: string | null;
  } | null;
}

const AppDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  
  // Fetch app details
  const { data: app, isLoading, error } = useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("apps")
        .select("*, profiles(*), categories(*)")
        .eq("id", id as any)
        .single();
      
      if (error) throw error;
      return data as AppDetails;
    },
    enabled: !!id,
  });
  
  // Mock screenshots (would come from database in a real app)
  const screenshots = [
    "https://via.placeholder.com/400x800",
    "https://via.placeholder.com/400x800",
    "https://via.placeholder.com/400x800",
    "https://via.placeholder.com/400x800"
  ];
  
  const handleDownload = async () => {
    try {
      if (!user || !app) return;
      
      // Record download in database
      const downloadData = {
        app_id: app.id,
        user_id: user.id
      };
      
      const { error } = await supabase
        .from('app_downloads')
        .insert(downloadData as any);
      
      if (error) {
        throw error;
      }
      
      // Redirect to download URL
      if (app.file_url) {
        window.open(app.file_url, '_blank');
        toast.success("Download started!");
      } else {
        toast.error("Download URL not available");
      }
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(`Failed to download: ${error.message}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!app) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">App not found</h1>
          <p className="text-gray-500 mb-6">The app you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Apps
          </Link>
        </Button>
        
        {/* App header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <img 
              src={app.logo_url || "https://via.placeholder.com/128"} 
              alt={app.name} 
              className="w-full h-full rounded-xl shadow-lg"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{app.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {app.profiles?.username || "Unknown Developer"}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                <span>4.8</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Download className="w-4 h-4 mr-1" />
                <span>{app.downloads} downloads</span>
              </div>
              {app.categories && (
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {app.categories.name}
                </div>
              )}
            </div>
            
            <Button 
              className="w-full md:w-auto bg-primary-purple hover:bg-primary-dark"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" /> Download App
            </Button>
          </div>
        </div>
        
        {/* Screenshots carousel */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">
              {screenshots.map((screenshot, index) => (
                <motion.div 
                  key={index}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    index === activeScreenshot ? 'border-primary-purple' : 'border-transparent'
                  }`}
                  onClick={() => setActiveScreenshot(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={screenshot} 
                    alt={`Screenshot ${index + 1}`} 
                    className="w-[180px] h-[320px] object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 rounded-xl overflow-hidden">
            <img 
              src={screenshots[activeScreenshot]} 
              alt="Selected screenshot" 
              className="w-full max-w-md mx-auto h-auto"
            />
          </div>
        </div>
        
        {/* App description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About this app</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {app.description || "No description available for this app."}
          </p>
        </div>
        
        {/* App info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <span className="block text-sm text-gray-500">Updated</span>
                  <span>{new Date(app.updated_at).toLocaleDateString()}</span>
                </div>
              </li>
              <li className="flex items-start">
                <User className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <span className="block text-sm text-gray-500">Developer</span>
                  <span>{app.profiles?.full_name || app.profiles?.username || "Unknown"}</span>
                </div>
              </li>
              <li className="flex items-start">
                <Tag className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <span className="block text-sm text-gray-500">Version</span>
                  <span>{app.version || "1.0.0"}</span>
                </div>
              </li>
              <li className="flex items-start">
                <Info className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <span className="block text-sm text-gray-500">Category</span>
                  <span>{app.categories?.name || "Uncategorized"}</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Related Apps</h3>
            <p className="text-gray-500">
              Coming soon...
            </p>
          </div>
        </div>
        
        {/* Developer section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Developer</h2>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
              <img 
                src="https://via.placeholder.com/48" 
                alt={app.profiles?.username || "Developer"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{app.profiles?.full_name || app.profiles?.username || "Unknown Developer"}</h3>
              <p className="text-sm text-gray-500">App Developer</p>
            </div>
            <Button variant="outline" className="ml-auto" asChild>
              <a href="#" className="flex items-center">
                View Profile <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppDetails;
