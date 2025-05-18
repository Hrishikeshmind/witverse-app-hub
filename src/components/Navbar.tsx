
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, Search, Upload, User, Settings } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-dark bg-clip-text text-transparent">
              WITVerse
            </span>
            <span className="text-lg font-semibold">Store</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6 mx-6 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search apps, games, developers..." 
              className="pl-10 bg-gray-800 border-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-1"
            onClick={() => navigate('/upload')}
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload App
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register">Create Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/developer-portal">Developer Portal</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/upload">Upload App</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search apps..." 
            className="pl-10 bg-gray-800 border-none"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
