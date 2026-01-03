import React, { useState, useEffect } from "react";
import StatsCards from "./StatsCards";
import IncomeSummary from "./IncomeSummary";
import TodaysTasks from "./TodaysTasks";
import NewLeadsTable from "./NewLeadsTable";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { getDashboardStats } from "../../../services/api";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-lg text-red-500">Error: {error}</div>
        <div className="text-sm text-gray-600 max-w-md text-center">
          The authentication token was not found. This usually means:
          <ul className="list-disc text-left mt-2 ml-6">
            <li>You haven't logged in yet</li>
            <li>Your session has expired</li>
            <li>The token wasn't saved properly during login</li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          Press F12 to open console and check the debug logs
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white p-4 sm:p-6 gap-y-6 sm:gap-y-8 min-h-screen font-sans text-base">
      <StatsCards data={dashboardData} />

      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[70%]">
          <IncomeSummary />
        </div>

        <div className="w-full lg:w-[30%]">
          <TodaysTasks
            tasks={dashboardData?.todayLeadsList || []}
            recentCompleted={dashboardData?.recentCompleted || []}
          />
        </div>
      </div>

      <NewLeadsTable
        upcomingLeads={dashboardData?.upcomingLeads || []}
        recentCompleted={dashboardData?.recentCompleted || []}
      />
    </div>
  );
};

export default Dashboard;
