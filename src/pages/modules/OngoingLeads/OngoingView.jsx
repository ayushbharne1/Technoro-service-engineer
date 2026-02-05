import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLeadStatus, addLeadRemark } from "../../../redux/slices/leadSlice";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { toast } from "react-toastify";

// Icons & Assets
import { IoLocationSharp } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaToolbox } from "react-icons/fa";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlineDateRange, MdPerson } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import RemarkIcon from "../../../assets/simple-line-icons_note.svg";
import MarkIcon from "../../../assets/teenyicons_tick-circle-solid.svg";

const OngoingView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const lead = location.state?.lead;
  const { loading } = useSelector((state) => state.leads);

  const [showRemarks, setShowRemarks] = useState(false);
  const [remarkText, setRemarkText] = useState("");

  if (!lead) return <div className="p-10 text-center font-poppins">No lead data found.</div>;

  const leadId = lead?._id || lead?.id || lead?.leadId;

  // ✅ Redux: Mark Lead as Done
  const handleMarkAsDone = async () => {
    const resultAction = await dispatch(updateLeadStatus({ leadId, status: "completed" }));
    
    if (updateLeadStatus.fulfilled.match(resultAction)) {
      toast.success("Lead marked as completed!");
      navigate("/completed-leads", { replace: true });
    } else {
      toast.error(resultAction.payload || "Failed to update status");
    }
  };

  // ✅ Redux: Save Remark
  const handleSaveRemark = async () => {
    if (!remarkText.trim()) return toast.warn("Please enter a remark.");

    const resultAction = await dispatch(addLeadRemark({ leadId, remark: remarkText }));
    
    if (addLeadRemark.fulfilled.match(resultAction)) {
      toast.success("Remark added successfully!");
      setShowRemarks(false);
      setRemarkText("");
    } else {
      toast.error(resultAction.payload || "Failed to add remark");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "bg-[#FFCC00] text-white";
      case "ongoing": return "bg-[#0088FF] text-white";
      case "completed": return "bg-[#34C759] text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen rounded-lg flex flex-col p-6 gap-6 font-poppins">
      <Header2 />

      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold">{lead.customerName || "Customer"}</h2>
            <span className="text-gray-500">Lead ID: {leadId}</span>
          </div>
          <span className={`px-6 py-2 rounded-full font-medium text-sm ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>

        {/* Map and Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <IoLocationSharp className="text-[#7EC1B1]" />
              <p className="font-medium">Service Address</p>
            </div>
            <p className="text-gray-600 mb-4">{lead.serviceAddress || "NA"}</p>
            <div className="rounded-lg overflow-hidden border">
              <iframe
                title="map" width="100%" height="250" frameBorder="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(lead.serviceAddress || "India")}&z=15&output=embed`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <DetailItem icon={<FiPhone />} label="Phone No." value={lead.phone} />
            <DetailItem icon={<HiWrenchScrewdriver />} label="Service Ordered" value={lead.serviceOrdered || lead.productModel} />
            <DetailItem icon={<FaToolbox />} label="Service Type" value={lead.serviceType} />
            <DetailItem icon={<MdOutlineDateRange />} label="Service Date & Time" value={lead.orderDate} />
          </div>
        </div>

        {/* Action Buttons */}
        {lead.status?.toLowerCase() === "ongoing" && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => setShowRemarks(true)}
              className="flex-1 bg-white border border-gray-300 py-3 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition"
            >
              <img src={RemarkIcon} className="w-5" alt="" /> Add Remarks
            </button>
            <button
              disabled={loading}
              onClick={handleMarkAsDone}
              className="flex-1 bg-[#34C759] text-white py-3 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-[#2db54c] transition disabled:opacity-50"
            >
              <img src={MarkIcon} className="w-5" alt="" /> {loading ? "Updating..." : "Mark As Completed"}
            </button>
          </div>
        )}

        {/* Description Section */}
        <div className="p-4 border rounded-lg">
           <div className="flex items-center gap-2 mb-2"><LuInfo /> <p className="font-medium">Problem Description</p></div>
           <p className="text-gray-600 text-sm">{lead.problem || "No description provided."}</p>
        </div>
      </div>

      {/* Remarks Modal */}
      {showRemarks && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add Remarks</h2>
            <textarea
              className="w-full border rounded-lg p-3 h-32 focus:ring-2 focus:ring-[#7EC1B1] outline-none"
              placeholder="Type your notes here..."
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowRemarks(false)} className="px-4 py-2 text-gray-500">Cancel</button>
              <button
                disabled={loading}
                onClick={handleSaveRemark}
                className="bg-[#7EC1B1] text-white px-6 py-2 rounded-lg hover:bg-[#6db09f] transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Remark"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple reusable sub-component
const DetailItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">{icon} <p className="font-medium">{label}</p></div>
    <p className="text-[#7EC1B1] font-medium ml-6">{value || "NA"}</p>
  </div>
);

export default OngoingView;