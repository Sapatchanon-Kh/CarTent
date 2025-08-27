import React, { useState } from 'react';
import { Layout, Button, Row, Col, Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined, LogoutOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
// แก้ไข: เปลี่ยนชื่อ drawerMenuItems เป็น baseMenuItems เพื่อความชัดเจน
import { drawerMenuItems as baseMenuItems } from '../data/data'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleMenuClick = (info: { key: string }) => {
    onClose();

    if (info.key === 'logout') {
      logout();
      return;
    }

    const dynamicPaths: { [key: string]: string } = {
      'profile': '/profile',
      'login': '/login',
    };

    let pathToNavigate: string | undefined;

    if (dynamicPaths[info.key]) {
      pathToNavigate = dynamicPaths[info.key];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedPublicItem = (baseMenuItems as any[]).find(item => item.key === info.key);
      pathToNavigate = selectedPublicItem?.path;
    }

    if (pathToNavigate) {
      navigate(pathToNavigate);
    }
  };

  const getMenuItems = (): MenuItem[] => {
    // กรองเอาเมนู login (ถ้ามี) ออกจาก Array ตั้งต้นก่อน
    const filteredBaseMenu = baseMenuItems.filter(item => item.key !== 'login');
    const menu: MenuItem[] = [...filteredBaseMenu] as MenuItem[];

    if (isAuthenticated && userRole === 'customer') {
      menu.push(
        { key: 'profile', label: 'ข้อมูลของฉัน', icon: <UserOutlined /> },
        { key: 'logout', label: 'ออกจากระบบ', icon: <LogoutOutlined /> }
      );
    } else {
      menu.push(
        { key: 'login', label: 'เข้าสู่ระบบ/สมัครสมาชิก', icon: <LoginOutlined /> }
      );
    }
    return menu;
  };

  return (
    <>
      <Header style={{ backgroundColor: '#f14646ff', padding: '0 20px' }}>
        <Row align="middle" justify="space-between" style={{ height: '100%' }}>
          <Col>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>SA เต็นท์รถ</span>
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
        style={{ background: '#262626' }}
      >
        <Menu 
          mode="vertical" 
          items={getMenuItems()}
          onClick={handleMenuClick}
          style={{ background: '#262626', color: 'white' }}
        />
      </Drawer>
    </>
  );
};

export default Navbar;