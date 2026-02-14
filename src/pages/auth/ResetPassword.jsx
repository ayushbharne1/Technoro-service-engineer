// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { resetPassword } from "../../redux/slices/authSlice";
// // import { ToastContainer, toast } from "react-toastify";
// // import resetImage from "../../assets/amico.png";
// // import "react-toastify/dist/ReactToastify.css";

// // function ResetPassword() {
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
  
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
  
// //   // Get loading state from Redux
// //   const { loading } = useSelector((state) => state.auth);
// //   const phone = localStorage.getItem("resetPhone");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!phone) {
// //       toast.error("Session expired. Please restart the process.");
// //       setTimeout(() => navigate("/forgotPassword"), 2000);
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       toast.error("Passwords do not match");
// //       return;
// //     }

// //     if (password.length < 6) {
// //       toast.error("Password must be at least 6 characters");
// //       return;
// //     }

// //     // Dispatch the Redux action
// //     const resultAction = await dispatch(resetPassword({ 
// //       phone: phone.trim(), 
// //       newPassword: password 
// //     }));

// //     if (resetPassword.fulfilled.match(resultAction)) {
// //       toast.success("Password updated successfully!");
// //       // Navigate to login after a short delay
// //       setTimeout(() => navigate("/"), 2000);
// //     } else {
// //       toast.error(resultAction.payload || "Failed to reset password");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#7EC1B1] p-6 font-[Poppins]">
// //       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
// //       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-xl shadow-lg">

// //         {/* Left Side: Illustration */}
// //         <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#7EC1B1]">
// //           <img
// //             src={resetImage}
// //             alt="Reset Password"
// //             className="w-full max-w-xl h-auto object-contain"
// //           />
// //         </div>

// //         {/* Right Side: Form */}
// //         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
// //           <div className="max-w-md w-full mx-auto">
// //             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6 text-center">
// //               Reset Password
// //             </h1>
// //             <p className="text-gray-600 mb-8 text-center">
// //               Please enter your new password to continue.
// //             </p>

// //             <form className="space-y-6" onSubmit={handleSubmit}>
// //               <div>
// //                 <label className="block mb-2 text-gray-700 font-medium">
// //                   New Password
// //                 </label>
// //                 <input
// //                   type="password"
// //                   placeholder="New Password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block mb-2 text-gray-700 font-medium">
// //                   Confirm Password
// //                 </label>
// //                 <input
// //                   type="password"
// //                   placeholder="Confirm Password"
// //                   value={confirmPassword}
// //                   onChange={(e) => setConfirmPassword(e.target.value)}
// //                   className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
// //                   required
// //                 />
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`w-full py-5 text-white rounded-xl font-semibold transition ${
// //                   loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7EC1B1] hover:bg-[#68a998]"
// //                 }`}
// //               >
// //                 {loading ? "Updating..." : "Done"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ResetPassword;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPassword } from "../../redux/slices/authSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Added icons
// import resetImage from "../../assets/amico.png";
// import "react-toastify/dist/ReactToastify.css";

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // Added state
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Added state
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get loading state from Redux
//   const { loading } = useSelector((state) => state.auth);
//   const phone = localStorage.getItem("resetPhone");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!phone) {
//       toast.error("Session expired. Please restart the process.");
//       setTimeout(() => navigate("/forgotPassword"), 2000);
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     // Dispatch the Redux action
//     const resultAction = await dispatch(resetPassword({ 
//       phone: phone.trim(), 
//       newPassword: password 
//     }));

//     if (resetPassword.fulfilled.match(resultAction)) {
//       toast.success("Password updated successfully!");
//       // Navigate to login after a short delay
//       setTimeout(() => navigate("/"), 2000);
//     } else {
//       toast.error(resultAction.payload || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#7EC1B1] p-6 font-[Poppins]">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-xl shadow-lg">

//         {/* Left Side: Illustration */}
//         <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#7EC1B1]">
//           <img
//             src={resetImage}
//             alt="Reset Password"
//             className="w-full max-w-xl h-auto object-contain"
//           />
//         </div>

//         {/* Right Side: Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6 text-center">
//               Reset Password
//             </h1>
//             <p className="text-gray-600 mb-8 text-center">
//               Please enter your new password to continue.
//             </p>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="New Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-6 py-5 pr-12 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                     required
//                   />
//                   <span
//                     className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <AiOutlineEyeInvisible size={22} />
//                     ) : (
//                       <AiOutlineEye size={22} />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-6 py-5 pr-12 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                     required
//                   />
//                   <span
//                     className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <AiOutlineEyeInvisible size={22} />
//                     ) : (
//                       <AiOutlineEye size={22} />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-5 text-white rounded-xl font-semibold transition ${
//                   loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7EC1B1] hover:bg-[#68a998]"
//                 }`}
//               >
//                 {loading ? "Updating..." : "Done"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import resetImage from "../../assets/amico.png";
import "react-toastify/dist/ReactToastify.css";

// LoadingSpinner Component
const LoadingSpinner = ({ size = 'md', color = 'text-[#7EC1B1]' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-4 border-gray-200 border-t-transparent`} />
  );
};

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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

    const resultAction = await dispatch(resetPassword({ 
      phone: phone.trim(), 
      newPassword: password 
    }));

    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success("Password updated successfully!");
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-5 pr-12 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
                    required
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-6 py-5 pr-12 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
                    required
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 w-full py-5 text-white rounded-xl font-semibold transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7EC1B1] hover:bg-[#68a998]"
                }`}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="text-white" />
                    Updating...
                  </>
                ) : (
                  "Done"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
