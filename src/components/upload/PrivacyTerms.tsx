
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  Info,
  FileUp,
  Link as LinkIcon,
  File,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type PrivacyTermsProps = {
  onComplete: (data: {
    agreedToTerms: boolean;
    agreedToPolicy: boolean;
    privacyPolicyFile: File | null;
    privacyPolicyUrl: string;
  }) => void;
};

const PrivacyTerms = ({ onComplete }: PrivacyTermsProps) => {
  const { toast } = useToast();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [privacyPolicyType, setPrivacyPolicyType] = useState<"none" | "file" | "url">("none");
  const [privacyPolicyFile, setPrivacyPolicyFile] = useState<File | null>(null);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);

  // Handle privacy policy file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("Only PDF files are allowed");
        event.target.value = "";
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setFileError("File size exceeds 5MB");
        event.target.value = "";
        return;
      }
      
      setPrivacyPolicyFile(file);
      setFileError(null);
      toast({
        title: "Privacy policy uploaded",
        description: file.name,
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!agreedToTerms || !agreedToPolicy) {
      toast({
        variant: "destructive",
        title: "Agreement required",
        description: "You must agree to the terms and policies to continue",
      });
      return;
    }

    onComplete({
      agreedToTerms,
      agreedToPolicy,
      privacyPolicyFile: privacyPolicyType === "file" ? privacyPolicyFile : null,
      privacyPolicyUrl: privacyPolicyType === "url" ? privacyPolicyUrl : "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Terms and Conditions */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <div className="mb-6">
          <Label className="block mb-3 text-lg font-medium">Terms & Agreements</Label>
          <div className="bg-gray-900/80 p-4 rounded-md border border-white/5 mb-4 max-h-[200px] overflow-y-auto">
            <p className="text-sm text-gray-300">
              By submitting your app to WITVerse, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
              <li>Your app must comply with all applicable laws and regulations.</li>
              <li>Your app must not contain any malware, viruses, or harmful code.</li>
              <li>Your app must respect user privacy and handle data responsibly.</li>
              <li>Your app must be appropriate for the WITVerse community.</li>
              <li>WITVerse reserves the right to remove any app that violates these terms.</li>
              <li>You are responsible for maintaining and updating your app.</li>
              <li>WITVerse is not responsible for any issues caused by your app.</li>
              <li>You own the rights to the content you distribute through WITVerse.</li>
            </ul>
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox 
              id="policy" 
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="policy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                This app complies with college/community policies <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">Privacy Policy (Optional)</Label>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Button
            type="button"
            variant={privacyPolicyType === "none" ? "default" : "outline"}
            className={`h-auto py-3 ${
              privacyPolicyType === "none"
                ? "bg-primary border border-primary"
                : "border border-white/20"
            }`}
            onClick={() => setPrivacyPolicyType("none")}
          >
            <X className="h-4 w-4 mr-2" />
            None
          </Button>
          <Button
            type="button"
            variant={privacyPolicyType === "file" ? "default" : "outline"}
            className={`h-auto py-3 ${
              privacyPolicyType === "file"
                ? "bg-primary border border-primary"
                : "border border-white/20"
            }`}
            onClick={() => setPrivacyPolicyType("file")}
          >
            <File className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
          <Button
            type="button"
            variant={privacyPolicyType === "url" ? "default" : "outline"}
            className={`h-auto py-3 ${
              privacyPolicyType === "url"
                ? "bg-primary border border-primary"
                : "border border-white/20"
            }`}
            onClick={() => setPrivacyPolicyType("url")}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            External URL
          </Button>
        </div>

        {privacyPolicyType === "file" && (
          <div className="mt-4">
            <div className="relative group">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Upload your privacy policy as PDF (Maximum: 5MB)
            </p>
            {fileError && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {fileError}
              </p>
            )}
            
            {privacyPolicyFile && (
              <div className="flex items-center mt-2 p-2 bg-gray-900/60 rounded-md border border-white/10">
                <File className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm truncate">{privacyPolicyFile.name}</span>
              </div>
            )}
          </div>
        )}

        {privacyPolicyType === "url" && (
          <div className="mt-4">
            <Input
              type="url"
              placeholder="https://your-policy-url.com/privacy"
              value={privacyPolicyUrl}
              onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
              className="bg-gray-800/50 border-white/10"
            />
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Enter the URL to your privacy policy
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
        disabled={!agreedToTerms || !agreedToPolicy}
      >
        Accept & Continue
      </Button>
    </div>
  );
};

export default PrivacyTerms;
