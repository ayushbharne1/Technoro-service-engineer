import React, { useState, useEffect } from "react";
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
import {
  getInventoryRequests,
  createInventoryRequest,
} from "../../../services/api";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // Store all items for counting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewRequest, setShowNewRequest] = useState(false);

  // Fetch all items once for tab counts
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const result = await getInventoryRequests({});
        const requestsData = result.data || result.requests || result;
        setAllItems(Array.isArray(requestsData) ? requestsData : []);
      } catch (err) {
        console.error("Error fetching all items for counts:", err);
      }
    };

    fetchAllItems();
  }, []); // Only run once on mount

  // Fetch inventory requests based on active tab
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const params = activeTab === "all" ? {} : { status: activeTab };
        const result = await getInventoryRequests(params);

        // API returns data array directly
        const requestsData = result.data || [];
        setItems(Array.isArray(requestsData) ? requestsData : []);

        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching inventory requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab]);

  // Calculate tab counts from all items
  const tabCounts = {
    all: allItems.length,
    pending: allItems.filter((item) => item.status?.toLowerCase() === "pending")
      .length,
    approved: allItems.filter(
      (item) => item.status?.toLowerCase() === "approved"
    ).length,
    issued: allItems.filter((item) => item.status?.toLowerCase() === "issued")
      .length,
    rejected: allItems.filter(
      (item) => item.status?.toLowerCase() === "rejected"
    ).length,
  };

  const tabs = [
    { key: "all", label: "All", count: tabCounts.all },
    { key: "pending", label: "Pending", count: tabCounts.pending },
    { key: "approved", label: "Approved", count: tabCounts.approved },
    { key: "issued", label: "Issued", count: tabCounts.issued },
    { key: "rejected", label: "Rejected", count: tabCounts.rejected },
  ];

  // Filter items by search query
  const filteredItems = items.filter((it) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (it.name || it.itemName || "").toLowerCase().includes(q) ||
      (it.model || "").toLowerCase().includes(q) ||
      (it.requestId || it._id || "").toLowerCase().includes(q)
    );
  });

  const handleOpenNewRequest = () => setShowNewRequest(true);
  const handleCloseNewRequest = () => setShowNewRequest(false);

  const handleSubmitNewRequest = async (payload) => {
    try {
      await createInventoryRequest(payload);

      // Refresh both current tab and all items
      const allResult = await getInventoryRequests({});
      const allData = allResult.data || allResult.requests || allResult;
      setAllItems(Array.isArray(allData) ? allData : []);

      const currentResult = await getInventoryRequests(
        activeTab === "all" ? {} : { status: activeTab }
      );
      const currentData =
        currentResult.data || currentResult.requests || currentResult;
      setItems(Array.isArray(currentData) ? currentData : []);

      alert("Request created successfully!");
    } catch (err) {
      console.error("Error creating request:", err);
      alert("Failed to create request: " + err.message);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "issued":
      case "delivered":
        return <FiTruck className="text-white" />;
      case "approved":
        return <FiCheck className="text-white" />;
      case "pending":
        return <FiClock className="text-[#606060]" />;
      default:
        return <FiClock className="text-[#606060]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "issued":
      case "delivered":
        return "bg-[#3A953A]";
      case "approved":
        return "bg-[#007AFF]";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading inventory requests...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6">
      <div className="w-full mx-auto mb-4 bg-white rounded-lg border border-gray-100 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-2">
          <img src={DashboardIcon} alt="dashboard" className="w-4 h-4" />
          <FiChevronRight className="text-gray-400" />
          <span className="text-sm font-medium text-[#007AFF]">
            Inventory Request
          </span>
        </div>

        <div className="mb-3">
          <h1 className="text-[18px] leading-[28px] font-semibold text-[#263138]">
            Inventory Request
          </h1>
          <div className="border-t border-gray-200 mt-3" />
        </div>

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
            <button
              onClick={handleOpenNewRequest}
              className="inline-flex items-center gap-2 bg-[#7EC1B1] hover:bg-[#6fb3a3] text-white px-4 py-2 rounded-full shadow-md"
            >
              <FiPlus />
              <span className="font-medium">New Request</span>
            </button>
            <NewRequestModal
              isOpen={showNewRequest}
              onClose={handleCloseNewRequest}
              onSubmit={handleSubmitNewRequest}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`text-sm px-4 py-2 rounded-full ${
                activeTab === t.key
                  ? "bg-white border border-gray-200 shadow-sm"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {t.label} <span className="text-gray-500 ml-1">({t.count})</span>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {/* Scrollable list container */}
        <div className="w-full h-[581px] overflow-y-auto scrollbar-hide space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No inventory requests found
            </div>
          ) : (
            filteredItems.map((it, idx) => (
              <div
                key={it._id || idx}
                className="w-full bg-[#F5F5F5] rounded-[12px] p-6 flex justify-between items-start"
                style={{ minHeight: 274 }}
              >
                {/* Left content */}
                <div style={{ width: 520 }} className="flex flex-col gap-2">
                  <div className="text-[24px] leading-[34px] font-semibold text-[#263138]">
                    {it.item?.name || 'Unknown Item'}
                  </div>
                  <div className="text-[14px] leading-[20px] font-normal text-[#263138]">
                    Request ID: {it.id || it._id}
                  </div>

                  <div className="flex mt-2" style={{ gap: 83 }}>
                    <div style={{ width: 70 }}>
                      <div className="text-[16px] leading-[24px] font-normal text-[#263138]">
                        Quantity
                      </div>
                      <div className="text-[16px] leading-[24px] font-bold text-[#263138]">
                        {it.quantityRequested} unit(s)
                      </div>
                    </div>

                    <div style={{ width: 107 }}>
                      <div className="text-[16px] leading-[24px] font-normal text-[#263138]">
                        Request Date
                      </div>
                      <div className="text-[16px] leading-[24px] font-bold text-[#263138] text-center">
                        {new Date(it.requestDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ width: 107 }}>
                      <div className="text-[16px] leading-[24px] font-normal text-[#263138]">
                        Vendor
                      </div>
                      <div className="text-[14px] leading-[20px] font-semibold text-[#263138]">
                        {it.vendor?.name || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-[14px] leading-[20px] font-normal text-[#263138]">
                      Reason
                    </div>
                    <div className="text-[14px] leading-[20px] font-semibold text-[#263138] mt-1 line-clamp-2">
                      {it.reason || "No reason provided"}
                    </div>
                  </div>

                  {it.remarks && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <div className="text-[14px] leading-[20px] font-normal text-[#263138]">
                        Remarks
                      </div>
                      <div className="text-[14px] leading-[20px] font-semibold text-[#606060] mt-1 line-clamp-2">
                        {it.remarks}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right status column */}
                <div style={{ width: 220 }} className="flex flex-col items-end gap-3">
                  <div
                    className={`flex items-center justify-center ${getStatusColor(
                      it.status
                    )} rounded-full px-4 py-2 text-white font-semibold`}
                  >
                    {getStatusIcon(it.status)}
                    <span className="text-[14px] leading-[20px] ml-2 capitalize">
                      {it.status || "Pending"}
                    </span>
                  </div>

                  {/* Priority Badge */}
                  {it.priority && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      it.priority === 'high' ? 'bg-red-100 text-red-600' :
                      it.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {it.priority.toUpperCase()} Priority
                    </div>
                  )}

                  {/* Pending Days */}
                  {it.status === 'pending' && it.pendingDays !== undefined && (
                    <div className="text-sm text-gray-600">
                      Pending: <span className="font-semibold">{it.pendingDays} days</span>
                    </div>
                  )}

                  {/* Approved Quantity */}
                  {it.status === 'approved' && it.quantityApproved > 0 && (
                    <div className="text-sm text-green-600">
                      Approved: <span className="font-semibold">{it.quantityApproved} units</span>
                    </div>
                  )}

                  {/* Approved Date */}
                  {it.approvedDate && (
                    <div className="text-xs text-gray-500">
                      Approved: {new Date(it.approvedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
