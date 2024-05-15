import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GithubAuthProvider();
const db = getFirestore(app);
provider.addScope("repo", "user");

const signInWithGithub = async () => {
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

    console.log(githubUserInfo)
    console.log(token)
    console.log(user)

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // // If the user doesn't exist, we create an entry for the user in the database.

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: githubUserInfo.data.login,
        githubAccessToken: token,
        authProvider: "github",
        email: user.email,
      });
    }

  } catch(err) {

  };
};

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     console.log(token);
//     const octokit = new Octokit({
//       auth: token
//     });
//     const githubUserInfo = getGithubUserInfo(octokit)
//     console.log(githubUserInfo)

//     // The signed-in user info.
//     const user = result.user;
//     console.log(user);
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GithubAuthProvider.credentialFromError(error);
//     // ...
//   });

  export { signInWithGithub, auth };