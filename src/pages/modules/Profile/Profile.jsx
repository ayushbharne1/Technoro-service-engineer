
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import logoImage from "../../../assets/user.png";
// import Icon from "../../../assets/logo.png";
// import { FiMapPin, FiPhone, FiLock } from "react-icons/fi";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [status, setStatus] = useState("Available");

//   const profileData = {
//     name: "Kathryn Murphy",
//     area: "4140 Parker Rd. Allentown, New Mexico 31134",
//     skill: "RO Installation & Uninstallation",
//     phone: "+91 98765 43210",
//     password: "Password@123",
//   };

//   const handleEditProfile = () => {
//     navigate("/profile/edit-profile", { state: profileData });
//   };

//   const handlePasswordChangeSuccess = () => {
//     setIsPasswordModalOpen(false);
//     setIsSuccessModalOpen(true);
//   };

//   const handleLoginAgain = () => {
//     navigate("/");
//   };

//   const getStatusStyle = () => {
//     switch (status) {
//       case "Available":
//         return "bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium";
//       case "Busy":
//         return "bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium";
//       case "On Leave":
//         return "bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium";
//       default:
//         return "bg-white text-[#7EC1B1] px-3 py-1.5 rounded-full text-sm font-medium";
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 w-full mx-auto relative">
//       <Header2 />
//       <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">

//         <div className="flex items-center gap-5">
//           <img
//             src={logoImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
//           />

//           <div>
//             <div className="flex items-center gap-4">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {profileData.name}
//               </h2>

//               {/* Dropdown beside name */}
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className={`border border-[#7EC1B1] outline-none cursor-pointer ${getStatusStyle()}`}
//               >
//                 <option
//                   value="Available"
//                   className="text-white bg-green-500 font-semibold"
//                 >
//                   Available
//                 </option>
//                 <option
//                   value="Busy"
//                   className="text-white bg-blue-500 font-semibold"
//                 >
//                   Busy
//                 </option>
//                 <option
//                   value="On Leave"
//                   className="text-white bg-red-500 font-semibold"
//                 >
//                   On Leave
//                 </option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Edit Profile Button */}
//         <button
//           onClick={handleEditProfile}
//           className="border border-[#7EC1B1] text-[#7EC1B1] text-base px-6 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white transition"
//         >
//           Edit Profile
//         </button>
//       </div>

//       {/* ===== Details Section ===== */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Assigned Area */}
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <FiMapPin className="text-[#7EC1B1] text-lg" />
//             <p className="text-gray-700 font-semibold text-base">Assigned Area</p>
//           </div>
//           <p className="text-[#7EC1B1] mb-3 text-sm">{profileData.area}</p>

//           {/* Dynamic Google Map */}
          // <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm border">
          //   <iframe
          //     title="Assigned Area Map"
          //     width="100%"
          //     height="100%"
          //     style={{ border: 0 }}
          //     loading="lazy"
          //     allowFullScreen
          //     src={`https://www.google.com/maps?q=${encodeURIComponent(
          //       profileData.area
          //     )}&output=embed`}
          //   ></iframe>
          // </div>
//         </div>

//         {/* Skill + Contact Details */}
//         <div>
//         <div className="mb-6">
//   <div className="flex items-center gap-2 mb-1">
    // <svg
    //   width="20"
    //   height="20"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
    //     fill="#7EC1B1"
    //   />
    // </svg>
//     <p className="text-gray-700 font-semibold text-base">Skill</p>
//   </div>
//   <p className="text-[#7EC1B1] text-sm">{profileData.skill}</p>
// </div>


//           <div className="mb-6">
//             <div className="flex items-center gap-2 mb-1">
//               <FiPhone className="text-[#7EC1B1] text-lg" />
//               <p className="text-gray-700 font-semibold text-base">
//                 Phone Number
//               </p>
//             </div>
//             <p className="text-[#7EC1B1] text-sm">{profileData.phone}</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <FiLock className="text-[#7EC1B1] text-lg" />
//               <p className="text-gray-700 font-semibold text-base">Password</p>
//             </div>
//             <p className="text-[#7EC1B1] text-sm">{profileData.password}</p>
//           </div>
//         </div>
//       </div>

//       {/* ===== Change Password Button ===== */}
//       <div className="mt-10 flex justify-center">
//         <button
//           onClick={() => setIsPasswordModalOpen(true)}
//           className="bg-[#7EC1B1] text-white text-base px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
//         >
//           Change Password
//         </button>
//       </div>

//       {/* ===== Change Password Modal ===== */}
//       {isPasswordModalOpen && (
//         <div className="absolute inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 w-11/12 sm:w-[40rem] h-auto border border-gray-300">
//             <h2 className="text-3xl font-bold mb-3 text-center">
//               Change Password
//             </h2>
//             <p className="text-gray-500 text-center mb-6 text-sm">
//               Please enter your new password
//             </p>

//             <div className="flex flex-col gap-4">
//               <input
//                 type="password"
//                 placeholder="Old Password"
//                 className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3 text-base"
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3 text-base"
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3 text-base"
//               />
//             </div>

