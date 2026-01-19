import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProducts = createAsyncThunk(
    "fetch/products",
    async ( _ ,{rejectWithValue}) => {
        try {
            const res = await axios.get('http://localhost:3001/products');
            return res.data
        } catch (error) {
            return rejectWithValue(
                 error.response?.data || "Failed to fetch product"
            )
        }
    }
)

/* ===============================
   ADD PRODUCT (POST)
================================ */
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    console.log(productData);
    
    try {
      const res = await axios.post(
        "http://localhost:3001/products",
        productData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add product"
      );
    }
  }
);
/* ===============================
   DELETE PRODUCT (POST)
================================ */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    console.log(id);
    
    try {
      const res = await axios.delete(
        `http://localhost:3001/products/${id}`
        
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete product"
      );
    }
  }
);

/* ===============================
   SLICE
================================ */
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data.push(action.payload); 
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(deleteProduct.fulfilled, (state,action) => {
        state.data = state.data.filter((p)=>p.id !== action.payload)
      })
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
