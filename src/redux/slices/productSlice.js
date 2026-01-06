import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("engineerToken");
      const params = new URLSearchParams();

      // Mapping filters to query parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key === "search" ? "name" : key, value);
      });

      const response = await fetch(`${API_BASE}/api/engineer/product?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New Thunk for Single Product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("engineerToken");
      const response = await fetch(`${API_BASE}/api/engineer/product/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) return rejectWithValue(json.message || "Failed to fetch details");
      
      // Handle different possible API response structures
      return json.data || json.product || json;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    selectedProduct: null, // Store for the single view
    categories: ["All Products"],
    pagination: { total: 0, pages: 1, page: 1, limit: 6 },
    loading: false,
    error: null,
    currentFilters: { search: "", category: "", brand: "", page: 1, limit: 6 }
  },
  reducers: {
    setProductFilters: (state, action) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data || [];
        state.productList = data.map((item) => ({
          id: item._id,
          name: item.name || "Unknown Product",
          description: item.description || "No description available",
          price: item.discountedPrice != null ? `₹${item.discountedPrice}` : `₹${item.price || 0}`,
          rating: item.rating ?? null,
          image: item.images?.[0] || "/Image1.png",
          category: item.category || "Other",
          brand: item.brand || "",
          fullData: item,
        }));
        
        // Derive categories dynamically
        const uniqueCats = Array.from(new Set(data.map(p => p.category))).filter(Boolean);
        state.categories = ["All Products", ...uniqueCats];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Product Cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProductFilters, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;