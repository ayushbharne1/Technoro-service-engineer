import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import LoginImg from "../../assets/loginimg.png";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get loading state from Redux
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!phone.trim()) return toast.error("Phone/Email is required!");
    if (!password.trim()) return toast.error("Password is required!");
    console.log("Login Payload:", { phone, password });
    const resultAction = await dispatch(loginUser({ phone, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
       console.log("Login Error:", resultAction.payload);
      toast.error(resultAction.payload || "Login Failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl overflow-hidden rounded-lg">
          {/* Right Image */}
          <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
            <img src={LoginImg} alt="Login" className="w-full max-w-md" />
          </div>

          {/* Left Form */}
          <div className="flex-1 px-6 md:px-10 py-12 flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2 text-center">
              Welcome to Service Engineer Portal
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please enter your registered phone/email and password
            </p>

            <div className="w-full max-w-md space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-xl">Phone</label>
                <input
                  type="number"
                  placeholder="Enter Phone or Email"
                  className="h-14 md:h-16 border text-black rounded-lg p-3"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-lg md:text-xl">Password</label>
                  <Link to="/forgetPassword" weight="medium" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-14 md:h-16 border rounded-lg p-3 w-full pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={24} />
                    ) : (
                      <AiOutlineEye size={24} />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 text-sm md:text-base cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-green-600"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span>Remember Me</span>
                </label>
              </div>
              <div className="flex items-center">
                <span>Don't have an account?</span> <Link className="text-blue-500 hover:underline hover:text-blue-600 pl-2" to="/register">Register</Link>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-14 md:h-16 bg-[#7EC1B1] text-white rounded-lg mt-4 text-lg md:text-xl disabled:opacity-60"
              >
                {loading ? "Please Wait..." : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;