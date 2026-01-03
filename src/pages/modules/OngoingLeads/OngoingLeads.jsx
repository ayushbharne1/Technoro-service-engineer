// import { useState } from "react";
// import { GoEye } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";

// const OngoingLeads = () => {
//   const navigate = useNavigate();
//   const [entries, setEntries] = useState(7);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Select Status");

//   const leadsData = [
//     { id: 1, leadId: "OD54487", customer: "Kathryn Murphy", serviceType: "Repair", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "New" },
//     { id: 2, leadId: "OD54487", customer: "Courtney Henry", serviceType: "Maintenance", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "New" },
//     { id: 3, leadId: "OD54487", customer: "Darlene Robertson", serviceType: "Repair", product: "MG678", orderDate: "21-10-2025", status: "Ongoing" },
//     { id: 4, leadId: "OD54487", customer: "Savannah Nguyen", serviceType: "Purchase", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Ongoing" },
//     { id: 5, leadId: "OD54487", customer: "Annette Black", serviceType: "Purchase", product: "MG678", orderDate: "21-10-2025", status: "Ongoing" },
//     { id: 6, leadId: "OD54487", customer: "Brooklyn Simmons", serviceType: "Repair", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Completed" },
//     { id: 7, leadId: "OD54487", customer: "Cody Fisher", serviceType: "RO Installation", product: "MG678", orderDate: "21-10-2025", status: "Completed" },
//     { id: 8, leadId: "OD54487", customer: "Theresa Webb", serviceType: "Maintenance", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Completed" },
//     { id: 9, leadId: "OD54487", customer: "Floyd Miles", serviceType: "RO Installation", product: "MG678", orderDate: "21-10-2025", status: "Completed" },
//     { id: 10, leadId: "OD54487", customer: "Albert Flores", serviceType: "Purchase", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Completed" },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "New":
//         return "text-yellow-500";
//       case "Ongoing":
//         return "text-blue-500";
//       case "Completed":
//         return "text-green-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const filteredLeads = leadsData.filter(lead => {
//     const matchesSearch = lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          lead.leadId.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "Select Status" || lead.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Header2 />

//       {/* Controls Bar */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-600">Show</span>
//             <select
//               value={entries}
//               onChange={(e) => setEntries(Number(e.target.value))}
//               className="border border-gray-300 rounded px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <span className="text-gray-600">Entries</span>
//           </div>

