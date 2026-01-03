// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";
// import { IoLocationSharp } from "react-icons/io5";
// import { FiPhone } from "react-icons/fi";
// import { FaToolbox } from "react-icons/fa";
// import { HiWrenchScrewdriver } from "react-icons/hi2";
// import { MdOutlineDateRange, MdPerson } from "react-icons/md";
// import { LuInfo } from "react-icons/lu";

// const OngoingView = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showRejectModal, setShowRejectModal] = useState(false);

//   // Get lead data from location state
//   const lead = location.state?.lead;

//   useEffect(() => {
//     // Debug logs
//     console.log("Location object:", location);
//     console.log("Lead data received:", lead);
//     console.log("Service Address:", lead?.serviceAddress);
//     console.log("All lead keys:", lead ? Object.keys(lead) : "No lead");
    
//     // Simulate loading
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 100);

//     // Check if lead data exists
//     if (!lead) {
//       setError("No lead data found. Please navigate from the leads list.");
//     }
//   }, [lead, location]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   // Error state - No lead data
//   if (error || !lead) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//           <p className="text-gray-700 mb-4">
//             {error || "No lead data available. Please select a lead from the list."}
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Dynamic badge color
//   const getStatusColor = (status) => {
//     const statusLower = status?.toLowerCase() || "";
//     switch (statusLower) {
//       case "new":
//         return "bg-[#FFCC00] text-white";
//       case "in progress":
//       case "ongoing":
//         return "bg-[#0088FF] text-white";
//       case "completed":
//         return "bg-[#34C759] text-white";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   // Safe rendering helper
//   const renderValue = (value, fallback = "NA") => {
//     return value || fallback;
//   };

//   const handleAccept = () => {
//     navigate("/lead-management/assign-lead", { state: { lead } });
//   };

//   const handleReject = () => {
//     setShowRejectModal(true);
//   };

//   const confirmReject = () => {
//     // Add your reject logic here
//     console.log("Lead rejected:", lead.leadId);
//     setShowRejectModal(false);
//     navigate(-1);
//   };

//   const handleMarkAsDone = () => {
//     // Update lead status to completed
//     const updatedLead = {
//       ...lead,
//       status: "Completed",
//       completedDate: new Date().toLocaleString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       })
//     };
    
//     console.log("Lead marked as completed:", updatedLead);
    
//     // Navigate back or to completed view with updated lead
//     navigate(`/ongoing-leads/view/${lead.leadId}`, { 
//       state: { lead: updatedLead },
//       replace: true 
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col p-6 gap-6">
//       {/* Header - with error boundary */}
//       <ErrorBoundary fallback={<div className="bg-white p-4 rounded-lg">Header Error</div>}>
//         <Header2 />
//       </ErrorBoundary>

