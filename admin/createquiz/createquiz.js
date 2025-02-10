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
import { authCheck } from "../../utils/utils.js";
authCheck();

const quizTitle = document.querySelector("#quizTitle");
const quizCategory = document.querySelector("#quizCategory");
const quesArr = [];

const createQuizHandler = async () => {
  try {
    const saveObj = {
      title: quizTitle.value,
      category: quizCategory.value,
      questions: quesArr,
      isActive: false,
    };
    const res = await addDoc(collection(db, "quizzes"), saveObj);
    alert("Your quiz created successfully, Check now on Quiz List");
  } catch (error) {
    console.log(error);
  }
};

const handleQuestions = () => {
  if (
    questionText.value === "" ||
    option1.value === "" ||
    option2.value === "" ||
    option3.value === "" ||
    option4.value === "" ||
    correctAnswer.value === ""
  ) {
    alert("Value cannot be empty");
    return;
  }
  try {
    const questionText = document.querySelector("#questionText");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const correctAnswer = document.querySelector("#correctAnswer");
    const quesObj = {
      questionText: questionText.value,
      options: [option1.value, option2.value, option3.value, option4.value],
      correctAnswer: correctAnswer.value,
    };
    questionText.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    correctAnswer.value = "";
    quesArr.push(quesObj);
  } catch (error) {
    alert(error);
    console.log(error);
  }

  console.log(quesArr);
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

window.handleQuestions = handleQuestions;
window.createQuizHandler = createQuizHandler;
window.signOut = signOut;
