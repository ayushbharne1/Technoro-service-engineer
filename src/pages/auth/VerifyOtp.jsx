

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value !== "" && index < 3) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, 4);
//     if (/^\d{4}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);
//       inputRefs.current[3].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   const handleVerify = () => {
//     if (isOtpComplete) {
//       // Navigate to reset password page
//       navigate("/resetpassword");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl  overflow-hidden  bg-white">
        
//         {/* Left side - Image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={verificationImage}
//             alt="OTP Verification"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right side - Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
//               Verify OTP
//             </h1>
//             <p className="text-gray-600 mb-12 text-base">
//               Please enter the 4-digit code sent to your email.
//             </p>

//             {/* OTP Inputs */}
//             <div className="flex justify-center gap-4 mb-8" onPaste={handlePaste}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-16 h-16 sm:w-20 sm:h-20 text-center text-3xl font-semibold border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                 />
//               ))}
//             </div>

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
//                 isOtpComplete
//                   ? "bg-[#7EC1B1] hover:bg-[#68a998]"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Verify
//             </button>

//             {/* Resend OTP */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span className="text-[#82a89f] hover:underline cursor-pointer">
//                 Resend OTP
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//         const API_URL = import.meta.env.VITE_API_URL;


//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const phone = localStorage.getItem("resetPhone"); // ✅ From Forgot Password

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);

//     if (/^\d{6}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   // ✅ Verify OTP API
//   const handleVerify = async () => {
//     if (!isOtpComplete || !phone) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/engineer/forgot-pass/verify-otp`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             phone: phone.trim(),
//             otp: otp.join(""),
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log("Verify OTP Response:", data);

//       if (data.success) {
//         navigate("/resetpassword"); 
//       } else {
//         setError(data.error || "Invalid or expired OTP");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white">
        
//         {/* Left - image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={verificationImage}
//             alt="OTP Verification"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right - Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
//               Verify OTP
//             </h1>
//             <p className="text-gray-600 mb-12 text-base">
//               Please enter the 6-digit OTP sent to your phone.
//             </p>

//             {/* ✅ OTP BOXES */}
//             <div
//               className="flex justify-center gap-4 mb-3"
//               onPaste={handlePaste}
//             >
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                 />
//               ))}
//             </div>

//             {/* ✅ API Error */}
//             {error && (
//               <p className="text-red-500 text-sm mb-3 font-medium">
//                 {error}
//               </p>
//             )}

//             {/* ✅ Verify button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete || loading}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
//                 isOtpComplete && !loading
//                   ? "bg-[#7EC1B1] hover:bg-[#68a998] cursor-pointer"
//                   : "bg-[#7EC1B1] "
//               }`}
//             >
//               {loading ? "Verifying..." : "Verify"}
//             </button>

//             {/* ✅ Resend otp */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span className="text-[#82a89f] hover:underline cursor-pointer">
//                 Resend OTP
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(0);

//   const API_URL = import.meta.env.VITE_API_URL;
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   const phone = localStorage.getItem("resetPhone"); 

//   // Auto focus first input
//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(countdown);
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);

//     if (/^\d{6}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   // ✅ Verify OTP API
//   const handleVerify = async () => {
//     if (!isOtpComplete || !phone) return;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/engineer/forgot-pass/verify-otp`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone: phone.trim(), otp: otp.join("") }),
//         }
//       );

//       const data = await response.json();
//       console.log("Verify OTP Response:", data);

//       if (data.success) {
//         navigate("/resetpassword");
//       } else {
//         setError(data.error || "Invalid or expired OTP");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Resend OTP API
//   const handleResendOtp = async () => {
//     if (timer > 0 || resendLoading) return;

//     setResendLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/engineer/resend-otp`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone: phone.trim() }),
//         }
//       );

//       const data = await response.json();
//       console.log("Resend OTP Response:", data);

//       if (response.status === 429) {
//         setError("Too many attempts. Please wait before retrying.");
//         setTimer(60);
//         return;
//       }

//       if (data.success) {
//         setTimer(60);
//       } else {
//         setError(data.error || "Failed to resend OTP");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white">

//         {/* Left side image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={verificationImage}
//             alt="OTP Verification"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right side */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
//               Verify OTP
//             </h1>
//             <p className="text-gray-600 mb-10 text-base">
//               Please enter the 6-digit OTP sent to your phone.
//             </p>

//             {/* OTP Inputs */}
//             <div className="flex justify-center gap-4 mb-3" onPaste={handlePaste}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                 />
//               ))}
//             </div>

