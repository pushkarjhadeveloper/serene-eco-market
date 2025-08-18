
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DesignerSpace from "./pages/DesignerSpace";
import DesignerCommunityPage from "./pages/DesignerCommunityPage";
import ProfilePage from "./pages/ProfilePage";
import NetworkPage from "./pages/NetworkPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import NewsletterConfirmation from "./pages/NewsletterConfirmation";
import ThemesPage from "./pages/ThemesPage";
import RoomVisualizerPage from "./pages/RoomVisualizerPage";
import DataMigrationPage from "./pages/DataMigrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/designer-space" element={<DesignerSpace />} />
                <Route path="/designer-community" element={<DesignerCommunityPage />} />
                <Route path="/themes" element={<ThemesPage />} />
                <Route path="/room-visualizer" element={<RoomVisualizerPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/newsletter-confirmation" element={<NewsletterConfirmation />} />
                <Route path="/data-migration" element={<DataMigrationPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
