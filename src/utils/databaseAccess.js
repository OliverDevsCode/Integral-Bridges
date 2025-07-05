// seedService.js or wherever you want to define it

import { collection, getDocs ,addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function fetchAllSeeds() {
  try {
    const querySnapshot = await getDocs(collection(db, process.env.REACT_APP_COLLECTION_NAME));
    const seeds = [];

    querySnapshot.forEach((doc) => {
      seeds.push({ id: doc.id, ...doc.data() });
    });

    return seeds;
  } catch (error) {
    console.error("❌ Error fetching seeds:", error);
    return [];
  }
}

export async function writeSeed(submissionData) {
  try {
    const docRef = await addDoc(
      collection(db, process.env.REACT_APP_COLLECTION_NAME),
      submissionData
    );
    console.log("✅ Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding document:", error);
    return null;
  }
}