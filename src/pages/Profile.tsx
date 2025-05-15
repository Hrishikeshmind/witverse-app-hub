
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User, Settings, LogOut, Camera } from "lucide-react";
import Navbar from '@/components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  
  // In a real application, this data would come from an auth context or API
  // For this demo, we'll use placeholder data
  const user = {
    name: "Hrishikesh Gade",
    email: "hrishikesh@example.com",
    mobile: "9876543210",
    department: "ENTC",
    college: "Walchand Institute of Technology",
    joinedDate: "May 2023"
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, you would clear auth tokens here
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold gradient-text">Your Profile</h1>
            <p className="text-muted-foreground">Manage your account details</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Card */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <AspectRatio ratio={3/2} className="bg-muted">
                    <div className="h-full w-full bg-gradient-to-br from-primary-purple to-primary-dark flex items-center justify-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-background">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full" variant="secondary">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </AspectRatio>
                </CardHeader>
                <CardContent className="pt-6 text-center">
                  <CardTitle className="text-xl mb-2">{user.name}</CardTitle>
                  <CardDescription className="text-sm">{user.department} Department</CardDescription>
                  <CardDescription className="text-sm">{user.college}</CardDescription>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Email</span>
                      <span className="font-medium text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Mobile</span>
                      <span className="font-medium text-sm">+91 {user.mobile}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Joined</span>
                      <span className="font-medium text-sm">{user.joinedDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Activity & Apps */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and app usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="rounded-full bg-primary/10 p-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Downloaded Physics Formula App</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Apps</CardTitle>
                  <CardDescription>Apps you've downloaded from WITVerse</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Physics Formulas', 'Campus Map', 'Attendance Tracker'].map((app, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white font-bold">{app[0]}</span>
                        </div>
                        <h4 className="text-sm font-medium">{app}</h4>
                        <p className="text-xs text-muted-foreground mt-1">v1.{i+1}.0</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/">Browse More Apps</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
