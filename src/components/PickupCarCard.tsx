// src/components/InspectionCard.tsx
import React from 'react';
import { Card, Button, Typography } from 'antd';

const { Text } = Typography;

interface InspectionCardProps {
  label: string;
  iconType?: React.ReactNode;
}

const InspectionCard: React.FC<InspectionCardProps> = ({ label, iconType }) => (
  <Card
    hoverable
    className="inspection-card" // เพิ่ม className เพื่อกำหนดสไตล์ hover
    style={{
      width: '100%',
      minHeight: '200px',
      textAlign: 'center',
      border: '1px solid #807e7eff',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#4A4A4A' // เปลี่ยนสีการ์ดเป็นสีเทา
    }}
    bodyStyle={{ padding: '12px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
  >
    {/* ตรวจสอบว่ามี iconType หรือไม่ ถ้ามีให้แสดงไอคอน ถ้าไม่มีให้แสดง Image Placeholder */}
    {iconType ? (
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '64px', color: '#f1d430ff' }}>
              {iconType}
          </div>
        </div>
    ) : (
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>Image Placeholder</Text> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
        </div>
    )}
    <div style={{ marginTop: '8px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Text strong style={{ minHeight: '40px', color: 'white' }}>{label}</Text> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
      <Button className="inspection-card-button" style={{ width: '100%', marginTop: '8px', backgroundColor: '#f1d846ff', borderColor: '#f1d846ff', color: 'black' }}>เลือก</Button>
    </div>
  </Card>
);

export default InspectionCard;