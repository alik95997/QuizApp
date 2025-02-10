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
} from "firebase.js";
const authenticationCheck = () => {
  try {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user.type === "user") {
      window.location.replace("user/userdashboard/userdashboard.html");
    } else if (user.type === "admin") {
      window.location.replace("admin/dashboard/dashboard.html");
    }
  } catch (error) {
    console.log(error);
  }
};
authenticationCheck();
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
    const userData = {
      ...docSnap.data(),
      uid,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.type === "admin") {
      alert("signed In");
      window.location.replace("../../admin/dashboard/dashboard.html");
    } else {
      alert("signed In");
      window.location.replace("../../user/dashboard/user-dashboard.html");
    }
  } catch (error) {
    alert("error", error.message);
    console.log(error.message, error);
  }
};
window.signIn = signIn;
window.authenticationCheck = authenticationCheck;
