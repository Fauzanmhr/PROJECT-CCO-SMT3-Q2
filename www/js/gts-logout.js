// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import {
  getDatabase,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChGzVqa5uFCAfJcptW56D8w0AJp1FZEeo",
  authDomain: "growthshop-f2c01.firebaseapp.com",
  projectId: "growthshop-f2c01",
  storageBucket: "growthshop-f2c01.appspot.com",
  messagingSenderId: "440212266000",
  appId: "1:440212266000:web:127434cfbe2f8dcbfabe95",
  measurementId: "G-LVD9XCZ088",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let signoutButton = document.getElementById("signout-button");

signoutButton.addEventListener("click", (e) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will Log out this page",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out!",
  }).then((result) => {
    if (result.isConfirmed) {
        signOut(auth).then(() => {
            // Sign-out successful.
            Swal.fire("Logged out!", "You have logged out", "success").then(function() {
                window.location = "index.html"; // Redirecting to other page.
            });
          }).catch((error) => {
            // An error happened.
          });
      
    }
    
  });
  
});

      
