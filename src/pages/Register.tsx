
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
import { UserPlus, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string()
    .min(10, "Mobile number must be exactly 10 digits")
    .max(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Must be exactly 10 digits"),
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
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  function onSubmit(data: RegisterFormValues) {
    setIsAnimating(true);
    toast.success("Account created successfully! Redirecting to login...");
    
    // In a real app, you would register the user here
    setTimeout(() => {
      navigate('/login');
      setIsAnimating(false);
    }, 2000);
  }

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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input 
                                type="email" 
                                placeholder="you@example.com" 
                                className="pl-10" 
                                {...field} 
                              />
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
                  </motion.div>
                  
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
                      disabled={isAnimating}
                    >
                      {isAnimating ? (
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
                  
                  <motion.div variants={itemVariants} className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                        Sign in
                      </Link>
                    </p>
                  </motion.div>
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
