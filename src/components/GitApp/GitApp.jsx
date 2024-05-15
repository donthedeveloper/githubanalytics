import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUd-4vJz2zEXXNhcj7xTyIbgNv75YNX4Q",
  authDomain: "github-analytics-ce54f.firebaseapp.com",
  projectId: "github-analytics-ce54f",
  storageBucket: "github-analytics-ce54f.appspot.com",
  messagingSenderId: "517976405398",
  appId: "1:517976405398:web:a0e69260654e4bca1759b7"
};

const app = initializeApp(firebaseConfig);

function GitApp() {
  const provider = new GithubAuthProvider();
  provider.addScope("repo", "user");

  const auth = getAuth();
  
  return (
    <>
      <button onClick={() => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token);
    
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
        });
      }}>Sign in</button>
    </>
  )
};

export default GitApp;