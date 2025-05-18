
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Info,
  FileUp,
  Check,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type AppBuildUploadProps = {
  onComplete: (data: {
    appFile: File | null;
    webAppUrl: string;
    version: string;
    releaseNotes: string;
  }) => void;
  defaultVersion?: string;
};

// Allowed file types
const ALLOWED_APP_TYPES = [
  "application/zip",
  "application/vnd.android.package-archive",
  "application/octet-stream",
];

// Max file sizes
const MAX_APP_SIZE = 100 * 1024 * 1024; // 100MB

const AppBuildUpload = ({ 
  onComplete,
  defaultVersion = "1.0.0"
}: AppBuildUploadProps) => {
  const { toast } = useToast();
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [appFile, setAppFile] = useState<File | null>(null);
  const [webAppUrl, setWebAppUrl] = useState("");
  const [version, setVersion] = useState(defaultVersion);
  const [releaseNotes, setReleaseNotes] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);

  // Validate file based on type and size
  const validateFile = (file: File) => {
    // Check file size
    if (file.size > MAX_APP_SIZE) {
      setFileError(`File size exceeds 100MB`);
      return false;
    }

    // For app files, check by extension if MIME type doesn't match
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension === "ipa" || extension === "apk" || extension === "zip") {
      setFileError(null);
      return true;
    }

    // Check file type
    if (!ALLOWED_APP_TYPES.includes(file.type)) {
      setFileError(
        `Invalid file type. Allowed: zip, apk, ipa`
      );
      return false;
    }

    // Clear errors if file is valid
    setFileError(null);
    return true;
  };

  // Handle app file selection
  const handleAppFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = validateFile(file);
      if (isValid) {
        setAppFile(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        });
      } else {
        event.target.value = "";
      }
    }
  };

  // Calculate file size display
  const getFileSizeDisplay = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (uploadType === "file" && !appFile) {
      setFileError("App file is required");
      return;
    }

    if (uploadType === "url" && !webAppUrl) {
      toast({
        variant: "destructive",
        title: "Web App URL is required",
      });
      return;
    }

    if (!version) {
      toast({
        variant: "destructive",
        title: "Version number is required",
      });
      return;
    }

    onComplete({
      appFile: uploadType === "file" ? appFile : null,
      webAppUrl: uploadType === "url" ? webAppUrl : "",
      version,
      releaseNotes,
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Type Selection */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">Upload Type</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={uploadType === "file" ? "default" : "outline"}
            className={`h-auto py-3 ${
              uploadType === "file"
                ? "bg-primary border border-primary"
                : "border border-white/20"
            }`}
            onClick={() => setUploadType("file")}
          >
            <FileUp className="h-5 w-5 mr-2" />
            APK/IPA/ZIP File
          </Button>
          <Button
            type="button"
            variant={uploadType === "url" ? "default" : "outline"}
            className={`h-auto py-3 ${
              uploadType === "url"
                ? "bg-primary border border-primary"
                : "border border-white/20"
            }`}
            onClick={() => setUploadType("url")}
          >
            <FileUp className="h-5 w-5 mr-2" />
            Web App URL
          </Button>
        </div>
      </div>

      {/* App File Upload */}
      {uploadType === "file" && (
        <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
          <Label className="block mb-3 text-lg font-medium">
            App File <span className="text-red-500">*</span>
          </Label>
          <div className="relative group">
            <Input
              type="file"
              accept=".zip,.apk,.ipa"
              onChange={handleAppFileChange}
              className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              Upload your app as .zip, .apk or .ipa file (Maximum: 100MB)
            </p>
          </div>
          {fileError && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {fileError}
            </p>
          )}

          {appFile && (
            <div className="mt-4 p-4 border border-white/10 rounded-lg bg-gray-800/50">
              <div className="flex items-center">
                <FileUp className="h-8 w-8 text-primary mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-white">{appFile.name}</p>
                  <p className="text-sm text-gray-400">
                    Size: {getFileSizeDisplay(appFile.size)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Web App URL */}
      {uploadType === "url" && (
        <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
          <Label className="block mb-3 text-lg font-medium">
            Web App URL <span className="text-red-500">*</span>
          </Label>
          <Input
            type="url"
            placeholder="https://your-web-app.com"
            value={webAppUrl}
            onChange={(e) => setWebAppUrl(e.target.value)}
            className="bg-gray-800/50 border-white/10"
          />
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Enter the URL where your web application is hosted
          </p>
        </div>
      )}

      {/* Version and Release Notes */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">
          Version & Release Notes
        </Label>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Version Number</Label>
            <Input
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="bg-gray-800/50 border-white/10 mt-1"
            />
          </div>
          <div>
            <Label className="text-white">Release Notes</Label>
            <Textarea
              placeholder="Describe what's new in this version..."
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              className="min-h-[120px] bg-gray-800/50 border-white/10 mt-1"
            />
          </div>
        </div>
      </div>

      {fileError && (
        <Alert
          variant="destructive"
          className="bg-destructive/10 border-destructive/50 text-destructive"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>
            Please fix the file error before proceeding
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
        disabled={(uploadType === "file" && !appFile) || (uploadType === "url" && !webAppUrl) || !version}
      >
        Save Build & Continue
      </Button>
    </div>
  );
};

export default AppBuildUpload;
