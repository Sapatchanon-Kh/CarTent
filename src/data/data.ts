// src/data/data.ts
import dayjs from 'dayjs';
import addressData from './thailand-address.json';

// Define an interface for the address data structure
export interface Tambon {
  id: number;
  name_th: string;
  name_en: string;
  zip_code: number;
}

export interface Amphure {
  id: number;
  name_th: string;
  name_en: string;
  tambon: Tambon[];
}

export interface Province {
  id: number;
  name_th: string;
  name_en: string;
  amphure: Amphure[];
}

export const provinces: Province[] = addressData;

export const drawerMenuItems = [
  { key: '1', label: 'เข้าสู่ระบบ/สมัครสมาชิก', path: '/login'},
  { key: '2', label: 'เลือกซื้อรถยนต์', path: '/buy-car'},
  { key: '3', label: 'เลือกเช่ารถยนต์', path: '/rent-car' },
  { key: '4', label: 'เลือกซื้อประกันรถยนต์', path: '/buy-insurance'},
  { key: '5', label: 'นัดหมายรับรถยนต์', path: '/pickup-car'},
  { key: '6', label: 'นัดหมายตรวจสภาพรถยนต์', path: '/inspection-car'},
  { key: '7', label: 'การชำระเงิน', path: '/payment'},
];

export const drawerMenuAfterLockinCustomerItems = [
  { key: '1', label: 'ข้อมูลของฉัน', path: '/login'},
  { key: '2', label: 'เลือกซื้อรถยนต์', path: '/buy-car'},
  { key: '3', label: 'เลือกเช่ารถยนต์', path: '/rent-car' },
  { key: '4', label: 'เลือกซื้อประกันรถยนต์', path: '/buy-insurance'},
  { key: '5', label: 'นัดหมายรับรถยนต์', path: '/pickup-car'},
  { key: '6', label: 'นัดหมายตรวจสภาพรถยนต์', path: '/inspection-car'},
  { key: '7', label: 'การชำระเงิน', path: '/payment'},
  { key: '8', label: 'ออกจากระบบ', path: '/buy-car'},
];

export const typeItems = [
  { value: 'รับรถที่เต็นท์รถยนต์มือสอง', label: 'รับรถที่เต็นท์รถยนต์มือสอง' },
  { value: 'จัดส่งรถถึงที่', label: 'จัดส่งรถถึงที่' },
];

export const empItems = [
  { value: 'คุณสมชาย ใจดี', label: 'คุณสมชาย ใจดี' },
  { value: 'คุณสมหญิง เก่งมาก', label: 'คุณสมหญิง เก่งมาก' },
  { value: 'คุณสมศักดิ์ ขยันยิ่ง', label: 'คุณสมศักดิ์ ขยันยิ่ง' },
];

export const timeOptions = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00'
];

export const generateDateOptions = (daysCount: number, startDate: dayjs.Dayjs) => {
  const dateOptions = [];
  for (let i = 0; i < daysCount; i++) {
    const date = startDate.add(i, 'day');
    dateOptions.push({
      label: date.locale('th').format('dddd'),
      date: date
    });
  }
  return dateOptions;
};