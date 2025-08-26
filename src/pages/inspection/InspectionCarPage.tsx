import React, { useState, useEffect } from 'react';
import {
    Layout, theme, Button, Card, Row, Col, Space, Drawer, Menu, Modal,
    Typography, Divider, Breadcrumb, Empty
} from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MenuInfo } from 'rc-menu/lib/interface';
import {
    MenuOutlined, PlusCircleOutlined, EditOutlined, CalendarOutlined,
    ClockCircleOutlined, BuildOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { drawerMenuItems } from '../../data/data';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// Define an interface for the booking object
interface InspectionBooking {
    id: number;
    contractNumber: string;
    appointmentDate: string;
    appointmentTime: string;
    system: string;
    firstName?: string;
    lastName?: string;
    message?: string;
}

const initialBookingHistory: InspectionBooking[] = [
    {
        id: 1,
        contractNumber: 'D42-20250821',
        appointmentDate: '21 สิงหาคม 2568',
        appointmentTime: '14:00 - 15:00 น.',
        system: 'ยางและระบบช่วงล่างรถยนต์ ระบบเบรก ระบบแอร์และหม้อน้ำ',
    },
    {
        id: 2,
        contractNumber: 'D42-20250818',
        appointmentDate: '18 สิงหาคม 2568',
        appointmentTime: '10:00 - 11:00 น.',
        system: 'น้ำมันเครื่องและไส้กรอง แบตเตอรี่',
    },
];

const InspectionCarPage: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const [bookingHistory, setBookingHistory] = useState<InspectionBooking[]>([]);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<InspectionBooking | null>(null);

    useEffect(() => {
        const storedBookings = localStorage.getItem('inspectionBookings');
        if (storedBookings) {
            setBookingHistory(JSON.parse(storedBookings));
        } else {
            localStorage.setItem('inspectionBookings', JSON.stringify(initialBookingHistory));
            setBookingHistory(initialBookingHistory);
        }
    }, []);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    const handleMenuClick = (e: MenuInfo) => {
        const selectedItem = drawerMenuItems.find(item => item.key === e.key);
        if (selectedItem?.path) {
            navigate(selectedItem.path);
            onClose();
        }
    };

    const handleCreateNewBooking = () => navigate('/inspection-create');
    const handleEditBooking = (booking: InspectionBooking) => navigate(`/inspection-create?id=${booking.id}`);

    const handleCancelBooking = (booking: InspectionBooking) => {
        setBookingToCancel(booking);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (bookingToCancel) {
            const updatedBookings = bookingHistory.filter(b => b.id !== bookingToCancel.id);
            setBookingHistory(updatedBookings);
            localStorage.setItem('inspectionBookings', JSON.stringify(updatedBookings));
            setIsModalOpen(false);
            setBookingToCancel(null);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setBookingToCancel(null);
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#4A4A4A', padding: '0 24px' }}>
                <Row align="middle" justify="space-between" style={{ height: '100%' }}>
                    <Col><Title level={3} style={{ color: 'white', margin: 0 }}>SA เต็นท์รถ</Title></Col>
                    <Col><Button type="text" onClick={showDrawer} icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />} /></Col>
                </Row>
            </Header>

            <Drawer title={<Title level={4} style={{color: 'white'}}>เมนู</Title>} onClose={onClose} open={open} placement="right" style={{ background: '#262626' }}>
                <Menu theme="dark" mode="vertical" style={{ background: '#262626', borderRight: 0 }} onClick={handleMenuClick} items={drawerMenuItems} />
            </Drawer>

            <Content style={{ padding: '0 48px', background: '#262626' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: <Text style={{ color: '#999' }}>Home</Text> }, { title: <Text style={{ color: 'white' }}>Inspection History</Text> }]} />
                <div style={{ background: colorBgContainer, minHeight: 'calc(100vh - 180px)', padding: 24, borderRadius: borderRadiusLG }}>
                    <Row align="middle" justify="space-between">
                        <Col><Title level={2} style={{ color: 'white', marginBottom: 0 }}>ประวัติการนัดตรวจสภาพรถยนต์</Title></Col>
                        <Col>
                            <Button type="primary" icon={<PlusCircleOutlined />} style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', color: 'black', border: 'none', fontWeight: 'bold' }} onClick={handleCreateNewBooking}>
                                สร้างการนัดหมายใหม่
                            </Button>
                        </Col>
                    </Row>
                    <Divider style={{ borderColor: '#424242' }} />

                    {bookingHistory.length > 0 ? (
                        <Row gutter={[0, 24]} justify="center">
                            <Col xs={24} sm={20} md={16} lg={12}>
                                {bookingHistory.map((booking) => (
                                    <Card
                                        key={booking.id}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#363636',
                                            color: 'white',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                            marginBottom: '24px',
                                            border: '1px solid #f1d846ff',
                                        }}
                                    >
                                        <Title level={5} style={{ color: 'white', marginBottom: '24px' }}>
                                            หมายเลขสัญญาซื้อขาย: <Text style={{ color: '#f1d430ff' }}>{booking.contractNumber}</Text>
                                        </Title>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <CalendarOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '16px' }} />
                                                <div>
                                                    <Text style={{ color: '#aaaaaa', display: 'block' }}>วันนัดหมาย</Text>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentDate}</Text>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <ClockCircleOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '16px' }} />
                                                <div>
                                                    <Text style={{ color: '#aaaaaa', display: 'block' }}>เวลานัดหมาย</Text>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentTime}</Text>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <BuildOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '16px' }} />
                                                <div>
                                                    <Text style={{ color: '#aaaaaa', display: 'block' }}>ระบบที่ต้องการตรวจสอบ</Text>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{booking.system}</Text>
                                                </div>
                                            </div>
                                        </div>

                                        <Space style={{ width: '100%', justifyContent: 'center' }}>
                                            <Button icon={<EditOutlined />} style={{ backgroundColor: '#f1d430ff', color: 'black', border: 'none' }} onClick={() => handleEditBooking(booking)}>แก้ไข</Button>
                                            <Button icon={<CloseCircleOutlined />} danger onClick={() => handleCancelBooking(booking)}>ยกเลิก</Button>
                                        </Space>
                                    </Card>
                                ))}
                            </Col>
                        </Row>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '100px' }}>
                            <Empty description={<Text style={{ color: '#777' }}>ยังไม่มีประวัติการนัดหมาย</Text>}>
                                <Button type="primary" style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', color: 'black', border: 'none', fontWeight: 'bold' }} onClick={handleCreateNewBooking}>สร้างการนัดหมายแรกของคุณ</Button>
                            </Empty>
                        </div>
                    )}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#4A4A4A', color: 'white' }}>
                Ant Design ©{new Date().getFullYear()} Created by sapatchanon khotrwiang
            </Footer>

            <Modal title="ยืนยันการยกเลิก" open={isModalOpen} onCancel={handleModalClose} footer={[
                <Button key="back"  type="primary" onClick={handleModalClose}>กลับ</Button>,
                <Button key="submit" type="primary" danger onClick={handleConfirmCancel}>ยืนยันการยกเลิก</Button>
            ]}>
                <p>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการนัดหมายนี้?</p>
            </Modal>
        </Layout>
    );
};

export default InspectionCarPage;