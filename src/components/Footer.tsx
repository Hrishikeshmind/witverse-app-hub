
import React from 'react';
import { Github, Heart, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-dark bg-clip-text text-transparent">
                WITVerse
              </span>
              <span className="text-lg font-semibold">Store</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The official app store for Walchand Institute of Technology, designed to help students and faculty discover, download, and share campus applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/hrishikeshgade" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-purple">
                <Github size={20} />
              </a>
              <a href="mailto:hrishigade@gmail.com" className="text-gray-400 hover:text-primary-purple">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary-purple">Home</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-primary-purple">Explore</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-primary-purple">Categories</Link></li>
              <li><Link to="/upload" className="text-gray-400 hover:text-primary-purple">Upload App</Link></li>
              <li><Link to="/developer-portal" className="text-gray-400 hover:text-primary-purple">Developer Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-400 hover:text-primary-purple">Help Center</Link></li>
              <li><Link to="/guidelines" className="text-gray-400 hover:text-primary-purple">Developer Guidelines</Link></li>
              <li><Link to="/review-policy" className="text-gray-400 hover:text-primary-purple">App Review Policy</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary-purple">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary-purple">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-500" fill="currentColor" /> for Walchand Institute of Technology
          </p>
          <p className="text-gray-500 text-sm mt-2 text-center">
            © {new Date().getFullYear()} WITVerse Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
