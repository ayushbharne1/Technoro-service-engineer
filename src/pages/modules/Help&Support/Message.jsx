
// import { useState } from "react";
// import Header2 from "../../../components/ServiceEngineer/header/Header2";
// import { GoEye } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const Messages = () => {
//   const [entries, setEntries] = useState(7);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [userTypeFilter, setUserTypeFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // Dummy data with id added
//   const data = [
//     { id: 1, userName: "John Doe", userType: "Admin", issueDetail: "Login issue", dateTime: "2025-10-20 10:30 AM" },
//     { id: 2, userName: "Jane Smith", userType: "Customer", issueDetail: "Payment failed", dateTime: "2025-10-20 11:00 AM" },
//     { id: 3, userName: "Robert Brown", userType: "Manufacturer", issueDetail: "Order not showing", dateTime: "2025-10-20 12:00 PM" },
//     { id: 4, userName: "David White", userType: "Admin", issueDetail: "App crash", dateTime: "2025-10-20 12:45 PM" },
//     { id: 5, userName: "Sophia Green", userType: "Customer", issueDetail: "Refund issue", dateTime: "2025-10-20 01:30 PM" },
//     { id: 6, userName: "Liam Davis", userType: "Manufacturer", issueDetail: "Stock missing", dateTime: "2025-10-20 02:00 PM" },
//     { id: 7, userName: "Emma Wilson", userType: "Customer", issueDetail: "Coupon error", dateTime: "2025-10-20 03:00 PM" },
//   ];

//   // 🔹 Filtering
//   const filteredData = data.filter((item) => {
//     const matchesUserType = userTypeFilter === "All" || item.userType === userTypeFilter;
//     const matchesSearch =
//       item.userName.toLowerCase().includes(search.toLowerCase()) ||
//       item.issueDetail.toLowerCase().includes(search.toLowerCase());
//     return matchesUserType && matchesSearch;
//   });

//   // 🔸 Pagination logic
//   const totalPages = Math.ceil(filteredData.length / entries);
//   const startIndex = (currentPage - 1) * entries;
//   const displayedData = filteredData.slice(startIndex, startIndex + entries);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   // 🔹 Navigate to Chat Page
//   const handleViewChat = (item) => {
//     navigate("/help-support/newchat/chat", {
//       state: {
//         userType: item.userType,
//         user: item.userName,
//         id: item.id, 
//       },
//     });
//   };

//   return (
//     <div className="bg-gray-100 p-4 h-full overflow-y-auto flex flex-col gap-6 font-poppins">
//       <Header2 title="Messages" />

//       {/* 🔹 Top Controls */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-10 flex-wrap">
//         {/* Show Entries */}
//         <div className="flex items-center gap-2">
//           <span className="text-[16px]">Show</span>
//           <select
//             value={entries}
//             onChange={(e) => {
//               setEntries(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="p-2 border rounded w-[60px]"
//           >
//             {[5, 10, 20].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//           <span className="text-[16px]">Entries</span>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
//           <div className="relative w-full max-w-[280px]">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//             <input
//               type="text"
//               placeholder="Search ID, User Name, Issue"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//             />
//           </div>
//         </div>

//         {/* Select User Type */}
//         <div className="flex items-center gap-2 mt-2 sm:mt-0">
//           <label className="text-[16px]">User Type:</label>
//           <select
//             value={userTypeFilter}
//             onChange={(e) => setUserTypeFilter(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="All">All</option>
//             <option value="Admin">Admin</option>
//             <option value="Customer">Customer</option>
//             <option value="Manufacturer">Manufacturer</option>
//           </select>
//         </div>

//         {/* Start New Chat */}
//         <div className="mt-2 sm:mt-0">
//           <button
//             className="bg-[#7EC1B1] hover:bg-[#68a697] text-white px-6 py-2 rounded-lg font-medium transition"
//             onClick={() => navigate("/help-support/newchat")}
//           >
//             Start New Chat
//           </button>
//         </div>
//       </div>

