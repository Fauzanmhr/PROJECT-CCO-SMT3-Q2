// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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
const database = getDatabase(app);

//========= START - MEMBUAT FUNGSI UNTUK MELAKUKAN PROSES LOGIN =========\\
let signinButton = document.getElementById("signin-button");
signinButton.addEventListener("click", (e) => {
  let emailSignin = document.getElementById("user").value;
  let passwordSignin = document.getElementById("pass").value;

  //========= START - MEMBUAT FUNGSI UNTUK FORM KOSONG =========\\
  if (emailSignin == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: "Input Form Cannot Be Empty",
    });
    return false;
  }

  if (passwordSignin == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: "Input Form Cannot Be Empty",
    });
    return false;
  }
  //========= END - MEMBUAT FUNGSI UNTUK FORM KOSONG =========\\

  //========= START - MEMBUAT FUNGSI SESSION =========\\
  sessionStorage.setItem("email", emailSignin);
  //========= END - MEMBUAT FUNGSI SESSION =========\\

  //========= START - MEMBUAT FUNGSI LOGIN DENGAN FIREBASE =========\\
  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let lgDate = new Date();
      update(ref(database, "users/" + user.uid), { last_login: lgDate })
        .then(() => {
          // Data saved successfully!
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Login Successfully",
          }).then(function () {
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
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "The email or password entered is incorrect",
      });
    });
  //========= END - MEMBUAT FUNGSI LOGIN DENGAN FIREBASE =========\\
});
//========= END - MEMBUAT FUNGSI UNTUK MELAKUKAN PROSES LOGIN =========\\
