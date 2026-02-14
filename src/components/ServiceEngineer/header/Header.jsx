import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux"; // Add these imports
import { LuBell, LuMenu } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import user from "../../../assets/user.png";
import { getNotifications } from "../../../services/api";
import { fetchDashboardData } from "../../../redux/slices/dashboardSlice";
=======
import { LuBell, LuMenu } from "react-icons/lu"; 
import { IoIosArrowDown } from "react-icons/io";
import user from "../../../assets/user.png";
import { getNotifications } from "../../../services/api";
import Swal from "sweetalert2";

>>>>>>> avinash
const Header = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

<<<<<<< HEAD
  // Get engineer data from Redux store
  const { data: dashboardData } = useSelector((state) => state.dashboard);
  const engineerName = dashboardData?.engineer?.name || "User";

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Handle outside click for dropdown
=======
>>>>>>> avinash
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // 2. Updated Logout Section with SweetAlert2
  const handleLogout = () => {
    setIsOpen(false); 
    
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the Service Engineer Panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7EC1B1", // Matches your theme color
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true // Standard practice for destructive actions
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      }
    });
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
        <span className="text-xl">Service Engineer Panel</span>
      </div>

      {/* 2. CENTER: Service Engineer Panel */}
      <div className="flex-1 flex justify-center items-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#263138] tracking-tight whitespace-nowrap text-center">
          Service Engineer Panel
        </h1>
      </div>

      {/* 3. RIGHT SIDE: Notifications and Profile */}
      <div className="flex items-center h-full">
        <span className="border-l-2 border-black h-1/2"></span>

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

        <span className="border-l-2 border-black h-1/2"></span>

        <div className="flex items-center ml-4 h-full relative" ref={dropdownRef}>
          <img
            src={user}
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
            alt="user-icon"
            onClick={() => navigate("/profile")}
          />
          
          <div className="ml-2 hidden sm:block">
            <p className="font-medium text-sm text-[#263138]">{engineerName}</p>
            <p className="text-xs text-gray-500">Service Engineer</p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-[60px] w-40 bg-white border border-gray-300 rounded-md shadow-xl z-50 overflow-hidden">
              <ul className="text-gray-700">
                <li 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
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
