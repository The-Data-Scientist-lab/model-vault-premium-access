
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ModelDetail from "./pages/ModelDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PaymentPage from "./pages/PaymentPage";
import PaymentVerification from "./pages/PaymentVerification";
import PaymentFailed from "./pages/PaymentFailed";
import RefundRequest from "./pages/RefundRequest";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/model/:slug" element={
              <ProtectedRoute>
                <Layout>
                  <ModelDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/payment/:modelId" element={
              <ProtectedRoute>
                <Layout>
                  <PaymentPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/payment/verification" element={
              <ProtectedRoute>
                <PaymentVerification />
              </ProtectedRoute>
            } />
            <Route path="/payment/failed" element={
              <ProtectedRoute>
                <Layout>
                  <PaymentFailed />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/refund-request" element={
              <ProtectedRoute>
                <Layout>
                  <RefundRequest />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <UserProfile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
