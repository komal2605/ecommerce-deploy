import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, uploadData } from "../APIs/firebaseAPI";

const initialState = {
  loading: false,
  productList: [],
  products: [],
};

// export const postProductAsync = createAsyncThunk(
//   "postData/products",
//   async (_, { getState }) => {
//     try {
//       const dataRef = getState().product.DummyData;
//       const productsList = await uploadData(dataRef);
//       console.log(productsList);
//     } catch (e) {
//       console.log(e.message);
//     }
//   }
// );
export const getProductsAsync = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const docs = await getData("products");
      return docs;
    } catch (error) {
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.value;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.productList.find(
        (item) => item.id == newItem.id
      );
      console.log(newItem.id, existingItem);
      if (existingItem) {
        existingItem.quantity_available += newItem.quantity_available;
      } else {
        state.productList.push(newItem);
      }
    },
    setUpdateCollection: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.productList.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex !== -1) {
        if (state.productList[existingItemIndex].quantity_available > 0) {
          state.productList[existingItemIndex].quantity_available -= 1;
        }
      }
    },
    setRemoveItem: (state, action) => {
      const selectedItem = action.payload;
      const updatedCollection = state.productList.filter(
        (item) => item.id !== selectedItem.id
      );
      state.productList = updatedCollection;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(postProductAsync.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(postProductAsync.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      // .addCase(postProductAsync.rejected, (state, action) => {
      //   state.loading = false;
      //   console.log(action.error.message);
      // })
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

export const { setLoading, addToCart, setUpdateCollection, setRemoveItem } =
  productsSlice.actions;
export const productState = (state) => state.product;
export default productsSlice.reducer;
