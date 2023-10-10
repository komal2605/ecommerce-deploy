import { auth, db } from "@/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const signUp = async (email, password, username, is_admin) => {
  try {
    debugger;
    const userRef = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      username: username,
      email: userRef.user.email,
      is_admin: is_admin,
      uid: userRef.user.uid,
    };
    const docRef = doc(db, "user", userRef.user.uid);
    await setDoc(docRef, userData);
    return userData;
  } catch (e) {
    console.log(e.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const userRef = await signInWithEmailAndPassword(auth, email, password);
    return userRef.user;
  } catch (e) {
    console.log(e.message);
  }
};

export const getData = async (collectionName) => {
  try {
    const docs = [];
    const collectionRef = collection(db, collectionName);
    const Query = query(collectionRef, orderBy("date", "desc"));
    if (collectionName === "user") {
      const snapshot = await getDocs(collectionRef);
      snapshot.forEach((doc) => docs.push(doc.data()));
    } else {
      const snapshot = await getDocs(Query);
      snapshot.forEach((doc) => docs.push(doc.data()));
    }
    return docs;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUser = async (uid, is_admin) => {
  try {
    const docRef = doc(db, "user", uid);
    const updatedDoc = await updateDoc(docRef, {
      is_admin: is_admin,
    });
    return "user updated";
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteUser = async (uid) => {
  try {
    const docRef = doc(db, "user", uid);
    await deleteDoc(docRef);
    return "user deleted";
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadData = async (dummyData) => {
  try {
    const productsList = [];
    for (const item of dummyData) {
      const collectionRef = collection(db, "products");
      const currentDate = Timestamp.fromDate(new Date());
      const docRef = await addDoc(collectionRef, item);
      const docID = docRef.id;
      const updatedItem = {
        ...item,
        id: docID,
        date: currentDate.toDate().toString(),
      };
      productsList.push(updatedItem);
      await setDoc(doc(collectionRef, docID), updatedItem);
    }
    return productsList;
  } catch (e) {
    console.log(e.message);
  }
};
