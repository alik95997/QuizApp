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

// document.querySelector('.hamburger-menu').addEventListener('click', () => {
//   document.querySelector('.sidebar').classList.toggle('active');
// });

let questions = [];
let indexNumber = 0;
let score = 0;
let quizTitle = "";
const questionElement = document.getElementById("questionElement");
const optionElement = document.getElementById("optionElement");

const checkQuizID = async () => {
  try {
    const quizID = sessionStorage.getItem("quizId");
    if (quizID === null) {
      window.location.replace("../dashboard/user-dashboard.html");
    }
    const docSnap = await getDoc(doc(db, "quizzes", quizID));
    quizTitle = docSnap.data().title;
    return docSnap.data().questions;
  } catch (error) {
    return error.message;
  }
};
checkQuizID()
  .then((response) => {
    // console.log("response", response);
    questions = response;
    handleQuestion();
  })
  .catch((error) => {
    console.log("error", error);
  });

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const handleQuestion = () => {
  try {
    let questionTitle = questions[indexNumber].questionText;
    let optionsObj = questions[indexNumber].options;
    questionElement.innerHTML = `${escapeHtml(questionTitle)}`;
    optionElement.innerHTML = "";
    for (let i = 0; i < optionsObj.length; i++) {
      optionElement.innerHTML += `<li class="quiz-option" onclick="checkAns(this)">${escapeHtml(
        optionsObj[i]
      )}</li>`;
    }
  } catch (error) {
    console.log(error);
  }
};

const nextQues = () => {
  indexNumber++;
  if (indexNumber < questions.length) {
    handleQuestion();
  } else {
    onsubmit();
  }
};

const checkAns = (ele) => {
  const allLiElement = optionElement.children;
  const correctAns = questions[indexNumber].correctAnswer;

  for (let i = 0; i < allLiElement.length; i++) {
    allLiElement[i].style.backgroundColor = "";
  }
  if (ele.textContent === correctAns) {
    ele.style.backgroundColor = "green";
    score++;
  } else {
    ele.style.backgroundColor = "red";

    for (let i = 0; i < allLiElement.length; i++) {
      if (allLiElement[i].textContent === correctAns) {
        allLiElement[i].style.backgroundColor = "green";
        break;
      }
    }
  }
};
const onsubmit = async () => {
  console.log("submit");
  console.log(score);
  const user = JSON.parse(localStorage.getItem("user"));
  const scoreObj = {
    totalQues: questions.length,
    score: score,
    wrongAns: questions.length - score,
    quizId: sessionStorage.getItem("quizId"),
    userId: user.uid,
    userName: user.firstName,
    quizTitle: quizTitle,
  };
  console.log(scoreObj);
  const response = await addDoc(collection(db, "scores"), scoreObj);
  console.log(response);
  let scoreElement = document.querySelector("#ShowResult").children;
  scoreElement[0].innerHTML = `Quiz Title ${quizTitle}`;
  scoreElement[1].innerHTML = `Score ${score}`;
  scoreElement[2].innerHTML = `Wrong Ans ${questions.length - score}`;
  scoreElement[3].innerHTML = `Total Question ${questions.length}`;
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

window.signOut = signOut;
window.checkQuizID = checkQuizID;
window.checkAns = checkAns;
window.nextQues = nextQues;
window.onsubmit = onsubmit;
