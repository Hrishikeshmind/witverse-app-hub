
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, Code, User, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const DeveloperPortal = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-purple to-primary-dark bg-clip-text text-transparent">
            Developer Portal
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Welcome to the WITVerse Store Developer Portal. Learn more about the project and its creator.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="h-6 w-6 text-primary-purple" /> Developer Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Name</h3>
                <p className="text-gray-300">Hrishikesh Gade</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Department</h3>
                <p className="text-gray-300">Electronics & Telecommunication Engineering (ENTC)</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Institution</h3>
                <p className="text-gray-300">Walchand Institute of Technology, Solapur</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Contact</h3>
                <a href="mailto:hrishigade@gmail.com" className="text-primary-purple hover:underline flex items-center gap-1">
                  <Mail className="h-4 w-4" /> hrishigade@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Social</h3>
                <div className="flex gap-4 mt-2">
                  <a 
                    href="https://github.com/hrishikeshgade" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="h-6 w-6 text-primary-purple" /> Project Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Project Name</h3>
                <p className="text-gray-300">WITVerse Store - The Official App Store for WIT</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Technologies</h3>
                <ul className="text-gray-300 list-disc pl-5 mt-2 space-y-1">
                  <li>React + TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                  <li>Shadcn UI Components</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Backend</h3>
                <p className="text-gray-300">Powered by Supabase</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-purple">Repository</h3>
                <a 
                  href="https://github.com/hrishikeshgade/witverse" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary-purple hover:underline flex items-center gap-1"
                >
                  View Source Code <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-300 flex items-center gap-1 text-sm">
                  Made with <Heart size={14} className="text-red-500" fill="currentColor" /> for Walchand Institute of Technology
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary-purple" /> For Developers
          </h2>
          
          <p className="text-gray-300 mb-6">
            Are you a developer looking to publish your app on WITVerse Store? We welcome contributions from the WIT community. 
            Follow these steps to get started:
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary-purple">1. Create Your App</h3>
              <p className="text-gray-300">Build your application using any technology stack of your choice.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-primary-purple">2. Prepare Required Materials</h3>
              <ul className="text-gray-300 list-disc pl-5 mt-2 space-y-1">
                <li>App icon (512x512px recommended)</li>
                <li>Screenshots of your application</li>
                <li>Brief description and detailed features list</li>
                <li>Installation instructions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-primary-purple">3. Submit for Review</h3>
              <p className="text-gray-300">Once ready, submit your application for review through our developer portal.</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button className="bg-primary-purple hover:bg-primary-dark">
              Register as Developer
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeveloperPortal;
