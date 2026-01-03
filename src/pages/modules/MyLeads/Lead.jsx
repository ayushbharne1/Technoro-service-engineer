// import { useState } from "react";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";
// import { GoEye } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const LeadManagement = () => {
//   const [entries, setEntries] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const data = [
//     { leadId: "L00D1", customerName: "John Doe", serviceType: "Installation", productModel: "X120", orderDate: "2025-10-01", status: "New" },
//     { leadId: "L00D2", customerName: "Jane Smith", serviceType: "Repair", productModel: "A250", orderDate: "2025-10-05", status: "Ongoing" },
//     { leadId: "L00D3", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Completed" },
//     { leadId: "L00D4", customerName: "John Doe", serviceType: "Installation", productModel: "X120", orderDate: "2025-10-01", status: "New" },
//     { leadId: "L00D5", customerName: "Jane Smith", serviceType: "Repair", productModel: "A250", orderDate: "2025-10-05", status: "Ongoing" },
//     { leadId: "L00D6", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Completed" },
//     { leadId: "L00D7", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Completed" },
//     { leadId: "L00D8", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Ongoing" },
//     { leadId: "L00D9", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Completed" },
//     { leadId: "L0010", customerName: "Robert Brown", serviceType: "Maintenance", productModel: "M500", orderDate: "2025-10-10", status: "Completed" },
//   ];

