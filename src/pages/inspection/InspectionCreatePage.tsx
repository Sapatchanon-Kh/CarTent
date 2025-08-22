

// src/pages/InspectionBookingPage.tsx
import React, { useState } from 'react';
import { Layout, theme, Button, Space, Row, Col, Input, Typography, Divider, Breadcrumb } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useNavigate } from 'react-router-dom'; // เพิ่ม import นี้

// นำเข้าคอมโพเนนต์และข้อมูลที่แยกออกมา
import Navbar from '../../components/Navbar';
import CustomDatePicker from '../../components/datetimepicker';
import InspectionCard from '../../components/PickupCarCard';
import { timeOptions } from '../../data/data';


dayjs.locale('th');

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const InspectionCreatePage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate(); // สร้าง instance ของ useNavigate

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);

  const handleTimeChange = (_: string, index: number) => {
    setSelectedTimeIndex(index);
  };
  
  const handleNavigation = () => {
    // ในความเป็นจริง จะต้องส่งข้อมูลไปที่ server หรือ API ที่นี่
    // หลังจากนั้น นำทางผู้ใช้ไปยังหน้ายืนยัน
    navigate('/inspection-car');
  };
  


  return (
    <Layout>
      <style>
        {`
          /* Hover effect สำหรับ InspectionCard */
          .inspection-card:hover {
            border-color: #f1d430ff !important;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
            transform: translateY(-5px);
            transition: all 0.3s ease-in-out;
          }

          /* Hover effect สำหรับปุ่มภายใน InspectionCard */
          .inspection-card .inspection-card-button:hover {
            background-color: #e0c528ff !important;
            border-color: #e0c528ff !important;
            color: black !important;
          }
        `}
      </style>

      {/* ใช้คอมโพเนนต์ Navbar ที่แยกออกมา */}
      <Navbar />

      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'Inspection Appointment System' }, { title: 'Booking' }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 1080,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 3 }}
              style={{ padding: 24 }}
            >
              {/* เปลี่ยนสีข้อความของ Title เป็นสีขาว */}
              <Title level={2} style={{ color: 'white' }}>ระบบนัดหมายตรวจสภาพรถยนต์</Title>
              <Divider style={{ borderColor: '#e0e0e0', margin: '24px 0' }} />

              <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col xs={24} sm={12}>
                  <Row align="middle" gutter={[16, 8]}>
                    <Col xs={24} sm={8} md={6} lg={5}>
                      <Text style={{ color: 'black', display: 'block', textAlign: 'left' }}>ชื่อ</Text>
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={19}>
                      <Input placeholder="ชื่อ" style={{ width: '100%' }} />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={12}>
                  <Row align="middle" gutter={[16, 8]}>
                    <Col xs={24} sm={8} md={6} lg={5}>
                      <Text style={{ color: 'black', display: 'block', textAlign: 'left' }}>นามสกุล</Text>
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={19}>
                      <Input placeholder="นามสกุล" style={{ width: '100%' }} />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row align="middle" gutter={[16, 8]}>
                    <Col xs={24} sm={8} md={6} lg={5}>
                      <Text style={{ color: 'black', display: 'block', textAlign: 'left' }}>หมายเลขสัญญาซื้อขาย</Text>
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={19}>
                      <Input placeholder="ทะเบียนรถยนต์" style={{ width: '100%' }} />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row align="middle" gutter={[16, 8]}>
                    <Col xs={24} sm={8} md={6} lg={5}>
                      <Text style={{ color: 'black', display: 'block', textAlign: 'left' }}>ข้อความแจ้งช่าง</Text>
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={19}>
                      <Input.TextArea
                        placeholder="ข้อความแจ้งช่าง"
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ marginTop: '40px' }}>
                <Col span={24}>
                  <Text style={{ color: 'black' }}>เลือกวันเวลานัดหมาย</Text>
                  <div style={{ background: '#4A4A4A', padding: '0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    {/* ใช้ CustomDatePicker ที่มีอยู่ */}
                    <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <div className="time-picker-container" style={{ padding: '24px' }}>
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
                <Col span={24}>
                  <Text style={{ color: 'black' }}>เลือกรายการที่ต้องการตรวจ</Text>
                  <div style={{ background: '#4A4A4A', padding: '24px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Row gutter={[16, 16]}>
                      {/* ใช้ InspectionCard คอมโพเนนต์ซ้ำ */}
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ยางและระบบช่วงล่างรถยนต์" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ระบบเบรก" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ระบบแอร์และหม้อน้ำ" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ไฟหน้าและไฟท้าย" iconType={<CarOutlined />} />
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="น้ำมันเครื่องและไส้กรอง" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="แบตเตอรี่" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ของเหลวต่างๆ" iconType={<CarOutlined />} />
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <InspectionCard label="ไฟส่องสว่าง" iconType={<CarOutlined />} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Row style={{ marginTop: '100px' }}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Space size="middle">
                    <Button 
                      style={{ width: '100px', background: '#f1d430ff', color: 'black' }} 
                      onClick={handleNavigation} // เรียกใช้ handleNavigation
                    >
                      บันทึก
                    </Button>
                    <Button 
                      style={{ width: '100px', background: '#4A4A4A', color: 'white' }}
                      onClick={handleNavigation} // เรียกใช้ handleNavigation
                    >
                      ยกเลิก
                    </Button>
                  </Space>
                </Col>
              </Row>
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
export default InspectionCreatePage;