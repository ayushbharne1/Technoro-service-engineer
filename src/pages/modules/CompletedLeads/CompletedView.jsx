
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";
// import { IoLocationSharp } from "react-icons/io5"; // Location
// import { FiPhone } from "react-icons/fi"; // Phone
// import { FaToolbox } from "react-icons/fa"; // Service Type
// import { HiWrenchScrewdriver } from "react-icons/hi2"; // Service Ordered
// import { MdOutlineDateRange } from "react-icons/md"; // Date & Time
// import { LuInfo } from "react-icons/lu"; // Problem Description
// import { MdPerson } from "react-icons/md"; // Lead Assigned To
// import Remark from "../../../assets/simple-line-icons_note.svg"
// import Upload from "../../../assets/material-symbols_upload-rounded.svg"

// const CompletedLeadsView = () => {
//   const location = useLocation();
//   const lead = location.state?.lead;
//   const navigate = useNavigate();

//   if (!lead) return <div className="p-6">No lead data available.</div>;

//   const [selectedTab, setSelectedTab] = useState(null);

//   // Dynamic badge color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "new":
//         return "bg-[#FFCC00] text-white";
//       case "ongoing":
//         return "bg-[#0088FF] text-white";
//       case "completed":
//         return "bg-[#34C759] text-white";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col p-6 gap-6">
//       <Header2 />

//       {/* Lead Info */}
//       <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
//         {/* Header Section */}
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col gap-1">
//             <h2 className="text-[32px] font-semibold font-poppins">
//               {lead.customerName}
//             </h2>
//             <span className="text-black font-medium">
//               Lead ID: <span className="text-black ml-1">{lead.leadId}</span>
//             </span>
//           </div>
//           <span
//             className={`px-8 py-3 rounded-full font-semibold text-sm mt-2 ${getStatusColor(
//               lead.status
//             )}`}
//           >
//             {lead.status || "NA"}
//           </span>
//         </div>

//         {/* Service Address below Lead */}
//         <div>
//           <div className="flex items-center gap-2">
//             <IoLocationSharp className="text-xl text-gray-700" />
//             <p className="font-medium text-lg text-black">Service Address:</p>
//           </div>
//           <p className="text-[#7EC1B1] ml-6">{lead.serviceAddress || "NA"}</p>
//         </div>

//         {/* Map + Details */}
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Map */}
//           <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
//             <iframe
//               title="Lead Location"
//               width="100%"
//               height="300"
//               frameBorder="0"
//               style={{ border: 0 }}
//               src={`https://maps.google.com/maps?q=${encodeURIComponent(
//                 lead.serviceAddress || ""
//               )}&z=15&output=embed`}
//               allowFullScreen
//               aria-hidden="false"
//             />
//           </div>

//           {/* Right Details */}
//           <div className="w-full md:w-1/2 flex flex-col gap-4">
//             {/* Phone Number */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-xl text-gray-700" />
//                 <p className="font-medium text-lg text-black">Phone Number:</p>
//               </div>
//               <p className="text-[#7EC1B1] ml-6">{lead.phone || "NA"}</p>
//             </div>

//             {/* Service Ordered */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <HiWrenchScrewdriver className="text-xl text-gray-700" />
//                 <p className="font-medium text-lg text-black">Service Ordered:</p>
//               </div>
//               <p className="text-[#7EC1B1] ml-6">
//                 {lead.serviceOrdered || "NA"}
//               </p>
//             </div>

//             {/* Service Type */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <FaToolbox className="text-xl text-gray-700" />
//                 <p className="font-medium text-lg text-black">Service Type:</p>
//               </div>
//               <p className="text-[#7EC1B1] ml-6">{lead.serviceType || "NA"}</p>
//             </div>

//             {/* Service Date & Time */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <MdOutlineDateRange className="text-xl text-gray-700" />
//                 <p className="font-medium text-lg text-black">
//                   Service Date & Time:
//                 </p>
//               </div>
//               <p className="text-[#7EC1B1] ml-6">{lead.orderDate || "NA"}</p>
//             </div>
//           </div>
//         </div>