//   const filteredData = data.filter((item) => {
//     const matchesStatus = statusFilter === "All" || item.status === statusFilter;
//     const matchesSearch =
//       item.leadId.toLowerCase().includes(search.toLowerCase()) ||
//       item.customerName.toLowerCase().includes(search.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   const totalPages = Math.ceil(filteredData.length / entries);
//   const startIndex = (currentPage - 1) * entries;
//   const displayedData = filteredData.slice(startIndex, startIndex + entries);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "New": return "text-yellow-500";
//       case "Ongoing": return "text-blue-500";
//       case "Completed": return "text-green-500";
//       default: return "text-gray-500";
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   return (
//     <div className="bg-gray-100 p-4 h-full overflow-y-auto flex flex-col gap-6">
//       <Header2 title="Lead Management" />

//       <div className="bg-white p-3 sm:p-6 rounded-lg shadow flex flex-col gap-6">
        
//         {/* Controls */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
//           <div className="flex items-center gap-2">
//             <span className="font-poppins text-[16px]">Show</span>
//             <select
//               value={entries}
//               onChange={(e) => {
//                 setEntries(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="p-2 border rounded w-[60px] bg-gray-100"
//             >
//               {[10, 20].map((num) => (
//                 <option key={num} value={num}>{num}</option>
//               ))}
//             </select>
//             <span className="font-poppins text-[16px]">Entries</span>
//           </div>

//           <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
//             <div className="relative w-full max-w-[300px]">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-gray-100 p-2 pl-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-2 mt-2 sm:mt-0">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="p-2 border rounded bg-gray-100"
//             >
//               <option value="All">Select Status</option>
//               <option value="New">New</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border border-gray-400 min-w-[0] sm:min-w-[700px]">
//             <thead className="bg-gray-100  hidden sm:table-header-group ">
//               <tr className="text-center border-b border-[#CACACA]">
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">S.No</th>
//                <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Lead ID</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Customer Name</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Service Type</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Product Model</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Order Date</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Status</th>
//                 <th className="p-3 font-poppins font-medium text-[18px]  sm:text-gray-900">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center ">
//               {displayedData.length > 0 ? (
//                 displayedData.map((item, index) => (
//                   <tr
//                     key={item.leadId}
//                     className="bg-white sm:table-row block mb-4 sm:mb-0 border-b border-gray-300 sm:border-b sm:border-[#CACACA] rounded-lg sm:rounded-none shadow-sm sm:shadow-none"
//                   >
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['S.No:'] sm:before:content-none">
//                       {startIndex + index + 1}
//                     </td>
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Lead ID:'] sm:before:content-none">
//                       {item.leadId}
//                     </td>
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Customer:'] sm:before:content-none">
//                       {item.customerName}
//                     </td>
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Service:'] sm:before:content-none">
//                       {item.serviceType}
//                     </td>
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Model:'] sm:before:content-none">
//                       {item.productModel}
//                     </td>
//                     <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Order Date:'] sm:before:content-none">
//                       {item.orderDate}
//                     </td>
//                     <td
//                       className={`p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-left sm:text-center before:content-['Status:'] sm:before:content-none font-medium ${getStatusColor(item.status)}`}
//                     >
//                       {item.status}
//                     </td>
//                    <td className="p-2 sm:p-3 pl-4 sm:pl-0 block sm:table-cell text-center before:content-['Action:'] sm:before:content-none">
//   <div className="flex justify-center items-center">
//     <GoEye
//       className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
//       onClick={() => navigate(`/lead-management/${item.leadId}`, { state: { lead: item } })}
//     />
//   </div>
// </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="p-4 text-gray-500 text-center font-poppins">
//                     No leads found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
//         <span>
//           Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
//           {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
//         </span>
//         <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//             <button
//               key={num}
//               onClick={() => handlePageChange(num)}
//               className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
//                 currentPage === num ? "bg-[#7EC1B1] text-white" : ""
//               }`}
//             >
//               {num}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadManagement;

import { useState, useEffect } from "react";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const LeadManagement = () => {
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchLeads();
  }, []);


  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("engineerToken");
      if (!token) {
        console.error("❌ No token found!");
        return;
      }


      const response = await fetch(
        "https://ro-service-engineer-be.onrender.com/api/engineer/lead",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (!response.ok) throw new Error("Failed to fetch leads");


      const res = await response.json();
      if (Array.isArray(res.data)) {
        const formatted = res.data.map((lead) => ({
          leadId: lead._id || "N/A",
          customerName: lead.customer?.name || "N/A",
          serviceType: lead.serviceType || "N/A",
          productModel: lead.service?.name || "N/A",
          orderDate: new Date(lead.createdAt).toLocaleDateString(),
          status:
            lead.status === "pending"
              ? "New"
              : lead.status === "completed"
              ? "Completed"
              : "Ongoing",
        }));
        setData(formatted);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("❌ Error fetching leads:", err);
    }
  };


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
      case "New":
        return "text-yellow-500";
      case "Ongoing":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };


  return (
    <div className="bg-gray-100 p-4 h-full flex flex-col gap-6">
      <Header2 title="Lead Management" />


      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-2 border rounded w-[60px] bg-gray-100"
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>Entries</span>
          </div>


          <div className="relative w-full sm:w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 p-2 pl-9 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>


          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded bg-gray-100"
          >
            <option value="All">Select Status</option>
            <option value="New">New</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>


        {/* TABLE (desktop view) */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="table-auto w-full border border-gray-400">
            <thead className="bg-gray-100">
              <tr className="text-center border-b border-[#CACACA]">
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
              {displayedData.length > 0 ? (
                displayedData.map((item, index) => (
                  <tr key={item.leadId} className="border-b border-[#CACACA]">
                    <td className="p-3">{startIndex + index + 1}</td>
                    <td className="p-3">{item.leadId}</td>
                    <td className="p-3">{item.customerName}</td>
                    <td className="p-3">{item.serviceType}</td>
                    <td className="p-3">{item.productModel}</td>
                    <td className="p-3">{item.orderDate}</td>
                    <td className={`p-3 font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </td>
                    <td className="p-3">
                      <GoEye
                        className="text-blue-600 w-6 h-6 mx-auto cursor-pointer hover:scale-110 transition"
                        onClick={() =>
                          navigate(`/lead-management/${item.leadId}`, {
                            state: { lead: item },
                          })
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        {/* MOBILE VIEW */}
        <div className="sm:hidden flex flex-col gap-4">
          {displayedData.length > 0 ? (
            displayedData.map((item, index) => (
              <div
                key={item.leadId}
                className="bg-white border border-gray-300 rounded-lg shadow p-3"
              >
                <p><strong>S.No:</strong> {startIndex + index + 1}</p>
                <p><strong>Lead ID:</strong> {item.leadId}</p>
                <p><strong>Customer Name:</strong> {item.customerName}</p>
                <p><strong>Service Type:</strong> {item.serviceType}</p>
                <p><strong>Product Model:</strong> {item.productModel}</p>
                <p><strong>Order Date:</strong> {item.orderDate}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`${getStatusColor(item.status)} font-semibold`}>
                    {item.status}
                  </span>
                </p>
                <div className="flex justify-center mt-3">
                  <GoEye
                    className="text-blue-600 w-7 h-7 cursor-pointer hover:scale-110 transition"
                    onClick={() =>
                      navigate(`/lead-management/${item.leadId}`, {
                        state: { lead: item },
                      })
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No leads found</p>
          )}
        </div>
      </div>


      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <span>
          Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-2 flex-wrap justify-center text-[#7EC1B1]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#7EC1B1] rounded"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 border border-[#7EC1B1] rounded ${
                currentPage === num ? "bg-[#7EC1B1] text-white" : ""
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#7EC1B1] rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};


export default LeadManagement;