//             {/* Error message */}
//             {error && (
//               <p className="text-red-500 text-sm mb-3 font-medium">{error}</p>
//             )}

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete || loading}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all ${
//                 isOtpComplete && !loading
//                   ? "bg-[#7EC1B1] hover:bg-[#68a998]"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {loading ? "Verifying..." : "Verify"}
//             </button>

//             {/* ✅ Resend OTP */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span
//                 onClick={timer === 0 && !resendLoading ? handleResendOtp : null}
//                 className={`font-semibold transition-all ${
//                   timer === 0 && !resendLoading
//                     ? "text-[#82a89f] hover:underline cursor-pointer"
//                     : "text-[#7EC1B1] "
//                 }`}
//               >
//                 {resendLoading
//                   ? "Resending..."
//                   : timer > 0
//                   ? `Resend in ${timer}s`
//                   : "Resend OTP"}
//               </span>
//             </p>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(60);

//   const API_URL = import.meta.env.VITE_API_URL;
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   const phone = localStorage.getItem("resetPhone");

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   // ✅ Timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);
//     if (/^\d{6}$/.test(pasteData)) {
//       setOtp(pasteData.split(""));
//       inputRefs.current[5].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   // ✅ Verify OTP
//   const handleVerify = async () => {
//     if (!isOtpComplete || !phone) return;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/api/engineer/forgot-pass/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: phone.trim(), otp: otp.join("") }),
//       });

//       const data = await response.json();
//       console.log("Verify OTP Response:", data);

//       if (data.success) {
//         navigate("/resetpassword");
//       } else {
//         setError(data.message || "Invalid or expired OTP");
//       }
//     } catch {
//       setError("Server error. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Resend OTP — Fixed & Safe Handling
//   const handleResendOtp = async () => {
//     if (resendLoading) return;

//     setResendLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/api/engineer/resend-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: phone.trim() }),
//       });

//       const data = await response.json();
//       console.log("Resend OTP Response:", data);

//       if (!response.ok) {
//         setError(data.message || "Please wait before trying again");
//         setTimer(60); // ✅ Backend says wait → Restart timer
//       } else if (data.success) {
//         setTimer(60);
//       } else {
//         setError(data.message || "Failed to resend OTP");
//       }
//     } catch {
//       setError("Network error. Try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white">
        
//         {/* Left image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img src={verificationImage} alt="OTP Verification" className="w-full h-full max-w-xl object-contain" />
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">Verify OTP</h1>
//             <p className="text-gray-600 mb-10">Enter the 6-digit code sent to your phone.</p>

//             {/* OTP Input */}
//             <div className="flex justify-center gap-4 mb-3" onPaste={handlePaste}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold border-2
//                              border-gray-300 bg-gray-50 rounded-xl focus:ring-4 focus:ring-[#7EC1B1]"
//                 />
//               ))}
//             </div>

//             {error && <p className="text-red-500 text-sm font-medium mb-3">{error}</p>}

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete || loading}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg
//                 ${isOtpComplete && !loading ? "bg-[#7EC1B1] hover:bg-[#68a998]" : "bg-[#7EC1B1] cursor-not-allowed"}`}
//             >
//               {loading ? "Verifying..." : "Verify"}
//             </button>

//             {/* ✅ Resend OTP UI */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span
//                 onClick={timer === 0 && !resendLoading ? handleResendOtp : null}
//                 className={`font-semibold ${
//                   timer === 0 && !resendLoading
//                     ? "text-[#7EC1B1] hover:underline cursor-pointer"
//                     : "text-[#7EC1B1] cursor-not-allowed"
//                 }`}
//               >
//                 {resendLoading ? "Resending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
//               </span>
//             </p>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(60);