//  {/* ✅ Action Buttons - Center aligned under the map */}
//         {(
//           lead.status?.toLowerCase() === "completed") && (
//             <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">

//               {/* Add Remarks */}
//               <button className="border border-[#7EC1B1] text-[#263138] text-base font-medium min-w-[500px] px-10 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#eaf6f2] transition">
//                 {/* 🔹 Replace this src path with your image path */}
//                 <img
//                   src={Upload}
//                   alt="Add Remarks Icon"
//                   className="w-5 h-5 object-contain"
//                 />
//               Upload Signature
//               </button>

//               {/* Mark As Completed */}
//               <button className="bg-[#3A953A] text-white text-base font-medium min-w-[500px] px-10 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2da64c] transition">
//                 {/* 🔹 Replace this src path with your image path */}
//                 <img
//                   src={Remark}
//                   alt="Mark Completed Icon"
//                   className="w-5 h-5 object-contain"
//                 />
//                 Updatate Feedback
//               </button>

//             </div>
//           )}

//         {/* Problem Description */}
//         <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4">
//           <div className="flex items-center gap-2 mb-2">
//             <LuInfo className="text-xl text-gray-700" />
//             <p className="font-medium text-lg text-black">Problem Description:</p>
//           </div>
//           <p className="text-[#7EC1B1] ml-6">
//             {lead.problem || "No problem description provided"}
//           </p>
//         </div>


        


//         {/* Price Details */}
// <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4 flex flex-col gap-2">
//   <p className="font-medium text-lg text-black mb-2">Price Details:</p>
//   <div className="flex justify-between">
//     <span>Price:</span>
//     <span>{lead.priceDetails?.price || "2499"}</span>
//   </div>
//   <div className="flex justify-between ">
//     <span>Discount:</span>
//     <span className="text-[#7EC1B1]">{lead.priceDetails?.discount || "-599"}</span>
//   </div>
//   <div className="flex justify-between">
//     <span>Platform Fee:</span>
//     <span>{lead.priceDetails?.platformFee || "1"}</span>
//   </div>
//   <div className="flex justify-between">
//     <span>Debit Card Off:</span>
//     <span className="text-[#7EC1B1]">{lead.priceDetails?.debitCardOff || "-100"}</span>
//   </div>
//   <div className="flex justify-between">
//     <span>Delivery Charges:</span>
//     <span className="text-[#7EC1B1]">{lead.priceDetails?.deliveryCharges || "0"}</span>
//   </div>

//   {/* Dotted Total Amount */}
//   <div className="border-t border-dotted border-gray-400 mt-2 pt-2 flex justify-between font-semibold">
//     <span>Total Amount:</span>
//     <span>{lead.priceDetails?.totalAmount || "1900"}</span>
//   </div>

//   {/* Price Summary Offer Section */}
//   <div className="border-t border-gray-300 mt-4 pt-3">
//     <p className="text-[#7EC1B1] text-[15px] font-medium mb-3">
//       You total saved on this order ₹{lead.priceDetails?.totalSaved || "700"}
//     </p>

//     {/* Offer Box */}
//     <div className="flex items-start gap-3 bg-[#F6FBF9] border border-[#7EC1B1] rounded-lg p-3 mb-3">
//       <div className="bg-[#7EC1B1] text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center text-[15px]">
//         %
//       </div>
//       <div>
//         <p className="text-[#263138] font-semibold text-[15px]">
//           {lead.priceDetails?.offers?.[0]?.title || "1 Offer Applied On This Order"}
//         </p>
//         <p className="text-[#263138] text-[14px]">
//           {lead.priceDetails?.offers?.[0]?.description ||
//             `${lead.priceDetails?.offers?.[0]?.amount ? "Debit Card Off ₹" + lead.priceDetails.offers[0].amount : "₹100"}`}
//         </p>
//       </div>
//     </div>

