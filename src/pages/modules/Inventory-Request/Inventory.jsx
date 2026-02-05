import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  selectPendingRequests, 
  selectApprovedRequests, 
  selectDeliveredRequests, 
  selectRejectedRequests,
  selectAllRequests, 
  fetchInventoryRequests, 
  createRequest 
} from "../../../redux/slices/inventorySlice";
import {
  FiPlus,
  FiSearch,
  FiCheck,
  FiTruck,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import DashboardIcon from "../../../assets/Dashboard_icon.png";
import NewRequestModal from "./NewRequestModal";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Add this line

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Get categorized data directly from Redux via Memoized Selectors
  const all = useSelector(selectAllRequests);
  const pending = useSelector(selectPendingRequests);
  const approved = useSelector(selectApprovedRequests);
  const delivered = useSelector(selectDeliveredRequests);
  const rejected = useSelector(selectRejectedRequests);
  const { loading } = useSelector((state) => state.inventory);

  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [showNewRequest, setShowNewRequest] = useState(false);

  // 2. Initial fetch
  useEffect(() => {
    dispatch(fetchInventoryRequests({}));
  }, [dispatch]);

  // 3. Tab logic derived from Selectors
  const tabCounts = {
    all: all.length,
    pending: pending.length,
    approved: approved.length,
    issued: delivered.length,
    rejected: rejected.length,
  };

  const tabs = [
    { key: "all", label: "All", count: tabCounts.all },
    { key: "pending", label: "Pending", count: tabCounts.pending },
    { key: "approved", label: "Approved", count: tabCounts.approved },
    { key: "issued", label: "Issued", count: tabCounts.issued },
    { key: "rejected", label: "Rejected", count: tabCounts.rejected },
  ];

  // 4. Get active list and apply search filter
  const getActiveList = () => {
    switch (activeTab) {
      case "pending": return pending;
      case "approved": return approved;
      case "issued": return delivered;
      case "rejected": return rejected;
      default: return all;
    }
  };

  const filteredItems = getActiveList().filter((it) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (it.item?.name || "").toLowerCase().includes(q) ||
      (it.id || it._id || "").toLowerCase().includes(q)
    );
  });

  const handleSubmitNewRequest = async (payload) => {
    const resultAction = await dispatch(createRequest(payload));
    if (createRequest.fulfilled.match(resultAction)) {
      setShowNewRequest(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "issued": case "delivered": return <FiTruck className="text-white" />;
      case "approved": return <FiCheck className="text-white" />;
      default: return <FiClock className="text-[#606060]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "issued": case "delivered": return "bg-[#3A953A]";
      case "approved": return "bg-[#007AFF]";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  if (loading && all.length === 0) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="w-full min-h-screen rounded-lg bg-gray-100 pt-2 font-poppins">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full mx-auto mb-4  rounded-lg border border-gray-100 p-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-2">
          <img src={DashboardIcon} alt="dashboard" className="w-4 h-4" />
          <FiChevronRight className="text-gray-400" />
          <span className="text-sm font-medium text-[#007AFF]">Inventory Request</span>
        </div>

        <div className="mb-3">
          <h1 className="text-[18px] leading-[28px] font-semibold text-[#263138]">Inventory Request</h1>
          <div className="border-t border-gray-200 mt-3" />
        </div>

        {/* Search & Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-full max-w-[720px]">
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 h-12">
              <FiSearch className="text-gray-400 mr-3" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Product by name or Model..."
                className="w-full h-full outline-none text-sm placeholder-gray-400"
              />
            </div>
          </div>
          <div className="ml-4">
            <button onClick={() => setShowNewRequest(true)} className="inline-flex items-center gap-2 bg-[#7EC1B1] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#6fb3a3]">
              <FiPlus /> <span className="font-medium">New Request</span>
            </button>
            <NewRequestModal isOpen={showNewRequest} onClose={() => setShowNewRequest(false)} onSubmit={handleSubmitNewRequest} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`text-sm px-4 py-2 rounded-full transition ${activeTab === t.key ? "bg-white border border-gray-200 shadow-sm" : "bg-gray-100 text-gray-600"}`}
            >
              {t.label} <span className="text-gray-500 ml-1">({t.count})</span>
            </button>
          ))}
        </div>

        {/* List Container */}
        <div className="w-full h-[581px] overflow-y-auto scrollbar-hide space-y-6">
          {filteredItems.map((it, idx) => (
            <div key={it._id || idx} className="w-full bg-[#F5F5F5] rounded-[12px] p-6 flex justify-between items-start" style={{ minHeight: 274 }}>
              
              {/* Left Column */}
              <div style={{ width: 520 }} className="flex flex-col gap-2">
                <div className="text-[24px] leading-[34px] font-semibold text-[#263138]">{it.item?.name || 'Unknown Item'}</div>
                <div className="text-[14px] leading-[20px] font-normal text-[#263138]">Request ID: {it.id || it._id}</div>

                <div className="flex mt-2" style={{ gap: 83 }}>
                  <div style={{ width: 70 }}>
                    <div className="text-[16px] leading-[24px] font-normal text-[#263138]">Quantity</div>
                    <div className="text-[16px] leading-[24px] font-bold text-[#263138]">{it.quantityRequested} unit(s)</div>
                  </div>
                  <div style={{ width: 107 }}>
                    <div className="text-[16px] leading-[24px] font-normal text-[#263138]">Request Date</div>
                    <div className="text-[16px] leading-[24px] font-bold text-[#263138]">{new Date(it.requestDate).toLocaleDateString()}</div>
                  </div>
                  <div style={{ width: 107 }}>
                    <div className="text-[16px] leading-[24px] font-normal text-[#263138]">Vendor</div>
                    <div className="text-[14px] leading-[20px] font-semibold text-[#263138]">{it.vendor?.name || 'N/A'}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[14px] leading-[20px] font-normal text-[#263138]">Reason</div>
                  <div className="text-[14px] leading-[20px] font-semibold text-[#263138] mt-1 line-clamp-2">{it.reason || "No reason provided"}</div>
                </div>

                {it.remarks && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <div className="text-[14px] leading-[20px] font-normal text-[#263138]">Remarks</div>
                    <div className="text-[14px] leading-[20px] font-semibold text-[#606060] mt-1 line-clamp-2">{it.remarks}</div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div style={{ width: 220 }} className="flex flex-col items-end gap-3">
                <div className={`flex items-center justify-center ${getStatusColor(it.status)} rounded-full px-4 py-2 text-white font-semibold`}>
                  {getStatusIcon(it.status)}
                  <span className="text-[14px] leading-[20px] ml-2 capitalize">{it.status || "Pending"}</span>
                </div>

                {it.priority && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${it.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {it.priority.toUpperCase()} Priority
                  </div>
                )}

                {/* Pending Days */}
                {it.status?.toLowerCase() === 'pending' && it.pendingDays !== undefined && (
                  <div className="text-sm text-gray-600">Pending: <span className="font-semibold">{it.pendingDays} days</span></div>
                )}

                {/* Approved Quantity & Date (Restored) */}
                {it.status?.toLowerCase() === 'approved' && (
                  <>
                    {it.quantityApproved > 0 && (
                      <div className="text-sm text-green-600">Approved: <span className="font-semibold">{it.quantityApproved} units</span></div>
                    )}
                    {it.approvedDate && (
                      <div className="text-xs text-gray-500">Approved: {new Date(it.approvedDate).toLocaleDateString()}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;