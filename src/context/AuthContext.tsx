import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, formatAuthIdentifier } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from '@/components/ui/sonner';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch profile after authentication change
        if (currentSession?.user) {
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  // Helper function to check if a string is an email
  const isEmail = (str: string): boolean => {
    return /\S+@\S+\.\S+/.test(str);
  };

  const signIn = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Format the identifier consistently
      const email = formatAuthIdentifier(identifier);
      
      console.log("Signing in with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific errors with user-friendly messages
        if (error.message.includes("Email not confirmed")) {
          toast({
            variant: "destructive",
            title: "Email not confirmed",
            description: "Please check your inbox and confirm your email before logging in.",
          });
          return { success: false, error: "Email not confirmed" };
        }
        
        if (error.message.includes("Invalid login credentials")) {
          toast({
            variant: "destructive",
            title: "Invalid credentials",
            description: "The email/mobile number or password you entered is incorrect.",
          });
          return { success: false, error: "Invalid credentials" };
        }
        
        throw error;
      }

      // If we reach here, sign in was successful
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login",
      });
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (identifier: string, password: string, userData: any): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Determine if the identifier is an email or mobile number
      const isEmailIdentifier = isEmail(identifier);
      
      // Validate mobile number if it's not an email
      if (!isEmailIdentifier && !/^\d{10}$/.test(identifier)) {
        toast({
          variant: "destructive",
          title: "Invalid mobile number",
          description: "Mobile number must be exactly 10 digits",
        });
        return { success: false, error: "Mobile number must be exactly 10 digits" };
      }
      
      // Create a consistent email format for mobile numbers
      const email = isEmailIdentifier ? identifier : `${identifier}@example.com`;
      
      console.log("Signing up with:", email, "Is email:", isEmailIdentifier);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            mobile: isEmailIdentifier ? null : identifier,
            department: userData.department
          },
          // For mobile numbers, we can skip email confirmation
          emailRedirectTo: window.location.origin + '/login',
        }
      });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast({
            variant: "destructive",
            title: "Account already exists",
            description: "An account with this email or mobile number already exists. Please log in instead.",
          });
          return { success: false, error: "Account already exists" };
        }
        throw error;
      }
      
      // Check if email confirmation is required
      if (data?.user && !data.user.confirmed_at && data.user.email) {
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account before logging in.",
        });
      } else {
        // For mobile numbers or when confirmation is disabled
        toast({
          title: "Account created!",
          description: "Your account has been successfully created. You can now log in.",
        });
      }
      
      return { success: true };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
      });
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Check OAuth configuration first
      await checkOAuthConfig();
      
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      console.log("Google sign-in initiated:", data);
      
      // If the call didn't immediately throw an error but will be redirecting
      if (!error) {
        sonnerToast.info("Redirecting to Google for authentication...");
      } else {
        // Error handling for specific cases
        if (error.message?.includes("missing OAuth secret") || error.message?.includes("Unsupported provider")) {
          throw new Error("Google authentication is not fully configured in Supabase. Both Client ID and Secret must be set.");
        }
        
        // 403 error handling with more specific guidance
        if (error.message?.includes("403")) {
          console.error("Google OAuth 403 error details:", error);
          throw new Error("Google OAuth access denied (403). This typically happens when Google Cloud Console settings don't match your application or your consent screen is not properly configured.");
        }
        
        // Handle generic OAuth errors
        if (error.message?.includes("OAuth")) {
          throw new Error(`OAuth error: ${error.message}. Please check your Google Cloud Console configuration.`);
        }
        
        throw error;
      }
    } catch (error: any) {
      setIsLoading(false);
      
      console.error('Google login error details:', error);
      
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: error.message || "An error occurred during Google login",
      });
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
