

// import { useState } from "react";
// import LoginImg from "../../assets/loginimg.png";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     let newErrors = {};

//     // Email validation
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Enter a valid email address";
//     }

//     // Password validation
//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log({ email, password, rememberMe });
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
//       <div className="flex flex-col lg:flex-row bg-white  w-full max-w-6xl overflow-hidden">  
//         {/* rounded-2xl shadow-lg */}
        
//         {/* Right Side - Login Image */}
//         <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1] order-2 lg:order-none">
//           <img
//             src={LoginImg}
//             alt="Login Illustration"
//             className="w-full h-auto max-w-md object-contain"
//           />
//         </div>

//         {/* Left Side - Login Form */}
//         <div className="flex-1 px-6 md:px-10 py-10 md:py-20 flex flex-col justify-center items-center order-1 lg:order-none">
//           <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2 text-center">
//             Welcome to Service Engineer Portal
//           </h2>
//           <p className="text-center md:text-left mb-6 text-gray-600">
//             Please enter your registered email and password to continue
//           </p>

//           {/* Input Fields */}
//           <div className="w-full max-w-md space-y-6">
//             {/* Email */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="email" className="text-lg md:text-xl">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 className="h-14 md:h-16 text-black border p-3 rounded-lg w-full"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label htmlFor="password" className="text-lg md:text-xl">
//                   Password
//                 </label>
//                 <Link
//                   to="/forgetPassword"
//                   className="text-sm md:text-base hover:underline text-blue-500"
//                 >
//                   Forget Password?
//                 </Link>
//               </div>
//               <div className="relative w-full">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="h-14 md:h-16 text-gray-600 border px-4 w-full rounded-lg pr-12"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <AiOutlineEyeInvisible size={24} />
//                   ) : (
//                     <AiOutlineEye size={24} />
//                   )}
//                 </span>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>

//             {/* Remember Me */}
//             <div className="flex items-center">
//               <label className="flex items-center space-x-2 text-sm md:text-base">
//                 <input
//                   type="checkbox"
//                   className="accent-violet-600"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                 />
//                 <span>Remember Me</span>
//               </label>
//             </div>

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               className="w-full h-14 md:h-16 bg-[#7EC1B1] text-white rounded-lg mt-4 text-lg md:text-xl"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import { useState } from "react";
// import LoginImg from "../../assets/loginimg.png";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setError("");

//     if (!phone.trim()) return setError("Phone number or Email is required");
//     if (!password.trim()) return setError("Password is required");

//     const payload = { phone, password };
//     const API_URL = import.meta.env.VITE_API_URL;

//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/engineer/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Invalid login credentials");
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       alert("✅ Login Successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       setError("❌ Server Error! Try again later.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
//       <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl overflow-hidden">

//         {/* Right Image */}
//         <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
//           <img src={LoginImg} alt="Login" className="w-full max-w-md" />
//         </div>

//         {/* Left Form */}
//         <div className="flex-1 px-6 md:px-10 py-12 flex flex-col justify-center items-center">
//           <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2 text-center">
//             Welcome to Service Engineer Portal
//           </h2>
//           <p className="text-center text-gray-600 mb-6">
//             Please enter your registered phone/email and password to continue
//           </p>

//           <div className="w-full max-w-md space-y-6">

//             {/* Phone / Email */}
//             <div className="flex flex-col gap-2">
//               <label className="text-lg md:text-xl">Phone / Email</label>
//               <input
//                 type="text"
//                 placeholder="Enter Phone or Email"
//                 className="h-14 md:h-16 border text-black rounded-lg p-3"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-lg md:text-xl">Password</label>
//                 <Link to="/forgetPassword" className="text-blue-600 text-sm md:text-base hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="h-14 md:h-16 border rounded-lg p-3 w-full pr-12"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
//                 </span>
//               </div>
//             </div>

//             {/* Remember Me */}
//             <div className="flex items-center">
//               <label className="flex items-center space-x-2 text-sm md:text-base cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="accent-green-600"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                 />
//                 <span>Remember Me</span>
//               </label>
//             </div>

//             {/* Error */}
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="w-full h-14 md:h-16 bg-[#7EC1B1] text-white rounded-lg mt-4 text-lg md:text-xl disabled:opacity-60"
//             >
//               {loading ? "Please Wait..." : "Sign In"}
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




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

    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const payload = { phone, password };

    try {
      const response = await fetch(`${API_URL}/api/engineer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Invalid Credentials");
        setLoading(false);
        return;
      }

 localStorage.setItem("engineerToken", data.token);
localStorage.setItem("engineerId", data.data._id);

    // console.log("Saved Token:", localStorage.getItem("engineerToken"));
    // console.log("Saved Engineer ID:", localStorage.getItem("engineerId"));


      toast.success(" Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (error) {
      toast.error(" Server Error! Try again later.");
    }
  };

  return (
    <>
<ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={true}
  closeOnClick
  pauseOnHover
  style={{
    fontSize: "18px", 
  }}
  toastClassName={() =>
    "min-w-[400px] min-h-[90px] flex items-center justify-center bg-[#EBF2F1] text-red-500 p-4 rounded-lg text-lg shadow-lg"
  }
/>


      
      <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl overflow-hidden">

          {/* Right Image */}
          <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
            <img src={LoginImg} alt="Login" className="w-full max-w-md" />
          </div>

          {/* Left Form */}
          
          <div className="flex-1 px-6 md:px-10 py-12 flex flex-col justify-center  items-center rounded-lg ">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2 text-center">
              Welcome to Service Engineer Portal
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please enter your registered phone/email and password
            </p>

            <div className="w-full max-w-md space-y-6">

              {/* Phone / Email */}
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-xl">Phone / Email</label>
                <input
                  type="text"
                  placeholder="Enter Phone or Email"
                  className="h-14 md:h-16 border text-black rounded-lg p-3"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-lg md:text-xl">Password</label>
                  <Link to="/forgetPassword" className="text-blue-600 text-sm md:text-base hover:underline">
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