//   const API_URL = import.meta.env.VITE_API_URL;
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   const phone = localStorage.getItem("resetPhone");

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   useEffect(() => {
//     if (timer <= 0) return;
//     const countdown = setInterval(() => setTimer(t => t - 1), 1000);
//     return () => clearInterval(countdown);
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);

//     if (/^\d{6}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   // ✅ Verify OTP API
//   const handleVerify = async () => {
//     if (!isOtpComplete || !phone) return;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/api/engineer/forgot-pass/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: phone.trim(),
//           otp: otp.join(""),
//         }),
//       });

//       const data = await response.json();
//       console.log("Verify OTP Response:", data);

//       if (data.success) {
//         navigate("/resetpassword");
//       } else {
//         setError(data.error || "Invalid or expired OTP");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Resend OTP API — Synced with backend timer
//   const handleResendOtp = async () => {
//     if (timer > 0 || resendLoading) return;

//     setResendLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/api/engineer/resend-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone }),
//       });

//       const data = await response.json();
//       console.log("Resend OTP Response:", data);

//       if (response.status === 429) {
//         setError(data.message || "Too many attempts. Try later.");
//         setTimer(60);
//         return;
//       }

//       if (data.success) {
//         setError("");
//         if (data.otpExpires) {
//           const expiresAt = new Date(data.otpExpires).getTime();
//           const now = Date.now();
//           const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));
//           setTimer(diff);
//         } else {
//           setTimer(60);
//         }
//       } else {
//         setError(data.error || "Failed to resend OTP");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white">

//         {/* Left side image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={verificationImage}
//             alt="OTP Verification"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right side */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
//               Verify OTP
//             </h1>
//             <p className="text-gray-600 mb-10 text-base">
//               Please enter the 6-digit OTP sent to your phone.
//             </p>

//             {/* OTP Inputs */}
//             <div className="flex justify-center gap-4 mb-3" onPaste={handlePaste}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                 />
//               ))}
//             </div>

//             {/* Error */}
//             {error && (
//               <p className="text-red-500 text-sm mb-3 font-medium">{error}</p>
//             )}

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete || loading}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all ${
//                 isOtpComplete && !loading
//                   ? "bg-[#7EC1B1] hover:bg-[#68a998]"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {loading ? "Verifying..." : "Verify"}
//             </button>

//             {/* ✅ Resend OTP */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span
//                 onClick={timer === 0 && !resendLoading ? handleResendOtp : null}
//                 className={`font-semibold transition-all ${
//                   timer === 0 && !resendLoading
//                     ? "text-[#82a89f] hover:underline cursor-pointer"
//                     : "text-[#7EC1B1]"
//                 }`}
//               >
//                 {resendLoading
//                   ? "Resending..."
//                   : timer > 0
//                   ? `Resend in ${timer}s`
//                   : "Resend OTP"}
//               </span>
//             </p>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

















import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verificationImage from "../../assets/Verify-OTP.png";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const API_URL = import.meta.env.VITE_API_URL;
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const phone = localStorage.getItem("resetPhone");

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  // ✅ Restore backend timer from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("otpNextTime");
    if (savedTime) {
      const diff = Math.floor((parseInt(savedTime) - Date.now()) / 1000);
      if (diff > 0) {
        setTimer(diff);
      } else {
        localStorage.removeItem("otpNextTime");
        setTimer(0);
      }
    }
  }, []);

  // ✅ Countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  // ✅ Verify OTP API
  const handleVerify = async () => {
    if (!isOtpComplete || !phone) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/engineer/forgot-pass/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          otp: otp.join(""),
        }),
      });

      const data = await response.json();
      console.log("Verify OTP Response:", data);

      if (data.success) {
        navigate("/resetpassword");
      } else {
        setError(data.error || "Invalid or expired OTP");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP synced with backend time
  const handleResendOtp = async () => {
    if (timer > 0 || resendLoading) return;

    setResendLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/engineer/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log("Resend OTP Response:", data);

      if (!response.ok) {
        setError(data.message || "Too many attempts, try later.");
        return;
      }

      if (data.success) {
        setError("");

        const minutesMatch = data.nextRequestAfter?.match(/(\d+)/);
        const blockSeconds = minutesMatch ? parseInt(minutesMatch[1]) * 60 : 60;

        const unblockTime = Date.now() + blockSeconds * 1000;
        localStorage.setItem("otpNextTime", unblockTime);

        setTimer(blockSeconds);
      }
    } catch {
      setError("Server error. Try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white">

        {/* Left side image */}
        <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
          <img
            src={verificationImage}
            alt="OTP Verification"
            className="w-full h-full max-w-xl object-contain"
          />
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
              Verify OTP
            </h1>
            <p className="text-gray-600 mb-10 text-base">
              Please enter the 6-digit OTP sent to your phone.
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-4 mb-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-3 font-medium">{error}</p>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || loading}
              className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all ${
                isOtpComplete && !loading
                  ? "bg-[#7EC1B1] hover:bg-[#68a998]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            {/* ✅ Resend OTP */}
            <p className="text-gray-500 text-sm mt-6">
              Didn’t receive the code?{" "}
              <span
                onClick={timer === 0 && !resendLoading ? handleResendOtp : null}
                className={`font-semibold transition-all ${
                  timer === 0 && !resendLoading
                    ? "text-[#82a89f] hover:underline cursor-pointer"
                    : "text-[#7EC1B1]"
                }`}
              >
                {resendLoading
                  ? "Resending..."
                  : timer > 0
                  ? `Resend in ${timer}s`
                  : "Resend OTP"}
              </span>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
