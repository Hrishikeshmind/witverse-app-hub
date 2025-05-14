
import React from 'react';
import { Category } from '@/data/mockData';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <a 
              key={category.id}
              href={`#category-${category.id}`}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl hover-scale shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-3">{category.icon}</span>
              <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} apps</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
