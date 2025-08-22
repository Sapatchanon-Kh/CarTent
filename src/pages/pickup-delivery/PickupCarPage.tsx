// src/pages/BookingConfirmationPage.tsx
import React, { useState } from 'react';
import { Layout, theme, Button, Card, Row, Col, Space, Drawer, Menu, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { MenuOutlined, PlusCircleOutlined, EditOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined, EnvironmentOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { drawerMenuItems } from '../../data/data';

const { Header, Content, Footer } = Layout;

const BookingConfirmationPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  // Array ของข้อมูลประวัติการนัดหมาย (ตัวอย่าง)
  const bookingHistory = [
    {
      contractNumber: 'D42-20250821',
      appointmentDate: '21 สิงหาคม 2568',
      appointmentTime: '14:00 - 15:00 น.',
      employee: 'Emp 1',
      appointmentMethod: 'รับรถที่เต็นท์รถยนต์มือสอง',
    },
    {
      contractNumber: 'D42-20250818',
      appointmentDate: '18 สิงหาคม 2568',
      appointmentTime: '10:00 - 11:00 น.',
      employee: 'Emp 2',
      appointmentMethod: 'จัดส่งรถถึงที่',
    },
    {
      contractNumber: 'D42-20250815',
      appointmentDate: '15 สิงหาคม 2568',
      appointmentTime: '16:00 - 17:00 น.',
      employee: 'Emp 3',
      appointmentMethod: 'รับรถที่เต็นท์รถยนต์มือสอง',
    },
  ];

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (e: MenuInfo) => {
    const selectedItem = drawerMenuItems.find(item => item.key === e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
      onClose();
    }
  };

  const handleCreateNewBooking = () => {
    navigate('/pickup-car-create');
  };
  
  const handleEditBooking = () => {
    navigate('/pickup-car-create');
  };

  const handleCancelBooking = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    // Logic สำหรับการยืนยันการยกเลิกการนัดหมาย
    console.log('Booking has been cancelled');
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#4A4A4A', padding: '0 20px' }}>
        <Row align="middle" justify="space-between" style={{ height: '100%' }}>
          <Col>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>SA เต็นท์รถ</span>
          </Col>
          <Col flex="auto" style={{ padding: '0 20px' }} />
          <Col>
            <Button type="text" onClick={showDrawer} icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />} />
          </Col>
        </Row>
      </Header>
      
      <Drawer 
        title="เมนู" 
        onClose={onClose} 
        open={open} 
        placement="right" 
        style={{ background: '#262626' }}
      >
        <Menu 
          mode="vertical" 
          style={{ background: '#262626' }}
          onClick={handleMenuClick}
          items={drawerMenuItems} 
        />
      </Drawer>
      
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 1080,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row align="middle" justify="space-between" style={{ marginBottom: '16px' }}>
            <Col>
              <h1 style={{ color: 'white', fontSize: '2em', fontWeight: 'normal' }}>ประวัติการนัดรับรถยนต์</h1>
            </Col>
            <Col>
              <Button 
                type="primary" 
                icon={<PlusCircleOutlined />} 
                style={{ backgroundColor: '#f1d430ff', color: 'black' }}
                onClick={handleCreateNewBooking}
              >
                สร้างการนัดหมายใหม่
              </Button>
            </Col>
          </Row>
          <Row gutter={[0, 24]} justify="center">
            <Col xs={24} sm={20} md={16} lg={12}>
              {bookingHistory.map((booking, index) => (
                <Card
                  key={index}
                  title={<span style={{ fontWeight: 'normal' }}>หมายเลขสัญญาซื้อขาย: <span style={{ fontWeight: 'bold' }}>{booking.contractNumber}</span></span>}
                  bordered={true}
                  style={{
                    width: '100%',
                    backgroundColor: '#363636',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    marginBottom: '24px',
                    borderColor: '#f1d846ff',
                    borderWidth: '1px',
                  }}
                >
                  <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    <Col span={24}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <CalendarOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#aaaaaa' }}>วันนัดหมาย</span>
                          <span style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentDate}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <ClockCircleOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#aaaaaa' }}>เวลานัดหมาย</span>
                          <span style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentTime}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <UserOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#aaaaaa' }}>พนักงานที่นัดหมาย</span>
                          <span style={{ color: 'white', fontWeight: 'bold' }}>{booking.employee}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <EnvironmentOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#aaaaaa' }}>วิธีนัดหมาย</span>
                          <span style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentMethod}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <Space style={{ marginTop: '30px', width: '100%', justifyContent: 'center' }}>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      style={{ backgroundColor: '#f1d430ff', color: 'black' }}
                      onClick={handleEditBooking}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      type="primary"
                      icon={<CloseCircleOutlined />}
                      danger
                      onClick={handleCancelBooking}
                    >
                      ยกเลิก
                    </Button>
                  </Space>
                </Card>
              ))}
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by sapatchanon khotrwiang
      </Footer>
      
      <Modal
        title="ยืนยันการยกเลิก"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}type="primary"  style={{ color: 'black' }}>
            ยกเลิก
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleConfirmCancel}>
            ยืนยัน
          </Button>,
        ]}
      >
        <p>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการนัดหมายนี้?</p>
      </Modal>
    </Layout>
  );
};

export default BookingConfirmationPage;