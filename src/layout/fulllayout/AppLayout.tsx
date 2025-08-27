import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const { Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ background: '#262626' }}>
        <Outlet /> {/* หน้าลูก (Child Route) จะถูกแสดงผลตรงนี้ */}
      </Content>
      <Footer style={{ textAlign: 'center', background: '#4A4A4A', color: 'white' }}>
        Ant Design ©{new Date().getFullYear()} Created by sapatchanon khotrwiang
      </Footer>
    </Layout>
  );
};

export default AppLayout;