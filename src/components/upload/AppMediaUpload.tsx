
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Info,
  ImagePlus,
  Trash,
  ArrowUp,
  ArrowDown,
  Video,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

type File = {
  file: any;
  preview: string;
};

type AppMediaUploadProps = {
  onComplete: (data: {
    appLogo: File | null;
    screenshots: File[];
    promoVideo: string;
    appBanner: File | null;
  }) => void;
};

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

// Max file sizes
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_SCREENSHOT_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_BANNER_SIZE = 10 * 1024 * 1024; // 10MB

const AppMediaUpload = ({ onComplete }: AppMediaUploadProps) => {
  const [appLogo, setAppLogo] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [promoVideoUrl, setPromoVideoUrl] = useState("");
  const [appBanner, setAppBanner] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<{
    logo?: string;
    screenshots?: string;
    banner?: string;
  }>({});

  // Validate file based on type and size
  const validateFile = (
    file: any,
    maxSize: number,
    fileType: "logo" | "screenshot" | "banner"
  ) => {
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      setFileErrors((prev) => ({
        ...prev,
        [fileType]: `File size exceeds ${maxSizeMB}MB`,
      }));
      return false;
    }

    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [fileType]: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.map(
          (t) => t.split("/")[1]
        ).join(", ")}`,
      }));
      return false;
    }

    // Clear errors if file is valid
    setFileErrors((prev) => ({ ...prev, [fileType]: undefined }));
    return true;
  };

  // Create file preview URL
  const createPreview = (file: any): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle logo file selection
  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = validateFile(file, MAX_LOGO_SIZE, "logo");
      if (isValid) {
        const preview = await createPreview(file);
        setAppLogo({ file, preview });
      }
      event.target.value = "";
    }
  };

  // Handle screenshots selection
  const handleScreenshotsChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (screenshots.length + files.length > 10) {
        setFileErrors((prev) => ({
          ...prev,
          screenshots: "Maximum 10 screenshots allowed",
        }));
        event.target.value = "";
        return;
      }

      const newScreenshots = [...screenshots];
      let hasError = false;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isValid = validateFile(file, MAX_SCREENSHOT_SIZE, "screenshot");
        
        if (isValid) {
          const preview = await createPreview(file);
          newScreenshots.push({ file, preview });
        } else {
          hasError = true;
          break;
        }
      }

      if (!hasError) {
        setScreenshots(newScreenshots);
        setFileErrors((prev) => ({ ...prev, screenshots: undefined }));
      }

      event.target.value = "";
    }
  };

  // Handle banner file selection
  const handleBannerChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = validateFile(file, MAX_BANNER_SIZE, "banner");
      if (isValid) {
        const preview = await createPreview(file);
        setAppBanner({ file, preview });
      }
      event.target.value = "";
    }
  };

  // Move screenshot up in order
  const moveScreenshotUp = (index: number) => {
    if (index <= 0) return;
    const newScreenshots = [...screenshots];
    const temp = newScreenshots[index];
    newScreenshots[index] = newScreenshots[index - 1];
    newScreenshots[index - 1] = temp;
    setScreenshots(newScreenshots);
  };

  // Move screenshot down in order
  const moveScreenshotDown = (index: number) => {
    if (index >= screenshots.length - 1) return;
    const newScreenshots = [...screenshots];
    const temp = newScreenshots[index];
    newScreenshots[index] = newScreenshots[index + 1];
    newScreenshots[index + 1] = temp;
    setScreenshots(newScreenshots);
  };

  // Remove screenshot
  const removeScreenshot = (index: number) => {
    const newScreenshots = [...screenshots];
    newScreenshots.splice(index, 1);
    setScreenshots(newScreenshots);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!appLogo) {
      setFileErrors((prev) => ({
        ...prev,
        logo: "App logo is required",
      }));
      return;
    }

    onComplete({
      appLogo,
      screenshots,
      promoVideo: promoVideoUrl,
      appBanner,
    });
  };

  return (
    <div className="space-y-6">
      {/* App Logo Upload */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">
          App Icon (512x512px) <span className="text-red-500">*</span>
        </Label>
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
              Required size: 512x512px (Maximum: 5MB)
            </p>
            {fileErrors.logo && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {fileErrors.logo}
              </p>
            )}
          </div>

          {appLogo ? (
            <div className="relative group h-24 w-24 rounded-xl overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 transition-all hover:scale-105 duration-300">
              <img
                src={appLogo.preview}
                alt="Logo preview"
                className="h-full w-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute bottom-1 right-1 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setAppLogo(null)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="h-24 w-24 rounded-xl flex items-center justify-center bg-gray-800/70 border border-dashed border-white/20">
              <ImagePlus className="h-8 w-8 text-gray-500" />
            </div>
          )}
        </div>
      </div>

      {/* App Screenshots */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">
          Screenshots (Max 10)
        </Label>
        <div className="relative group">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleScreenshotsChange}
            className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
          <Info className="h-3 w-3" />
          Upload up to 10 screenshots (Maximum: 10MB each)
        </p>
        {fileErrors.screenshots && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fileErrors.screenshots}
          </p>
        )}

        {screenshots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative group aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden border border-white/10"
              >
                <img
                  src={screenshot.preview}
                  alt={`Screenshot ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7"
                      disabled={index === 0}
                      onClick={() => moveScreenshotUp(index)}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7"
                      disabled={index === screenshots.length - 1}
                      onClick={() => moveScreenshotDown(index)}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeScreenshot(index)}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-xs text-white/70">
                    Screenshot {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promo Video URL */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">
          Promo Video URL (Optional)
        </Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="url"
              value={promoVideoUrl}
              onChange={(e) => setPromoVideoUrl(e.target.value)}
              placeholder="YouTube or MP4 URL"
              className="bg-gray-800/50 border-white/10"
            />
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Enter a YouTube URL or direct link to an MP4 video
            </p>
          </div>
          <div className="h-14 w-14 rounded-lg flex items-center justify-center bg-gray-800/70 border border-white/20">
            <Video className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>

      {/* App Banner */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-white/10">
        <Label className="block mb-3 text-lg font-medium">
          App Banner (Optional)
        </Label>
        <div className="relative group">
          <Input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="bg-gray-800/50 border-white/10 hover:border-primary/50 transition-colors"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-orange/20 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
          <Info className="h-3 w-3" />
          Recommended size: 1200x630px (Maximum: 10MB)
        </p>
        {fileErrors.banner && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fileErrors.banner}
          </p>
        )}

        {appBanner && (
          <div className="relative group mt-4 h-32 rounded-lg overflow-hidden border border-white/10">
            <img
              src={appBanner.preview}
              alt="Banner preview"
              className="h-full w-full object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setAppBanner(null)}
            >
              <Trash className="h-3 w-3 mr-1" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {(fileErrors.logo || fileErrors.screenshots || fileErrors.banner) && (
        <Alert
          variant="destructive"
          className="bg-destructive/10 border-destructive/50 text-destructive"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>
            Please fix the file errors before proceeding
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
        disabled={
          !appLogo ||
          !!fileErrors.logo ||
          !!fileErrors.screenshots ||
          !!fileErrors.banner
        }
      >
        Save Media & Continue
      </Button>
    </div>
  );
};

export default AppMediaUpload;
