import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, Lock, Image, Mail, School, Palette, Bell, FolderUp, 
  ShieldCheck, CheckCircle, Globe, Bot, MessageSquareText, 
  FileText, RotateCcw, LogOut, Search, BarChart, Settings as SettingsIcon
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

// Main settings sections and their icons
const settingsSections = [
  { id: 'account', label: 'Account Settings', icon: <User className="mr-2 h-4 w-4" /> },
  { id: 'appearance', label: 'Appearance & Theme', icon: <Palette className="mr-2 h-4 w-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="mr-2 h-4 w-4" /> },
  { id: 'app-management', label: 'App Management', icon: <FolderUp className="mr-2 h-4 w-4" /> },
  { id: 'privacy', label: 'Privacy & Security', icon: <ShieldCheck className="mr-2 h-4 w-4" /> },
  { id: 'verification', label: 'Verification & Trust', icon: <CheckCircle className="mr-2 h-4 w-4" /> },
  { id: 'language', label: 'Language & Accessibility', icon: <Globe className="mr-2 h-4 w-4" /> },
  { id: 'ai', label: 'AI Personalization', icon: <Bot className="mr-2 h-4 w-4" /> },
  { id: 'support', label: 'Support & Feedback', icon: <MessageSquareText className="mr-2 h-4 w-4" /> },
  { id: 'legal', label: 'Legal', icon: <FileText className="mr-2 h-4 w-4" /> },
  { id: 'others', label: 'Others', icon: <SettingsIcon className="mr-2 h-4 w-4" /> },
];

// Quick access tiles for the homepage
const quickAccessTiles = [
  { id: 'edit-profile', label: 'Edit Profile', icon: <Image size={24} />, section: 'account' },
  { id: 'theme', label: 'Theme Settings', icon: <Palette size={24} />, section: 'appearance' },
  { id: 'upload-app', label: 'Upload New App', icon: <FolderUp size={24} />, section: 'app-management' },
  { id: 'security', label: 'Privacy Settings', icon: <ShieldCheck size={24} />, section: 'privacy' },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock functions for demonstration
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search settings..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ScrollArea className="w-full pb-4">
              <TabsList className="mb-8 flex w-max min-w-full space-x-2 p-1">
                <TabsTrigger value="home">Home</TabsTrigger>
                {settingsSections.map(section => (
                  <TabsTrigger key={section.id} value={section.id} className="flex items-center whitespace-nowrap">
                    {section.icon}
                    <span className="ml-1">{section.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>

            {/* Home Tab - Quick access tiles */}
            <TabsContent value="home" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessTiles.map(tile => (
                  <Card 
                    key={tile.id}
                    className="hover:bg-gray-800 transition-all cursor-pointer hover:scale-105"
                    onClick={() => setActiveTab(tile.section)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">{tile.label}</CardTitle>
                      {tile.icon}
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Quick access to {tile.label.toLowerCase()} settings
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">All Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settingsSections.map(section => (
                    <Card 
                      key={section.id}
                      className="hover:bg-gray-800 transition-all cursor-pointer"
                      onClick={() => setActiveTab(section.id)}
                    >
                      <CardHeader className="flex flex-row items-center pb-2">
                        {section.icon}
                        <CardTitle className="text-lg ml-2">{section.label}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-4">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="mr-2 h-5 w-5" />
                    Edit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="Hrishikesh Gade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="ENTC Student at Walchand Institute of Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>
                      <Button variant="outline">Upload New Photo</Button>
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="hrishigade@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" />
                  </div>
                  <Button className="mt-4" onClick={handleSaveChanges}>Update Contact Info</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <School className="mr-2 h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="text-md">Student (ENTC)</div>
                  </div>
                  <div className="space-y-2">
                    <Label>College ID</Label>
                    <div className="text-md">WIT22-ENTC-042</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Verification Status</Label>
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle size={16} />
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance & Theme Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="mr-2 h-5 w-5" />
                    Theme Customization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Primary Color</Label>
                      <p className="text-sm text-gray-400">Choose your primary UI accent color</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary-purple cursor-pointer ring-2 ring-white"></div>
                      <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-accent-orange cursor-pointer"></div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Font Size</Label>
                      <p className="text-sm text-gray-400">Adjust text size for better readability</p>
                    </div>
                    <RadioGroup defaultValue="medium" className="flex gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large">Large</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">UI Effects</Label>
                      <p className="text-sm text-gray-400">Enable glassmorphism effects</p>
                    </div>
                    <Switch id="glassmorphism" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Animations</Label>
                      <p className="text-sm text-gray-400">Enable UI animations</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <Button className="mt-4" onClick={handleSaveChanges}>Save Theme Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">App Upload Notifications</Label>
                      <p className="text-sm text-gray-400">Get notified when new apps are uploaded</p>
                    </div>
                    <Switch id="app-upload-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-gray-400">Enable browser push notifications</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-base">Categories to Follow</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="tech" className="rounded" defaultChecked />
                        <Label htmlFor="tech">Tech</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notes" className="rounded" defaultChecked />
                        <Label htmlFor="notes">Notes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="events" className="rounded" defaultChecked />
                        <Label htmlFor="events">Events</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="games" className="rounded" />
                        <Label htmlFor="games">Games</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleSaveChanges}>Save Notification Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* App Management Tab */}
            <TabsContent value="app-management" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FolderUp className="mr-2 h-5 w-5" />
                    My Uploaded Apps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Button>Upload New App</Button>
                      <span className="text-sm text-gray-400">2 apps uploaded</span>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                      <div className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                              <BarChart className="h-6 w-6 text-primary-purple" />
                            </div>
                            <div>
                              <h3 className="font-semibold">WIT Attendance Tracker</h3>
                              <p className="text-sm text-gray-400">Uploaded 2 months ago</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-2xl font-bold">245</p>
                            <p className="text-xs text-gray-400">Downloads</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">4.8/5</p>
                            <p className="text-xs text-gray-400">Rating</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">18</p>
                            <p className="text-xs text-gray-400">Reviews</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                              <School className="h-6 w-6 text-primary-purple" />
                            </div>
                            <div>
                              <h3 className="font-semibold">WIT Exam Prep</h3>
                              <p className="text-sm text-gray-400">Uploaded 1 month ago</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-2xl font-bold">127</p>
                            <p className="text-xs text-gray-400">Downloads</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">4.5/5</p>
                            <p className="text-xs text-gray-400">Rating</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">9</p>
                            <p className="text-xs text-gray-400">Reviews</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="mr-2 h-5 w-5" />
                    Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">Manage Team Members</Label>
                      <Button variant="outline" size="sm">Add Collaborator</Button>
                    </div>
                    <div className="border border-gray-700 rounded-lg p-4">
                      <p className="text-center text-gray-400">No collaborators added yet</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add content for remaining tabs (Privacy & Security, Verification & Trust, etc.) */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">App Visibility</Label>
                      <p className="text-sm text-gray-400">Who can see the apps you upload</p>
                    </div>
                    <RadioGroup defaultValue="public" className="flex">
                      <div className="flex items-center space-x-2 mr-4">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="college" id="college" />
                        <Label htmlFor="college">College Only</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-gray-400">Who can view your profile</p>
                    </div>
                    <RadioGroup defaultValue="everyone" className="flex">
                      <div className="flex items-center space-x-2 mr-4">
                        <RadioGroupItem value="everyone" id="everyone" />
                        <Label htmlFor="everyone">Everyone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="students" id="students" />
                        <Label htmlFor="students">Students Only</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button className="mt-4" onClick={handleSaveChanges}>Save Privacy Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add remaining tabs content */}
            
            {/* Others Tab */}
            <TabsContent value="others" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    System Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Clear Cache</Label>
                      <p className="text-sm text-gray-400">Clear local application data</p>
                    </div>
                    <Button variant="outline">Clear Cache</Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Reset All Settings</Label>
                      <p className="text-sm text-gray-400">Restore all settings to default values</p>
                    </div>
                    <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Logout</Label>
                      <p className="text-sm text-gray-400">Sign out of your account</p>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
