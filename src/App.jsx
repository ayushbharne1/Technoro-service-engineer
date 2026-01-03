import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
// import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="hide-scrollbar h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />


          {/* User Routes */}
          {/* <Route path="/user/*" element={<UserLayout />} /> */}

          {/* Admin Routes */}

          <Route path="/*" element={<AdminLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