//       {/* 🔸 Table */}
//       <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
//         <table className="table-auto w-full border border-gray-400 min-w-[800px]">
//           <thead>
//             <tr className="bg-[#CACACA] text-center">
//               <th className="p-3 font-medium text-[18px]">S.No</th>
//               <th className="p-3 font-medium text-[18px]">User Name</th>
//               <th className="p-3 font-medium text-[18px]">User Type</th>
//               <th className="p-3 font-medium text-[18px]">Issue Detail</th>
//               <th className="p-3 font-medium text-[18px]">Date & Time</th>
//               <th className="p-3 font-medium text-[18px]">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {displayedData.length > 0 ? (
//               displayedData.map((item, index) => (
//                 <tr
//                   key={item.id} // use id as key
//                   className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[#000]`}
//                 >
//                   <td className="p-3">{item.id}</td>
//                   <td className="p-3 capitalize">{item.userName}</td>
//                   <td className="p-3">{item.userType}</td>
//                   <td className="p-3">{item.issueDetail}</td>
//                   <td className="p-3">{item.dateTime}</td>
//                   <td className="p-3 flex justify-center items-center">
//                     <GoEye
//                       className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
//                       onClick={() => handleViewChat(item)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-gray-500 text-center">
//                   No messages found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
//           <span>
//             Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
//             {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
//           </span>
//           <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//               <button
//                 key={num}
//                 onClick={() => handlePageChange(num)}
//                 className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
//                   currentPage === num ? "bg-[#7EC1B1] text-white" : ""
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


import { useState } from "react";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [entries, setEntries] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔹 Updated Dummy Data
  const data = [
    { id: 1, queryId: "Q1001", userName: "John Doe", issueDetail: "Login issue", dateTime: "2025-10-20 10:30 AM" },
    { id: 2, queryId: "Q1002", userName: "Jane Smith", issueDetail: "Payment failed", dateTime: "2025-10-20 11:00 AM" },
    { id: 3, queryId: "Q1003", userName: "Robert Brown", issueDetail: "Order not showing", dateTime: "2025-10-20 12:00 PM" },
    { id: 4, queryId: "Q1004", userName: "David White", issueDetail: "App crash", dateTime: "2025-10-20 12:45 PM" },
    { id: 5, queryId: "Q1005", userName: "Sophia Green", issueDetail: "Refund issue", dateTime: "2025-10-20 01:30 PM" },
    { id: 6, queryId: "Q1006", userName: "Liam Davis", issueDetail: "Stock missing", dateTime: "2025-10-20 02:00 PM" },
    { id: 7, queryId: "Q1007", userName: "Emma Wilson", issueDetail: "Coupon error", dateTime: "2025-10-20 03:00 PM" },
  ];

  // 🔹 Filter by Search
  const filteredData = data.filter(
    (item) =>
      item.queryId.toLowerCase().includes(search.toLowerCase()) ||
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.issueDetail.toLowerCase().includes(search.toLowerCase())
  );

  // 🔸 Pagination logic
  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const displayedData = filteredData.slice(startIndex, startIndex + entries);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  // 🔹 Navigate to Chat Page
  const handleViewChat = (item) => {
    navigate("/help-support/newchat/chat", {
      state: {
        queryId: item.queryId,
        user: item.userName,
        id: item.id,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 h-full overflow-y-auto flex flex-col gap-6 font-poppins">
      <Header2 title="Messages" />


      {/* 🔹 Top Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-10 flex-wrap">
        {/* Show Entries */}
        <div className="flex items-center gap-2">
          <span className="text-[16px]">Show</span>
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border rounded w-[60px]"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-[16px]">Entries</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full max-w-[280px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search Query ID, User Name, Issue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Raise a Query Button */}
        <div className="mt-2 sm:mt-0">
          <button
            className="bg-[#7EC1B1] hover:bg-[#68a697] text-white px-6 py-2 rounded-lg font-medium transition"
            onClick={() => navigate("/help-support/newchat")}
          >
            Raise a Query
          </button>
        </div>
      </div>

      {/* 🔸 Table */}
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
        <table className="table-auto w-full border border-gray-400 min-w-[800px]">
          <thead>
            <tr className="bg-[#CACACA] text-center">
              <th className="p-3 font-medium text-[18px]">S.No</th>
              <th className="p-3 font-medium text-[18px]">Query ID</th>
              <th className="p-3 font-medium text-[18px]">Issue Detail</th>
              <th className="p-3 font-medium text-[18px]">User Name</th>
              <th className="p-3 font-medium text-[18px]">Date & Time</th>
              <th className="p-3 font-medium text-[18px]">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[#000]`}
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.queryId}</td>
                  <td className="p-3">{item.issueDetail}</td>
                  <td className="p-3 capitalize">{item.userName}</td>
                  <td className="p-3">{item.dateTime}</td>
                  <td className="p-3 flex justify-center items-center">
                    <GoEye
                      className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleViewChat(item)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500 text-center">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
          <span>
            Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
            {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
                  currentPage === num ? "bg-[#7EC1B1] text-white" : ""
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
