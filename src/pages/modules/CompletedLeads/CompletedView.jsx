import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadLeadSignature, uploadLeadFeedback } from "../../../redux/slices/leadSlice";
import { toast, ToastContainer } from "react-toastify";
import Header2 from "../../../components/ServiceEngineer/header/Header2";

// Icons
import { IoLocationSharp } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaToolbox } from "react-icons/fa";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { LuInfo } from "react-icons/lu";

// Assets
import Remark from "../../../assets/simple-line-icons_note.svg";
import Upload from "../../../assets/material-symbols_upload-rounded.svg";
import "react-toastify/dist/ReactToastify.css";

const CompletedLeadsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const lead = location.state?.lead;
  const { loading } = useSelector((state) => state.leads);

  if (!lead) return <div className="p-6 font-poppins">No lead data available.</div>;
  const leadId = lead._id || lead.id || lead.leadId;

  // ✅ Redux Action: Upload Signature
  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const resultAction = await dispatch(uploadLeadSignature({ leadId, file }));
    if (uploadLeadSignature.fulfilled.match(resultAction)) {
      toast.success("✅ Signature uploaded successfully!");
    } else {
      toast.error(resultAction.payload || "⚠️ Upload failed");
    }
  };

  // ✅ Redux Action: Upload Feedback
  const handleFeedbackUpload = async () => {
    const feedback = prompt("Please enter your feedback:");
    if (!feedback) return;

    const resultAction = await dispatch(uploadLeadFeedback({ leadId, feedback }));
    if (uploadLeadFeedback.fulfilled.match(resultAction)) {
      toast.success("✅ Feedback updated successfully!");
    } else {
      toast.error(resultAction.payload || "⚠️ Failed to update feedback");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed": return "bg-[#34C759] text-white";
      case "ongoing": return "bg-[#0088FF] text-white";
      case "new": return "bg-[#FFCC00] text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen rounded-lg flex flex-col p-4 sm:p-6 gap-6 font-poppins">
      <Header2 />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* Main Content Card */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-[32px] font-semibold">{lead.customerName}</h2>
            <span className="text-black font-medium">
              Lead ID: <span className="ml-1">{lead.leadId}</span>
            </span>
          </div>
          <span className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm ${getStatusColor(lead.status)}`}>
            {lead.status || "COMPLETED"}
          </span>
        </div>

        {/* Address Row */}
        <div>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Service Address:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">{lead.serviceAddress || "NA"}</p>
        </div>

        {/* Map + Details Row */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
            <iframe
              title="Lead Location" width="100%" height="300" frameBorder="0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(lead.serviceAddress || "India")}&z=15&output=embed`}
              allowFullScreen
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <InfoItem icon={<FiPhone />} label="Phone Number" value={lead.phone} />
            <InfoItem icon={<HiWrenchScrewdriver />} label="Service Ordered" value={lead.serviceOrdered || "NA"} />
            <InfoItem icon={<FaToolbox />} label="Service Type" value={lead.serviceType || "NA"} />
            <InfoItem icon={<MdOutlineDateRange />} label="Service Date & Time" value={lead.orderDate || "NA"} />
          </div>
        </div>

        {/* ✅ Redux-Powered Action Buttons */}
        {lead.status?.toLowerCase() === "completed" && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <input type="file" id="sigInput" accept="image/*" className="hidden" onChange={handleSignatureUpload} />
            
            <button
              disabled={loading}
              onClick={() => document.getElementById("sigInput").click()}
              className="border border-[#7EC1B1] text-[#263138] text-base font-medium w-full sm:w-1/2 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#eaf6f2] transition disabled:opacity-50"
            >
              <img src={Upload} alt="" className="w-5 h-5" />
              {loading ? "Uploading..." : "Upload Signature"}
            </button>

            <button
              disabled={loading}
              onClick={handleFeedbackUpload}
              className="bg-[#3A953A] text-white text-base font-medium w-full sm:w-1/2 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2da64c] transition disabled:opacity-50"
            >
              <img src={Remark} alt="" className="w-5 h-5" />
              Update Feedback
            </button>
          </div>
        )}

        {/* Problem Description */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <LuInfo className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Problem Description:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">{lead.problem || "No description provided"}</p>
        </div>

        {/* Price Details Card */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white flex flex-col gap-2">
          <p className="font-medium text-lg text-black mb-2">Price Details:</p>
          <PriceRow label="Price" value={lead.priceDetails?.price || "2499"} />
          <PriceRow label="Discount" value={lead.priceDetails?.discount || "-599"} isGreen />
          <PriceRow label="Platform Fee" value={lead.priceDetails?.platformFee || "1"} />
          <PriceRow label="Delivery Charges" value={lead.priceDetails?.deliveryCharges || "0"} isGreen />
          
          <div className="border-t border-dotted border-gray-400 mt-2 pt-2 flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{lead.priceDetails?.totalAmount || "1900"}</span>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-3">
            <p className="text-[#7EC1B1] text-[15px] font-medium mb-3">
              Total saved on this order: ₹{lead.priceDetails?.totalSaved || "700"}
            </p>
            <div className="flex items-start gap-3 bg-[#F6FBF9] border border-[#7EC1B1] rounded-lg p-3">
              <div className="bg-[#7EC1B1] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">%</div>
              <div>
                <p className="text-[#263138] font-semibold text-[15px]">Offer Applied</p>
                <p className="text-[#263138] text-sm">Payment Mode: {lead.priceDetails?.paymentMode || "Debit Card"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable UI Helpers
const InfoItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2">
      <span className="text-xl text-gray-700">{icon}</span>
      <p className="font-medium text-lg text-black">{label}:</p>
    </div>
    <p className="text-[#7EC1B1] ml-6">{value || "NA"}</p>
  </div>
);

const PriceRow = ({ label, value, isGreen }) => (
  <div className="flex justify-between">
    <span>{label}:</span>
    <span className={isGreen ? "text-[#7EC1B1]" : ""}>{value}</span>
  </div>
);

export default CompletedLeadsView;