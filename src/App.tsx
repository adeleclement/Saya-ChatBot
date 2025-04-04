
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  SignIn, 
  SignUp, 
  ClerkLoaded, 
  ClerkLoading, 
  SignedIn, 
  SignedOut 
} from "@clerk/clerk-react";
import Index from "./pages/Index";
import About from "./pages/About";
import Resources from "./pages/Resources";
import LearnMore from "./pages/LearnMore";
import LearnMoreGeneral from "./pages/LearnMoreGeneral";
import NotFound from "./pages/NotFound";
import Conversations from "./pages/Conversations";
import ConversationDetail from "./pages/ConversationDetail";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoading>
          <LoadingScreen />
        </ClerkLoading>
        <ClerkLoaded>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/learn-more" element={<LearnMoreGeneral />} />
            <Route path="/learn-more/:topic" element={<LearnMore />} />
            
            {/* Auth Routes */}
            <Route path="/sign-in/*" element={<AuthLayout><SignIn routing="path" path="/sign-in" /></AuthLayout>} />
            <Route path="/sign-up/*" element={<AuthLayout><SignUp routing="path" path="/sign-up" /></AuthLayout>} />
            
            {/* Protected Routes */}
            <Route path="/conversations" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
            <Route path="/conversations/:id" element={<ProtectedRoute><ConversationDetail /></ProtectedRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
