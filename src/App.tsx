import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// นำเข้า Component ของแต่ละหน้าที่คุณสร้างไว้

import InspectionPage from './pages/inspection/InspectionCarPage.tsx'; 
import LoginPage from './pages/login/LoginPage.tsx';
import IndexPage from './pages/buycar/BuyCar.tsx'; 
import RentCarPage from './pages/rentcar/RentCarPage.tsx';
import BuyInsurancePage from './pages/insurance/BuyInsurancePage';
import PickupCarPage from './pages/pickup-delivery/PickupCarPage.tsx';
import PickupCarCreatePage from './pages/pickup-delivery/PickupCarPageCreate.tsx';
import InspectionCreatePage from './pages/inspection/InspectionCreatePage.tsx'; 
import PaymentPage from './pages/payment/PaymentPage.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route สำหรับหน้าหลัก */}
        <Route path="/" element={<IndexPage />} /> 

        {/* Routes สำหรับหน้าอื่นๆ จาก Drawer Menu */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/buy-car" element={<IndexPage />} />
        <Route path="/rent-car" element={<RentCarPage />} />
        <Route path="/buy-insurance" element={<BuyInsurancePage />} />
        <Route path="/pickup-car" element={<PickupCarPage />} />
        <Route path="/inspection-create" element={<InspectionCreatePage />} />
        <Route path="/pickup-car-create" element={<PickupCarCreatePage />} />
        <Route path="/inspection-car" element={<InspectionPage />} /> {/* ใช้ IndexPage เนื่องจากเป็นหน้านัดหมายอยู่แล้ว */}
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;