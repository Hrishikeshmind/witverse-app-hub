
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2, Shield, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FinalSubmissionProps = {
  onSubmit: () => Promise<void>;
  isComplete: boolean;
};

const FinalSubmission = ({ onSubmit, isComplete }: FinalSubmissionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!isComplete) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please complete all required sections before submitting",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit();
      setSubmitted(true);
      toast({
        title: "App submitted successfully!",
        description: "Your app has been sent for review.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-900/40 border-green-600/50 text-green-100">
          <Check className="h-5 w-5 text-green-400" />
          <AlertTitle className="text-green-400">App Submitted Successfully!</AlertTitle>
          <AlertDescription className="text-green-200">
            Your app has been submitted for review. You'll receive a notification once the process is complete.
          </AlertDescription>
        </Alert>
        
        <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-medium">Review Process Started</h3>
          
          <div className="max-w-md mx-auto">
            <p className="text-gray-300 mb-2">
              Our team will review your app for quality, security, and compliance with our guidelines.
            </p>
            <p className="text-gray-400 text-sm">
              This process typically takes 24-48 hours. You'll receive an email when your app is approved.
            </p>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => window.location.href = "/developer-portal"}
              className="bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity"
            >
              Go to Developer Portal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert 
        variant="default" 
        className="bg-blue-900/40 border-blue-600/50 text-blue-100"
      >
        <AlertCircle className="h-5 w-5 text-blue-400" />
        <AlertTitle className="text-blue-400">Ready to Submit</AlertTitle>
        <AlertDescription className="text-blue-200">
          Your app will be reviewed by our team before being published to the WITVerse Store.
        </AlertDescription>
      </Alert>

      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">App Review Guidelines:</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-primary/20 p-0.5 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            </div>
            <span>Your app will be tested for functionality and quality</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-primary/20 p-0.5 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            </div>
            <span>Content will be checked against our community guidelines</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-primary/20 p-0.5 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            </div>
            <span>Review process typically takes 24-48 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-primary/20 p-0.5 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            </div>
            <span>You'll be notified if any changes are required</span>
          </li>
        </ul>
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !isComplete}
        className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit App for Review"
        )}
      </Button>
      
      {!isComplete && (
        <p className="text-sm text-amber-400 text-center">
          Please complete all required sections before submitting
        </p>
      )}
    </div>
  );
};

export default FinalSubmission;
