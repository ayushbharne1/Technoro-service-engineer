import React from "react";
import logo from "../../../assets/logo.png";
import { LuMapPin } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineBell } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex border-b-2 shadow-xl border-gray-600 md:p-3 justify-between">
      <div className=" ">
        <nav className="flex text-[#263138]  font-semibold items-center space-x-10 md:p-1">
          <NavLink to='/'>
            <img
              className="border-none md:h-[40px] md:w-[150px]  cursor-pointer"
              src={logo}
            />
          </NavLink>
          <NavLink to='/services' className="text-[17px] cursor-pointer hover:text-gray-500">
            Services
          </NavLink>
          <NavLink to={'/products'} className="text-[17px] cursor-pointer hover:text-gray-500">
            Products
          </NavLink>
          <NavLink className="text-[17px] cursor-pointer hover:text-gray-500">
            Service Request
          </NavLink>
        </nav>
      </div>

      <div className="flex space-x-3">
        {/* Location Input */}
        <div className="relative flex items-center w-full max-w-xs">
          <span className="absolute left-3 text-gray-500 text-lg">
            <LuMapPin />
          </span>
          <input
            type="text"
            className="w-full p-3 pl-10 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700"
            placeholder="Location"
          />
        </div>

        {/* Search Input */}
        <div className="relative flex items-center w-full max-w-xs">
          <span className="absolute left-3 text-gray-500 text-lg">
            <CiSearch />
          </span>
          <input
            type="text"
            className="w-full p-3 pl-10 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700"
            placeholder="Search for 'Services'"
          />
        </div>
      </div>

      <div className="flex items-center text-2xl space-x-6">
        <button
          onClick={() => navigate('/notifications')}
          className="cursor-pointer hover:text-gray-500"
        >
          <HiOutlineBell />
        </button>
        <p className="cursor-pointer hover:text-gray-500">
          <LuShoppingCart />
        </p>
        <p className="cursor-pointer hover:text-gray-500">
          <FiUser />
        </p>
      </div>
    </div>
  );
};

export default Header;
