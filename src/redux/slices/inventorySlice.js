import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getAvailableVendors, getAvailableItems } from "../../services/api";

const API_BASE = import.meta.env.VITE_API_URL;

// --- Thunks ---

export const fetchDropdownData = createAsyncThunk(
  "inventory/fetchDropdownData",
  async (_, { rejectWithValue }) => {
    try {
      const [vendorsData, itemsData] = await Promise.all([
        getAvailableVendors(),
        getAvailableItems(),
      ]);
      return { 
        vendors: Array.isArray(vendorsData) ? vendorsData : [], 
        items: Array.isArray(itemsData) ? itemsData : [] 
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load dropdown data");
    }
  }
);

export const fetchInventoryRequests = createAsyncThunk(
  "inventory/fetchRequests",
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/api/engineer/inventory-request?${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) return rejectWithValue(json.message || "Failed to fetch inventory");
      return json.data || [];
    } catch (err) {
      return rejectWithValue("Server connection failed");
    }
  }
);

export const createRequest = createAsyncThunk(
  "inventory/createRequest",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const res = await fetch(`${API_BASE}/api/engineer/inventory-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) return rejectWithValue(json.message || "Failed to create request");
      
      dispatch(fetchInventoryRequests({})); 
      return json;
    } catch (err) {
      return rejectWithValue("Failed to submit request");
    }
  }
);

// --- Slice ---

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    vendors: [],
    availableProducts: [],
    loading: false,
    modalLoading: false,
    error: null,
  },
  reducers: {
    clearInventoryError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryRequests.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchInventoryRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInventoryRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDropdownData.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(fetchDropdownData.fulfilled, (state, action) => {
        state.modalLoading = false;
        state.vendors = action.payload.vendors;
        state.availableProducts = action.payload.items;
      })
      .addCase(fetchDropdownData.rejected, (state, action) => {
        state.modalLoading = false;
        state.error = action.payload;
      });
  },
});

// --- Memoized Selectors ---

const selectInventoryState = (state) => state.inventory;

export const selectAllRequests = createSelector(
  [selectInventoryState],
  (inventory) => inventory.items || []
);

export const selectPendingRequests = createSelector(
  [selectAllRequests],
  (items) => items.filter((r) => r.status?.toLowerCase() === "pending")
);

export const selectApprovedRequests = createSelector(
  [selectAllRequests],
  (items) => items.filter((r) => r.status?.toLowerCase() === "approved")
);

export const selectDeliveredRequests = createSelector(
  [selectAllRequests],
  (items) => items.filter((r) => 
    ["issued", "delivered"].includes(r.status?.toLowerCase())
  )
);

export const selectRejectedRequests = createSelector(
  [selectAllRequests],
  (items) => items.filter((r) => r.status?.toLowerCase() === "rejected")
);

export const { clearInventoryError } = inventorySlice.actions;
export default inventorySlice.reducer;