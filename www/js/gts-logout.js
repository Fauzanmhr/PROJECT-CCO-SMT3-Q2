// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Konfigurasi Firebase
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

//========= START - MEMBUAT FUNGSI UNTUK MELAKUKAN PROSES LOGOUT =========\\
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
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have logged out",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            window.location = "index.html"; // Redirecting to other page.
          });
        })
        .catch((error) => {
          // An error happened.
        });
    }
  });
});
//========= END - MEMBUAT FUNGSI UNTUK MELAKUKAN PROSES LOGOUT =========\\
