import React from 'react';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// 1. นำเข้า Layout ใหม่
import AppLayout from './layout/fulllayout/AppLayout';

// 2. นำเข้าหน้าต่างๆ
import InspectionPage from './pages/inspection/InspectionCarPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import IndexPage from './pages/buycar/BuyCar.tsx';
import RentCarPage from './pages/rentcar/RentCarPage.tsx';
import BuyInsurancePage from './pages/insurance/BuyInsurancePage';
import PickupCarPage from './pages/pickup-delivery/PickupCarPage.tsx';
import PickupCarCreatePage from './pages/pickup-delivery/PickupCarPageCreate.tsx';
import InspectionCreatePage from './pages/inspection/InspectionCreatePage.tsx';
import PaymentPage from './pages/payment/PaymentPage.tsx';
import ProfilePage from './pages/profile/ProfilePage.tsx';

// ProtectedRoute component ไม่ต้องแก้ไข
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* 3. หน้า Login จะอยู่นอก Layout กลาง */}
      <Route path="/login" element={<LoginPage />} />

      {/* 4. ทุกหน้าที่เหลือจะอยู่ภายใต้ AppLayout */}
      <Route path="/" element={<AppLayout />}>
        {/* Public Routes */}
        <Route index element={<IndexPage />} />
        <Route path="buy-car" element={<IndexPage />} />
        <Route path="rent-car" element={<RentCarPage />} />

        {/* Protected Routes */}
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="buy-insurance" element={<ProtectedRoute><BuyInsurancePage /></ProtectedRoute>} />
        <Route path="pickup-car" element={<ProtectedRoute><PickupCarPage /></ProtectedRoute>} />
        <Route path="inspection-create" element={<ProtectedRoute><InspectionCreatePage /></ProtectedRoute>} />
        <Route path="pickup-car-create" element={<ProtectedRoute><PickupCarCreatePage /></ProtectedRoute>} />
        <Route path="inspection-car" element={<ProtectedRoute><InspectionPage /></ProtectedRoute>} />
        <Route path="payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;