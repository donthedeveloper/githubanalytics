import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { Octokit } from "octokit";
import { getGithubUserInfo } from "/api/user";

const firebaseConfig = {
  apiKey: "AIzaSyCUd-4vJz2zEXXNhcj7xTyIbgNv75YNX4Q",
  authDomain: "github-analytics-ce54f.firebaseapp.com",
  projectId: "github-analytics-ce54f",
  storageBucket: "github-analytics-ce54f.appspot.com",
  messagingSenderId: "517976405398",
  appId: "1:517976405398:web:a0e69260654e4bca1759b7"
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