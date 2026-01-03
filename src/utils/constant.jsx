import appStore from "../assets/appStore.png";
import playstore from "../assets/googleplay.png";
import x from "../assets/X.png";
import facebook from "../assets/Facebook.png";
import insta from "../assets/Instagram.png";
import linkedin from "../assets/Linkedin.png";
import video1 from "../assets/v1.png";
import video2 from "../assets/v2.png";
import video3 from "../assets/v3.png";
import video4 from "../assets/v4.png";

// React Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { BiSolidFactory } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { PiChartLineUp } from "react-icons/pi";
import { FaCircleCheck } from 'react-icons/fa6';
import { BsCircleHalf } from 'react-icons/bs';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { BiSolidBox } from 'react-icons/bi';
// Custom Icons
import {
  LeadManagementIcon,
  
  ProfileIcon,
} from "../components/CustomIcons/CustomIcons";

import { HiOutlineUserCircle } from "react-icons/hi";
export const footerItems = [
  {
    heading: "Company",
    items: [
      { id: 1, name: "About Us", path: "/about-us" },
      { id: 2, name: "Terms & Conditions", path: "/terms-conditions" },
      { id: 3, name: "Privacy Policy", path: "/privacy-policy" },
      { id: 4, name: "Careers", path: "/careers" },
    ],
  },
  {
    heading: "For Customers",
    items: [{ id: 1, name: "Contact Us", path: "/contact-us" }],
  },
  {
    heading: "For Partners",
    items: [
      {
        id: 1,
        name: "Register as a professional",
        path: "/register-professional",
      },
    ],
  },
  {
    heading: "Social Links",
    socialIcons: [
      { id: 1, icon: x, link: "https://twitter.com" },
      { id: 2, icon: facebook, link: "https://facebook.com" },
      { id: 3, icon: insta, link: "https://instagram.com" },
      { id: 4, icon: linkedin, link: "https://linkedin.com" },
    ],
    appLinks: [
      { id: 1, img: playstore, link: "https://play.google.com/store" },
      { id: 2, img: appStore, link: "https://www.apple.com/app-store/" },
    ],
  },
];

export const recommendedVideoItems = [
  {
    id: 1,
    img: video4,
    title: "How to make payment for your service and purchase?",
  },
  { id: 2, img: video1, title: "Why you need to buy AMC for your RO?" },
  { id: 3, img: video2, title: "How to book service for your RO?" },
  { id: 4, img: video3, title: "How to purchase AMC for your RO?" },
  {
    id: 5,
    img: video4,
    title: "How to make payment for your service and purchase?",
  },
];

export const sidebarItems = [
  {
    groupName: "",
    groupItems: [
      {
        id: 1,
        name: "Dashboard",
        icon: <LuLayoutDashboard />,
        path: "/dashboard",
      },
      {
        id: 2,
        name: "My Leads",
        icon: <LeadManagementIcon />,
        path: "/lead-management",
      },
      {
        id: 3,
        name: "Ongoing Leads",
        path: "/ongoing-leads",
        icon: <BsCircleHalf />,
      },
      {
        id: 4,
        name: "Completed Leads",
        path: "/completed-leads",
        icon: <FaCircleCheck />,
      },
      {
        id: 5,
        name: "Products Information",
        path: "/product",
        icon: (
          <div className="w-6 h-6 hover:text-white">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 7L12 2L2 7V17L12 22L22 17V7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2 7L12 12M12 12V22M12 12L22 7M17 4.5L7 9.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      },
      {
        id: 6,
        name: "Inventory Request",
        icon: <BiSolidBox />,
        path: "/inventory-request",
      },
      {
        id: 7,
        name: "Help & Support",
        icon: < FaRegQuestionCircle />,
        path: "/help-support",
      },
      {
        id: 8,
        name: "Profile",
        icon: <ProfileIcon />,
        path: "/profile",
      },
      {
        id: 9,
        name: "Logout",
        icon: <CiLogout />,
        path: "/",
        isLogout: true,
      },
    ],
  },
];

