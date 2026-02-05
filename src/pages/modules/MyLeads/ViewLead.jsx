import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { respondToLead, updateLeadStatus } from "../../../redux/slices/leadSlice";
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
import Mark from "../../../assets/teenyicons_tick-circle-solid.svg";
import Upload from "../../../assets/material-symbols_upload-rounded.svg";
import "react-toastify/dist/ReactToastify.css";

const LeadView = () => {
  const location = useLocation();
  const lead = location.state?.lead;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.leads);
  const [showRemarks, setShowRemarks] = useState(false);

  if (!lead) return <div className="p-6 font-poppins">No lead data available.</div>;

  const leadId = lead?._id || lead?.id || lead?.leadId;

  // ✅ Redux Action for Accept/Reject
  const handleResponse = async (responseType) => {
    const resultAction = await dispatch(respondToLead({ leadId, action: responseType }));
    if (respondToLead.fulfilled.match(resultAction)) {
      toast.success(`Lead ${responseType}ed successfully!`);
      setTimeout(() => navigate("/lead-management"), 1500);
    } else {
      toast.error(resultAction.payload || "Operation failed");
    }
  };

  // ✅ Redux Action for Mark as Done
  const handleMarkAsDone = async () => {
    const resultAction = await dispatch(updateLeadStatus({ leadId, status: "completed" }));
    if (updateLeadStatus.fulfilled.match(resultAction)) {
      toast.success("Lead marked as completed!");
      navigate("/completed-leads", { replace: true });
    } else {
      toast.error(resultAction.payload || "Failed to update status");
    }
  };

  // Dynamic badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "bg-[#FFCC00] text-white";
      case "ongoing": return "bg-[#0088FF] text-white";
      case "completed": return "bg-[#34C759] text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen rounded-lg flex flex-col p-4 sm:p-6 gap-6 font-poppins">
      <Header2 />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-col">
            <h2 className="text-[28px] sm:text-[32px] font-semibold">{lead.customerName}</h2>
            <span className="text-black font-medium">Lead ID: <span className="ml-1">{leadId}</span></span>
          </div>
          <span className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm ${getStatusColor(lead.status)}`}>
            {lead.status?.toUpperCase() || "NA"}
          </span>
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Service Address:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6 break-words">{lead.serviceAddress || "NA"}</p>
        </div>

        {/* Map + Details Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Map */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
            <iframe
              title="Lead Location"
              width="100%"
              height="300"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(lead.serviceAddress || "")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
            />
          </div>

          {/* Right: Details */}
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
              <p className="text-[#7EC1B1] ml-6">{lead.serviceOrdered || lead.productModel || "NA"}</p>
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

        {/* ✅ Dynamic Action Buttons based on Status */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 w-full">
          {lead.status?.toLowerCase() === "new" && (
            <div className="flex justify-center gap-4 w-full">
              <button 
                disabled={loading}
                onClick={() => handleResponse("reject")}
                className="border border-[#7EC1B1] text-[#7EC1B1] px-12 py-2 rounded-lg hover:bg-[#eaf6f2] transition w-full md:w-auto disabled:opacity-50"
              >
                Reject
              </button>
              <button 
                disabled={loading}
                onClick={() => handleResponse("accept")}
                className="bg-[#7EC1B1] text-white px-12 py-2 rounded-lg hover:bg-[#6aac9d] transition w-full md:w-auto disabled:opacity-50"
              >
                {loading ? "Processing..." : "Accept"}
              </button>
            </div>
          )}

          {lead.status?.toLowerCase() === "ongoing" && (
            <>
              <button onClick={() => setShowRemarks(true)} className="border border-[#7EC1B1] text-[#263138] text-base font-medium w-full md:w-1/2 px-10 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#eaf6f2] transition">
                <img src={Remark} alt="note" className="w-5 h-5" /> Add Remarks
              </button>
              <button disabled={loading} onClick={handleMarkAsDone} className="bg-[#3A953A] text-white text-base font-medium w-full md:w-1/2 px-10 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2da64c] transition disabled:opacity-50">
                <img src={Mark} alt="tick" className="w-5 h-5" /> {loading ? "Updating..." : "Mark As Completed"}
              </button>
            </>
          )}
        </div>

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
          <div className="flex justify-between"><span>Price:</span><span>₹{lead.priceDetails?.price || "2499"}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Discount:</span><span className="text-[#7EC1B1]">-₹{lead.priceDetails?.discount || "599"}</span></div>
          <div className="flex justify-between"><span>Platform Fee:</span><span>₹{lead.priceDetails?.platformFee || "1"}</span></div>
          <div className="flex justify-between"><span>Total Amount:</span><span className="font-bold text-lg">₹{lead.priceDetails?.totalAmount || "1900"}</span></div>
          
          <div className="border-t border-gray-300 mt-4 pt-3">
             <div className="flex items-start gap-3 bg-[#F6FBF9] border border-[#7EC1B1] rounded-lg p-3">
                <div className="bg-[#7EC1B1] text-white rounded-full w-6 h-6 flex items-center justify-center">%</div>
                <div>
                  <p className="text-[#263138] font-semibold text-sm">Offer Applied: {lead.priceDetails?.paymentMode || "Debit Card"}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadView;