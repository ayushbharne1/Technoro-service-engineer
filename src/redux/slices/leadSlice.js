import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

// 1. Upload Signature (Multipart/FormData)
export const uploadLeadSignature = createAsyncThunk(
  "leads/uploadSignature",
  async ({ leadId, file }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const formData = new FormData();
      formData.append("signature", file);

      const response = await fetch(`${API_URL}/api/engineer/lead/${leadId}/upload-signature`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { leadId, data };
    } catch (error) {
      return rejectWithValue("Signature upload failed");
    }
  }
);

// 2. Upload Feedback
export const uploadLeadFeedback = createAsyncThunk(
  "leads/uploadFeedback",
  async ({ leadId, feedback }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const response = await fetch(`${API_URL}/api/engineer/lead/${leadId}/upload-feedback`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ feedback }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { leadId, feedback };
    } catch (error) {
      return rejectWithValue("Feedback submission failed");
    }
  }
);

// Async thunk to fetch leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`${API_URL}/api/engineer/lead`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch leads");

      const res = await response.json();
      
      // Format the data inside the thunk to keep the component clean
      return res.data.map((lead) => ({
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 1. Respond to Lead (Accept/Reject)
export const respondToLead = createAsyncThunk(
  "leads/respond",
  async ({ leadId, action }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const response = await fetch(`${API_URL}/api/leadResponse/${leadId}/engineer/respond`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { leadId, action, data };
    } catch (error) {
      return rejectWithValue("Server Error");
    }
  }
);

// 2. Update Lead Status (Mark as Done)
export const updateLeadStatus = createAsyncThunk(
  "leads/updateStatus",
  async ({ leadId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const response = await fetch(`${API_URL}/api/engineer/lead/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { leadId, status };
    } catch (error) {
      return rejectWithValue("Server Error");
    }
  }
);

export const addLeadRemark = createAsyncThunk(
  "leads/addRemark",
  async ({ leadId, remark }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const response = await fetch(
        `${API_URL}/api/engineer/lead/${leadId}/remark`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ remarks: remark }),
        }
      );
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { leadId, remark };
    } catch (error) {
      return rejectWithValue("Failed to add remark");
    }
  }
);



const leadSlice = createSlice({
  name: "leads",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.loading = true;
      })
      .addMatcher((action) => action.type.endsWith("/fulfilled"), (state) => {
        state.loading = false;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default leadSlice.reducer;