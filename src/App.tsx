
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import RouteGuard from "./components/RouteGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DeveloperPortal from "./pages/DeveloperPortal";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AppDetails from "./pages/AppDetails";
import Help from "./pages/Help";
import Guidelines from "./pages/Guidelines";
import ReviewPolicy from "./pages/ReviewPolicy";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import Upload from "./pages/Upload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/app/:appId" element={<AppDetails />} />
                <Route 
                  path="/login" 
                  element={
                    <RouteGuard requireAuth={false}>
                      <Login />
                    </RouteGuard>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <RouteGuard requireAuth={false}>
                      <Register />
                    </RouteGuard>
                  } 
                />
                <Route 
                  path="/developer-portal" 
                  element={
                    <RouteGuard requireAuth={true}>
                      <DeveloperPortal />
                    </RouteGuard>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <RouteGuard requireAuth={true}>
                      <Profile />
                    </RouteGuard>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <RouteGuard requireAuth={true}>
                      <Settings />
                    </RouteGuard>
                  } 
                />
                <Route path="/explore" element={<Explore />} />
                <Route path="/categories" element={<Categories />} />
                <Route 
                  path="/upload" 
                  element={
                    <RouteGuard requireAuth={true}>
                      <Upload />
                    </RouteGuard>
                  } 
                />
                <Route path="/help" element={<Help />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/review-policy" element={<ReviewPolicy />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
