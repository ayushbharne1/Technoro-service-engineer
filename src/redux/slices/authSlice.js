import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// --- Async Thunks ---

export const sendEngineerOtp = createAsyncThunk('engineer/sendOtp', async (phone, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/engineer/register/send-otp`, { phone });
        return response.data;
    } catch (err) { return rejectWithValue(err.response.data.message); }
});

export const verifyEngineerOtp = createAsyncThunk('engineer/verifyOtp', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/engineer/register/verify-otp`, data);
        return response.data;
    } catch (err) { return rejectWithValue(err.response.data.message); }
});

export const registerEngineer = createAsyncThunk('engineer/register', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/engineer/register`, payload);
        return response.data;
    } catch (err) { return rejectWithValue(err.response.data.message); }
});


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/engineer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || "Invalid Credentials");

      localStorage.setItem("engineerToken", data.token);
      localStorage.setItem("engineerId", data.data._id);
      return data;
    } catch (error) {
      return rejectWithValue("Server Error! Try again later.");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/engineer/forgot-pass/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || "Something went wrong");
      localStorage.setItem("resetPhone", phone);
      return data;
    } catch (error) {
      return rejectWithValue("Server error. Please try again later.");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/engineer/forgot-pass/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || "Invalid or expired OTP");
      return data;
    } catch (error) {
      return rejectWithValue("Server error. Please try again later.");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/engineer/reset-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || "Reset failed");
      localStorage.removeItem("resetPhone");
      return data;
    } catch (error) {
      return rejectWithValue("Server error during reset.");
    }
  }
);

// --- Auth Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("engineerToken") || null,
    engineerId: localStorage.getItem("engineerId") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("engineerToken");
      localStorage.removeItem("engineerId");
      state.token = null;
      state.engineerId = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // STEP 1: Specific Cases (addCase) - MUST COME FIRST
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.engineerId = action.payload.data._id;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })

      // STEP 2: General Matchers (addMatcher) - MUST COME AFTER addCase
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;