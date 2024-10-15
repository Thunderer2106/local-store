import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: "",
};

//add to cart

export const addtocart = createAsyncThunk(
  "cart/addtocart",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);

      return await cartService.addtocart(formData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removefromcart = createAsyncThunk(
  "cart/removefromcart",
  async (formData, thunkAPI) => {
    try {
      return await cartService.removefromcart(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const modifycart = createAsyncThunk(
  "cart/modifycart",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(formData);
      return await cartService.modifycart(formData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getcartitems = createAsyncThunk(
  "cart/getcartitems",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.getcartitems(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(modifycart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(modifycart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("cart modified successfully");
      })
      .addCase(modifycart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(addtocart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("action.payload");
        state.items.push(action.payload);
        toast.success("Added to Cart");
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(removefromcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcartitems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.items = action.payload;
        toast.success("fetch cart items");
      })
      .addCase(getcartitems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getcartitems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      });
  },
});
export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
