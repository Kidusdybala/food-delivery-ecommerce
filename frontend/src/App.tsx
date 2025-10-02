import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import Foods from "./pages/foods/Foods";
import Restaurants from "./pages/restaurants/Restaurants";
import RestaurantDetail from "./pages/restaurants/RestaurantDetail";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import Deals from "./pages/deals/Deals";
import Track from "./pages/track/Track";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:name" element={<RestaurantDetail />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/track" element={<ProtectedRoute requiredRoles={['client']}><Track /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requiredRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/delivery" element={<ProtectedRoute requiredRoles={['delivery']}><DeliveryDashboard /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
