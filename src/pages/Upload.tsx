
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Upload as UploadIcon, Loader2 } from 'lucide-react';

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

const Upload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [appFile, setAppFile] = useState<File | null>(null);
  const [appLogo, setAppLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  // Handle app logo file selection
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAppLogo(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle app file selection
  const handleAppFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAppFile(file);
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to upload an app.");
        return;
      }

      // Upload app logo if provided
      let logoUrl = null;
      if (appLogo) {
        const fileExt = appLogo.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data: logoData, error: logoError } = await supabase.storage
          .from('app_logos')
          .upload(fileName, appLogo);
          
        if (logoError) {
          throw new Error(`Logo upload failed: ${logoError.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('app_logos')
          .getPublicUrl(fileName);
          
        logoUrl = publicUrl;
      }
      
      // Upload app file if provided
      let appFileUrl = null;
      if (appFile) {
        const fileExt = appFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data: fileData, error: fileError } = await supabase.storage
          .from('app_files')
          .upload(fileName, appFile);
          
        if (fileError) {
          throw new Error(`App file upload failed: ${fileError.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('app_files')
          .getPublicUrl(fileName);
          
        appFileUrl = publicUrl;
      }
      
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
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Upload Your App</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Share your application with the WIT community.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>App Information</CardTitle>
              <CardDescription>
                Provide details about your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome App" {...field} />
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your app and its features..." 
                            {...field} 
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isCategoriesLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                          <FormLabel>Version</FormLabel>
                          <FormControl>
                            <Input placeholder="1.0.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <FormLabel className="block mb-2">App Logo</FormLabel>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="max-w-xs"
                        />
                        {previewUrl && (
                          <div className="h-16 w-16 rounded-lg overflow-hidden border">
                            <img 
                              src={previewUrl} 
                              alt="Logo preview" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Recommended size: 512x512px
                      </p>
                    </div>
                    
                    <div>
                      <FormLabel className="block mb-2">App File (.zip, .apk, .ipa)</FormLabel>
                      <Input
                        type="file"
                        accept=".zip,.apk,.ipa"
                        onChange={handleAppFileChange}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Maximum size: 100MB
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Submit App
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">App Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Must be relevant to WIT community</li>
                    <li>Must not contain harmful or offensive content</li>
                    <li>Must include clear description and functionality</li>
                    <li>Must be tested and working properly</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">Review Process</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All submitted apps will be reviewed for quality, relevance, and compliance with our guidelines before being published to the WITVerse Store.
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/guidelines')}
                >
                  View Full Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
