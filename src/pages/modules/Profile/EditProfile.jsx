// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";

// const EditProfile = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: state?.name || "",
//     skill: state?.skill || "",
//     phone: state?.phone.replace("+91 ", "") || "",
//     area: state?.area || "",
//     password: state?.password || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("Updated Data:", formData);
//     navigate("/profile");
//   };

//   return (
    // <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 mt-6 w-full mx-auto">
    // <Header2/>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Select Skill
//           </label>
//           <select
//             name="skill"
//             value={formData.skill}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           >
//             <option>RO Installation & Uninstallation</option>
//             <option>Plumbing Service</option>
//             <option>Electrical Repair</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Phone No.
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Assigned Area
//           </label>
//           <input
//             type="text"
//             name="area"
//             value={formData.area}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Password
//           </label>
//           <input
//             type="text"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>
//       </div>

//       <div className="mt-8 flex justify-center">
//         <button
//           onClick={handleSave}
//           className="bg-[#7EC1B1] text-white px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const EditProfile = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: state?.name || "",
//     skills: state?.skills?.[0] || "", // Single select dropdown
//     phone: state?.phone || "",
//     assignedArea: state?.assignedArea || "",
//     password: "******", 
//   });

//   const API_BASE = import.meta.env.VITE_API_URL;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     const updatedData = {
//       name: formData.name,
//       assignedArea: formData.assignedArea,
//       skills: [formData.skills], 
//       ...(formData.password !== "******" && { password: formData.password }),
//     };

//     try {
//       const engineerId = localStorage.getItem("engineerId");
//       const token = localStorage.getItem("engineerToken");

//       const response = await fetch(
//         `${API_BASE}/api/engineer/${engineerId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (response.ok) {
//         alert("Profile updated successfully!");
//         navigate("/profile", { state: { updated: true } });
//       } else {
//         alert(result.message || "Failed to update profile");
//       }
//     } catch (error) {
//       alert("Something went wrong!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 mt-6 w-full mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* Full Name */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>

//         {/* Skill */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Select Skill
//           </label>
//           <select
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           >
//             <option>RO Installation & Uninstallation</option>
//             <option>Plumbing Service</option>
//             <option>Electrical Repair</option>
//           </select>
//         </div>

//         {/* Phone (readonly) */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Phone No.
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             disabled
//             className="w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-3 text-gray-500 cursor-not-allowed"
//           />
//         </div>

//         {/* Assigned Area */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Assigned Area
//           </label>
//           <input
//             type="text"
//             name="assignedArea"
//             value={formData.assignedArea}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-700"
//           />
//         </div>
//       </div>

//       {/* Save */}
//       <div className="mt-8 flex justify-center">
//         <button
//           onClick={handleSave}
//           className="bg-[#7EC1B1] text-white px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header2 from "../../../components/ServiceEngineer/header/Header2"

const EditProfile = () => {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    phone: "",
    assignedArea: "",
    password: "******",
  });

  // ✅ Fetch Profile on Page Load & Autofill
 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const engineerId = localStorage.getItem("engineerId");
      const token = localStorage.getItem("engineerToken");

      if (!engineerId || !token) {
        console.error("Missing ID or Token");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/engineer/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const result = await res.json();
      const data = result.data;

      setFormData({
        name: data.name || "",
        skills: data.skills?.join(", ") || "",
        phone: data.phone || "",
        assignedArea: data.assignedArea || "",
        password: "******",
      });

      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update API call
  // const handleSave = async () => {
  //   const engineerId = localStorage.getItem("engineerId");
  //   const token = localStorage.getItem("engineerToken");

  //    if (!engineerId || !token) {
  //   alert("Not Logged In - Missing Token or ID");
  //   return;
  // }
    

  //   const updatedData = {
  //     name: formData.name,
  //     phone: formData.phone,
  //     assignedArea: formData.assignedArea,
  //     skills: formData.skills.split(",").map((s) => s.trim()),
  //   };

  //   try {
  //     const response = await fetch(`${API_BASE}/api/engineer/update`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(updatedData),
  //     });

  //     const result = await response.json();
  //     console.log(result);

  //     if (!response.ok) {
  //       alert(result.message || "Failed to update");
  //       return;
  //     }

  //     alert("Profile updated successfully!");
  //     navigate("/profile", { state: { updated: true } });
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong!");
  //   }
  // };


  const handleSave = async () => {
  const token = localStorage.getItem("engineerToken");

  if (!token) {
    alert("Not Logged In - Missing Token");
    return;
  }


  const updatedData = {};

  // ✅ Only send changed fields
  if (formData.name.trim()) updatedData.name = formData.name.trim();
  if (formData.phone.trim()) updatedData.phone = formData.phone.trim();
  if (formData.assignedArea.trim()) updatedData.assignedArea = formData.assignedArea.trim();
  if (formData.skills.trim())
    updatedData.skills = formData.skills.split(",").map((s) => s.trim());

  try {
          const token = localStorage.getItem("engineerToken");

    const response = await fetch(`${API_BASE}/api/engineer/update`, {
      
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    console.log("Update Response:", result);

    if (!response.ok) {
      alert(result.message || "Failed to update");
      return;
    }

    alert("Profile updated successfully!");
    navigate("/profile", { state: { updated: true } });
  } catch (err) {
    console.error("Update Error:", err);
    alert("Something went wrong!");
  }
};


  if (loading) return <p>Loading Profile...</p>;

  return (
     <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 mt-6 w-full mx-auto">
       <div className="mb-8">
    <Header2 />
  </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
         Select Skills 
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3"
          />
        </div>

        {/* Phone Editable */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Phone No.</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3"
          />
        </div>

        {/* Assigned Area */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Assigned Area</label>
          <input
            type="text"
            name="assignedArea"
            value={formData.assignedArea}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3"
          />
        </div>

        {/* Password Not Editable */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            disabled
            className="w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-3 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSave}
          className="bg-[#7EC1B1] text-white px-8 py-3 rounded-md hover:bg-[#66b0a0] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
