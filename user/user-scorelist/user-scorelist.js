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
} from "../../firebase.js";

import { authCheck } from "../../utils/utils.js";
authCheck();

const scoreTable = document.querySelector("#scoreTable");
const getScoreListing = async () => {
  try {
    loader.style.display = "inline-block";
    const user = JSON.parse(localStorage.getItem("user"));
    const q = query(collection(db, "scores"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const per = (data.score / data.totalQues) * 100;
      scoreTable.innerHTML += `<tr>
                <td>${data.id} </td>
                <td>${data.userName}</td>
                <td>${data.quizTitle}</td>
                <td>${data.score}</td>
                <td>${data.WrongAns}</td>
                <td>${data.totalQues}</td>
                <td>${per.toFixed(2)}%</td>
            </tr>`;
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
  } finally {
    loader.style.display = "none"; // Hide the loader
  }
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

getScoreListing();

window.getScoreListing = getScoreListing;
window.signOut = signOut;
