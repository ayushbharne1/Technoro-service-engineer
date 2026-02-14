import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slices/leadSlice";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import Loader from "../../../components/Loader";

const OngoingLeads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get data from Redux Store
  const { data, loading, error } = useSelector((state) => state.leads);

  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // FIX: Stable dependency array. 
  // We use data?.length to ensure the "size" of the dependency doesn't 
  // confuse React's diffing engine.
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch]); // Only dispatch is strictly needed here if you want to fetch once on mount

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "text-yellow-500";
      case "ongoing": return "text-blue-500";
      case "completed": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  // Filter logic remains the same, but using safe navigation ?.
  const filteredData = (data || []).filter((item) => {
    const isOngoing = item.status?.toLowerCase() === "ongoing";
    const matchesSearch =
      item.leadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    return isOngoing && matchesSearch;
  });

if (loading) {
    return (
      <div className="min-h-screen bg-white rounded-lg p-6 flex items-center justify-center">
        <Loader message="Loading ongoing tasks..." />
      </div>
    );
  }
    if (error) return <p className="text-center text-red-500 py-10 font-poppins">{error}</p>;

  return (
    <div className="min-h-screen bg-white rounded-lg p-6 font-poppins">
      <Header2 title="Ongoing Leads" />

      {/* Controls Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#7EC1B1]"
          >
            {[10, 25, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="text-gray-600">Entries</span>
        </div>

        <div className="relative w-full max-w-[320px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Lead ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 w-full focus:ring-2 focus:ring-[#7EC1B1] outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300 hidden md:table-header-group">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Sr.No.</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Lead ID</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Customer Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Service Type</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.slice(0, entries).map((lead, index) => (
                <tr key={lead.id || lead.leadId || index} className="hover:bg-gray-50 block md:table-row transition-colors">
                  <td className="px-6 py-4 block md:table-cell before:content-['Sr.No.:_'] before:font-bold md:before:content-none">{index + 1}</td>
                  <td className="px-6 py-4 block md:table-cell before:content-['Lead_ID:_'] before:font-bold md:before:content-none font-medium">{lead.leadId}</td>
                  <td className="px-6 py-4 block md:table-cell before:content-['Customer:_'] before:font-bold md:before:content-none">{lead.customerName}</td>
                  <td className="px-6 py-4 block md:table-cell before:content-['Service:_'] before:font-bold md:before:content-none">{lead.serviceType}</td>
                  <td className="px-6 py-4 block md:table-cell before:content-['Date:_'] before:font-bold md:before:content-none">{lead.orderDate}</td>
                  <td className={`px-6 py-4 block md:table-cell before:content-['Status:_'] before:font-bold md:before:content-none font-semibold ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </td>
                  <td className="px-6 py-4 block md:table-cell">
                    <button
                      onClick={() => navigate(`/ongoing-leads/view/${lead.leadId}`, { state: { lead } })}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <GoEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">No ongoing leads found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingLeads;