import { db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

export const saveUserData = async (user: User, cvData: any) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  
  try {
    await setDoc(userRef, {
      profile: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        lastUpdated: serverTimestamp(),
      },
      cvData: cvData, // This saves the education, jobs, and skills used in your templates
    }, { merge: true });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving to Firestore:", error);
  }
};
