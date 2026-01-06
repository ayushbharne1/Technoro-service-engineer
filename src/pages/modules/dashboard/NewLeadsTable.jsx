import React from "react";
import { FiEye } from "react-icons/fi";

const NewLeadsTable = ({ upcomingLeads, recentCompleted }) => {
  const leads = upcomingLeads.length > 0 ? upcomingLeads : recentCompleted;
  const title = upcomingLeads.length > 0 ? "Upcoming Leads" : "Recent Completed Leads";
  const statusColor = upcomingLeads.length > 0 ? "text-yellow-500" : "text-green-500";
  const statusText = upcomingLeads.length > 0 ? "Pending" : "Completed";

  return (
    <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm">
      <h3 className="text-gray-800 text-lg font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Sr.No.", "Lead ID", "Customer Name", "Service Type", "Date", "Status", "Action"].map((head) => (
                <th key={head} className="py-3 px-6 text-left font-semibold text-black uppercase tracking-wide text-xs">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 px-6 text-center text-gray-400">No leads available</td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr key={lead.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-[#263138]">{index + 1}</td>
                  <td className="py-4 px-6 text-[#263138] font-mono text-xs">{lead.id?.slice(-8) || "N/A"}</td>
                  <td className="py-4 px-6 text-[#263138] font-medium">{lead.customer}</td>
                  <td className="py-4 px-6 text-[#263138]">{lead.service}</td>
                  <td className="py-4 px-6 text-[#263138]">
                    {lead.completedDate ? new Date(lead.completedDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`${statusColor} font-semibold text-xs`}>{lead.status || statusText}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-500 hover:text-blue-700 transition-colors">
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewLeadsTable;