
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ThemesPage from "./pages/ThemesPage";
import RoomVisualizerPage from "./pages/RoomVisualizerPage";
import NewsletterConfirmation from "./pages/NewsletterConfirmation";
import CartPage from "./pages/CartPage";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/themes" element={<ThemesPage />} />
          <Route path="/design-services" element={<RoomVisualizerPage />} />
          <Route path="/newsletter-confirmation" element={<NewsletterConfirmation />} />
          <Route path="/cart" element={<CartPage />} />
          {/* These routes will be implemented in the future */}
          <Route path="/product/:productId" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/sustainability" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
