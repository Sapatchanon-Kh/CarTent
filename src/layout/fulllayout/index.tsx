// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // เพิ่ม Routes และ Route
// import "./App.css";

// // นำเข้าคอมโพเนนต์ที่คุณต้องการแสดง
// // สมมติว่าคอมโพเนนต์หลักในโฟลเดอร์ pickup-delivery คือ default export ใน index.tsx
// // Update the import path below to the correct relative path where your pickup-delivery/index.tsx or .tsx file exists.
// // For example, if 'pickup-delivery' is in 'src/pages', use:
// import PickupDeliveryPage from "../../pages/pickup-delivery";
// // If it's somewhere else, adjust the path accordingly.

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="App">
//         {/* คุณสามารถลบ h1 เดิม หรือย้ายไปอยู่ในคอมโพเนนต์ย่อยได้ */}
//         {/* <h1>Welcome to My React App</h1> */}

//         {/* ส่วนที่สำคัญ: การกำหนด Routes */}
//         <Routes>
//           {/* กำหนด Route สำหรับหน้า pickup-delivery */}
//           {/* Path "/" หมายถึงหน้าแรกของเว็บไซต์ */}
//           <Route path="/" element={<PickupDeliveryPage />} />

//           {/* คุณสามารถเพิ่ม Route อื่นๆ ได้ที่นี่ เช่น */}
//           {/* <Route path="/about" element={<h2>About Us</h2>} /> */}
//           {/* <Route path="/contact" element={<h2>Contact Page</h2>} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;