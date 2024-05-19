import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, db}

// export const microsoftProvider = new OAuthProvider('microsoft.com').setCustomParameters({
//     login_hint: 'user@cit.edu',
//     tenant: '823cde44-4433-456d-b801-bdf0ab3d41fc',  // Put Tenant Id from Azure registered app,
//     prompt: 'consent' // Get Consent from user to access their basic info (optional - Reommended only during SignUp)
// })

export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, `profile-pictures/${currentUser.uid}.png`);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(snapshot.ref);
  updateProfile(currentUser, {photoURL})
  setLoading(false);
  console.log("File uploaded successfully");
}