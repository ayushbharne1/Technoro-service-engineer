import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

// Thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const res = await fetch(`${API_BASE}/api/engineer/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) return rejectWithValue(json.message || "Failed to fetch profile");
      
      return json.data;
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);

// Thunk to change password
export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const res = await fetch(`${API_BASE}/api/engineer/change-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) return rejectWithValue(json.message || "Update failed");
      return json;
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("engineerToken");

      const response = await fetch(`${API_BASE}/api/engineer/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (!response.ok) return rejectWithValue(result.message || "Failed to update");

      return result.data; // Return the updated profile object
    } catch (err) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateSuccess: false,
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => { state.loading = true; })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
    state.loading = true;
  })
  .addCase(updateProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.data = action.payload; // Update the store with new data
    state.updateSuccess = true;
  })
  .addCase(updateProfile.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  },
});

export const { resetUpdateStatus } = profileSlice.actions;
export default profileSlice.reducer;