//     {/* Payment Mode */}
//     <div className="border-t border-gray-300 pt-3 mt-3 flex  text-[#263138] font-medium">
//       <span>Payment Mode :</span>
//       <span>{lead.priceDetails?.paymentMode || "Debit Card"}</span>
//     </div>

//     {/* Action Buttons */}
//     <div className="flex justify-center gap-4 mt-5">
//       <button className="border border-[#7EC1B1] text-[#7EC1B1] px-12 py-1 rounded-lg hover:bg-[#eaf6f2] transition">
//         Reject
//       </button>
//       <button className="bg-[#7EC1B1] text-white px-12 py-1 rounded-lg hover:bg-[#6aac9d] transition">
//         Accept
//       </button>
//     </div>
//   </div>
// </div>
//       </div>
//     </div>
//   );
// };

// export default CompletedLeadsView;


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { IoLocationSharp } from "react-icons/io5"; // Location
import { FiPhone } from "react-icons/fi"; // Phone
import { FaToolbox } from "react-icons/fa"; // Service Type
import { HiWrenchScrewdriver } from "react-icons/hi2"; // Service Ordered
import { MdOutlineDateRange } from "react-icons/md"; // Date & Time
import { LuInfo } from "react-icons/lu"; // Problem Description
import Remark from "../../../assets/simple-line-icons_note.svg";
import Upload from "../../../assets/material-symbols_upload-rounded.svg";


