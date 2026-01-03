import React from "react";
import { FiEye } from "react-icons/fi";

const NewLeadsTable = ({ upcomingLeads, recentCompleted }) => {
  // Show upcoming leads if available, otherwise show recent completed
  const leads = upcomingLeads.length > 0 ? upcomingLeads : recentCompleted;
  const title =
    upcomingLeads.length > 0 ? "Upcoming Leads" : "Recent Completed Leads";
  const statusColor =
    upcomingLeads.length > 0 ? "text-yellow-500" : "text-green-500";
  const statusText = upcomingLeads.length > 0 ? "Pending" : "Completed";

  return (
    <div className="bg-white p-5 rounded-md border border-gray-100">
      <h3 className="text-gray-800 text-lg font-semibold mb-4">{title}</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Sr.No.
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Lead ID
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Customer Name
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Service Type
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Date
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Status
              </th>
              <th className="py-3 px-6 text-left  font-semibold text-black uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-md">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center text-gray-500">
                  No leads available
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr key={lead.id || index} className="border-b border-gray-200">
                  <td className="py-4 px-6 text-[#263138]">{index + 1}</td>
                  <td className="py-4 px-6 text-[#263138]">
                    {lead.id || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-[#263138]">{lead.customer}</td>
                  <td className="py-4 px-6 text-[#263138]">{lead.service}</td>
                  <td className="py-4 px-6 text-[#263138]">
                    {lead.scheduledDate
                      ? new Date(lead.scheduledDate).toLocaleDateString()
                      : lead.completedDate
                      ? new Date(lead.completedDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`${statusColor} font-semibold`}>
                      {lead.status || statusText}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-500 hover:text-blue-600">
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing 1 to {leads.length} of {leads.length} Entries
        </p>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-400 text-gray-700 rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            Previous
          </button>
          <button className="bg-teal-500 text-white rounded-md px-3 py-1 text-sm font-medium">
            1
          </button>
          <button className="border border-gray-400 text-gray-700 rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLeadsTable;
