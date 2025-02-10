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
  query,
  where,
} from "../../firebase.js";
import { authCheck } from "../../utils/utils.js";
authCheck();

export { authCheck };
let mainContent = document.querySelector("#mainContent");
let cardListingContainer = document.querySelector("#cardListingContainer");
const loader = document.querySelector("#loader");

const quizListing = async () => {
  try {
    let quizListHTML = "";
    loader.style.display = `inline-block`; // Show the loader
    const docSnap = await getDocs(collection(db, "quizzes"));
    docSnap.forEach((doc) => {
      const data = doc.data();
      if (data.isActive == true) {
        quizListHTML += `
        <div class="quiz">
        <div>
        <img src="../../images/quiz_3874176.png">
            <p>${data.title}</p>
            <p class="quiz-category">${data.category}</p>
            </div>
            <button id=${doc.id} class="active button" onclick="navigateToQuiz(this)">Start</button>
        </div>`;
      }
    });
    cardListingContainer.innerHTML += quizListHTML;
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = `none`; // Hide the loader
  }
};
quizListing();

const navigateToQuiz = async (ele) => {
  console.log(ele);
  sessionStorage.setItem("quizId", ele.id);
  window.location.assign("../giveQuiz/giveQuiz.html");
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

const showQuizList = async () => {
  try {
    mainContent.innerHTML = `<h1>Quiz List</h1>`;
    let showQuizListHTML = `<div class="cardListingContainer">`;
    const docSnap = await getDocs(collection(db, "quizzes"));
    docSnap.forEach((doc) => {
      const data = doc.data();
      if (data.isActive == true) {
        showQuizListHTML += `
        
        <div class="quiz">
            <div class="quiz-details">
                <img src="../../images/quiz_3874176.png">
                <p>${data.title}</p>
                <p class="quiz-category">${data.category}</p>
            </div>
            <button id=${doc.id} class="active button" onclick="navigateToQuiz(this)">Start</button>
        </div>
        `;
      }
    });
    showQuizListHTML += `</div>`;
    mainContent.innerHTML += showQuizListHTML;
  } catch (error) {
    console.log(error);
  }
};

const showQuizScore = async () => {
  mainContent.innerHTML = "";
  mainContent.innerHTML = `<h1>Score List</h1>`;
  let tableHTMl = `<table border="1px" class="customTable">
<thead>
<tr>
<td>S.No </td>
<td>Name</td>
<td>Quiz Name</td>
<td>Score</td>
<td>Wrong Ans</td>
<td>Total Question</td>
<td>Percentage</td>
</tr>
</thead>
`;
  let serial = 1;
  const user = JSON.parse(localStorage.getItem("user"));
  const q = query(collection(db, "scores"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const per = (data.score / data.totalQues) * 100;
    tableHTMl += `
    <tr>
              <td>${serial++} </td>
              <td>${data.userName}</td>
              <td>${data.quizTitle}</td>
              <td>${data.score}</td>
              <td>${data.WrongAns}</td>
              <td>${data.totalQues}</td>
              <td>${per.toFixed(2)}#</td>
          </tr>
          
          `;
  });

  tableHTMl += `</table>`;
  mainContent.innerHTML += tableHTMl;
};

document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
});

window.showQuizList = showQuizList;
window.navigateToQuiz = navigateToQuiz;
window.signOut = signOut;
window.quizListing = quizListing;
window.showQuizScore = showQuizScore;
