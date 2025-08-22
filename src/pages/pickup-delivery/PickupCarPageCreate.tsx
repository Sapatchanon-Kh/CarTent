

import React, { useState } from 'react';
import { Layout, Tabs, theme, Select, Button, Space, Row, Col, Input, Drawer, Menu } from 'antd'; 
// แก้ไขบรรทัด import ให้ใช้ type-only
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import '../../style/global.css'; // นำเข้า global css
// แก้ไขพาธของไฟล์ CSS และคอมโพเนนต์ให้ถูกต้อง
import '../../style/inspecstyle.css'; 
import CustomDatePicker from '../../components/datetimepicker'; 
import { typeItems, empItems, provinceItems, districtItems, subdistrictItems, timeOptions, drawerMenuItems } from '../../data/data';

dayjs.locale('th');

const { Header, Content, Footer } = Layout;


const PickupCarCreatePage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);
  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // กำหนดเส้นทางไปยังหน้า PickupCarPage.tsx
    navigate('/pickup-car');
  };

 

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

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedEmp, setSelectedEmp] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string | null>(null);

  const handleTimeChange = (_: string, index: number) => {
    setSelectedTimeIndex(index);
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
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1>Vehical Pickup/Delivery </h1>
          <Tabs style={{ background: '#262626' }}></Tabs>

          <Row style={{ marginTop: '20px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <Row align="middle" gutter={[16, 8]}>
                <Col xs={24} sm={8} md={6} lg={5}>
                  <span style={{ color: 'white', display: 'block', textAlign: 'left' }}>เลือกประเภทการรับรถยนต์</span>
                </Col>
                <Col xs={24} sm={16} md={18} lg={19}>
                  <Select
                    value={selectedType}
                    style={{ width: '100%', color: 'white' }}
                    onChange={(value) => setSelectedType(value)}
                    options={typeItems}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <Row align="middle" gutter={[16, 8]}>
                <Col xs={24} sm={8} md={6} lg={5}>
                  <span style={{ color: 'white', display: 'block', textAlign: 'left' }}>หมายเลขสัญญาซื้อขาย</span>
                </Col>
                <Col xs={24} sm={16} md={18} lg={19}>
                  <Input style={{ width: '100%' }} placeholder="กรอกหมายเลขสัญญา" />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <Row align="middle" gutter={[16, 8]}>
                <Col xs={24} sm={8} md={6} lg={5}>
                  <span style={{ color: 'white', display: 'block', textAlign: 'left' }}>พนักงานที่ดูแล</span>
                </Col>
                <Col xs={24} sm={16} md={18} lg={19}>
                  <Select
                    value={selectedEmp}
                    style={{ width: '100%', color: 'white' }}
                    onChange={(value) => setSelectedEmp(value)}
                    options={empItems}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: '40px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <p style={{ color: 'white' }}>เลือกวันเวลานัดหมาย</p>
              <div style={{ background: '#4A4A4A', padding: '0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div style={{ padding: '24px' }}>
                  <Row gutter={[16, 16]}>
                    {timeOptions.map((time, index) => (
                      <Col xs={12} sm={8} md={6} key={index}>
                        <Button
                          style={{
                            width: '100%',
                                height: '50px',
                                background: selectedTimeIndex === index ? '#f1d430ff' : 'transparent',
                                color: selectedTimeIndex === index ? 'black' : 'white',
                                borderColor: selectedTimeIndex === index ? '#f1d430ff' : '#ddd',
                                borderRadius: '6px'

                         
                          }}
                          onClick={() => handleTimeChange(time, index)}
                        >
                          {time}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: '40px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <p style={{ color: 'white' }}>ที่อยู่สำหรับจัดส่ง</p>
              <p style={{ color: '#cccccc', marginBottom: '10px' }}>สำหรับลูกค้าที่เลือกให้เต้นท์ขับรถยนต์นำไปส่งที่บ้านลูกค้า</p>
              <Input.TextArea placeholder="กรอกที่อยู่" rows={4} style={{ marginBottom: '20px' }} />
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <p>จังหวัด</p>
                  <Select
                    value={selectedProvince}
                    style={{ width: '100%', color: 'white' }}
                    onChange={(value) => setSelectedProvince(value)}
                    options={provinceItems}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <p>อำเภอ/เขต</p>
                  <Select
                    value={selectedDistrict}
                    style={{ width: '100%', color: 'white' }}
                    onChange={(value) => setSelectedDistrict(value)}
                    options={districtItems}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <p>ตำบล/แขวง</p>
                  <Select
                    value={selectedSubdistrict}
                    style={{ width: '100%', color: 'white' }}
                    onChange={(value) => setSelectedSubdistrict(value)}
                    options={subdistrictItems}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: '100px' }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
            >
              <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
                <Button style={{ width: '100px', background: '#f1d430ff', color: 'black' }}  onClick={handleSave}>บันทึก</Button>
                <Button style={{ width: '100px', background: '#4A4A4A', color: 'white' }} onClick={handleSave}>ยกเลิก</Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by sapatchanon khotrwiang
      </Footer>
    </Layout>
  );
};
export default PickupCarCreatePage;