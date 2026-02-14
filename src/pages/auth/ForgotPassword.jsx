import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../redux/slices/authSlice";
import forgotpasswordImg from "../../assets/Forgot-Password.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get loading state from Redux
  const { loading } = useSelector((state) => state.auth);

  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      return toast.error("Please enter your phone number");
    }

 const resultAction = await dispatch(sendOtp(phone.trim()));

    if (sendOtp.fulfilled.match(resultAction)) {
      // Show OTP sent toast with phone number
      toast.success(`OTP sent successfully to ${phone.trim()}
      Please check Network tab!`, {
        onClose: () => {
          setTimeout(() => navigate("/verify-otp"), 1000);
        }
      });
    } else {
      toast.error(resultAction.payload || "Failed to send OTP");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />
      <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-lg">
          
          <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
            <img
              src={forgotpasswordImg}
              alt="Forgot Password Illustration"
              className="w-full h-full max-w-xl object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
            <div className="max-w-md w-full mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#263138] text-center mb-6">
                Forgot Password?
              </h2>
              <p className="text-gray-600 mb-12 text-center">
                Please enter your registered phone number to continue.
              </p>

              <form className="space-y-6" onSubmit={handleGetOtp}>
                <div className="text-left">
                  <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full px-6 py-5 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`block w-full bg-[#7EC1B1] text-white py-5 rounded-xl text-center font-semibold hover:bg-[#68a998] transition ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Sending..." : "Get OTP"}
                </button>
              </form>

              <div className="text-center text-gray-500 mt-10">
                Remember your password?
                <Link to="/" className="text-blue-500 hover:underline ml-2 font-medium">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../../redux/slices/authSlice";
// import forgotpasswordImg from "../../assets/Forgot-Password.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ForgotPassword = () => {
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get loading state from Redux
//   const { loading } = useSelector((state) => state.auth);

//   const handleGetOtp = async (e) => {
//     e.preventDefault();

//     if (!phone.trim()) {
//       return toast.error("Please enter your phone number");
//     }

//     const resultAction = await dispatch(sendOtp(phone.trim()));

//     if (sendOtp.fulfilled.match(resultAction)) {
//       // Show OTP sent toast with phone number
//       toast.success(`OTP sent successfully to ${phone.trim()}!`, {
//         onClose: () => {
//           setTimeout(() => navigate("/verify-otp"), 1000);
//         }
//       });
//     } else {
//       toast.error(resultAction.payload || "Failed to send OTP");
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />
//       <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//         <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-lg">
         
//           <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//             <img
//               src={forgotpasswordImg}
//               alt="Forgot Password Illustration"
//               className="w-full h-full max-w-xl object-contain"
//             />
//           </div>

//           <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//             <div className="max-w-md w-full mx-auto">
//               <h2 className="text-3xl md:text-4xl font-bold text-[#263138] text-center mb-6">
//                 Forgot Password?
//               </h2>
//               <p className="text-gray-600 mb-12 text-center">
//                 Please enter your registered phone number to continue.
//               </p>

//               <form className="space-y-6" onSubmit={handleGetOtp}>
//                 <div className="text-left">
//                   <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     type="text"
//                     placeholder="Enter phone number"
//                     className="w-full px-6 py-5 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`block w-full bg-[#7EC1B1] text-white py-5 rounded-xl text-center font-semibold hover:bg-[#68a998] transition ${
//                     loading ? "opacity-60 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loading ? "Sending..." : "Get OTP"}
//                 </button>
//               </form>

//               <div className="text-center text-gray-500 mt-10">
//                 Remember your password?
//                 <Link to="/" className="text-blue-500 hover:underline ml-2 font-medium">
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ForgotPassword;
