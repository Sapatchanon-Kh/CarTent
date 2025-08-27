import React from 'react';
import {  Typography } from 'antd';

const { Title } = Typography;

const BuyInsurancePage: React.FC = () => {


  return (
    <div style={{ padding: '24px 48px' }}>
      <div>
        <Title level={2} style={{ color: 'white' }}>หน้าสำหรับซื้อประกัน</Title>
        {/* คุณสามารถใส่เนื้อหาของหน้า "ซื้อประกัน" ได้ที่นี่ */}
      </div>
    </div>
  );
};

export default BuyInsurancePage;