//           <div className="flex gap-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-10"
//               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
//             >
//               <option>Select Status</option>
//               <option>New</option>
//               <option>Ongoing</option>
//               <option>Completed</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full  border border-[#CACACA]">
//             <thead className="bg-[#F5F5F5] border-b border-[#CACACA]">
//               <tr>
//                 <th className="px-6 py-3 text-left  font-600 text-gray-700">Sr.No.</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Lead ID</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Customer Name</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Service Type</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Product Model</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Order Date</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Status</th>
//                 <th className="px-6 py-3 text-left   font-600 text-gray-700">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#CACACA]">
//               {filteredLeads.slice(0, entries).map((lead) => (
//                 <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 text-[16px]  text-gray-900">{lead.id}</td>
//                   <td className="px-6 py-4 text-[16px] text-gray-900">{lead.leadId}</td>
//                   <td className="px-6 py-4 text-[16px] text-gray-900">{lead.customer}</td>
//                   <td className="px-6 py-4 text-[16px] text-gray-900">{lead.serviceType}</td>
//                   <td className="px-6 py-4 text-[16px] text-gray-900">{lead.product}</td>
//                   <td className="px-6 py-4 text-[16px] text-gray-900">{lead.orderDate}</td>
//                   <td className={`px-6 py-4 text-[16px] font-medium ${getStatusColor(lead.status)}`}>
//                     {lead.status}
//                   </td>
//                   <td className="px-6 py-4">
//                     <button 
//                       onClick={() => navigate(`/ongoing-leads/view/${lead.leadId}`, { state: { lead } })}
//                       className="text-blue-500 hover:text-blue-700 transition-colors"
//                     >
//                       <GoEye className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="text-sm text-gray-600">
//             Showing 1 to 10 of 30 Entries
//           </div>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 border border-gray-300 rounded text-[#7EC1B1] hover:[#7EC1B1] ">
//               Previous
//             </button>
//             <button className="px-3 py-2 bg-[#7EC1B1] text-white rounded hover:bg-[#7EC1B1] ">
//               1
//             </button>
//             <button className="px-3 py-2 border border-gray-300 rounded text-[#7EC1B1] hover:bg-gray-50 ">
//               2
//             </button>
//             <button className="px-3 py-2 border border-gray-300 rounded text-[#7EC1B1] hover:bg-gray-50 ">
//               3
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded text-[#7EC1B1] hover:bg-gray-50 ">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default OngoingLeads;

import { useState, useEffect } from "react";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";


const OngoingLeads = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchOngoingLeads = async () => {
      try {
        setLoading(true);
        setError("");


        const token = localStorage.getItem("engineerToken");
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }


        const res = await fetch(
          "https://ro-service-engineer-be.onrender.com/api/engineer/lead",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (!res.ok) throw new Error(`Failed to fetch leads: ${res.status}`);
        const result = await res.json();
        console.log("✅ Ongoing Leads Response:", result);


        if (result.success && Array.isArray(result.data)) {
          const ongoingLeads = result.data.filter((lead) =>
            ["ongoing", "progress", "pending"].includes(
              lead.status?.toLowerCase()
            )
          );


          const formattedLeads = ongoingLeads.map((lead) => {
            let displayStatus = lead.status?.toLowerCase();
            if (
              displayStatus === "progress" ||
              displayStatus === "pending" ||
              displayStatus === "ongoing"
            ) {
              displayStatus = "Ongoing";
            } else {
              displayStatus = lead.status || "N/A";
            }


            return {
              _id: lead._id,
              leadId: lead.id || lead._id,
              customerName: lead.customer?.name || "N/A",
              serviceType: lead.serviceType || "N/A",
              productModel: lead.service?.name || "N/A",
              orderDate: new Date(lead.createdAt).toLocaleDateString(),
              status: displayStatus,
            };
          });


          setData(formattedLeads);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching leads:", err);
        setError(
          "Failed to load ongoing leads. Please check your token or permissions."
        );
      } finally {
        setLoading(false);
      }
    };


    fetchOngoingLeads();
  }, []);


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "text-yellow-500";
      case "ongoing":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };


  if (loading) return <p className="text-center py-4">Loading leads...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;


  const filteredData = data.filter((item) => {
    const matchesStatus =
      statusFilter === "All" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      item.leadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header2 title="Ongoing Leads" />


      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left - Entries */}
        <div className="flex items-center gap-2 justify-start sm:justify-start w-full sm:w-auto">
          <span className="text-gray-600">Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1.5"
          >
            {[10, 25, 50].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
          <span className="text-gray-600">Entries</span>
        </div>


        {/* Center - Search Bar */}
        <div className="flex justify-center w-full sm:w-auto">
          <div className="relative w-full max-w-[320px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 pl-10 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>


        {/* Right - Status Filter */}
        <div className="flex justify-start sm:justify-end w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option>All</option>
            <option>New</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
      </div>




      {/* Table (Responsive) */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300 hidden md:table-header-group">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">Sr.No.</th>
              <th className="px-6 py-3 text-left text-gray-700">Lead ID</th>
              <th className="px-6 py-3 text-left text-gray-700">Customer Name</th>
              <th className="px-6 py-3 text-left text-gray-700">Service Type</th>
              <th className="px-6 py-3 text-left text-gray-700">Product Model</th>
              <th className="px-6 py-3 text-left text-gray-700">Order Date</th>
              <th className="px-6 py-3 text-left text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-gray-700">Action</th>
            </tr>
          </thead>


          <tbody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, entries).map((lead, index) => (
                <tr
                  key={lead._id}
                  className="border-t hover:bg-gray-50 block md:table-row mb-4 md:mb-0 rounded-lg md:rounded-none shadow-sm md:shadow-none md:border-0"
                >
                  <td className="px-6 py-3 block md:table-cell before:content-['Sr.No.:_'] before:font-semibold before:md:hidden">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 block md:table-cell before:content-['Lead_ID:_'] before:font-semibold before:md:hidden">
                    {lead.leadId}
                  </td>
                  <td className="px-6 py-3 block md:table-cell before:content-['Customer:_'] before:font-semibold before:md:hidden">
                    {lead.customerName}
                  </td>
                  <td className="px-6 py-3 block md:table-cell before:content-['Service_Type:_'] before:font-semibold before:md:hidden">
                    {lead.serviceType}
                  </td>
                  <td className="px-6 py-3 block md:table-cell before:content-['Product:_'] before:font-semibold before:md:hidden">
                    {lead.productModel}
                  </td>
                  <td className="px-6 py-3 block md:table-cell before:content-['Date:_'] before:font-semibold before:md:hidden">
                    {lead.orderDate}
                  </td>
                  <td
                    className={`px-6 py-3 block md:table-cell before:content-['Status:_'] before:font-semibold before:md:hidden ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </td>
                  <td className="px-6 py-3 flex items-center gap-2 md:table-cell before:content-['Action:_'] before:font-semibold before:md:hidden">


                    <button
                      onClick={() =>
                        navigate(`/ongoing-leads/view/${lead.leadId}`, {
                          state: { lead },
                        })
                      }
                      className="flex justify-center md:justify-start"
                    >
                      <GoEye className="text-blue-500 hover:text-blue-700 w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No ongoing leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default OngoingLeads;