//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={handlePasswordChangeSuccess}
//                 className="bg-[#7EC1B1] text-white text-base px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
//               >
//                 Change
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== Password Success Modal ===== */}
//       {isSuccessModalOpen && (
//         <div className="absolute inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-[70vw] h-auto sm:h-[70vh] flex flex-col items-center justify-center p-10 border border-gray-300">
//             <img src={Icon} alt="Success" className="w-40 h-28 mb-6" />
//             <h2 className="text-4xl font-bold mb-2">CONGRATS!</h2>
//             <p className="text-gray-600 text-base mb-8">
//               Password change successful
//             </p>
//             <button
//               onClick={handleLoginAgain}
//               className="bg-[#7EC1B1] text-white text-base px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
//             >
//               Login Again
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "../../../assets/user.png";
import Icon from "../../../assets/logo.png";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { FiMapPin, FiPhone, FiLock } from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);


  const [profileData, setProfileData] = useState({
    name: "",
    area: "",
    skill: "",
    phone: "",
  });

  
  const handleEditProfile = () => {
    navigate("/profile/edit-profile", { state: profileData });
  };

  const [profileRaw, setProfileRaw] = useState(null);

  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;
  

  // ✅ Fetch profile data
useEffect(() => {
  const token = localStorage.getItem("engineerToken");

  const storedEngineerId = localStorage.getItem("engineerId");
  


  if (!token || !storedEngineerId) {
    return; 
    
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/engineer/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
      
        navigate("/");
        return;
      }

      const json = await res.json();
      const data = json.data;

      setProfileRaw(data);
      setProfileData({
        name: data.name,
        area: data.assignedArea,
        skill: data.skills?.join(", "),
        phone: data.phone,
      });


    } catch (err) {
      console.error("Profile GET error:", err);
    }
  };

  fetchProfile();
}, []);



  // ✅ Change Password handler
  const handleChangePasswordSubmit = async () => {

      const token = localStorage.getItem("engineerToken"); 
    if (!oldPasswordInput || !newPasswordInput || !confirmPasswordInput) {
      alert("Please fill all fields");
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      alert("New passwords do not match");
      return;
    }

    const payload = {
      phone: profileData.phone || "",
      oldPassword: oldPasswordInput,
      newPassword: newPasswordInput,
    };

    try {
      const res = await fetch(`${API_BASE}/api/engineer/change-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Password update failed");
        return;
      }

      setOldPasswordInput("");
      setNewPasswordInput("");
      setConfirmPasswordInput("");
      setIsPasswordModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleLoginAgain = () => {
    localStorage.removeItem("engineerId");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 w-full mx-auto relative">
      <Header2 />
     
       <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">

  {/* Profile Image + Name */}
  <div className="flex items-center gap-5">
    <img
      src={logoImage}
      alt="Profile"
      className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
    />
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
    </div>
  </div>

  {/* ✅ Edit Profile button aligned to the right */}
  <button
    onClick={() => handleEditProfile(true)}
    className="border border-[#7EC1B1] text-[#7EC1B1] text-base px-6 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white transition"
  >
    Edit Profile
  </button>

</div>

   

      {/* ===== Details Section ===== */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Area */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FiMapPin className="text-[#7EC1B1] text-lg" />
            <p className="text-gray-700 font-semibold text-base">Assigned Area</p>
          </div>
          <p className="text-[#7EC1B1] mb-3 text-sm">{profileData.area}</p>

                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm border">
            <iframe
            key={profileData.area}
              title="Assigned Area Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                profileData.area
              )}&output=embed`}
            ></iframe>
          </div>
        </div>

        {/* Skills + Number + Password */}
        <div>
        <div className="mb-6">
  <p className="text-gray-700 font-semibold text-base flex items-center gap-2">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
        fill="#7EC1B1"
      />
    </svg>
    <span>Skills</span>
  </p>
  <p className="text-[#7EC1B1] text-sm mt-1">{profileData.skill}</p>
</div>


          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <FiPhone className="text-[#7EC1B1] text-lg" />
              <p className="text-gray-700 font-semibold text-base">Phone Number</p>
            </div>
            <p className="text-[#7EC1B1] text-sm">{profileData.phone}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <FiLock className="text-[#7EC1B1] text-lg" />
              <p className="text-gray-700 font-semibold text-base">Password</p>
            </div>
            <p className="text-[#7EC1B1] text-sm">********</p>
          </div>
        </div>
      </div>

      {/* Change Password Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-[#7EC1B1] text-white text-base px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
        >
          Change Password
        </button>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-10 w-11/12 sm:w-[40rem] border border-gray-300">
            <h2 className="text-3xl font-bold mb-3 text-center">Change Password</h2>

            <div className="flex flex-col gap-4 mt-6">
              <input
                type="password"
                placeholder="Old Password"
                className="bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3"
                value={oldPasswordInput}
                onChange={(e) => setOldPasswordInput(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                className="bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-[#F5F5F5] border border-gray-300 rounded-md px-4 py-3"
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleChangePasswordSubmit}
                className="bg-[#7EC1B1] text-white text-base px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-[70vw] flex flex-col items-center justify-center p-10 border border-gray-300">
            <img src={Icon} alt="Success" className="w-40 h-28 mb-6" />
            <h2 className="text-4xl font-bold mb-3">CONGRATS!</h2>
            <p className="text-gray-600 mb-8">Password change successful</p>
            <button
              onClick={handleLoginAgain}
              className="bg-[#7EC1B1] text-white px-10 py-3 rounded-md"
            >
              Login Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
