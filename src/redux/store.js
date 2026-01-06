import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import leadReducer from "./slices/leadSlice";
import profileReducer from "./slices/profileSlice";
import productReducer from "./slices/productSlice";
import inventoryReducer from "./slices/inventorySlice"; // Import the new slice
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadReducer,
    profile: profileReducer,
    products: productReducer,
    inventory: inventoryReducer,
    dashboard: dashboardReducer, // Added
  },
});