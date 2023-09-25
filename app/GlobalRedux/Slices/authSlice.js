import { auth, db } from "@/firebase/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
      const userRef = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        username: username,
        email: userRef.user.email,
        is_admin: is_admin,
        uid: userRef.user.uid,
      };
      const userDocRef = doc(db, "user", userRef.user.uid);
      await setDoc(userDocRef, userData);
      alert("user successfully signed up");
      dispatch(setUser(userData));
      dispatch(setIsOpenModal({ bool: false }));
    } catch (error) {
      return alert(error.message + " Please try with another credentials");
    }
  }
);

export const signInUser = createAsyncThunk(
  "signInUser/signIn",
  async ({ email, password }, { dispatch, getState }) => {
    try {
      const userRef = await signInWithEmailAndPassword(auth, email, password);
      dispatch(getUsersAsync());

      const state = getState();
      const signedInUser = state.auth.users.find(
        (user) => user.uid === userRef.user.uid
      );

      if (signedInUser) {
        const userData = {
          username: signedInUser.username,
          email: userRef.user.email,
          is_admin: signedInUser.is_admin,
          uid: userRef.user.uid,
        };

        dispatch(setUser(userData));
        dispatch(setIsOpenModal({ bool: false }));
      } else {
        alert("User data not found");
      }
      alert("logged in successfully");
    } catch (error) {
      alert("Wrong credentials");
    }
  }
);
export const getUsersAsync = createAsyncThunk("auth/getUsers", async () => {
  try {
    const docs = [];
    const collectionRef = collection(db, "user");
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  } catch (error) {
    throw error;
  }
});
export const updateUserAsync = createAsyncThunk(
  "updateUser/update",
  async ({ uid, is_admin }) => {
    try {
      const docRef = doc(db, "user", uid);
      const updatedDoc = await updateDoc(docRef, {
        is_admin: is_admin,
      });
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
      const userRef = doc(db, "user", uid);
      await deleteDoc(userRef);
      alert("User successfully deleted");
      dispatch(getUsersAsync()); // Fetch updated user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Throw the error to be handled by the rejection action
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
        state.users = action.payload; // Update the users array in the state with the fetched data
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        console.error("Error fetching users:", action.error.message);
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updateUserLoading = false; // Update the users array in the state with the fetched data
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updateUserLoading = false;
        console.error("Error fetching users:", action.error.message);
      });
  },
});

export const { setIsOpenModal, setUser } = authSlice.actions;
export const authState = (state) => state.auth;
export default authSlice.reducer;
