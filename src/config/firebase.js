import { initializeApp } from "firebase/app";
import {getAuth, OAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOfLRAvDaCWD2lQ22wdnpMwUI3JP94ZhU",
  authDomain: "campus-eats-7db76.firebaseapp.com",
  projectId: "campus-eats-7db76",
  storageBucket: "campus-eats-7db76.appspot.com",
  messagingSenderId: "791957102382",
  appId: "1:791957102382:web:1264b332d3f9cc86f264bf",
  measurementId: "G-3GJ59R641L"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}

export const microsoftProvider = new OAuthProvider('microsoft.com').setCustomParameters({
    login_hint: 'user@cit.edu',
    tenant: '823cde44-4433-456d-b801-bdf0ab3d41fc',  // Put Tenant Id from Azure registered app,
    prompt: 'consent' // Get Consent from user to access their basic info (optional - Reommended only during SignUp)
})