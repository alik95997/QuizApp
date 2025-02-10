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
  query,
  where,
} from "../../../firebase.js";

import { authCheck } from "../../../utils/utils.js";
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

const scoreTable = document.querySelector("#scoreTable");
const getScoreListing = async () => {
  try {
    loader.style.display = "inline-block";
    const user = JSON.parse(localStorage.getItem("user"));

    const querySnapshot = await getDocs(collection(db, "scores"));
    if (querySnapshot.empty) {
      console.log("empty");
    }
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const per = (data.score / data.totalQues) * 100;
      scoreTable.innerHTML += `
      <tbody>
      <tr>
                  <td>${doc.id} </td>
                  <td>${data.userName}</td>
                  <td>${data.quizTitle}</td>
                  <td>${data.score}</td>
                  <td>${data.WrongAns || 0}</td>
                  <td>${data.totalQues}</td>
                  <td>${per.toFixed(2)}#</td>
              </tr>
              </tbody>
              `;
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
  } 
};
const getQuizList = async () => {
  try {
    const quizDropdown = document.querySelector("#quizDropdown");
    const quizSnap = await getDocs(collection(db, "quizzes"));
    quizSnap.forEach((doc) => {
      const quizObj = { ...doc.data(), id: doc.id };
      // console.log(quizObj);
      quizDropdown.innerHTML += `<option value=${doc.id}>${
        doc.data().title
      }</option>`;
    });
  } catch (error) {
    console.log(error.message);
  }
};
const filterQuiz = async (ele) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(ele.value);
    const q = query(collection(db, "scores"), where("quizId", "==", ele.value));
    scoreTable.innerHTML = "";
    scoreTable.innerHTML = `<tr>
    <thead>
    <td>S.No</td>
    <td>Name</td>
    <td>Quiz Name</td>
    <td>Score</td>
    <td>Wrong Ans</td>
    <td>Total Question</td>
    <td>Percentage</td>
    </tr></thead>`;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const per = (data.score / data.totalQues) * 100;
      scoreTable.innerHTML += `<tr>
      <td>${doc.id} </td>
                <td>${data.userName}</td>
                <td>${data.quizTitle}</td>
                <td>${data.score}</td>
                <td>${data.WrongAns || 0}</td>
                <td>${data.totalQues}</td>
                <td>${per.toFixed(2)}</td>
            </tr>`;
    });
    if (ele.value == "") {
      refreshPage();
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(ele.value);
};
const refreshPage = () => {
  window.location.reload();
};
getQuizList();
getScoreListing();

window.getScoreListing = getScoreListing;
window.getQuizList = getQuizList;
window.filterQuiz = filterQuiz;
window.signOut = signOut;
window.refreshPage = refreshPage;
