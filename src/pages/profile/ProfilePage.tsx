import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
 

  return (
    <div style={{ padding: '24px 48px' }}>
      <div>
        <Title level={2} style={{ color: 'white' }}>ข้อมูลของฉัน</Title>
      
      </div>
    </div>
  );
};

export default ProfilePage;