const CompletedLeadsView = () => {
  const location = useLocation();
  const lead = location.state?.lead;
  const navigate = useNavigate();


  if (!lead) return <div className="p-6">No lead data available.</div>;


  const [selectedTab, setSelectedTab] = useState(null);
  const [uploading, setUploading] = useState(false);


  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a signature file before uploading.");
      return;
    }


    const leadId = lead._id;
    const token = localStorage.getItem("engineerToken");


    try {
      setUploading(true);


      const formData = new FormData();
      formData.append("signature", file);


      const response = await fetch(
        `https://ro-service-engineer-be.onrender.com/api/engineer/lead/${leadId}/upload-signature`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );


      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);


      const data = await response.json();
      if (data.success) {
        alert("✅ Signature uploaded successfully!");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading signature:", error);
      alert("⚠️ Error uploading signature. Check console for details.");
    } finally {
      setUploading(false);
    }
  };


  const handleFeedbackUpload = async () => {
    const feedback = prompt("Please enter your feedback:");
    if (!feedback) {
      alert("⚠️ Feedback is required!");
      return;
    }


    const leadId = lead._id;
    const token = localStorage.getItem("engineerToken");


    if (!token) {
      alert("⚠️ No token found. Please log in again.");
      return;
    }


    try {
      const response = await fetch(
        `https://ro-service-engineer-be.onrender.com/api/engineer/lead/${leadId}/upload-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ feedback }),
        }
      );


      const data = await response.json();


      if (response.ok && data.success) {
        alert("✅ Feedback uploaded successfully!");
      } else {
        alert(`❌ Failed to upload feedback: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading feedback:", error);
      alert("⚠️ Error uploading feedback. Check console for details.");
    }
  };


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-[#FFCC00] text-white";
      case "ongoing":
        return "bg-[#0088FF] text-white";
      case "completed":
        return "bg-[#34C759] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-4 sm:p-6 gap-6">
      <Header2 />


      {/* Lead Info */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-[32px] font-semibold font-poppins">
              {lead.customerName}
            </h2>
            <span className="text-black font-medium">
              Lead ID: <span className="text-black ml-1">{lead.leadId}</span>
            </span>
          </div>
          <span
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm mt-2 ${getStatusColor(
              lead.status
            )}`}
          >
            {lead.status || "NA"}
          </span>
        </div>


        {/* Service Address */}
        <div>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Service Address:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">{lead.serviceAddress || "NA"}</p>
        </div>


        {/* Map + Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
            <iframe
              title="Lead Location"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                lead.serviceAddress || ""
              )}&z=15&output=embed`}
              allowFullScreen
              aria-hidden="false"
            />
          </div>


          {/* Right Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Phone Number:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.phone || "NA"}</p>
            </div>


            <div>
              <div className="flex items-center gap-2">
                <HiWrenchScrewdriver className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Service Ordered:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.serviceOrdered || "NA"}</p>
            </div>


            <div>
              <div className="flex items-center gap-2">
                <FaToolbox className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Service Type:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.serviceType || "NA"}</p>
            </div>


            <div>
              <div className="flex items-center gap-2">
                <MdOutlineDateRange className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Service Date & Time:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.orderDate || "NA"}</p>
            </div>
          </div>
        </div>


       {/* Action Buttons */}
{lead.status?.toLowerCase() === "completed" && (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
    <input
      type="file"
      id="signatureUpload"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleSignatureUpload}
    />


    <button
      onClick={() => document.getElementById("signatureUpload").click()}
      className="border border-[#7EC1B1] text-[#263138] text-base font-medium w-full sm:w-1/2 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#eaf6f2] transition"
    >
      <img src={Upload} alt="Upload Icon" className="w-5 h-5 object-contain" />
      Upload Signature
    </button>


    <button
      onClick={handleFeedbackUpload}
      className="bg-[#3A953A] text-white text-base font-medium w-full sm:w-1/2 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2da64c] transition"
    >
      <img src={Remark} alt="Feedback Icon" className="w-5 h-5 object-contain" />
      Update Feedback
    </button>
  </div>
)}


        {/* Problem Description */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4">
          <div className="flex items-center gap-2 mb-2">
            <LuInfo className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Problem Description:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">{lead.problem || "No problem description provided"}</p>
        </div>


        {/* Price Details */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4 flex flex-col gap-2">
          <p className="font-medium text-lg text-black mb-2">Price Details:</p>
          <div className="flex justify-between">
            <span>Price:</span>
            <span>{lead.priceDetails?.price || "2499"}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-[#7EC1B1]">{lead.priceDetails?.discount || "-599"}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>{lead.priceDetails?.platformFee || "1"}</span>
          </div>
          <div className="flex justify-between">
            <span>Debit Card Off:</span>
            <span className="text-[#7EC1B1]">{lead.priceDetails?.debitCardOff || "-100"}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span className="text-[#7EC1B1]">{lead.priceDetails?.deliveryCharges || "0"}</span>
          </div>
          <div className="border-t border-dotted border-gray-400 mt-2 pt-2 flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span>{lead.priceDetails?.totalAmount || "1900"}</span>
          </div>


          <div className="border-t border-gray-300 mt-4 pt-3">
            <p className="text-[#7EC1B1] text-[15px] font-medium mb-3">
              You total saved on this order ₹{lead.priceDetails?.totalSaved || "700"}
            </p>


            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#F6FBF9] border border-[#7EC1B1] rounded-lg p-3 mb-3">
              <div className="bg-[#7EC1B1] text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center text-[15px]">
                %
              </div>
              <div>
                <p className="text-[#263138] font-semibold text-[15px]">
                  {lead.priceDetails?.offers?.[0]?.title || "1 Offer Applied On This Order"}
                </p>
                <p className="text-[#263138] text-[14px]">
                  {lead.priceDetails?.offers?.[0]?.description ||
                    `${lead.priceDetails?.offers?.[0]?.amount ? "Debit Card Off ₹" + lead.priceDetails.offers[0].amount : "₹100"}`}
                </p>
              </div>
            </div>


            <div className="border-t border-gray-300 pt-3 mt-3 flex flex-col sm:flex-row justify-between text-[#263138] font-medium">
              <span>Payment Mode :</span>
              <span>{lead.priceDetails?.paymentMode || "Debit Card"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CompletedLeadsView;



