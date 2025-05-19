
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, checkOAuthConfig } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from '@/components/ui/sonner';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
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

  const signIn = async (identifier: string, password: string) => {
    try {
      setIsLoading(true);
      // Determine if the identifier is an email or mobile number
      const isEmailIdentifier = isEmail(identifier);
      // For mobile numbers, create a consistent email format
      const email = isEmailIdentifier ? identifier : `${identifier}@example.com`;
      
      console.log("Signing in with:", email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (identifier: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Determine if the identifier is an email or mobile number
      const isEmailIdentifier = isEmail(identifier);
      
      // Validate mobile number if it's not an email
      if (!isEmailIdentifier && !/^\d{10}$/.test(identifier)) {
        throw new Error("Mobile number must be exactly 10 digits");
      }
      
      // Create a consistent email format for mobile numbers
      const email = isEmailIdentifier ? identifier : `${identifier}@example.com`;
      
      console.log("Signing up with:", email, "Is email:", isEmailIdentifier);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            mobile: isEmailIdentifier ? null : identifier,
            department: userData.department
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
      });
      console.error('Registration error:', error);
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
    <AuthContext.Provider value={{ session, user, profile, isLoading, signIn, signUp, signOut, signInWithGoogle }}>
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
