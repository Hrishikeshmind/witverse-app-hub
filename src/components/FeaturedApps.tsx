
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import AppCard from './AppCard';
import { App } from '@/data/mockData';

interface FeaturedAppsProps {
  title: string;
  subtitle?: string;
  apps: App[];
  viewAllLink?: string;
}

const FeaturedApps = ({ title, subtitle, apps, viewAllLink }: FeaturedAppsProps) => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <Button variant="ghost" className="text-primary-purple font-medium">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedApps;
