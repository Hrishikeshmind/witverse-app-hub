
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

const appMetadataSchema = z.object({
  name: z.string().min(3, {
    message: "App name must be at least 3 characters.",
  }),
  shortDescription: z.string().max(100, {
    message: "Short description must be 100 characters or less.",
  }),
  fullDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).optional(),
  version: z.string().default("1.0.0"),
});

type AppMetadataFormProps = {
  onSubmit: (data: z.infer<typeof appMetadataSchema>) => void;
  categories: { id: string; name: string }[];
  isCategoriesLoading: boolean;
  defaultValues?: z.infer<typeof appMetadataSchema>;
};

const AppMetadataForm = ({
  onSubmit,
  categories,
  isCategoriesLoading,
  defaultValues = {
    name: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    tags: [],
    version: "1.0.0",
  },
}: AppMetadataFormProps) => {
  const form = useForm<z.infer<typeof appMetadataSchema>>({
    resolver: zodResolver(appMetadataSchema),
    defaultValues,
  });

  const [tagInput, setTagInput] = React.useState("");
  const tags = form.watch("tags") || [];

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">App Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your app name"
                  className="bg-gray-800/50 border-white/10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Short Description (100 chars max)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief one-line description of your app"
                  className="bg-gray-800/50 border-white/10"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">
                  {field.value?.length || 0}/100
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Full Description</FormLabel>
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
                  <Input
                    placeholder="1.0.0"
                    className="bg-gray-800/50 border-white/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel className="text-white">Tags</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              className="bg-gray-800/50 border-white/10"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addTag}
              className="border-white/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </FormItem>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 transition-opacity py-6"
        >
          Save App Metadata
        </Button>
      </form>
    </Form>
  );
};

export default AppMetadataForm;
