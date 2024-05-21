import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { Octokit } from "octokit";
import { getGithubUserInfo } from "/api/user";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "github-graph-analytics.firebaseapp.com",
  projectId: "github-graph-analytics",
  storageBucket: "github-graph-analytics.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initializing Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Setting up our Github OAuth.
const provider = new GithubAuthProvider();
provider.addScope("repo", "user");

// signInWithGithub is the login function (uses Github OAuth).
async function signInWithGithub() {
  try {
    // First the user signs in, then we check Firestore to see if the user exists.
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const credential = GithubAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;
    const octokit = new Octokit({
        auth: token
      });
    const githubUserInfo = await getGithubUserInfo(octokit);
    console.log(githubUserInfo);
    console.log(auth)

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // // If the user doesn't exist, we create an entry for the user in the database.
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: githubUserInfo.data.login,
        avatar: githubUserInfo.data.avatar_url,
        githubAccessToken: token,
        authProvider: "github",
        email: user.email,
      });
    };
  } catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
  };
};

// This is the logout function.
function logout() {
  signOut(auth);
};

// This function retrieves a user's Github Access Token.
async function getUserGithubAccessToken(auth, dbRef) {
  const querySnapshot = await getDocs(collection(dbRef, "users"));
  // querySnapshot.forEach(doc => {
  //   console.log(doc.data());
  // });
};

export { signInWithGithub, logout,getUserGithubAccessToken, auth, db }; 