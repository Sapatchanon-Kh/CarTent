import React, { useState, useEffect } from 'react';
import {
    Button, Card, Row, Col, Space, Modal,
    Typography, Divider, Empty
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    PlusCircleOutlined, EditOutlined, CalendarOutlined,
    ClockCircleOutlined, UserOutlined, EnvironmentOutlined, CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Define an interface for the pickup booking object
interface PickupBooking {
    id: number;
    contractNumber: string;
    appointmentDate: string;
    appointmentTime: string;
    employee: string;
    appointmentMethod: string;
    address?: string;
    province?: string;
    district?: string;
    subdistrict?: string;
}

const initialBookingHistory: PickupBooking[] = [
    {
        id: 1,
        contractNumber: 'D42-20250821',
        appointmentDate: '21 สิงหาคม 2568',
        appointmentTime: '14:00 - 15:00 น.',
        employee: 'คุณสมชาย ใจดี',
        appointmentMethod: 'รับรถที่เต็นท์รถยนต์มือสอง',
    },
    {
        id: 2,
        contractNumber: 'D42-20250818',
        appointmentDate: '18 สิงหาคม 2568',
        appointmentTime: '10:00 - 11:00 น.',
        employee: 'คุณสมหญิง เก่งมาก',
        appointmentMethod: 'จัดส่งรถถึงที่',
    },
];

const PickupCarPage: React.FC = () => {

    const navigate = useNavigate();

    const [bookingHistory, setBookingHistory] = useState<PickupBooking[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<PickupBooking | null>(null);

    const loadBookings = () => {
        const storedBookings = localStorage.getItem('pickupBookings');
        if (storedBookings) {
            setBookingHistory(JSON.parse(storedBookings));
        } else {
            localStorage.setItem('pickupBookings', JSON.stringify(initialBookingHistory));
            setBookingHistory(initialBookingHistory);
        }
    };

    useEffect(() => {
        loadBookings();
        window.addEventListener('focus', loadBookings);
        return () => {
            window.removeEventListener('focus', loadBookings);
        };
    }, []);

    const handleCreateNewBooking = () => navigate('/pickup-car-create');
    const handleEditBooking = (booking: PickupBooking) => navigate(`/pickup-car-create?id=${booking.id}`);

    const handleCancelBooking = (booking: PickupBooking) => {
        setBookingToCancel(booking);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (bookingToCancel) {
            const updatedBookings = bookingHistory.filter(b => b.id !== bookingToCancel.id);
            setBookingHistory(updatedBookings);
            localStorage.setItem('pickupBookings', JSON.stringify(updatedBookings));
            setIsModalOpen(false);
            setBookingToCancel(null);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setBookingToCancel(null);
    };

    return (
        <div style={{ padding: '0 48px' }}>
         
            <div style={{  minHeight: 'calc(100vh - 180px)', padding: 24}}>
                <Row align="middle" justify="space-between">
                    <Col><Title level={2} style={{ color: 'white', marginBottom: 0 }}>ประวัติการนัดรับรถยนต์</Title></Col>
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
                                            <UserOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '16px' }} />
                                            <div>
                                                <Text style={{ color: '#aaaaaa', display: 'block' }}>พนักงานที่ดูแล</Text>
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{booking.employee}</Text>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <EnvironmentOutlined style={{ fontSize: '24px', color: '#f1d430ff', marginRight: '16px' }} />
                                            <div>
                                                <Text style={{ color: '#aaaaaa', display: 'block' }}>วิธีนัดหมาย</Text>
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{booking.appointmentMethod}</Text>
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

            <Modal title="ยืนยันการยกเลิก" open={isModalOpen} onCancel={handleModalClose} footer={[
                <Button key="back" type="primary" onClick={handleModalClose}>กลับ</Button>,
                <Button key="submit" type="primary" danger onClick={handleConfirmCancel}>ยืนยันการยกเลิก</Button>
            ]}>
                <p>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการนัดหมายนี้?</p>
            </Modal>
        </div>
    );
};

export default PickupCarPage;