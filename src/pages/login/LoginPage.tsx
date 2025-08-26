import React, { useState } from 'react';
import {
  Layout, theme, Button, Row, Col, Drawer, Menu, Card, Tabs, Form, Input, Checkbox, message, Typography
} from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { UserOutlined, LockOutlined, IdcardOutlined,MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { drawerMenuItems } from '../../data/data';

const { Header, Content, Footer } = Layout;
// 🟢 FIX 3: Add 'Text' to the import from Typography
const { Title, Link, Text } = Typography;

const LoginPage: React.FC = () => {
  // 🟢 FIX 1: Remove unused 'colorBgContainer'
  const { token: { borderRadiusLG } } = theme.useToken();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleMenuClick = (e: MenuInfo) => {
    const selectedItem = drawerMenuItems.find(item => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
      onClose();
    }
  };
  
  // 🟢 FIX 2: Replace 'any' with a more specific type
  const onFinish = (values: Record<string, any>) => {
    console.log('Received values of form: ', values);
    message.success('เข้าสู่ระบบสำเร็จ!');
    // Navigate to a default page after login, e.g., '/pickup-car'
    navigate('/pickup-car');
  };

  const tabItems = [
    {
      key: '1',
      label: 'สำหรับลูกค้า',
      children: (
        <Form
          name="customer_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'กรุณากรอกอีเมลของคุณ!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col><Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>จดจำฉันไว้</Checkbox></Form.Item></Col>
              <Col><Link href="#">ลืมรหัสผ่าน?</Link></Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', color: 'black', fontWeight: 'bold' }}>
              เข้าสู่ระบบ
            </Button>
            <Text style={{ color: 'white', marginTop: '16px', display: 'block', textAlign: 'center' }}>
              ยังไม่มีบัญชี? <Link href="#">สมัครสมาชิก</Link>
            </Text>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'สำหรับพนักงาน',
      children: (
        <Form
          name="employee_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="employeeId"
            rules={[{ required: true, message: 'กรุณากรอกรหัสพนักงาน!' }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="รหัสพนักงาน (พนักงานขาย/ผู้จัดการ)" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', color: 'black', fontWeight: 'bold' }}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: '#4A4A4A', padding: '0 24px' }}>
        <Row align="middle" justify="space-between" style={{ height: '100%' }}>
          <Col><Title level={3} style={{ color: 'white', margin: 0 }}>SA เต็นท์รถ</Title></Col>
          <Col><Button type="text" onClick={showDrawer} icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />} /></Col>
        </Row>
      </Header>

      <Drawer title={<Title level={4} style={{ color: 'white' }}>เมนู</Title>} onClose={onClose} open={open} placement="right" style={{ background: '#262626' }}>
        <Menu theme="dark" mode="vertical" style={{ background: '#262626', borderRight: 0 }} onClick={handleMenuClick} items={drawerMenuItems} />
      </Drawer>

      <Content style={{ padding: '24px 48px', background: '#262626' }}>
        <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 180px)' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card
              style={{
                background: '#363636',
                border: '1px solid #424242',
                borderRadius: borderRadiusLG,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ color: 'white' }}>เข้าสู่ระบบ</Title>
              </div>
              <Tabs defaultActiveKey="1" centered items={tabItems} />
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#4A4A4A', color: 'white' }}>
        Ant Design ©{new Date().getFullYear()} Created by sapatchanon khotrwiang
      </Footer>
    </Layout>
  );
};

export default LoginPage;