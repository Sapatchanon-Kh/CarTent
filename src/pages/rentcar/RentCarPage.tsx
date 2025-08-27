import React from 'react';
import {  Typography } from 'antd';

const { Title } = Typography;

const RentCarPage: React.FC = () => {
 

  return (
    <div style={{ padding: '24px 48px' }}>
      <div>
        <Title level={2} style={{ color: 'white' }}>หน้าสำหรับเช่ารถยนต์</Title>
        {/* คุณสามารถใส่เนื้อหาของหน้า "เช่ารถยนต์" ได้ที่นี่ */}
      </div>
    </div>
  );
};

export default RentCarPage;