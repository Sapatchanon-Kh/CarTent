// src/data/data.ts
import dayjs from 'dayjs';

export const drawerMenuItems = [
  { key: '1', label: 'เข้าสู่ระบบ/สมัครสมาชิก', path: '/login'},
  { key: '2', label: 'เลือกซื้อรถยนต์', path: '/buy-car'},
  { key: '3', label: 'เลือกเช่ารถยนต์', path: '/rent-car' },
  { key: '4', label: 'เลือกซื้อประกันรถยนต์', path: '/buy-insurance'},
  { key: '5', label: 'นัดหมายรับรถยนต์', path: '/pickup-car'},
  { key: '6', label: 'นัดหมายตรวจสภาพรถยนต์', path: '/inspection-car'},
  { key: '7', label: 'การชำระเงิน', path: '/payment'},
];

export const typeItems = [
  { value: '1', label: 'รับรถที่เต็นท์รถยนต์มือสอง' },
  { value: '2', label: 'จัดส่งรถถึงที่' },
];

export const empItems = [
  { value: '1', label: 'Emp 1' },
  { value: '2', label: 'Emp 2' },
  { value: '3', label: 'Emp 3' },
  { value: '4', label: 'Emp 4' },
];

export const provinceItems = [
  { value: '1', label: 'นครราขสีมา' },
  { value: '2', label: 'ชลบุรี' },
  { value: '3', label: 'นครนายก' },
  { value: '4', label: 'ระยอง' },
];

export const districtItems = [
  { value: '1', label: 'คง' },
  { value: '2', label: 'โชคชัย' },
  { value: '3', label: 'โนนไทย' },
  { value: '4', label: 'ด่านขุนทด' },
];

export const subdistrictItems = [
  { value: '1', label: 'กระโทก' },
  { value: '2', label: 'โชคชัย' },
  { value: '3', label: 'ท่าอ่าง' },
  { value: '4', label: 'ทุ่งอรุณ' },
];

export const timeOptions = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00'
];

export const generateDateOptions = (daysCount: number) => {
  const dateOptions = [];
  for (let i = 0; i < daysCount; i++) {
    dateOptions.push({
      label: dayjs().add(i, 'day').locale('th').format('dddd'),
      date: dayjs().add(i, 'day')
    });
  }
  return dateOptions;
};