//       {/* Lead Info */}
//       <div className="flex flex-col gap-6">
//         {/* Header Section */}
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col gap-1">
//             <h2 className="text-2xl font-semibold">
//               {renderValue(lead.customerName, "Unknown Customer")}
//             </h2>
//             <span className="text-gray-500 text-sm">
//               Lead ID: {renderValue(lead.leadId)}
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             {lead.status?.toLowerCase() === "completed" && (
//               <span className="text-gray-600 text-sm">
//                 {renderValue(lead.completedDate, "28 Oct 2025, 12:14 PM")}
//               </span>
//             )}
//             <span
//               className={`px-4 py-1.5 rounded-md font-medium text-sm ${getStatusColor(
//                 lead.status
//               )}`}
//             >
//               {renderValue(lead.status)}
//             </span>
//           </div>
//         </div>

//         {/* Map + Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Column - Service Address & Map */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center gap-2">
//               <IoLocationSharp className="text-lg text-gray-600" />
//               <p className="font-medium text-sm text-gray-700">Service Address</p>
//             </div>
//             <p className="text-[#7EC1B1] text-sm">
//               {renderValue(lead.serviceAddress)}
//             </p>
//             <div className="w-full rounded-lg overflow-hidden border shadow bg-gray-100 mt-2">
//               <iframe
//                 title="Lead Location"
//                 width="100%"
//                 height="240"
//                 frameBorder="0"
//                 style={{ border: 0 }}
//                 src={`https://maps.google.com/maps?q=${encodeURIComponent(
//                   lead.serviceAddress || lead.address || "India"
//                 )}&z=15&output=embed`}
//                 allowFullScreen
//                 aria-hidden="false"
//                 loading="lazy"
//                 onError={(e) => {
//                   console.error("Map loading error:", e);
//                   e.target.style.display = 'none';
//                 }}
//               />
//             </div>
//           </div>

//           {/* Right Column - Other Details */}
//           <div className="flex flex-col gap-4">
//             {/* Phone Number */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-lg text-gray-600" />
//                 <p className="font-medium text-sm text-gray-700">Phone No.</p>
//               </div>
//               <p className="text-[#7EC1B1] text-sm">{renderValue(lead.phone)}</p>
//             </div>

//             {/* Service Ordered */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <HiWrenchScrewdriver className="text-lg text-gray-600" />
//                 <p className="font-medium text-sm text-gray-700">
//                   Service Ordered
//                 </p>
//               </div>
//               <p className="text-[#7EC1B1] text-sm">
//                 {renderValue(lead.serviceOrdered)}
//               </p>
//             </div>

//             {/* Service Type */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <FaToolbox className="text-lg text-gray-600" />
//                 <p className="font-medium text-sm text-gray-700">Service Type</p>
//               </div>
//               <p className="text-[#7EC1B1] text-sm">
//                 {renderValue(lead.serviceType)}
//               </p>
//             </div>

//             {/* Service Date & Time */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <MdOutlineDateRange className="text-lg text-gray-600" />
//                 <p className="font-medium text-sm text-gray-700">
//                   Service Date & Time
//                 </p>
//               </div>
//               <p className="text-[#7EC1B1] text-sm">
//                 {renderValue(lead.orderDate)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons - Ongoing Leads */}
//         {lead.status?.toLowerCase() === "ongoing" && (
//           <div className="flex justify-between gap-4 mt-4">
//             <button className="flex-1 bg-white text-gray-700 border border-gray-300 font-medium px-6 py-2.5 rounded-md hover:bg-gray-50 transition flex items-center justify-center gap-2">
//               <span className="text-lg">✏️</span>
//               Add Remarks
//             </button>
//             <button 
//               onClick={handleMarkAsDone}
//               className="flex-1 bg-[#34C759] text-white font-medium px-6 py-2.5 rounded-md hover:bg-[#2db54c] transition flex items-center justify-center gap-2"
//             >
//               <span className="text-lg">✓</span>
//               Mark As Done
//             </button>
//           </div>
//         )}

//         {/* Action Buttons - Completed Leads */}
//         {lead.status?.toLowerCase() === "completed" && (
//           <div className="flex justify-between gap-4 mt-4">
//             <button className="flex-1 bg-white text-gray-700 border border-gray-300 font-medium px-6 py-2.5 rounded-md hover:bg-gray-50 transition flex items-center justify-center gap-2">
//               <span className="text-lg">⬆</span>
//               Upload Signature
//             </button>
//             <button className="flex-1 bg-[#34C759] text-white font-medium px-6 py-2.5 rounded-md hover:bg-[#2db54c] transition flex items-center justify-center gap-2">
//               <span className="text-lg">✏️</span>
//               Update Feedback
//             </button>
//           </div>
//         )}

//         {/* Problem Description */}
//         <div className="bg-white rounded-lg p-4 border border-gray-200">
//           <div className="flex items-center gap-2 mb-2">
//             <LuInfo className="text-lg text-gray-600" />
//             <p className="font-medium text-sm text-gray-700">
//               Problem Description
//             </p>
//           </div>
//           <p className="text-[#7EC1B1] text-sm">
//             {renderValue(lead.problem, "No problem description provided")}
//           </p>
//         </div>

//         {/* Lead Assigned To - Only for Ongoing / Completed */}
//         {(lead.status?.toLowerCase() === "ongoing" ||
//           lead.status?.toLowerCase() === "completed") && (
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <div className="flex items-center gap-2 mb-2">
//               <MdPerson className="text-lg text-gray-600" />
//               <p className="font-medium text-sm text-gray-700">
//                 Lead Assigned To
//               </p>
//             </div>
//             <p className="text-[#7EC1B1] text-sm">
//               {renderValue(lead.assignedTo)}
//             </p>
//           </div>
//         )}

//         {/* Price Details */}
//         <div className="bg-white rounded-lg p-5 border border-gray-200">
//           <p className="font-semibold text-base text-gray-900 mb-4">Price Details</p>
//           <div className="flex flex-col gap-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Price (1 items)</span>
//               <span className="text-gray-900">₹{renderValue(lead.priceDetails?.price, "0")}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Discount</span>
//               <span className="text-green-600">-₹{renderValue(lead.priceDetails?.discount, "0")}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Platform Fee</span>
//               <span className="text-gray-900">₹{renderValue(lead.priceDetails?.platformFee, "0")}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Delivery Charges</span>
//               <span className="text-gray-900">
//                 ₹{renderValue(lead.priceDetails?.deliveryCharges, "0")}
//               </span>
//             </div>

//             {/* Dotted Total Amount */}
//             <div className="border-t border-dashed border-gray-300 mt-2 pt-3 flex justify-between font-semibold text-gray-900">
//               <span>Total Amount</span>
//               <span>₹{renderValue(lead.priceDetails?.totalAmount, "0")}</span>
//             </div>

//             {/* Dynamic Offers & Payment Info */}
//             <div className="border-t border-dashed border-gray-300 py-4">
//               {/* Total Saved */}
//               <div className="text-sm text-[#7EC1B1] mb-3">
//                 Total saved on this order:{" "}
//                 {lead.priceDetails?.totalSaved
//                   ? `₹${lead.priceDetails.totalSaved}`
//                   : "₹0"}
//               </div>

//               {/* Offers */}
//               {lead.priceDetails?.offers?.length > 0 && (
//                 <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-3 mb-3">
//                   {/* % Icon */}
//                   <div className="w-8 h-8 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white flex-shrink-0">
//                     <span className="text-sm font-semibold">%</span>
//                   </div>

//                   {/* Offers List */}
//                   <div className="flex-1">
//                     {lead.priceDetails.offers.map((offer, index) => (
//                       <div key={index} className="mb-2 last:mb-0">
//                         <div className="font-medium text-gray-900 text-sm">
//                           {offer.title || "Offer"}
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {offer.amount ? `₹${offer.amount}` : "NA"}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Payment Mode */}
//               <div className="flex justify-between text-gray-900 font-medium text-sm">
//                 <span>Payment Mode</span>
//                 <span>{renderValue(lead.priceDetails?.paymentMode)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Accept/Reject Buttons - Only for NEW status */}
//         {lead.status?.toLowerCase() === "new" && (
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={handleReject}
//               className="bg-white text-[#7EC1B1] border-2 border-[#7EC1B1] font-semibold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition"
//             >
//               Reject
//             </button>
//             <button
//               onClick={handleAccept}
//               className="bg-[#7EC1B1] text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-[#67b09b] transition"
//             >
//               Accept
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Reject Confirmation Modal */}
//       {showRejectModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h3 className="text-xl font-semibold mb-4">Confirm Rejection</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to reject this lead?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowRejectModal(false)}
//                 className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmReject}
//                 className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by boundary:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         this.props.fallback || (
//           <div className="p-6 bg-red-50 rounded-lg">
//             <h2 className="text-red-600 font-bold">Something went wrong</h2>
//             <pre className="text-sm mt-2">{this.state.error?.toString()}</pre>
//           </div>
//         )
//       );
//     }
//     return this.props.children;
//   }
// }

