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
const parent = document.querySelector("#container");

const getQuizList = async () => {
  const loader = document.getElementById("loader");
  try {
    loader.style.display = "inline-block"; // Show the loader
    const quizSnap = await getDocs(collection(db, "quizzes"));
    parent.innerHTML = "";
    quizSnap.forEach((doc) => {
      const quizObj = { ...doc.data(), id: doc.id };

      parent.innerHTML += `
      <div class="quiz">
        <img src="../../images/quiz_3874176.png">
      <p >${quizObj.title}</p>
      <p class="quiz-category">${quizObj.category}</p>

      ${
        doc.data().isActive === true
          ? `<button id=${doc.id} class ="active button" onclick  ="toggleStatus(this ,'active')">Active</button>`
          : `<button id=${doc.id} class ="inactive button" onclick ="toggleStatus(this ,'inactive')">InActive</button>`
      }
      </div> `;
    });
  } catch (error) {
    alert("error", error);
    console.log(error);
    alert(error.message);
  } finally {
    loader.style.display = "none"; // Hide the loader
  }
};

const toggleStatus = async (ele, status) => {
  try {
    const cardID = ele.id;
    await updateDoc(doc(db, "quizzes", cardID), {
      isActive: status == "active" ? false : true,
    });
  } catch (error) {
    console.log(error);
  }
  getQuizList();
};
const signOut = () => {
  try {
    localStorage.removeItem("user");
    window.location.replace("../../index.html");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
getQuizList();

window.getQuizList = getQuizList;
window.toggleStatus = toggleStatus;
window.signOut = signOut;
