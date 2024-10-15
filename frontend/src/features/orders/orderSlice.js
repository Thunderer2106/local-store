import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: "",
};

//add to cart

export const transfertoorders = createAsyncThunk(
  "order/transfertoorders",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);

      return await orderService.transfertoorders(token);
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

export const getorders = createAsyncThunk(
  "order/getorderitems",
  async (_, thunkAPI) => {
    try {
      console.log('orders hit')
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getorders(token);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(transfertoorders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transfertoorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("action.payload");
        state.items.push(action.payload);
        toast.success("Added to Orders");
      })
      .addCase(transfertoorders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(getorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log('donee');
        state.orders = action.payload;
        toast.success("got the orders");
      })
      .addCase(getorders.pending, (state, action) => {
        console.log('pendingg');
        state.isLoading = true;
      })
      .addCase(getorders.rejected, (state, action) => {
        console.log('reject');

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      });
  },
});
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
