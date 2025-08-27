import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const BuyCarPage: React.FC = () => {
 

  return (
    <div style={{ padding: '24px 48px' }}>
      <div>
        <Title level={2} style={{ color: 'white' }}>หน้าสำหรับซื้อรถยนต์</Title>
        {/* คุณสามารถใส่เนื้อหาของหน้า "ซื้อรถยนต์" ได้ที่นี่ */}
      </div>
    </div>
  );
};

export default BuyCarPage;