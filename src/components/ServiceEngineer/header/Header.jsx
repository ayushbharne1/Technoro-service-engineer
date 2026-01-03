

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LuBell } from "react-icons/lu";
// import user from "../../../assets/user.png";
// import { IoIosArrowDown } from 'react-icons/io';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className='flex border-b-2 pr-5 border-gray-400 shadow-lg h-[72px] justify-end items-center'>

//       <div className='flex items-center h-full'>

//         {/* Left Divider */}
//         <span className="border-l-2 border-black h-1/2"></span>

//         {/* Notification Bell */}
//         <div
//           className='relative flex items-center justify-center px-4 cursor-pointer h-full'
//           onClick={() => navigate('/notifications')}
//         >
//           <LuBell className='text-3xl' />
//           <span className='absolute top-1 right-1 text-[10px] bg-red-600 text-white rounded-full px-1 py-[1px]'>
//             2
//           </span>
//         </div>

//         {/* Right Divider */}
//         <span className="border-l-2 border-black h-1/2"></span>

//         {/* User Profile */}
//         <div className='flex items-center ml-4 h-full cursor-pointer'>
//           <img src={user} className='w-10 h-10 rounded-full' alt='user-icon'
//             onClick={() => navigate('/profile')}
//  />

//           <div className='ml-2'>
//             <p className='font-medium text-sm'>Kristin Watson</p>
//             <p className='text-xs'>Designation</p>
//           </div>

//           {/* Dropdown */}
//           <div className="relative inline-block ml-2" ref={dropdownRef}>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="px-3 py-2 rounded-md flex items-center"
//             >
//               {/* <IoIosArrowDown /> */}
//             </button>
// {/* 
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-20">
//                 <ul className="text-gray-700">
//                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )} */}
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuBell } from "react-icons/lu";
import user from "../../../assets/user.png";
import { getNotifications } from "../../../services/api"; // ✅ your API function

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  // ✅ Fetch unread count from API
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await getNotifications({ page: 1, limit: 20 });

        if (response?.success) {
          // ✅ Directly use unreadCount from API
          setNotificationCount(response.unreadCount || 0);
        } else {
          console.error("Failed to fetch notifications:", response);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();

    // Optional: auto-refresh every minute (if new notifications can arrive)
    const interval = setInterval(fetchNotificationCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex border-b-2 pr-5 border-gray-400 shadow-lg h-[72px] justify-end items-center">
      <div className="flex items-center h-full">
        {/* Left Divider */}
        <span className="border-l-2 border-black h-1/2"></span>

        {/* 🔔 Notification Bell */}
        <div
          className="relative flex items-center justify-center px-4 cursor-pointer h-full"
          onClick={() => navigate("/notifications")}
        >
          <LuBell className="text-3xl" />
          {/* ✅ Dynamic unread count */}
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 text-[10px] bg-red-600 text-white rounded-full px-1 py-[1px]">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Right Divider */}
        <span className="border-l-2 border-black h-1/2"></span>

        {/* 👤 User Profile */}
        <div className="flex items-center ml-4 h-full cursor-pointer">
          <img
            src={user}
            className="w-10 h-10 rounded-full"
            alt="user-icon"
            onClick={() => navigate("/profile")}
          />
          <div className="ml-2">
            <p className="font-medium text-sm">Kristin Watson</p>
            <p className="text-xs">Designation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