// export default OngoingView;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { IoLocationSharp } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaToolbox } from "react-icons/fa";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlineDateRange, MdPerson } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import Remark from "../../../assets/simple-line-icons_note.svg"
import Mark from "../../../assets/teenyicons_tick-circle-solid.svg"
const OngoingView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarkText, setRemarkText] = useState("");




  // Get lead data from location state
  const lead = location.state?.lead;
  const handleMarkAsDone = async () => {
    try {
      const token = localStorage.getItem("engineerToken");
      if (!token) {
        alert("⚠️ No token found. Please log in again.");
        return;
      }


      const leadId = lead?._id || lead?.id || lead?.leadId;
      if (!leadId) {
        alert("⚠️ Lead ID not found.");
        console.error("Lead data:", lead);
        return;
      }


      console.log("📤 Updating lead status to completed for ID:", leadId);


      const response = await fetch(
        `https://ro-service-engineer-be.onrender.com/api/engineer/lead/${leadId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "completed",
          }),
        }
      );


      const data = await response.json();
      console.log("✅ Lead Status Update Response:", data);


      if (response.ok && data.success) {
        alert("✅ Lead marked as completed successfully!");


        // Navigate to Completed Leads tab
        navigate("/completed-leads", { replace: true });
      } else {
        console.error("❌ Server responded with an error:", data);
        alert(data.message || "Failed to mark lead as completed.");
      }
    } catch (error) {
      console.error("❌ Error updating lead status:", error);
      alert("Something went wrong while updating status. Please try again.");
    }
  };




  useEffect(() => {
    // Debug logs
    console.log("Location object:", location);
    console.log("Lead data received:", lead);
    console.log("Service Address:", lead?.serviceAddress);
    console.log("All lead keys:", lead ? Object.keys(lead) : "No lead");


    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 100);


    // Check if lead data exists
    if (!lead) {
      setError("No lead data found. Please navigate from the leads list.");
    }
  }, [lead, location]);


  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }


  // Error state - No lead data
  if (error || !lead) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">
            {error || "No lead data available. Please select a lead from the list."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  // Dynamic badge color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    switch (statusLower) {
      case "new":
        return "bg-[#FFCC00] text-white";
      case "in progress":
      case "ongoing":
        return "bg-[#0088FF] text-white";
      case "completed":
        return "bg-[#34C759] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };


  // Safe rendering helper
  const renderValue = (value, fallback = "NA") => {
    return value || fallback;
  };


  const handleAccept = () => {
    navigate("/lead-management/assign-lead", { state: { lead } });
  };


  const handleReject = () => {
    setShowRejectModal(true);
  };


  const confirmReject = () => {
    // Add your reject logic here
    console.log("Lead rejected:", lead.leadId);
    setShowRejectModal(false);
    navigate(-1);
  };






  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-6 gap-6">
      {/* Header - with error boundary */}
      <ErrorBoundary fallback={<div className="bg-white p-4 rounded-lg">Header Error</div>}>
        <Header2 />
      </ErrorBoundary>


      {/* Lead Info */}
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">
              {renderValue(lead.customerName, "Unknown Customer")}
            </h2>
            <span className="text-gray-500 text-sm">
              Lead ID: {renderValue(lead.leadId)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {lead.status?.toLowerCase() === "completed" && (
              <span className="text-gray-600 text-sm">
                {renderValue(lead.completedDate, "28 Oct 2025, 12:14 PM")}
              </span>
            )}
            <span
              className={`px-4 py-1.5 rounded-md font-medium text-sm ${getStatusColor(
                lead.status
              )}`}
            >
              {renderValue(lead.status)}
            </span>
          </div>
        </div>


        {/* Map + Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Service Address & Map */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-lg text-gray-600" />
              <p className="font-medium text-sm text-gray-700">Service Address</p>
            </div>
            <p className="text-[#7EC1B1] text-sm">
              {renderValue(lead.serviceAddress)}
            </p>
            <div className="w-full rounded-lg overflow-hidden border shadow bg-gray-100 mt-2">
              <iframe
                title="Lead Location"
                width="100%"
                height="240"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  lead.serviceAddress || lead.address || "India"
                )}&z=15&output=embed`}
                allowFullScreen
                aria-hidden="false"
                loading="lazy"
                onError={(e) => {
                  console.error("Map loading error:", e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>


          {/* Right Column - Other Details */}
          <div className="flex flex-col gap-4">
            {/* Phone Number */}
            <div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-lg text-gray-600" />
                <p className="font-medium text-sm text-gray-700">Phone No.</p>
              </div>
              <p className="text-[#7EC1B1] text-sm">{renderValue(lead.phone)}</p>
            </div>


            {/* Service Ordered */}
            <div>
              <div className="flex items-center gap-2">
                <HiWrenchScrewdriver className="text-lg text-gray-600" />
                <p className="font-medium text-sm text-gray-700">
                  Service Ordered
                </p>
              </div>
              <p className="text-[#7EC1B1] text-sm">
                {renderValue(lead.serviceOrdered)}
              </p>
            </div>


            {/* Service Type */}
            <div>
              <div className="flex items-center gap-2">
                <FaToolbox className="text-lg text-gray-600" />
                <p className="font-medium text-sm text-gray-700">Service Type</p>
              </div>
              <p className="text-[#7EC1B1] text-sm">
                {renderValue(lead.serviceType)}
              </p>
            </div>


            {/* Service Date & Time */}
            <div>
              <div className="flex items-center gap-2">
                <MdOutlineDateRange className="text-lg text-gray-600" />
                <p className="font-medium text-sm text-gray-700">
                  Service Date & Time
                </p>
              </div>
              <p className="text-[#7EC1B1] text-sm">
                {renderValue(lead.orderDate)}
              </p>
            </div>
          </div>
        </div>


        {/* Action Buttons - Ongoing Leads */}
        {lead.status?.toLowerCase() === "ongoing" && (
          <div className="flex justify-between gap-4 mt-4">
            <button onClick={() => setShowRemarks(true)} className="flex-1  cursor-pointer rounded-full bg-white text-gray-700 border border-gray-300 font-medium px-6 py-2.5  hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <img
                src={Remark}
                alt="Add Remarks Icon"
                className="w-5 h-5 object-contain"
              />
              Add Remarks
            </button>
            <button
              onClick={handleMarkAsDone}
              className="flex-1 cursor-pointer rounded-full bg-[#34C759] text-white font-medium px-6 py-2.5 hover:bg-[#2db54c] transition flex items-center justify-center gap-2"
            >
              <img
                src={Mark}
                alt="Mark Completed Icon"
                className="w-5 h-5 object-contain"
              />
              Mark As Completed
            </button>
          </div>
        )}


        {/* ✅ Add Remarks Popup */}
        {showRemarks && (
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px] shadow-lg relative border border-gray-200">
              <button
                onClick={() => setShowRemarks(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>


              <h2 className="text-2xl font-semibold mb-2">Add Remarks</h2>
              <p className="text-gray-500 mb-4">
                Add notes such as 'Part required', 'Rescheduled', or other
                important information.
              </p>


              {/* Predefined Remark Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Part Required
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Part Required
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Part Required
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Part Required
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Part Required
                </button>
              </div>


              {/* Full Remark Input */}
              <textarea
                placeholder="Full Remark"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
                rows="3"
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
              ></textarea>




              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowRemarks(false)}
                  className="border border-gray-400 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>


                <button
                  onClick={async () => {
                    if (!remarkText.trim()) {
                      alert("Please enter a remark before saving.");
                      return;
                    }


                    try {
                      const token = localStorage.getItem("engineerToken");
                      const response = await fetch(
                        `https://ro-service-engineer-be.onrender.com/api/engineer/lead/${lead._id}/remark`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ remarks: remarkText }),
                        }
                      );


                      if (!response.ok) {
                        const errorData = await response.text();
                        throw new Error(`Server error: ${errorData}`);
                      }


                      const data = await response.json();
                      console.log("✅ Remark saved:", data);


                      alert("Remark added successfully!");
                      setShowRemarks(false);
                      setRemarkText("");
                    } catch (err) {
                      console.error("❌ Error adding remark:", err);
                      alert("Failed to add remark. Please try again.");
                    }
                  }}
                  className="bg-[#7EC1B1] text-white px-5 py-2 rounded-md hover:bg-[#6db09f] transition"
                >
                  Save Remark
                </button>




              </div>
            </div>
          </div>
        )}




        {/* Problem Description */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuInfo className="text-lg text-gray-600" />
            <p className="font-medium text-sm text-gray-700">
              Problem Description
            </p>
          </div>
          <p className="text-[#7EC1B1] text-sm">
            {renderValue(lead.problem, "No problem description provided")}
          </p>
        </div>






        {/* Price Details */}
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <p className="font-semibold text-base text-gray-900 mb-4">Price Details</p>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Price (1 items)</span>
              <span className="text-gray-900">₹{renderValue(lead.priceDetails?.price, "0")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">-₹{renderValue(lead.priceDetails?.discount, "0")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span className="text-gray-900">₹{renderValue(lead.priceDetails?.platformFee, "0")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="text-gray-900">
                ₹{renderValue(lead.priceDetails?.deliveryCharges, "0")}
              </span>
            </div>


            {/* Dotted Total Amount */}
            <div className="border-t border-dashed border-gray-300 mt-2 pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total Amount</span>
              <span>₹{renderValue(lead.priceDetails?.totalAmount, "0")}</span>
            </div>


            {/* Dynamic Offers & Payment Info */}
            <div className="border-t border-dashed border-gray-300 py-4">
              {/* Total Saved */}
              <div className="text-sm text-[#7EC1B1] mb-3">
                Total saved on this order:{" "}
                {lead.priceDetails?.totalSaved
                  ? `₹${lead.priceDetails.totalSaved}`
                  : "₹0"}
              </div>


              {/* Offers */}
              {lead.priceDetails?.offers?.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-3 mb-3">
                  {/* % Icon */}
                  <div className="w-8 h-8 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white flex-shrink-0">
                    <span className="text-sm font-semibold">%</span>
                  </div>


                  {/* Offers List */}
                  <div className="flex-1">
                    {lead.priceDetails.offers.map((offer, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <div className="font-medium text-gray-900 text-sm">
                          {offer.title || "Offer"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {offer.amount ? `₹${offer.amount}` : "NA"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Payment Mode */}
              <div className="flex justify-between text-gray-900 font-medium text-sm">
                <span>Payment Mode</span>
                <span>{renderValue(lead.priceDetails?.paymentMode)}</span>
              </div>
            </div>
          </div>
        </div>


        {/* Accept/Reject Buttons - Only for NEW status */}
        {lead.status?.toLowerCase() === "new" && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleReject}
              className="bg-white text-[#7EC1B1] border-2 border-[#7EC1B1] font-semibold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="bg-[#7EC1B1] text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-[#67b09b] transition"
            >
              Accept
            </button>
          </div>
        )}
      </div>


      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Confirm Rejection</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reject this lead?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }


  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }


  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }


  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 rounded-lg">
            <h2 className="text-red-600 font-bold">Something went wrong</h2>
            <pre className="text-sm mt-2">{this.state.error?.toString()}</pre>
          </div>
        )
      );
    }
    return this.props.children;
  }
}


export default OngoingView;

