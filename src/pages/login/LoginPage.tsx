import React, { useState } from 'react';
import {Layout, theme, Button,  Row, Col,  Drawer, Menu } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import '../../style/global.css'; 
import {  drawerMenuItems } from '../../data/data';

dayjs.locale('th');

const { Header, Content, Footer } = Layout;


const LoginPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Layout>
      <Header style={{ backgroundColor: '#4A4A4A', padding: '0 20px' }}>
        <Row align="middle" justify="space-between" style={{ height: '100%' }}>
          <Col>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>SA เต็นท์รถ</span>
          </Col>
          <Col flex="auto" style={{ padding: '0 20px' }}>
          </Col>
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
            borderRadius: borderRadiusLG,
          }}
        >




          {/* โค้ดของหน้าแต่ละหน้าจะถูกเขียนที่นี่ !!!!!!!!!!!!! */}










        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
};
export default LoginPage;