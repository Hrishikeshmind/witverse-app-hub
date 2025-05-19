import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UserPlus, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertTriangle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format").or(
    z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")
  ),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [identifierType, setIdentifierType] = useState<'email' | 'mobile'>('email');
  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isLoading } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
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

  async function onSubmit(data: RegisterFormValues) {
    setIsAnimating(true);
    setRegisterError(null);
    
    try {
      await signUp(data.email, data.password, {
        fullName: data.name,
        department: "" // Default empty department
      });
      
      setTimeout(() => {
        navigate('/login');
        setIsAnimating(false);
      }, 2000);
    } catch (error: any) {
      console.error("Registration error:", error);
      setRegisterError(error.message);
      setIsAnimating(false);
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setRegisterError(null);
      await signInWithGoogle();
      // Redirect will be handled by RouteGuard
    } catch (error: any) {
      console.error("Google sign-up error:", error);
      setRegisterError(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="mt-6 text-3xl font-bold tracking-tight gradient-text">
              Create Your WITVerse Account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join the college app community at Walchand Institute of Technology
            </p>
          </motion.div>
          
          <motion.div 
            className="glass p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {registerError && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}
            
            <div className="mb-6">
              <AspectRatio ratio={7/2} className="bg-muted rounded-md overflow-hidden mb-6">
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-6 w-6 text-white" />
                    <h3 className="text-2xl font-bold text-white">Join WITVerse</h3>
                  </div>
                </motion.div>
              </AspectRatio>
            </div>
            
            <div className="mb-6">
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v3.83h5.31c-0.33,1.55-1.5,2.9-3.13,3.37v2.77h4.93C21.14,19.13,22,16.32,22,13.16 C22,12.37,21.93,11.73,21.35,11.1z" fill="#4285F4"></path>
                      <path d="M12,22c2.97,0,5.46-0.98,7.28-2.93l-4.93-2.77c-1.24,0.96-2.9,1.5-4.14,1.5c-3.18,0-5.88-2.13-6.83-5.02H0v3.92 C2.3,20,6.63,22,12,22z" fill="#34A853"></path>
                      <path d="M3.17,12c0-0.82,0.15-1.61,0.4-2.35V5.73H0C0.08,6.47,0,7.23,0,8s0.08,1.53,0,2.27h3.57C3.32,13.61,3.17,12.82,3.17,12 z" fill="#FBBC05"></path>
                      <path d="M12,3.19c1.88,0,3.14,0.81,3.87,1.5l4.22-4.22C17.95,0.35,14.73,0,12,0C6.63,0,2.3,2,0,5.73l3.57,3.92 C4.9,5.77,7.6,3.19,12,3.19z" fill="#EA4335"></path>
                    </g>
                  </svg>
                  Sign up with Google
                </Button>
              </motion.div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with {identifierType === 'email' ? 'email' : 'mobile'}
                </span>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
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
                              type={identifierType === 'email' ? "email" : "tel"} 
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
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a secure password" 
                                className="pl-10 pr-10"
                                {...field} 
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password" 
                                className="pl-10 pr-10"
                                {...field} 
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms" className="text-sm font-normal">
                              I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <Button
                      type="submit"
                      className="w-full flex justify-center py-2 gap-2"
                      disabled={isAnimating || isLoading}
                    >
                      {isAnimating || isLoading ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          <motion.p 
            className="mt-4 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            By creating an account, you're joining the official app hub for{" "}
            <span className="font-medium">Walchand Institute of Technology</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Register;
