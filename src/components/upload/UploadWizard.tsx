import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Image, 
  FileUp,
  Lock,
  Users,
  Check,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import AppMetadataForm from "./AppMetadataForm";
import AppMediaUpload from "./AppMediaUpload";
import AppBuildUpload from "./AppBuildUpload";
import PrivacyTerms from "./PrivacyTerms";
import TestAccess from "./TestAccess";
import AppPreview from "./AppPreview";
import FinalSubmission from "./FinalSubmission";

// Define Category interface to match expected structure
interface Category {
  id: string;
  name: string;
  description?: string;
  icon_name?: string;
}

type StepType = {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isCompleted: boolean;
};

const UploadWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // App data state
  const [appData, setAppData] = useState<any>({
    // Metadata
    name: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    tags: [],
    version: "1.0.0",
    
    // Media
    appLogo: null,
    screenshots: [],
    promoVideo: "",
    appBanner: null,
    
    // Build
    appFile: null,
    webAppUrl: "",
    releaseNotes: "",
    
    // Privacy & Terms
    agreedToTerms: false,
    agreedToPolicy: false,
    privacyPolicyFile: null,
    privacyPolicyUrl: "",
    
    // Test Access
    releaseType: "public",
    testEmails: [],
    collectFeedback: false,
    feedbackPrompt: "",
  });

  // Fetch categories from Supabase
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw new Error(error.message);
      return data as Category[]; // Cast to Category[]
    },
  });

  // Using the properly typed categories
  const categories = categoriesData || [];

  // Check if each step is completed
  const isMetadataComplete = () => {
    return appData.name && appData.shortDescription && appData.fullDescription && appData.category;
  };

  const isMediaComplete = () => {
    return appData.appLogo !== null;
  };

  const isBuildComplete = () => {
    return (appData.appFile || appData.webAppUrl) && appData.version;
  };

  const isPrivacyComplete = () => {
    return appData.agreedToTerms && appData.agreedToPolicy;
  };

  const isTestAccessComplete = () => {
    return appData.releaseType === "public" || 
           (appData.releaseType === "private" && appData.testEmails.length > 0);
  };

  // Define steps
  const steps: StepType[] = [
    {
      id: "metadata",
      title: "App Info",
      icon: <FileText className="h-5 w-5" />,
      component: (
        <AppMetadataForm 
          onSubmit={(data) => {
            setAppData((prev: any) => ({ ...prev, ...data }));
            goToStep(1);
          }}
          categories={categories || []}
          isCategoriesLoading={isCategoriesLoading}
          defaultValues={{
            name: appData.name,
            shortDescription: appData.shortDescription,
            fullDescription: appData.fullDescription,
            category: appData.category,
            tags: appData.tags,
            version: appData.version,
          }}
        />
      ),
      isCompleted: isMetadataComplete(),
    },
    {
      id: "media",
      title: "Media",
      icon: <Image className="h-5 w-5" />,
      component: (
        <AppMediaUpload 
          onComplete={(data) => {
            setAppData((prev: any) => ({ ...prev, ...data }));
            goToStep(2);
          }}
        />
      ),
      isCompleted: isMediaComplete(),
    },
    {
      id: "build",
      title: "App Build",
      icon: <FileUp className="h-5 w-5" />,
      component: (
        <AppBuildUpload 
          onComplete={(data) => {
            setAppData((prev: any) => ({ ...prev, ...data }));
            goToStep(3);
          }}
          defaultVersion={appData.version}
        />
      ),
      isCompleted: isBuildComplete(),
    },
    {
      id: "privacy",
      title: "Privacy & Terms",
      icon: <Lock className="h-5 w-5" />,
      component: (
        <PrivacyTerms 
          onComplete={(data) => {
            setAppData((prev: any) => ({ ...prev, ...data }));
            goToStep(4);
          }}
        />
      ),
      isCompleted: isPrivacyComplete(),
    },
    {
      id: "testing",
      title: "Beta Testing",
      icon: <Users className="h-5 w-5" />,
      component: (
        <TestAccess 
          onComplete={(data) => {
            setAppData((prev: any) => ({ ...prev, ...data }));
            goToStep(5);
          }}
        />
      ),
      isCompleted: isTestAccessComplete(),
    },
    {
      id: "submit",
      title: "Submit",
      icon: <Check className="h-5 w-5" />,
      component: (
        <FinalSubmission 
          onSubmit={handleFinalSubmit}
          isComplete={
            isMetadataComplete() && 
            isMediaComplete() && 
            isBuildComplete() && 
            isPrivacyComplete() && 
            isTestAccessComplete()
          }
        />
      ),
      isCompleted: false,
    },
  ];

  function goToStep(step: number) {
    if (step >= 0 && step < steps.length) {
      setCurrentStepIndex(step);
      window.scrollTo(0, 0);
    }
  }

  async function handleFinalSubmit() {
    try {
      if (!user) {
        throw new Error("You must be logged in to upload an app.");
      }

      // Upload app logo
      const logoFile = appData.appLogo.file;
      const logoExt = logoFile.name.split('.').pop();
      const logoFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${logoExt}`;
      
      const { data: logoData, error: logoError } = await supabase.storage
        .from('app_logos')
        .upload(logoFileName, logoFile);
        
      if (logoError) {
        throw new Error(`Logo upload failed: ${logoError.message}`);
      }
      
      const { data: { publicUrl: logoUrl } } = supabase.storage
        .from('app_logos')
        .getPublicUrl(logoFileName);
      
      // Upload app file if exists
      let appFileUrl = "";
      if (appData.appFile) {
        const appFile = appData.appFile.file;
        const fileExt = appFile.name.split('.').pop();
        const appFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data: fileData, error: fileError } = await supabase.storage
          .from('app_files')
          .upload(appFileName, appFile);
          
        if (fileError) {
          throw new Error(`App file upload failed: ${fileError.message}`);
        }
        
        const { data: { publicUrl: fileUrl } } = supabase.storage
          .from('app_files')
          .getPublicUrl(appFileName);
          
        appFileUrl = fileUrl;
      }
      
      // Upload screenshots if exists
      const screenshotUrls = [];
      for (const screenshot of appData.screenshots) {
        const screenshotFile = screenshot.file;
        const fileExt = screenshotFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('app_screenshots')
          .upload(fileName, screenshotFile);
          
        if (error) {
          throw new Error(`Screenshot upload failed: ${error.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('app_screenshots')
          .getPublicUrl(fileName);
          
        screenshotUrls.push(publicUrl);
      }
      
      // Upload privacy policy if exists
      let privacyPolicyUrl = appData.privacyPolicyUrl;
      if (appData.privacyPolicyFile) {
        const policyFile = appData.privacyPolicyFile;
        const fileExt = policyFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('privacy_policies')
          .upload(fileName, policyFile);
          
        if (error) {
          throw new Error(`Privacy policy upload failed: ${error.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('privacy_policies')
          .getPublicUrl(fileName);
          
        privacyPolicyUrl = publicUrl;
      }
      
      // Upload app banner if exists
      let bannerUrl = "";
      if (appData.appBanner) {
        const bannerFile = appData.appBanner.file;
        const fileExt = bannerFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('app_banners')
          .upload(fileName, bannerFile);
          
        if (error) {
          throw new Error(`Banner upload failed: ${error.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('app_banners')
          .getPublicUrl(fileName);
          
        bannerUrl = publicUrl;
      }
      
      // Fixed type for app insertion
      const appInsertData = {
        name: appData.name,
        short_description: appData.shortDescription,
        description: appData.fullDescription,
        category_id: appData.category,
        tags: appData.tags,
        version: appData.version,
        developer_id: user.id,
        logo_url: logoUrl,
        file_url: appFileUrl || null,
        web_url: appData.webAppUrl || null,
        promo_video_url: appData.promoVideo || null,
        banner_url: bannerUrl || null,
        screenshot_urls: screenshotUrls,
        release_notes: appData.releaseNotes || null,
        privacy_policy_url: privacyPolicyUrl || null,
        release_type: appData.releaseType || 'public',
        test_users: appData.releaseType === 'private' ? appData.testEmails : [],
        collect_feedback: appData.collectFeedback || false,
        feedback_prompt: appData.feedbackPrompt || null,
        status: 'pending_review'
      } as any; // Use 'as any' temporarily to bypass strict type checking
      
      // Insert app data into database
      const { data: appRecord, error: appError } = await supabase
        .from('apps')
        .insert(appInsertData)
        .select()
        .single();
      
      if (appError) {
        throw new Error(`Failed to create app: ${appError.message}`);
      }

      return;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  const currentStep = steps[currentStepIndex];
  
  // Fix the category name lookup
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || '';
  };

  // Render the AppPreview with proper type handling
  const renderAppPreview = () => {
    if (currentStepIndex >= 1 && isMetadataComplete()) {
      return (
        <div className="mt-8">
          <AppPreview 
            app={{
              name: appData.name,
              shortDescription: appData.shortDescription,
              category: appData.category,
              logo: appData.appLogo,
              tags: appData.tags,
              categoryName: getCategoryName(appData.category)
            }}
            categories={categories}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left side - Steps */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-lg p-4 sticky top-24">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Upload Steps
          </h3>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  if (index <= steps.findIndex(s => !s.isCompleted)) {
                    goToStep(index);
                  }
                }}
                disabled={index > steps.findIndex(s => !s.isCompleted)}
                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md transition-colors ${
                  currentStepIndex === index
                    ? "bg-primary text-white"
                    : step.isCompleted
                    ? "text-primary hover:bg-gray-800/70"
                    : "text-gray-400 hover:bg-gray-800/50"
                } ${
                  index > steps.findIndex(s => !s.isCompleted)
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs
                  ${currentStepIndex === index 
                    ? "bg-white text-primary"
                    : step.isCompleted
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {step.isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span>{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Current step content */}
      <div className="flex-1">
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-lg p-6">
          <div className="mb-6 flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center
              bg-primary text-white`}
            >
              {currentStep.icon}
            </div>
            <h2 className="text-2xl font-bold">
              {currentStep.title}
            </h2>
          </div>

          {currentStep.component}

          {currentStepIndex !== steps.length - 1 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => goToStep(currentStepIndex - 1)}
                disabled={currentStepIndex === 0}
                className="border-white/10"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                variant="default"
                onClick={() => goToStep(currentStepIndex + 1)}
                disabled={!steps[currentStepIndex].isCompleted}
                className="bg-primary hover:bg-primary/90"
              >
                Skip
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Preview section (shows only after step 1 is completed) */}
        {renderAppPreview()}
      </div>
    </div>
  );
};

export default UploadWizard;
