
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Upload as UploadIcon, Loader2, AlertCircle, Sparkles, ImagePlus, FileUp, Info } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "App name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  version: z.string().default("1.0.0"),
});

// Max file sizes
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_APP_SIZE = 100 * 1024 * 1024; // 100MB

// Allowed file types
const ALLOWED_LOGO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
const ALLOWED_APP_TYPES = ['application/zip', 'application/vnd.android.package-archive', 'application/octet-stream', '.ipa'];

const Upload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [appFile, setAppFile] = useState<File | null>(null);
  const [appLogo, setAppLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileErrors, setFileErrors] = useState<{logo?: string, app?: string}>({});

  // Setup form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "1.0.0",
    },
  });

  // Fetch categories from Supabase
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw new Error(error.message);
      return data;
    }
  });

  // Validate file based on type and size
  const validateFile = (file: File, maxSize: number, allowedTypes: string[], fileType: 'logo' | 'app') => {
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      setFileErrors(prev => ({
        ...prev,
        [fileType]: `File size exceeds ${maxSizeMB}MB`
      }));
      return false;
    }
    
    // For app files, check by extension if MIME type doesn't match
    if (fileType === 'app') {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'ipa' || extension === 'apk' || extension === 'zip') {
        setFileErrors(prev => ({...prev, app: undefined}));
        return true;
      }
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setFileErrors(prev => ({
        ...prev,
        [fileType]: `Invalid file type. Allowed: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`
      }));
      return false;
    }
    
    // Clear errors if file is valid
    setFileErrors(prev => ({...prev, [fileType]: undefined}));
    return true;
  };

  // Handle app logo file selection
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = validateFile(file, MAX_LOGO_SIZE, ALLOWED_LOGO_TYPES, 'logo');
      if (isValid) {
        setAppLogo(file);
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        event.target.value = '';
      }
    }
  };

  // Handle app file selection
  const handleAppFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = validateFile(file, MAX_APP_SIZE, ALLOWED_APP_TYPES, 'app');
      if (isValid) {
        setAppFile(file);
      } else {
        event.target.value = '';
      }
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Check if files are uploaded
      if (!appLogo) {
        toast.error("Please upload an app logo");
        return;
      }
      
      if (!appFile) {
        toast.error("Please upload an app file");
        return;
      }
      
      setIsUploading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to upload an app.");
        return;
      }

      // Upload app logo
      const logoExt = appLogo.name.split('.').pop();
      const logoFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${logoExt}`;
      
      const { data: logoData, error: logoError } = await supabase.storage
        .from('app_logos')
        .upload(logoFileName, appLogo);
        
      if (logoError) {
        throw new Error(`Logo upload failed: ${logoError.message}`);
      }
      
      const { data: { publicUrl: logoUrl } } = supabase.storage
        .from('app_logos')
        .getPublicUrl(logoFileName);
      
      // Upload app file
      const fileExt = appFile.name.split('.').pop();
      const appFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      const { data: fileData, error: fileError } = await supabase.storage
        .from('app_files')
        .upload(appFileName, appFile);
        
      if (fileError) {
        throw new Error(`App file upload failed: ${fileError.message}`);
      }
      
      const { data: { publicUrl: appFileUrl } } = supabase.storage
        .from('app_files')
        .getPublicUrl(appFileName);
      
      // Insert app data into database
      const { data: appData, error: appError } = await supabase
        .from('apps')
        .insert({
          name: values.name,
          description: values.description,
          category_id: values.category,
          version: values.version,
          developer_id: user.id,
          logo_url: logoUrl,
          file_url: appFileUrl,
        })
        .select()
        .single();
      
      if (appError) {
        throw new Error(`Failed to create app: ${appError.message}`);
      }

      toast.success("App submitted successfully! It will be reviewed shortly.");
      navigate('/developer-portal');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to upload app");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">
                Upload Your App
              </h1>
              <p className="text-gray-400 max-w-xl">
                Share your innovative application with the WITVerse community and reach thousands of users looking for great apps.
              </p>
            </div>
            <div className="flex gap-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2 border border-white/10 backdrop-blur-md bg-gray-900/50 shadow-xl animate-fade-in">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileUp className="h-5 w-5 text-primary" />
                  App Information
                </CardTitle>
                <CardDescription>
                  Provide comprehensive details about your application
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">App Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your app name" className="bg-gray-800/50 border-white/10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the purpose, features and benefits of your app..." 
                              {...field} 
                              className="min-h-[150px] bg-gray-800/50 border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={isCategoriesLoading}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-800/50 border-white/10">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-white/10">
                                {categories?.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Version</FormLabel>
                            <FormControl>
                              <Input placeholder="1.0.0" className="bg-gray-800/50 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-6 pt-4">
                      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
                        <FormLabel className="block mb-3 text-lg font-medium">App Logo</FormLabel>
                        <div className="flex items-center gap-6">
                          <div className="flex-1">
                            <div className="relative group">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                              <Info className="h-3 w-3" />
                              Recommended size: 512x512px (Maximum: 5MB)
                            </p>
                            {fileErrors.logo && (
                              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {fileErrors.logo}
                              </p>
                            )}
                          </div>
                          
                          {previewUrl ? (
                            <div className="h-24 w-24 rounded-xl overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 transition-all hover:scale-105 duration-300">
                              <img 
                                src={previewUrl} 
                                alt="Logo preview" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-24 w-24 rounded-xl flex items-center justify-center bg-gray-800/70 border border-dashed border-white/20">
                              <ImagePlus className="h-8 w-8 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
                        <FormLabel className="block mb-3 text-lg font-medium">App File</FormLabel>
                        <div className="relative group">
                          <Input
                            type="file"
                            accept=".zip,.apk,.ipa"
                            onChange={handleAppFileChange}
                            className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Info className="h-3 w-3" />
                              Upload your app as .zip, .apk or .ipa file (Maximum: 100MB)
                            </p>
                            {fileErrors.app && (
                              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {fileErrors.app}
                              </p>
                            )}
                          </div>
                          
                          {appFile && (
                            <div className="flex items-center px-3 py-1 bg-primary/20 rounded-full">
                              <span className="text-xs text-primary-foreground">{appFile.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {(fileErrors.app || fileErrors.logo) && (
                        <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Upload Error</AlertTitle>
                          <AlertDescription>
                            Please fix the file errors before submitting your app
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
                      disabled={isUploading || !!fileErrors.app || !!fileErrors.logo}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Uploading App...
                        </>
                      ) : (
                        <>
                          <UploadIcon className="h-5 w-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="col-span-1 space-y-8">
              <Card className="border border-white/10 backdrop-blur-md bg-gray-900/50 shadow-xl h-fit animate-fade-in delay-100">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Submission Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-5">
                  <div className="space-y-2">
                    <h3 className="font-bold text-white">App Requirements</h3>
                    <ul className="space-y-2 pl-5 text-sm text-gray-300">
                      <li className="flex items-start">
                        <div className="rounded-full bg-primary/20 p-0.5 mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        Must be relevant to the WIT community
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-primary/20 p-0.5 mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        Must not contain harmful or offensive content
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-primary/20 p-0.5 mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        Must include clear description and functionality
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-primary/20 p-0.5 mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        Must be tested and working properly
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <h3 className="font-bold text-white">Review Process</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                      <p>
                        All submitted applications undergo a thorough review process to ensure quality, security, and relevance to the WITVerse community.
                      </p>
                      <p>
                        Our team typically completes reviews within 2-3 business days. You'll receive notifications about the status of your submission.
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-white/10 hover:bg-white/5"
                    onClick={() => navigate('/guidelines')}
                  >
                    View Full Guidelines
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-white/10 backdrop-blur-md bg-gray-900/50 shadow-xl animate-fade-in delay-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Need Help?</h3>
                      <p className="text-sm text-gray-400">Check our developer resources</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant="ghost" 
                      className="justify-start text-left border border-white/5 bg-white/5 hover:bg-white/10"
                      onClick={() => navigate('/help')}
                    >
                      Developer Documentation
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-left border border-white/5 bg-white/5 hover:bg-white/10"
                      onClick={() => navigate('/review-policy')}
                    >
                      App Review Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
