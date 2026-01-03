import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Sidebar from "../components/ServiceEngineer/sidebar/Sidebar";
import Header from "../components/ServiceEngineer/header/Header";
import ResponsiveLayout from "./ResponsiveLayout";
import LoadingPage from "../pages/modules/LoadingPage";
import Notifications from "../pages/modules/Notifications";

// --- AUTH ---
import Login from "../pages/auth/Login";
// import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";

// --- CORE ---
import Dashboard from "../pages/modules/dashboard/Dashboard";
import Profile from "../pages/modules/Profile/Profile";
import EditProfile from "../pages/modules/Profile/EditProfile";

// --- PRODUCT ---
import Product from "../pages/modules/productInfo/Product";
// import AddProduct from "../pages/modules/product/AddProduct";
import ViewProduct from "../pages/modules/productInfo/ViewProduct";

// --- LEAD MANAGEMENT ---
import LeadManagement from "../pages/modules/MyLeads/Lead";
import LeadView from "../pages/modules/MyLeads/ViewLead";

import Messages from "../pages/modules/Help&Support/Message";
import StartNewChat from "../pages/modules/Help&Support/StartNewChat";
import ChatPage from "../pages/modules/Help&Support/ChatPage";

//COMPLETED LEADS
import CompletedLeads from "../pages/modules/CompletedLeads/CompletedLeads";
import CompletedLeadsView from "../pages/modules/CompletedLeads/CompletedView";

import InventoryRequest from "../pages/modules/Inventory-Request/Inventory";

import OngoingLead from "../pages/modules/OngoingLeads/OngoingLeads";
import OngoingView from "../pages/modules/OngoingLeads/OngoingView";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  // Hide sidebar and header on login and signup
  const isAuthPage = ["/", "/signup"].includes(location.pathname);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      {!isAuthPage && (
        <div className="hidden md:flex flex-shrink-0">
          <Sidebar />
        </div>
      )}

      <div className="flex flex-col flex-1 h-screen">
        {/* Header */}
        {!isAuthPage && <Header />}

        {/* Main Content */}
        <main className="flex-1 overflow-auto hide-scrollbar">
          <ResponsiveLayout>
            <Routes>
              {/* AUTH */}
              <Route path="/" element={<Login />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/forgetPassword" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/resetpassword" element={<ResetPassword />} />

              {/* CORE */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/profile/edit-profile" element={<EditProfile />} />

              {/* PRODUCT */}
              <Route path="/product" element={<Product />} />
              {/* <Route path="/product/addproduct" element={<AddProduct />} /> */}
              <Route
                path="/product/product-details/:productId"
                element={<ViewProduct />}
              />

              {/* LEAD MANAGEMENT */}
              <Route path="/lead-management" element={<LeadManagement />} />
              <Route
                path="/lead-management/:leadId"
                element={<LeadView />}
              />
          
              <Route path="/inventory-request" element={<InventoryRequest />} />

              <Route path="/help-support" element={<Messages />} />

              <Route path="/help-support/newchat" element={<StartNewChat />} />

              <Route path="/help-support/newchat/chat" element={<ChatPage />} />

              <Route path="/notifications" element={<Notifications />} />


              <Route path="/completed-leads" element={<CompletedLeads />} />
                    <Route path="/completed-leads/completed-leads-details" element={<CompletedLeadsView/>}/>

                       {/* ONGOING LEAD */}
              <Route path="/ongoing-leads" element={<OngoingLead />} />
              <Route
                path="/ongoing-leads/view/:leadId"
                element={<OngoingView />}
              />

            </Routes>
          </ResponsiveLayout>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
