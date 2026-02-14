import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slices/leadSlice";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";


const CompletedLeads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 1. Access Redux State
    const { data, loading, error } = useSelector((state) => state.leads);

    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("Completed");
    const [search, setSearch] = useState("");

    // 2. Fetch data if the store is empty
    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    // 3. Filtering logic
    // Filter specifically for completed leads from the global pool
    const completedLeadsData = data.filter(
        (lead) => lead.status === "Completed" || lead.status === "complete"
    );

    const filteredData = completedLeadsData.filter((item) => {
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        const matchesSearch =
            item.leadId?.toLowerCase().includes(search.toLowerCase()) ||
            item.customerName?.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil(filteredData.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const displayedData = filteredData.slice(startIndex, startIndex + entries);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "completed": return "text-green-500";
            case "new": return "text-yellow-500";
            case "ongoing": return "text-blue-500";
            default: return "text-gray-500";
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
    };

if (loading) {
        return (
            <div className="bg-white p-6 h-full rounded-lg flex items-center justify-center">
                <Loader message="Fetching historical records..." />
            </div>
        );
    }    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-white p-6 h-full rounded-lg overflow-y-auto flex flex-col gap-6 font-poppins">
            <Header2 title="Lead Management" />

            <div className="bg-white p-3 sm:p-6 rounded-lg shadow flex flex-col gap-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span>Show</span>
                        <select
                            value={entries}
                            onChange={(e) => {
                                setEntries(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="p-2 border rounded w-[70px] bg-gray-50 outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        >
                            {[10, 20, 50].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <span>Entries</span>
                    </div>

                    <div className="relative w-full sm:w-[300px]">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Lead ID or Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-50 p-2 pl-9 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-2 border rounded bg-gray-50 outline-none"
                        >
                            <option value="Completed">Completed</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                </div>

                {/* Table / Mobile Cards */}
                <div className="overflow-x-auto">
                    {displayedData.length > 0 ? (
                        <table className="w-full border border-gray-200 text-left">
                            <thead className="bg-gray-50 hidden sm:table-header-group">
                                <tr className="border-b border-gray-200 text-gray-700">
                                    <th className="p-3 font-semibold">S.No</th>
                                    <th className="p-3 font-semibold">Lead ID</th>
                                    <th className="p-3 font-semibold">Customer Name</th>
                                    <th className="p-3 font-semibold">Service Type</th>
                                    <th className="p-3 font-semibold">Product Model</th>
                                    <th className="p-3 font-semibold">Order Date</th>
                                    <th className="p-3 font-semibold">Status</th>
                                    <th className="p-3 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="bg-white border-b border-gray-100 sm:table-row block sm:rounded-none rounded-lg sm:p-0 p-4 sm:mb-0 mb-4 shadow-sm sm:shadow-none hover:bg-gray-50 transition"
                                    >
                                        <td className="p-2 before:content-['S.No:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="p-2 before:content-['Lead_ID:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell font-medium">
                                            {item.leadId}
                                        </td>
                                        <td className="p-2 before:content-['Customer:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell">
                                            {item.customerName}
                                        </td>
                                        <td className="p-2 before:content-['Service:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell">
                                            {item.serviceType}
                                        </td>
                                        <td className="p-2 before:content-['Product:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell">
                                            {item.productModel}
                                        </td>
                                        <td className="p-2 before:content-['Date:'] sm:before:content-none before:font-bold before:mr-2 block sm:table-cell">
                                            {item.orderDate}
                                        </td>
                                        <td className={`p-2 font-bold ${getStatusColor(item.status)} before:content-['Status:'] sm:before:content-none before:mr-2 block sm:table-cell`}>
                                            {item.status}
                                        </td>
                                        <td className="p-2 sm:table-cell text-center align-middle">
                                            <div className="flex justify-center items-center">
                                                <GoEye
                                                    className="text-blue-600 w-6 h-6 cursor-pointer hover:scale-110 transition"
                                                    onClick={() => navigate("/completed-leads/completed-leads-details/", { state: { lead: item } })}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-10">No completed leads found</p>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 px-2 text-gray-600">
                <span className="text-sm font-medium">
                    Showing {Math.min(startIndex + 1, filteredData.length)} to {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
                </span>
                <div className="flex gap-1">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-30 border-[#7EC1B1] text-[#7EC1B1]"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 border rounded border-[#7EC1B1] ${currentPage === i + 1 ? "bg-[#7EC1B1] text-white" : "text-[#7EC1B1]"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1 border rounded disabled:opacity-30 border-[#7EC1B1] text-[#7EC1B1]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletedLeads;