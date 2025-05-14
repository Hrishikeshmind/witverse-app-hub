
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Phone, Lock } from "lucide-react";
import { AspectRatio } from '@/components/ui/aspect-ratio';

const loginSchema = z.object({
  mobile: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits")
    .regex(/^\d{10}$/, "Must be exactly 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    setIsAnimating(true);
    toast.success("Login successful! Redirecting...");
    
    // In a real app, you would verify credentials here
    // For now, we'll just simulate a login process
    setTimeout(() => {
      navigate('/');
      setIsAnimating(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="mt-6 text-3xl font-bold tracking-tight gradient-text">
              Sign in to WITVerse
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Access the college app store for Walchand Institute of Technology
            </p>
          </motion.div>
          
          <motion.div 
            className="glass p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="mb-6">
              <AspectRatio ratio={7/2} className="bg-muted rounded-md overflow-hidden mb-6">
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-primary-purple to-primary-dark flex items-center justify-center"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  <h3 className="text-2xl font-bold text-white">WITVerse Store</h3>
                </motion.div>
              </AspectRatio>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                            <span className="text-sm font-medium">+91</span>
                            <span className="mx-1">|</span>
                            <Phone className="h-4 w-4" />
                          </div>
                          <Input 
                            placeholder="10-digit mobile number" 
                            className="pl-20" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            className="pl-10"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="text-sm">
                    <a href="/register" className="font-medium text-primary hover:text-primary-dark">
                      Create account
                    </a>
                  </div>
                </div>
                
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-2"
                    disabled={isAnimating}
                  >
                    {isAnimating ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          <motion.p 
            className="mt-4 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            By signing in, you agree to the{" "}
            <a href="/terms" className="font-medium hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-medium hover:text-primary">
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Login;
