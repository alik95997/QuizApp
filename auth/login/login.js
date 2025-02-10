import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "../../firebase.js";

// Function to check authentication on page load
const authenticationCheck = () => {
  try {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      if (user.type === "admin") {
        alert("signed In");
        window.location.replace("admin/dashboard/dashboard.html");
      } else {
        alert("signed In");
        window.location.replace("user/dashboard/user-dashboard.html");
      }
    }
  } catch (error) {
    console.log("Error in authentication check:", error);
  }
};
authenticationCheck();

// Sign-in function
const signIn = async () => {
  try {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const userAuth = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const uid = userAuth.user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    // Check if user document exists and extract data
    if (docSnap.exists()) {
      const userData = {
        ...docSnap.data(),
        uid,
      };

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on user type
      if (userData.type === "admin") {
        alert("signed In");
        window.location.replace("admin/dashboard/dashboard.html");
      } else {
        alert("signed In");
        window.location.replace("user/dashboard/user-dashboard.html");
      }
    } else {
      alert("No user document found.");
    }
  } catch (error) {
    alert("Error: " + error.message);
    console.log("Error during sign-in:", error.message, error);
  }
};

window.signIn = signIn;
window.authenticationCheck = authenticationCheck;
