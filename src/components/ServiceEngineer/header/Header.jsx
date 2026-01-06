import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuBell, LuMenu } from "react-icons/lu"; // Added LuMenu for toggle
import { IoIosArrowDown } from "react-icons/io";
import user from "../../../assets/user.png";
import { getNotifications } from "../../../services/api";

const Header = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch unread count from API
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await getNotifications({ page: 1, limit: 20 });
        if (response?.success) {
          setNotificationCount(response.unreadCount || 0);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex border-b-2 px-5 border-gray-400 shadow-lg h-[72px] justify-between items-center bg-white sticky top-0 z-30">
      
      {/* 1. LEFT SIDE: Toggle Button */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 text-[#7EC1B1] transition-all cursor-pointer"
        >
          <LuMenu size={28} />
        </button>
      </div>

      {/* 2. RIGHT SIDE: Notifications and Profile */}
      <div className="flex items-center h-full">
        {/* Left Divider */}
        <span className="border-l-2 border-black h-1/2"></span>

        {/* Notification Bell */}
        <div
          className="relative flex items-center justify-center px-4 cursor-pointer h-full"
          onClick={() => navigate("/notifications")}
        >
          <LuBell className="text-3xl" />
          {notificationCount > 0 && (
            <span className="absolute top-2 right-2 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-[1px] font-bold">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Right Divider */}
        <span className="border-l-2 border-black h-1/2"></span>

        {/* User Profile Section */}
        <div className="flex items-center ml-4 h-full relative" ref={dropdownRef}>
          <img
            src={user}
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
            alt="user-icon"
            onClick={() => navigate("/profile")}
          />
          
          <div className="ml-2 hidden sm:block">
            <p className="font-medium text-sm text-[#263138]">Kristin Watson</p>
            <p className="text-xs text-gray-500">Service Engineer</p>
          </div>

          {/* Dropdown Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-[60px] w-40 bg-white border border-gray-300 rounded-md shadow-xl z-50 overflow-hidden">
              <ul className="text-gray-700">
                <li 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-sm font-semibold border-t border-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;