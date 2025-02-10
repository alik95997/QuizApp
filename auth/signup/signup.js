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
  getDoc,
  setDoc,
  doc,
} from "../../firebase.js";

const authenticationCheck = () => {
  try {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user.type === "user") {
      window.location.replace("../../user/dashboard/user-dashboard.html");
    } else if (user.type === "admin") {
      window.location.replace("../../admin/dashboard/dashboard.html");
    }
  } catch (error) {
    console.log(error);
  }
};
authenticationCheck();

const signUp = async () => {
  try {
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const cpassword = document.querySelector("#cpassword");
    const gender = document.querySelector("#gender");

    if (password.value !== cpassword.value) {
      alert("Password are not same");
      return;
    }
    const userObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      gender: gender.value,
      type: "user", // admin or user
      isBlock: false,
      isDeleted: false,
    };
    const authResponse = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    await setDoc(doc(db, "users", authResponse.user.uid), userObj);
    alert("Account Created Successfully");
    window.location.assign("../../index.html");
  } catch (error) {
    console.log("error", error.message);
  }
};
window.signUp = signUp;
window.authenticationCheck = authenticationCheck;
