import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slices/leadSlice";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LeadManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get data from Redux
  const { data, loading, error } = useSelector((state) => state.leads);

  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const filteredData = data.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSearch =
      item.leadId.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const displayedData = filteredData.slice(startIndex, startIndex + entries);

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "text-yellow-500";
      case "Ongoing": return "text-blue-500";
      case "Completed": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Leads...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 h-full flex flex-col gap-6 font-[Poppins]">
      <Header2 title="Lead Management" />

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col gap-6">
        {/* Controls (Search, Filter, Entries) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
              className="p-2 border rounded w-[70px] bg-gray-50"
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>Entries</span>
          </div>

          <div className="relative w-full sm:w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Lead ID or Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 p-2 pl-9 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="p-2 border rounded bg-gray-50 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Desktop View Table */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-center border-b border-gray-200">
                <th className="p-3 font-medium">S.No</th>
                <th className="p-3 font-medium">Lead ID</th>
                <th className="p-3 font-medium">Customer Name</th>
                <th className="p-3 font-medium">Service Type</th>
                <th className="p-3 font-medium">Product Model</th>
                <th className="p-3 font-medium">Order Date</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {displayedData.map((item, index) => (
                <tr key={item.leadId} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3 font-medium">{item.leadId}</td>
                  <td className="p-3">{item.customerName}</td>
                  <td className="p-3">{item.serviceType}</td>
                  <td className="p-3">{item.productModel}</td>
                  <td className="p-3">{item.orderDate}</td>
                  <td className={`p-3 font-semibold ${getStatusColor(item.status)}`}>{item.status}</td>
                  <td className="p-3">
                    <GoEye
                      className="text-blue-600 w-6 h-6 mx-auto cursor-pointer hover:scale-110 transition"
                      onClick={() => navigate(`/lead-management/${item.leadId}`, { state: { lead: item } })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View Cards */}
        <div className="sm:hidden flex flex-col gap-4">
          {displayedData.map((item, index) => (
            <div key={item.leadId} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-700">#{startIndex + index + 1} - {item.leadId}</span>
                <span className={`${getStatusColor(item.status)} font-bold`}>{item.status}</span>
              </div>
              <p className="text-sm text-gray-600"><strong>Customer:</strong> {item.customerName}</p>
              <p className="text-sm text-gray-600"><strong>Service:</strong> {item.serviceType}</p>
              <p className="text-sm text-gray-600"><strong>Date:</strong> {item.orderDate}</p>
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => navigate(`/lead-management/${item.leadId}`, { state: { lead: item } })}
                  className="bg-blue-50 text-blue-600 p-2 rounded-full"
                >
                  <GoEye size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayedData.length === 0 && <p className="text-center text-gray-500 py-10">No leads found.</p>}
      </div>

      {/* Pagination (Simplified logic) */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 px-2">
        <span className="text-sm text-gray-600">
          Showing {Math.min(startIndex + 1, filteredData.length)} to {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-[#7EC1B1] text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;