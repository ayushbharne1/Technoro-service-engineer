const API_URL =
  import.meta.env.VITE_API_URL || "https://ro-service-engineer-be-ipm3.onrender.com";

// Helper function to get token
const getAuthToken = () => {
  const token =
    localStorage.getItem("engineerToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }

  return token;
};

export const getDashboardStats = async () => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/api/engineer/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch dashboard: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getInventoryRequests = async (params = {}) => {
  try {
    const token = getAuthToken();

    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.status) queryParams.append("status", params.status);
    if (params.vendor) queryParams.append("vendor", params.vendor);
    if (params.item) queryParams.append("item", params.item);
    if (params.priority) queryParams.append("priority", params.priority);
    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const url = `${API_URL}/api/engineer/inventory-request${
      queryString ? "?" + queryString : ""
    }`;

    console.log("Fetching inventory requests from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch inventory requests: ${response.status}`);
    }

    const result = await response.json();
    console.log("Inventory requests received:", result);

    // Return the full result including pagination
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const createInventoryRequest = async (requestData) => {
  try {
    const token = getAuthToken();

    // Ensure we do NOT send engineer id in body (backend should extract from token)
    // Also normalize/validate required fields before sending
    console.log("Creating inventory request with data (raw):", requestData);

    // Defensive copy and cleanup
    const payload = { ...requestData };

    // Remove any accidental engineer fields (common typos)
    if (payload.engineer) delete payload.engineer;
    if (payload.enginer) delete payload.enginer;

    // Ensure quantityRequested is a string as backend expects (per Postman)
    if (
      payload.quantityRequested !== undefined &&
      payload.quantityRequested !== null
    ) {
      payload.quantityRequested = String(payload.quantityRequested);
    }

    // Basic validation: vendor, item, quantityRequested, reason, priority
    const missing = [];
    if (!payload.vendor) missing.push("vendor");
    if (!payload.item) missing.push("item");
    if (!payload.quantityRequested) missing.push("quantityRequested");
    if (!payload.reason) missing.push("reason");
    if (!payload.priority) missing.push("priority");
    if (missing.length) {
      const msg = `Missing required fields for inventory request: ${missing.join(
        ", "
      )}`;
      console.error(msg);
      throw new Error(msg);
    }

    const response = await fetch(`${API_URL}/api/engineer/inventory-request`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to create inventory request: ${response.status}`);
    }

    const result = await response.json();
    console.log("Inventory request created:", result);
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Get available items for dropdown (using products endpoint)
export const getAvailableItems = async () => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/api/engineer/product`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Get available vendors for dropdown
export const getAvailableVendors = async () => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/api/engineer/vendors`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vendors: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Get notifications with filters
export const getNotifications = async (params = {}) => {
  try {
    const token = getAuthToken();
    console.log("Token retrieved:", token ? "Yes" : "No");

    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.isRead !== undefined)
      queryParams.append("isRead", params.isRead);
    if (params.type) queryParams.append("type", params.type);
    if (params.priority) queryParams.append("priority", params.priority);
    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const url = `${API_URL}/api/engineer/notification${
      queryString ? "?" + queryString : ""
    }`;

    console.log("Fetching notifications from:", url);
    console.log("Query params:", params);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response OK:", response.ok);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch notifications: ${response.status}`);
    }

    const result = await response.json();
    console.log("Notifications received:", result);
    console.log("Data count:", result.data?.length);

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = getAuthToken();

    // Get userId from localStorage (should be stored during login)
    const userId =
      localStorage.getItem("engineerId") ||
      localStorage.getItem("userId") ||
      "68fca359e7b00310ba8eb4de"; // Fallback to your test ID

    console.log("Marking notification as read:", notificationId);
    console.log("User ID:", userId);

    const response = await fetch(
      `${API_URL}/notification/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    console.log("Mark as read response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to mark notification as read: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Notification marked as read:", result);
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
