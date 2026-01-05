import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slices/leadSlice";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";

const OngoingLeads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 1. Get data from Redux Store
  const { data, loading, error } = useSelector((state) => state.leads);

  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 2. Fetch leads on mount if not already loaded
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "text-yellow-500";
      case "ongoing": return "text-blue-500";
      case "completed": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  // 3. Filter data from Redux state
  // We filter for "Ongoing" leads specifically for this page
  const ongoingLeadsData = data.filter((lead) => 
    lead.status === "Ongoing" || lead.status === "Ongoing"
  );

  const filteredData = ongoingLeadsData.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSearch =
      item.leadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) return <p className="text-center py-10 font-poppins">Loading ongoing leads...</p>;
  if (error) return <p className="text-center text-red-500 py-10 font-poppins">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-poppins">
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

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-300 hidden md:table-header-group">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Sr.No.</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Lead ID</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Customer Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Service Type</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Product Model</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Order Date</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.slice(0, entries).map((lead, index) => (
                  <tr key={lead._id} className="border-t hover:bg-gray-50 block md:table-row mb-4 md:mb-0 rounded-lg shadow-sm md:shadow-none transition-colors">
                    <td className="px-6 py-3 block md:table-cell before:content-['Sr.No.:_'] before:font-bold md:before:content-none">{index + 1}</td>
                    <td className="px-6 py-3 block md:table-cell before:content-['Lead_ID:_'] before:font-bold md:before:content-none font-medium">{lead.leadId}</td>
                    <td className="px-6 py-3 block md:table-cell before:content-['Customer:_'] before:font-bold md:before:content-none">{lead.customerName}</td>
                    <td className="px-6 py-3 block md:table-cell before:content-['Service:_'] before:font-bold md:before:content-none">{lead.serviceType}</td>
                    <td className="px-6 py-3 block md:table-cell before:content-['Product:_'] before:font-bold md:before:content-none">{lead.productModel}</td>
                    <td className="px-6 py-3 block md:table-cell before:content-['Date:_'] before:font-bold md:before:content-none">{lead.orderDate}</td>
                    <td className={`px-6 py-3 block md:table-cell before:content-['Status:_'] before:font-bold md:before:content-none font-semibold ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </td>
                    <td className="px-6 py-3 block md:table-cell">
                      <button
                        onClick={() => navigate(`/ongoing-leads/view/${lead.leadId}`, { state: { lead } })}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <GoEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">No ongoing leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OngoingLeads;