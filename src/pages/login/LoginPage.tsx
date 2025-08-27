import React, { useState } from 'react';
import {
  Layout, Button, Row, Col, Drawer, Menu, Card, Tabs, Form, Input, Checkbox, message, Typography
} from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { UserOutlined, LockOutlined, IdcardOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { drawerMenuItems } from '../../data/data';
import { useAuth } from '../../contexts/AuthContext';
// 1. นำเข้าข้อมูลผู้ใช้จำลอง
import { mockCustomers, mockEmployees } from '../../data/users';

const { Header, Content, Footer } = Layout;
const { Title, Link, Text } = Typography;

interface LoginFormValues {
  email?: string;
  password?: string;
  remember?: boolean;
  employeeId?: string;
}

const LoginPage: React.FC = () => {
 
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleMenuClick = (e: MenuInfo) => {
    const selectedItem = drawerMenuItems.find(item => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
      onClose();
    }
  };
  
  // 2. แก้ไขฟังก์ชัน onFinishCustomer
  const onFinishCustomer = (values: LoginFormValues) => {
    const foundUser = mockCustomers.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      message.success('เข้าสู่ระบบสำเร็จ!');
      login('real-customer-token', 'customer'); // ใช้ token จริงและ role ที่ถูกต้อง
    } else {
      message.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง!');
    }
  };

  // 3. แก้ไขฟังก์ชัน onFinishEmployee
  const onFinishEmployee = (values: LoginFormValues) => {
    const foundUser = mockEmployees.find(
      (user) => user.employeeId === values.employeeId && user.password === values.password
    );

    if (foundUser) {
      message.success('เข้าสู่ระบบสำเร็จ!');
      login('real-employee-token', 'employee');
    } else {
      message.error('รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง!');
    }
  };

  const tabItems = [
    {
      key: '1',
      label: 'สำหรับลูกค้า',
      children: (
        <Form
          name="customer_login"
          initialValues={{ remember: true }}
          onFinish={onFinishCustomer}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'กรุณากรอกอีเมลของคุณ!' }]}
          >
            <Input style={{background : '#424242',border:'grey'}} prefix={<UserOutlined />} placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
          >
            <Input.Password style={{background : '#424242',border:'grey'}} prefix={<LockOutlined /> } placeholder="รหัสผ่าน" />
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
          onFinish={onFinishEmployee}
        >
          <Form.Item
            name="employeeId"
            rules={[{ required: true, message: 'กรุณากรอกรหัสพนักงาน!' }]}
          >
            <Input style={{background : '#424242',border:'grey'}} prefix={<IdcardOutlined />} placeholder="รหัสพนักงาน (พนักงานขาย/ผู้จัดการ)" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
          >
            <Input.Password style={{background : '#424242',border:'grey'}} prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
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