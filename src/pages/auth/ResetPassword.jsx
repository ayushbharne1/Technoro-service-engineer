import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"
import resetImage from "../../assets/amico.png";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // show password and confirm password
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get loading state from Redux
  const { loading } = useSelector((state) => state.auth);
  const phone = localStorage.getItem("resetPhone");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Session expired. Please restart the process.");
      setTimeout(() => navigate("/forgotPassword"), 2000);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Dispatch the Redux action
    const resultAction = await dispatch(resetPassword({ 
      phone: phone.trim(), 
      newPassword: password 
    }));

    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("Password updated successfully!");
      // Navigate to login after a short delay
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error(resultAction.payload || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7EC1B1] p-6 font-[Poppins]">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
      <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-xl shadow-lg">

        {/* Left Side: Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#7EC1B1]">
          <img
            src={resetImage}
            alt="Reset Password"
            className="w-full max-w-xl h-auto object-contain"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6 text-center">
              Reset Password
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Please enter your new password to continue.
            </p>

           <form className="space-y-6" onSubmit={handleSubmit}>
  <div>
    <label className="block mb-2 text-gray-700 font-medium">
      New Password
    </label>
    <div className="relative"> {/* Relative wrapper add kiya */}
      <input
        type={showPassword ? "text" : "password"} // Type change toggle
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition pr-14" // pr-14 padding di icon ke liye
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>

  <div>
    <label className="block mb-2 text-gray-700 font-medium">
      Confirm Password
    </label>
    <div className="relative"> {/* Relative wrapper add kiya */}
      <input
        type={showConfirmPassword ? "text" : "password"} // Type change toggle
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition pr-14"
        required
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-5 text-white rounded-xl font-semibold transition ${
      loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7EC1B1] hover:bg-[#68a998]"
    }`}
  >
    {loading ? "Updating..." : "Done"}
  </button>
</form>


          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;