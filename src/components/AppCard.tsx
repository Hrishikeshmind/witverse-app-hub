
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Download } from "lucide-react";
import { App } from "@/data/mockData";
import { Link } from "react-router-dom";

interface AppCardProps {
  app: App;
  size?: 'sm' | 'md' | 'lg';
}

const AppCard = ({ app, size = 'md' }: AppCardProps) => {
  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <Link 
      to={`/app/${app.id}`} 
      className={`app-card block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover-scale ${
        size === 'sm' ? 'w-[160px]' : 
        size === 'md' ? 'w-full max-w-xs' : 'w-full max-w-sm'
      }`}
    >
      <div className="relative">
        {app.isNew && (
          <span className="absolute top-2 left-2 bg-accent-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {app.isFacultyPick && (
          <span className="absolute top-2 right-2 bg-primary-dark text-white text-xs font-semibold px-2 py-1 rounded-full">
            Faculty Pick
          </span>
        )}
        <img 
          src={app.screenshots[0]} 
          alt={app.name} 
          className="w-full h-40 object-cover rounded-t-xl"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img 
            src={app.icon} 
            alt={`${app.name} icon`}
            className="w-12 h-12 rounded-xl"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{app.developer}</p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{app.rating}</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDownloads(app.downloads)} downloads
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {app.description}
          </p>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full bg-primary-purple hover:bg-primary-dark"
            onClick={(e) => {
              e.preventDefault();
              // Download functionality is now handled in the details page
            }}
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
