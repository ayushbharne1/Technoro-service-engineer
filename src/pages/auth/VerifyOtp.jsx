import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, sendOtp, clearOtpResponse } from "../../redux/slices/authSlice"; 
import verificationImage from "../../assets/Verify-OTP.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux se loading aur otpResponse (jo Forgot Password se aaya hai) nikaalein
  const { loading, otpResponse } = useSelector((state) => state.auth);
  const phone = localStorage.getItem("resetPhone");

  // --- NEW: OTP Toast logic ---
  useEffect(() => {
    // Agar otpResponse mein data hai (jo slice se save hua tha)
    if (otpResponse && otpResponse.otp) {
      toast.success(`Your OTP is: ${otpResponse.otp}`, {
        autoClose: 10000, // 10 second tak dikhayega taaki user note kar sake
        position: "top-right"
      });
      
      // Toast dikhane ke baad state ko clear kar dein taaki page refresh pe dobara na aaye
      if (clearOtpResponse) {
        dispatch(clearOtpResponse());
      }
    }
  }, [otpResponse, dispatch]);
  // ----------------------------

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
    
    const savedTime = localStorage.getItem("otpNextTime");
    if (savedTime) {
      const diff = Math.floor((parseInt(savedTime) - Date.now()) / 1000);
      if (diff > 0) setTimer(diff);
    }
  }, []);

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

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = async () => {
    if (!isOtpComplete || !phone) return;

    const resultAction = await dispatch(verifyOtp({ 
      phone: phone.trim(), 
      otp: otp.join("") 
    }));

    if (verifyOtp.fulfilled.match(resultAction)) {
      toast.success("OTP Verified Successfully!");
      navigate("/resetpassword");
    } else {
      toast.error(resultAction.payload || "Verification Failed");
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || loading) return;
    
    const resultAction = await dispatch(sendOtp(phone));
    if (sendOtp.fulfilled.match(resultAction)) {
      // Resend hone par bhi toast mein OTP dikhayein
      const newOtpVal = resultAction.payload?.otp;
      toast.success(newOtpVal ? `New OTP Sent: ${newOtpVal}` : "OTP Resent!");
      
      setTimer(60);
      localStorage.setItem("otpNextTime", Date.now() + 60000);
    } else {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden bg-white rounded-xl shadow-lg">
        <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
          <img src={verificationImage} alt="OTP Verification" className="w-full h-full max-w-xl object-contain" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">Verify OTP</h1>
            <p className="text-gray-600 mb-10">Enter the 6-digit OTP sent to your phone.</p>

            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 sm:w-14 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || loading}
              className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all ${
                isOtpComplete && !loading ? "bg-[#7EC1B1] hover:bg-[#68a998]" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            <p className="text-gray-500 text-sm mt-6">
              Didn’t receive the code?{" "}
              <span
                onClick={handleResendOtp}
                className={`font-semibold ${timer === 0 && !loading ? "text-[#7EC1B1] cursor-pointer hover:underline" : "text-gray-400 cursor-not-allowed"}`}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}