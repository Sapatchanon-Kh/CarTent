import React from 'react';
import {  Typography } from 'antd';

const { Title } = Typography;

const PaymentPage: React.FC = () => {


  return (
    <div style={{ padding: '24px 48px' }}>
      <div>
        <Title level={2} style={{ color: 'white' }}>หน้าสำหรับชำระเงิน</Title>
        {/* คุณสามารถใส่เนื้อหาของหน้า "ชำระเงิน" ได้ที่นี่ */}
      </div>
    </div>
  );
};

export default PaymentPage;