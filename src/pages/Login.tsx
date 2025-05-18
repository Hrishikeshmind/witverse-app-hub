
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Phone, Lock, LogIn } from "lucide-react";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAuth } from '@/context/AuthContext';
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  mobile: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits")
    .regex(/^\d{10}$/, "Must be exactly 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [is403Error, setIs403Error] = useState<boolean>(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setAuthError(null); // Reset any previous errors
      setIs403Error(false);
      await signIn(data.mobile, data.password);
      // The redirect will be handled by the RouteGuard
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null); // Reset any previous errors
      setIs403Error(false);
      await signInWithGoogle();
      // Redirect handled by onAuthStateChange in AuthContext
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      
      // Check if it's a 403 error
      if (error.message && error.message.includes("403")) {
        setIs403Error(true);
        setAuthError("Google OAuth access denied. Please check your Google Cloud Console configuration.");
      } else {
        setAuthError(error.message || "Failed to sign in with Google");
      }
    }
  };

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
            
            {authError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            
            {is403Error && (
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Google OAuth Configuration Needed</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>A 403 error means Google is blocking the authentication request. To fix this:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs ml-2">
                    <li>Verify your Google Cloud Console has the correct Authorized JavaScript origins (should include your site URL)</li>
                    <li>Check that the Authorized redirect URIs match your Supabase project settings</li>
                    <li>Ensure your Google account is added as a test user if your OAuth app is in testing mode</li>
                    <li>Make sure the Google Cloud OAuth consent screen is properly configured</li>
                  </ol>
                </AlertDescription>
              </Alert>
            )}
            
            <motion.div 
              className="mb-6"
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center gap-2 py-6"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path d="M21.35,11.1H12v3.83h5.31c-0.33,1.55-1.5,2.9-3.13,3.37v2.77h4.93C21.14,19.13,22,16.32,22,13.16 C22,12.37,21.93,11.73,21.35,11.1z" fill="#4285F4"></path>
                    <path d="M12,22c2.97,0,5.46-0.98,7.28-2.93l-4.93-2.77c-1.24,0.96-2.9,1.5-4.14,1.5c-3.18,0-5.88-2.13-6.83-5.02H0v3.92 C2.3,20,6.63,22,12,22z" fill="#34A853"></path>
                    <path d="M3.17,12c0-0.82,0.15-1.61,0.4-2.35V5.73H0C0.08,6.47,0,7.23,0,8s0.08,1.53,0,2.27h3.57C3.32,13.61,3.17,12.82,3.17,12 z" fill="#FBBC05"></path>
                    <path d="M12,3.19c1.88,0,3.14,0.81,3.87,1.5l4.22-4.22C17.95,0.35,14.73,0,12,0C6.63,0,2.3,2,0,5.73l3.57,3.92 C4.9,5.77,7.6,3.19,12,3.19z" fill="#EA4335"></path>
                  </g>
                </svg>
                <span className="text-lg">Sign in with Google</span>
              </Button>
            </motion.div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
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
                    <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                      Create account
                    </Link>
                  </div>
                </div>
                
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-2 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Sign in
                      </>
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
