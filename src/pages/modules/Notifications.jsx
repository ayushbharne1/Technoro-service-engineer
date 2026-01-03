import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { getNotifications, markNotificationAsRead } from "../../services/api";

const ChevronRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="32"
    height="27"
    viewBox="0 0 32 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="27" rx="5" fill="#7EC1B1" />
    <path
      d="M16 4V6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 6C12.69 6 10 8.69 10 12V18C9 18 8 19 8 20H16M16 6C19.31 6 22 8.69 22 12V18C23 18 24 19 24 20H16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C14 22.1 14.9 23 16 23C17.1 23 18 22.1 18 21"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Notification Card Component ---

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  const handleMarkAsRead = async () => {
    try {
      setIsMarkingRead(true);
      await onMarkAsRead(notification._id);
    } catch (error) {
      console.error("Failed to mark as read:", error);
    } finally {
      setIsMarkingRead(false);
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Use the age field from API if available, otherwise calculate
  const displayTime = notification.age || formatTimeAgo(notification.createdAt);

  return (
    <div
      className={`bg-[#EBF2F1] p-5 rounded-[20px] flex items-start space-x-4 border border-gray-200 ${
        !notification.isRead ? "ring-2 ring-cyan-400" : ""
      }`}
    >
      {/* Content */}
      <div className="flex-grow gap-2">
        <BellIcon className="w-5 h-5" />
        <h3 className="text-2xl font-medium text-gray-900">
          {notification.title || "Notification"}
        </h3>
        <p className="text-sm text-gray-900 mt-1">
          {notification.message || notification.description || "No description"}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-xs text-cyan-600">{displayTime}</p>
          {notification.type && (
            <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
              {notification.type}
            </span>
          )}
          {notification.priority && notification.priority !== "medium" && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                notification.priority === "high" ||
                notification.priority === "urgent"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {notification.priority}
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      {!notification.isRead && (
        <button
          onClick={handleMarkAsRead}
          disabled={isMarkingRead}
          className="flex-shrink-0 rounded-full text-sm text-black border border-black px-3 py-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMarkingRead ? "Marking..." : "Mark as read"}
        </button>
      )}
    </div>
  );
};

// --- Main Notifications Page Component ---

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [_pagination, _setPagination] = useState(null); // For future pagination UI
  const [_unreadCount, _setUnreadCount] = useState(0); // For future badge display
  const [counts, setCounts] = useState({
    all: 0,
    unread: 0,
    leads: 0,
    urgent: 0,
    messages: 0,
  });

  // Fetch notifications based on active tab
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      let notificationData = [];

      // Apply filters based on active tab
      if (activeTab === "unread") {
        const result = await getNotifications({ isRead: false });
        if (result.success && result.data) {
          notificationData = result.data;
          _setPagination(result.pagination);
          _setUnreadCount(result.unreadCount || 0);
        }
      } else if (activeTab === "leads") {
        // Fetch both lead_assigned and lead_completed
        const [assignedRes, completedRes] = await Promise.all([
          getNotifications({ type: "lead_assigned" }),
          getNotifications({ type: "lead_completed" }),
        ]);

        const assigned = assignedRes.success ? assignedRes.data : [];
        const completed = completedRes.success ? completedRes.data : [];

        // Combine and sort by createdAt (newest first)
        notificationData = [...assigned, ...completed].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        console.log(
          "Lead notifications - Assigned:",
          assigned.length,
          "Completed:",
          completed.length,
          "Total:",
          notificationData.length
        );
      } else if (activeTab === "urgent") {
        const result = await getNotifications({ priority: "high" });
        if (result.success && result.data) {
          notificationData = result.data;
          _setPagination(result.pagination);
          _setUnreadCount(result.unreadCount || 0);
        }
      } else if (activeTab === "messages") {
        const result = await getNotifications({ type: "message" });
        if (result.success && result.data) {
          notificationData = result.data;
          _setPagination(result.pagination);
          _setUnreadCount(result.unreadCount || 0);
        }
      } else {
        // "all" tab
        const result = await getNotifications({});
        if (result.success && result.data) {
          notificationData = result.data;
          _setPagination(result.pagination);
          _setUnreadCount(result.unreadCount || 0);
        }
      }

      console.log("Setting notifications, count:", notificationData.length);
      setNotifications(notificationData);

      // Fetch counts for all tabs
      await updateCounts();
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.message || "Failed to load notifications");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Update notification counts for tabs
  const updateCounts = async () => {
    try {
      // Fetch counts for each category
      const [allRes, unreadRes, leadsRes, urgentRes, messagesRes] =
        await Promise.all([
          getNotifications({}),
          getNotifications({ isRead: false }),
          Promise.all([
            getNotifications({ type: "lead_assigned" }),
            getNotifications({ type: "lead_completed" }),
          ]),
          getNotifications({ priority: "high" }),
          getNotifications({ type: "message" }),
        ]);

      const allNotifs = allRes.success ? allRes.data : [];
      const unreadNotifs = unreadRes.success ? unreadRes.data : [];

      // Combine lead_assigned and lead_completed counts
      const leadAssigned = leadsRes[0].success ? leadsRes[0].data : [];
      const leadCompleted = leadsRes[1].success ? leadsRes[1].data : [];
      const totalLeads = leadAssigned.length + leadCompleted.length;

      const urgentNotifs = urgentRes.success ? urgentRes.data : [];
      const messageNotifs = messagesRes.success ? messagesRes.data : [];

      console.log(
        "Counts - All:",
        allNotifs.length,
        "Unread:",
        unreadNotifs.length,
        "Leads:",
        totalLeads,
        "Urgent:",
        urgentNotifs.length,
        "Messages:",
        messageNotifs.length
      );

      setCounts({
        all: allRes.pagination?.total || allNotifs.length,
        unread: unreadRes.unreadCount || unreadNotifs.length,
        leads: totalLeads,
        urgent: urgentNotifs.length,
        messages: messageNotifs.length,
      });
    } catch (err) {
      console.error("Failed to update counts:", err);
    }
  };

  // Mark notification as read handler
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );

      // Refetch to update counts
      await updateCounts();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      throw err;
    }
  };

  // Fetch notifications when component mounts or tab changes
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const tabs = [
    { id: "all", name: "All", count: counts.all },
    { id: "unread", name: "Unread", count: counts.unread },
    { id: "leads", name: "Leads", count: counts.leads },
    { id: "urgent", name: "Urgent", count: counts.urgent },
    { id: "messages", name: "Messages", count: counts.messages },
  ];

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-2">
      {/* --- Breadcrumbs --- */}
      <nav className="flex items-center text-sm text-gray-500 mb-2">
        <a href="/" className="hover:text-blue-500 flex items-center">
          <MdDashboard className="w-6 h-6 text-[#263138] flex-shrink-0" />
        </a>
        <ChevronRightIcon className="h-4 w-4 mx-1 text-blue-500" />
        <span className="font-medium text-blue-500">Notification</span>
      </nav>

      {/* --- Header --- */}
      <h1 className="text-xl font-semibold text-gray-900 mb-3">Notification</h1>
      <hr className="border-t border-gray-300 mb-3" />

      {/* --- Filter Tabs --- */}
      <div className="flex w-fit bg-[#F5F5F5] items-center space-x-1 p-3 rounded-[20px] sm:space-x-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={loading}
            className={`
                px-4 py-2 rounded-[10px] text-sm font-medium flex items-center space-x-1.5 transition-colors
                ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-600 hover:text-black hover:bg-gray-200"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
          >
            <span>{tab.name}</span>
            <span
              className={`
                  text-sm font-normal
                  ${activeTab === tab.id ? "text-black" : "text-gray-400"}
                `}
            >
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* --- Error Message --- */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Error loading notifications</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchNotifications}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* --- Loading State --- */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      )}

      {/* --- Notification List --- */}
      {!loading && !error && (
        <div className="bg-white rounded-lg space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <BellIcon className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You're all caught up for this category!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
