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
} from "../../firebase.js";
import { authCheck } from "utils/utils.js";

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

const yourQuizes = (async () => {
  try {
    const quizList = document.querySelector("#quiz-list");
    const snapShot = await getDocs(collection(db, "quizzes"));

    if (!snapShot.empty) {
      const quizzes = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      quizzes.forEach((quiz) => {
        console.log(quiz);
      });
    } else {
      console.log("No quizzes found.");
    }
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
})();

window.yourQuizes = yourQuizes;

window.signOut = signOut;
