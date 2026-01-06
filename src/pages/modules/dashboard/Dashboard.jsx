import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../../redux/slices/dashboardSlice";
import StatsCards from "./StatsCards";
import IncomeSummary from "./IncomeSummary";
import TodaysTasks from "./TodaysTasks";
import NewLeadsTable from "./NewLeadsTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: dashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading && !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 p-4 text-center">
        <div className="text-lg text-red-500 font-semibold">Error: {error}</div>
        <div className="text-sm text-gray-600 max-w-md">
          Authentication failed. Please check your connection or login again.
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => dispatch(fetchDashboardData())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
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