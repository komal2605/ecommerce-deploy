import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getCurrentUser,
  getData,
  signIn,
  signUp,
  updateUser,
} from "../APIs/firebaseAPI";

const initialState = {
  loading: false,
  isOpenModal: false,
  updateUserLoading: false,
  user: "",
  users: [],
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username, is_admin }, { dispatch }) => {
    try {
      const userData = await signUp(email, password, username, is_admin);
      console.log(userData);
      dispatch(setUser(userData));
      debugger;
      dispatch(setIsOpenModal({ bool: false }));
      alert("user successfully signed up");
    } catch (error) {
      return alert(error.message + " Please try with another credentials");
    }
  }
);
export const getAuthenticatedAsync = createAsyncThunk(
  "authenticated/getauthenticated",
  async (_, { dispatch }) => {
    try {
      const user = await getCurrentUser();
      const { uid } = user;
      const userList = await getData("user");
      const userData = userList.find((item) => uid === item.uid);
      const { is_admin, username } = userData;
      dispatch(
        setUser({
          is_admin,
          username,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
);
export const signInUser = createAsyncThunk(
  "signInUser/signIn",
  async ({ email, password }, { dispatch }) => {
    try {
      const userRef = await signIn(email, password);
      const userList = await dispatch(getUsersAsync());
      const loggedUser = userList.payload.find(
        (item) => userRef.user.uid === item.uid
      );
      if (loggedUser) {
        dispatch(setUser(loggedUser));
      }
      alert("logged in successfully");
    } catch (error) {
      alert("Wrong credentials", error);
    }
  }
);

export const getUsersAsync = createAsyncThunk("auth/getUsers", async () => {
  try {
    const docs = await getData("user");
    return docs;
  } catch (error) {
    throw error;
  }
});
export const updateUserAsync = createAsyncThunk(
  "updateUser/update",
  async ({ uid, is_admin }) => {
    try {
      await updateUser(uid, is_admin);
      alert("updated successfully");
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "auth/deleteUser",
  async (uid, { dispatch }) => {
    try {
      await deleteUser(uid);
      alert("User successfully deleted");
      dispatch(getUsersAsync());
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload.bool;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(getUsersAsync.pending, (state) => {})
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        console.error("Error fetching users:", action.error.message);
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updateUserLoading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updateUserLoading = false;
        console.error("Error fetching users:", action.error.message);
      });
  },
});

export const { setIsOpenModal, setUser, setUsers } = authSlice.actions;
export const authState = (state) => state.auth;
export default authSlice.reducer;
