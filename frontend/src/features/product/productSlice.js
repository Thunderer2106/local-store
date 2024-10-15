import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    getSrc:'',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    outOfStock: 0,
    category: [],
};

// add new product
export const addproduct = createAsyncThunk(

    'products/addproduct',
    async (formData, thunkAPI) => {
        try {

            console.log('sliceee');
            console.log(formData);
            console.log('sliceee');
            
            const token = thunkAPI.getState().auth.user.token;
        
            return await productService.addproduct(formData,token);
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


//fetch products based on location range
export const getproduct = createAsyncThunk(

    'products/getproduct',
    async (formData, thunkAPI) => {
        try {
            return await productService.getproduct(formData);
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


//get products based on search
export const searchproduct = createAsyncThunk(

    'products/searchproduct',
    async (formData, thunkAPI) => {
        try {
            console.log("done")
            return await productService.searchproduct(formData);
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


//get results from home
export const getHomeSearch=createAsyncThunk(
    'products/getHomeSearch',
    async(formData,thunkAPI)=>{
        try{
            return await productService.getHomeSearch(formData);
        }
        catch (error) {
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
)


//get products based on id
export const getProductById = createAsyncThunk(

    'products/productbyid',
    async (formData, thunkAPI) => {
        try {
            return await productService.getProductById(formData);
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




const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_CATEGORY(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { category } = item;

                return array.push(category);
            });
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addproduct.pending, (state) => {
                state.isLoading = true;
                console.log('load');
            })
            .addCase(addproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products.push(action.payload);
                toast.success("Product added successfully");
            })
            .addCase(addproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
                console.log(action.payload)
            })
            .addCase(getproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
                console.log(action.payload)
            })
            .addCase(getproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products = action.payload[1];
                state.getSrc=action.payload[0];
                toast.success("Fetchd products successfully");
            })
            .addCase(getproduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchproduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
                console.log(action.payload)
            })
            .addCase(searchproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products = action.payload;
                state.getSrc='setProductSearch';
                toast.success("Fetchd products successfully");
            })
            .addCase(searchproduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
                console.log(action.payload)
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.product = action.payload;
                toast.success("Fetched products successfully");
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            


            .addCase(getHomeSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
                console.log(action.payload)
            })
            .addCase(getHomeSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products = action.payload;
                toast.success("Fetched products successfully");
            })
            .addCase(getHomeSearch.pending, (state) => {
                state.isLoading = true;
            })




    },


});

export const { CALC_CATEGORY } = productSlice.actions;
export default productSlice.reducer;
