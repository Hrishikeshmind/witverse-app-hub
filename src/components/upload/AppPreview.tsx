
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Download, Star, Check, Shield } from "lucide-react";

type AppPreviewProps = {
  app: {
    name: string;
    shortDescription: string;
    category?: string;
    categoryName?: string;
    logo?: { preview: string } | null;
    tags?: string[];
  };
  categories: { id: string; name: string }[];
};

const AppPreview = ({ app, categories }: AppPreviewProps) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Uncategorized";
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/60 p-6 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          App Store Preview
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Here's how your app will appear to users in the WITVerse Store
        </p>

        <Card className="overflow-hidden backdrop-blur-sm bg-gray-900/30 border-white/10">
          <div className="p-4">
            <div className="flex items-center gap-4">
              {app.logo ? (
                <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-gray-800">
                  <img
                    src={app.logo.preview}
                    alt={app.name || "App logo"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gray-800/70 border border-white/20">
                  <div className="font-bold text-xl text-white/30">
                    {app.name?.charAt(0) || "A"}
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg truncate">
                  {app.name || "App Name"}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-1">
                  {app.shortDescription || "Short description of your app"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-gray-800 text-xs">
                    {app.categoryName || 
                    (app.category ? getCategoryName(app.category) : "Category")}
                  </Badge>
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star className="h-3 w-3 fill-amber-400 mr-1" />
                    <span>New</span>
                  </div>
                </div>
              </div>
            </div>

            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {app.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-gray-800/50 border-white/10"
                  >
                    {tag}
                  </Badge>
                ))}
                {app.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-800/50 border-white/10"
                  >
                    +{app.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          <CardFooter className="bg-gray-900/50 py-3 border-t border-white/10 gap-2">
            <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent-orange">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </CardFooter>
        </Card>
        
        <div className="flex justify-center mt-6">
          <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-600/30 px-3">
            <Check className="h-3 w-3 mr-1" /> Preview Only
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
