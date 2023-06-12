// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

import {
  getAuth,
  signInWithEmailAndPassword, signOut 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  update,
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

let signinButton = document.getElementById("signin-button");

signinButton.addEventListener("click", (e) => {
    let emailSignin = document.getElementById("user").value;
    let passwordSignin = document.getElementById("pass").value;


    if (emailSignin == "") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'warning',
          title: 'Input Form Cannot Be Empty'
        })
        return false;
      }

    if (passwordSignin == "") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'warning',
          title: 'Input Form Cannot Be Empty'
        })
        return false;
      }

    signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        let lgDate = new Date();
        update(ref(database, "users/" + user.uid), 
        {last_login: lgDate})
          .then(() => {
            // Data saved successfully!
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Login Successfully'
              }).then(function() {
                window.location = "gts-tambah-barang.html"; // Redirecting to other page.
            });
          })
          .catch((error) => {
            //the write failed
            alert(error);
          });
      })
      .catch((error) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'The email or password entered is incorrect'
          })
      });
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  });
