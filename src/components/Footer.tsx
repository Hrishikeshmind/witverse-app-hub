
import React from 'react';
import { Github, Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-dark bg-clip-text text-transparent">
                WITVerse
              </span>
              <span className="text-lg font-semibold">Store</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
              The official app store for Walchand Institute of Technology, designed to help students and faculty discover, download, and share campus applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-purple">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-purple">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Home</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Explore</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Categories</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Upload App</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Developer Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Help Center</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Developer Guidelines</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">App Review Policy</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-purple">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-500" fill="currentColor" /> for Walchand Institute of Technology
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} WITVerse Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
