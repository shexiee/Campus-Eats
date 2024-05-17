import React, {useContext, useEffect, useState} from "react";
import {auth} from "../config/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, signOut, 
    setCustomClaim, 
    updateProfile 
} from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    async function signup(email, password, firstname, lastname) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: `${firstname} ${lastname}`,
            photoURL: '/Assets/profile-picture.jpg' // Assuming this is the correct path to your default profile picture
          });
          return user;
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            throw new Error('The email address is already in use by another account.');
          } else {
            throw error;
          }
        }
      }

    async function login(email, password) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
          // Check if the user's email is verified
          if (!user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
          }
      
          return user;
        } catch (error) {
          console.error("Error logging in:", error);
          throw error; // re-throw the error to propagate it to the caller
        }
      }



    // function signInWithMicrosoft(microsoftProvider) {
    //     return new Promise((resolve, reject) => {
    //         signInWithPopup(auth, microsoftProvider)
    //             .then(() => {
    //                 resolve(); // Resolve without any value if sign-in is successful
    //             })
    //             .catch(error => {
    //                 const errorCode = error.code;
    //                 let errorMessage = 'An error occurred while signing in with Microsoft.';
    
    //                 switch (errorCode) {
    //                     case 'auth/account-exists-with-different-credential':
    //                         errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
    //                         break;
    //                     // Add more cases to handle other error codes if needed
    
    //                     default:
    //                         break;
    //                 }
    
    //                 reject(errorMessage); // Reject the Promise with the error message
    //             });
    //     });
    // }

    


    const value = {
        currentUser,
        signup,
        login
    }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}