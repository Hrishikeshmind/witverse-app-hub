
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Phone, Mail, Lock, LogIn, ExternalLink } from "lucide-react";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAuth } from '@/context/AuthContext';
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkOAuthConfig } from '@/integrations/supabase/client';

const loginSchema = z.object({
  identifier: z.string()
    .min(1, "Email or mobile number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [is403Error, setIs403Error] = useState<boolean>(false);
  const [isGoogleClicked, setIsGoogleClicked] = useState<boolean>(false);
  const [oauthConfigChecked, setOauthConfigChecked] = useState<boolean>(false);
  const [identifierType, setIdentifierType] = useState<'email' | 'mobile'>('email');
  
  // Check OAuth configuration on component mount
  useEffect(() => {
    const verifyOAuthSetup = async () => {
      const configValid = await checkOAuthConfig();
      setOauthConfigChecked(true);
      console.log("OAuth configuration check:", configValid ? "Valid" : "Issues detected");
    };
    
    verifyOAuthSetup();
  }, []);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Determine if input looks like an email or mobile number
  const checkIdentifierType = (value: string) => {
    if (value.includes('@')) {
      setIdentifierType('email');
    } else if (/^\d+$/.test(value)) {
      setIdentifierType('mobile');
    }
  };

  async function onSubmit(data: LoginFormValues) {
    try {
      setAuthError(null); // Reset any previous errors
      setIs403Error(false);
      
      console.log(`Logging in with: ${data.identifier} (${identifierType})`);
      
      await signIn(data.identifier, data.password);
      // The redirect will be handled by the RouteGuard
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null); // Reset any previous errors
      setIs403Error(false);
      setIsGoogleClicked(true);
      
      await signInWithGoogle();
      // Redirect handled by onAuthStateChange in AuthContext
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setIsGoogleClicked(false);
      
      // Check if it's a 403 error (from the error message or the screenshot)
      if (error.message && (error.message.includes("403") || error.message.includes("do not have access"))) {
        setIs403Error(true);
        setAuthError("Google OAuth access denied (403). Please check your Google Cloud Console configuration.");
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
                <AlertDescription className="space-y-2 text-sm">
                  <p>A 403 error means Google is blocking the authentication request. To fix this:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>
                      <strong>Verify Authorized JavaScript origins</strong> in Google Cloud Console: 
                      <code className="block bg-muted p-1 rounded mt-1">{window.location.origin}</code>
                    </li>
                    <li>
                      <strong>Add Authorized redirect URIs</strong> in Google Cloud Console: 
                      <code className="block bg-muted p-1 rounded mt-1">{window.location.origin}/auth/v1/callback</code>
                      <code className="block bg-muted p-1 rounded mt-1">https://iermkyzsfefzhfqcbnmk.supabase.co/auth/v1/callback</code>
                    </li>
                    <li>
                      <strong>Check your OAuth consent screen</strong> configuration
                    </li>
                    <li>
                      <strong>Add your email address</strong> as a test user if in testing mode
                    </li>
                    <li>
                      <strong>Verify both Client ID and Client Secret</strong> are set in Supabase Auth providers
                    </li>
                  </ol>
                  <div className="flex items-center justify-center mt-4">
                    <a 
                      href="https://console.cloud.google.com/apis/credentials" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-primary/80"
                    >
                      Open Google Cloud Console <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
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
                disabled={isLoading || isGoogleClicked}
              >
                {isLoading || isGoogleClicked ? (
                  <>
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 0, 0)">
                        <path d="M21.35,11.1H12v3.83h5.31c-0.33,1.55-1.5,2.9-3.13,3.37v2.77h4.93C21.14,19.13,22,16.32,22,13.16 C22,12.37,21.93,11.73,21.35,11.1z" fill="#4285F4"></path>
                        <path d="M12,22c2.97,0,5.46-0.98,7.28-2.93l-4.93-2.77c-1.24,0.96-2.9,1.5-4.14,1.5c-3.18,0-5.88-2.13-6.83-5.02H0v3.92 C2.3,20,6.63,22,12,22z" fill="#34A853"></path>
                        <path d="M3.17,12c0-0.82,0.15-1.61,0.4-2.35V5.73H0C0.08,6.47,0,7.23,0,8s0.08,1.53,0,2.27h3.57C3.32,13.61,3.17,12.82,3.17,12 z" fill="#FBBC05"></path>
                        <path d="M12,3.19c1.88,0,3.14,0.81,3.87,1.5l4.22-4.22C17.95,0.35,14.73,0,12,0C6.63,0,2.3,2,0,5.73l3.57,3.92 C4.9,5.77,7.6,3.19,12,3.19z" fill="#EA4335"></path>
                      </g>
                    </svg>
                    <span className="text-lg">Sign in with Google</span>
                  </>
                )}
              </Button>
            </motion.div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with {identifierType === 'email' ? 'email' : 'mobile'}
                </span>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{identifierType === 'email' ? 'Email Address' : 'Mobile Number'}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {identifierType === 'email' ? (
                              <Mail className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <div className="flex items-center text-muted-foreground">
                                <span className="text-sm font-medium">+91</span>
                                <span className="mx-1">|</span>
                                <Phone className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <Input 
                            placeholder={identifierType === 'email' ? "you@example.com" : "10-digit mobile number"}
                            className={identifierType === 'email' ? "pl-10" : "pl-20"}
                            onChange={(e) => {
                              checkIdentifierType(e.target.value);
                              field.onChange(e);
                            }}
                            value={field.value} 
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
