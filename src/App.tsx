
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ThemesPage from "./pages/ThemesPage";
import RoomVisualizerPage from "./pages/RoomVisualizerPage";
import NewsletterConfirmation from "./pages/NewsletterConfirmation";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import DataMigrationPage from "./pages/DataMigrationPage";
import Chatbot from "./components/Chatbot";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/category/:categoryName/:subCategory" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/themes" element={<ThemesPage />} />
                <Route path="/design-services" element={<RoomVisualizerPage />} />
                <Route path="/newsletter-confirmation" element={<NewsletterConfirmation />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/data-migration" element={
                  <ProtectedRoute>
                    <DataMigrationPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<Index />} />
                <Route path="/sustainability" element={<Index />} />
                <Route path="/contact" element={<Index />} />
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Chatbot />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
