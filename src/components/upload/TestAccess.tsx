
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Plus, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type TestAccessProps = {
  onComplete: (data: {
    releaseType: "public" | "private";
    testEmails: string[];
    collectFeedback: boolean;
    feedbackPrompt: string;
  }) => void;
};

const MAX_TEST_EMAILS = 10;

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const TestAccess = ({ onComplete }: TestAccessProps) => {
  const { toast } = useToast();
  const [releaseType, setReleaseType] = useState<"public" | "private">("public");
  const [testEmails, setTestEmails] = useState<string[]>([]);
  const [collectFeedback, setCollectFeedback] = useState(false);
  const [feedbackPrompt, setFeedbackPrompt] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const addEmail = () => {
    if (!emailInput.trim()) {
      return;
    }

    if (!validateEmail(emailInput.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (testEmails.includes(emailInput.trim())) {
      setEmailError("This email is already in the list");
      return;
    }

    if (testEmails.length >= MAX_TEST_EMAILS) {
      setEmailError(`Maximum ${MAX_TEST_EMAILS} test users allowed`);
      return;
    }

    setTestEmails([...testEmails, emailInput.trim()]);
    setEmailInput("");
    setEmailError(null);
  };

  const removeEmail = (email: string) => {
    setTestEmails(testEmails.filter((e) => e !== email));
  };

  const handleSubmit = () => {
    if (releaseType === "private" && testEmails.length === 0) {
      toast({
        variant: "destructive",
        title: "Test emails required",
        description: "Please add at least one email for private testing",
      });
      return;
    }

    onComplete({
      releaseType,
      testEmails,
      collectFeedback,
      feedbackPrompt,
    });
  };

  return (
    <div className="space-y-6">
      {/* Release Type */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-4 text-lg font-medium">Release Type</Label>
        <RadioGroup
          value={releaseType}
          onValueChange={(value) => setReleaseType(value as "public" | "private")}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="public" id="public" />
            <div>
              <Label htmlFor="public" className="font-medium">Public Release</Label>
              <p className="text-sm text-gray-400">
                Available to all WITVerse users after approval
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="private" id="private" />
            <div>
              <Label htmlFor="private" className="font-medium">Private Beta</Label>
              <p className="text-sm text-gray-400">
                Only available to specified test users
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Test Users */}
      {releaseType === "private" && (
        <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
          <Label className="block mb-3 text-lg font-medium">
            Test Users <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-400 mb-4">
            Add up to {MAX_TEST_EMAILS} email addresses that will have access to your app
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setEmailError(null);
                  }}
                  className="bg-gray-800/50 border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addEmail();
                    }
                  }}
                />
                {emailError && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {emailError}
                  </p>
                )}
              </div>
              <Button
                type="button"
                onClick={addEmail}
                disabled={testEmails.length >= MAX_TEST_EMAILS}
                className="bg-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {testEmails.length > 0 ? (
              <div className="space-y-2">
                {testEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between p-2 bg-gray-900/80 border border-white/10 rounded-md"
                  >
                    <span className="text-sm">{email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmail(email)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-white/10 rounded-md bg-gray-900/30 text-center">
                <p className="text-sm text-gray-400">No test users added yet</p>
              </div>
            )}

            <div className="text-xs flex items-center justify-between text-gray-400">
              <span>
                {testEmails.length} of {MAX_TEST_EMAILS} emails added
              </span>
              {testEmails.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTestEmails([])}
                  className="h-auto p-0 text-xs text-red-400 hover:text-red-300"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Collection */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="collectFeedback"
            checked={collectFeedback}
            onCheckedChange={(checked) => setCollectFeedback(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="collectFeedback"
              className="text-medium font-medium"
            >
              Collect user feedback
            </Label>
            <p className="text-sm text-gray-400">
              Prompt users to provide feedback after using your app
            </p>
          </div>
        </div>

        {collectFeedback && (
          <div className="mt-4 pl-6">
            <Label className="text-white">Feedback prompt (optional)</Label>
            <Textarea
              placeholder="What would you like to ask your users?"
              value={feedbackPrompt}
              onChange={(e) => setFeedbackPrompt(e.target.value)}
              className="min-h-[100px] bg-gray-800/50 border-white/10 mt-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to use our default prompt: "What did you think of this app?"
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
      >
        Continue to Submit
      </Button>
    </div>
  );
};

export default TestAccess;
