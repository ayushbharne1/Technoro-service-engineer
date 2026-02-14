import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

// Using lazy loading for better performance in your admin panel
const Login = lazy(() => import("./pages/auth/Login"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("./pages/auth/VerifyOtp"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense catches the "loading" state of the lazy components.
          We use the fullScreen version of your Loader here.
      */}
      <Suspense fallback={<Loader fullScreen message="Initializing Rocare Admin..." />}>
        <div className="hide-scrollbar h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgetPassword" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* User Routes */}
            {/* <Route path="/user/*" element={<UserLayout />} /> */}

            {/* Admin Routes */}
            <Route path="/*" element={<AdminLayout />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;