import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "../../firebase.js";

import { authCheck } from "../../utils/utils.js";
authCheck();
const signOut = () => {
  try {
    localStorage.removeItem("user");
    window.location.replace("../../index.html");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
const card = document.querySelector("#card");
const ShowProfile = async () => {
  try {
    let user = localStorage.getItem("user");
    console.log(user);
    user = JSON.parse(user);
    card.innerHTML = `
    <img src="/../../images/profile-icon.png" alt="John" style="width:250px">
            <h1>${user.firstName} ${user.lastName}</h1>
          <p class="title">Gender: ${user.gender}</p>
          <p>Email: ${user.email}</p>
          <div style="margin: 24px 0;">
            <a href="#"><i class="fa fa-dribbble"></i></a> 
            <a href="#"><i class="fa fa-twitter"></i></a>  
            <a href="#"><i class="fa fa-linkedin"></i></a>  
            <a href="#"><i class="fa fa-facebook"></i></a> 
          </div>
          <p><button class="card-button">Contact</button></p>
    `;
  } catch (error) {
    console.log(error);
  }
};
ShowProfile();
window.ShowProfile = ShowProfile;
window.signOut = signOut;
