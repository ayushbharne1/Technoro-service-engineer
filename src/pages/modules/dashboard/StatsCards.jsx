import React from "react";
import { MdChecklistRtl } from "react-icons/md";
import totalAssignedLeadsIcon from "../../../assets/dashboard_Assigned_leads.png";
import completedLeadsIcon from "../../../assets/dashboard_Completed_leads.png";
import pendingLeadsIcon from "../../../assets/dashboard_Pending_leads.png";
import trendingUp from "../../../assets/Trending Up.png";
import trendingDown from "../../../assets/Trending Down.png";

const StatsCards = ({ data }) => {
  const stats = data?.stats || {};

  const cards = [
    {
      title: "Total Assigned Leads",
      value: stats.totalAssignedLeads || "0",
      icon: <img src={totalAssignedLeadsIcon} alt="" className="w-12 h-12" />,
      bgColor: "bg-blue-100",
      trend: "up",
      percentage: "2.4%",
      trendColor: "text-green-500",
    },
    {
      title: "Completed Leads",
      value: stats.completedLeads || "0",
      icon: <img src={completedLeadsIcon} alt="" className="w-12 h-12" />,
      bgColor: "bg-green-100",
      trend: "up",
      percentage: stats.completionRate || "0%",
      trendColor: "text-green-500",
    },
    {
      title: "Pending Leads",
      value: stats.pendingLeads || "0",
      icon: <img src={pendingLeadsIcon} alt="" className="w-12 h-12" />,
      bgColor: "bg-yellow-100",
      trend: "up",
      percentage: "2.6%",
      trendColor: "text-green-500",
    },
    {
      title: "Today's Task",
      value: stats.todayLeads ?? "0",
      icon: <MdChecklistRtl className="w-12 h-12 text-pink-500" />,
      bgColor: "bg-pink-100",
      trend: "up",
      percentage: "3.5%",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-w-[1040px]">
        {cards.map((card, index) => (
          <div key={index} className="bg-[#F5F5F5] rounded-2xl p-4 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <h3 className="font-poppins font-semibold text-black text-[16px] tracking-wide">{card.title}</h3>
                <p className="font-poppins text-[24px] font-bold text-[#263138]">{card.value}</p>
              </div>
              <div className={`p-1 rounded-2xl ${card.bgColor}`}>{card.icon}</div>
            </div>
            <div className="flex items-center gap-2">
              <img src={card.trend === "up" ? trendingUp : trendingDown} alt="" className="w-5 h-3" />
              <p className={`text-base font-semibold ${card.trendColor}`}>{card.percentage}</p>
              <p className="text-sm text-gray-500">from past month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;