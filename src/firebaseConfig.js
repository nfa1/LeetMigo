// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7fWGZas7J4HxxSvN_MaJlppf4ZtkuSZU",
  authDomain: "leetmigo.firebaseapp.com",
  projectId: "leetmigo",
  storageBucket: "leetmigo.appspot.com",
  messagingSenderId: "27312880128",
  appId: "1:27312880128:web:92e312f7aa56dc760936e5",
  measurementId: "G-34LEDV13Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);