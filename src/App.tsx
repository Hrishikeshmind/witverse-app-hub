
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
