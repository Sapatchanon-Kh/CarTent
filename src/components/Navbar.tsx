// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Layout, Button, Row, Col, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { drawerMenuItems } from '../data/data';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;


const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

 

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = drawerMenuItems.find(item => item.key === key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
      onClose();
    }
  };

  return (
    <>
      <Header style={{ backgroundColor: '#f14646ff', padding: '0 20px' }}>
        <Row align="middle" justify="space-between" style={{ height: '100%' }}>
          <Col>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>ENNNXO เต็นท์รถ</span>
          </Col>
          <Col flex="auto" style={{ padding: '0 20px' }}>
          </Col>
          <Col>
            <Button type="text" onClick={showDrawer} icon={<MenuOutlined style={{ fontSize: '24px', color: 'black' }} />} />
          </Col>
        </Row>
      </Header>
      
      <Drawer
        title="เมนู"
        onClose={onClose}
        open={open}
        placement="right"
        // เพิ่ม style นี้เข้าไป
        style={{ background: '#262626' }}
      >
        <Menu 
          mode="vertical" 
          items={drawerMenuItems} 
          onSelect={handleMenuClick}
          // เพิ่ม style นี้เข้าไป
          style={{ background: '#262626', color: 'white' }}
        />
      </Drawer>
    </>
  );
};

export default Navbar;