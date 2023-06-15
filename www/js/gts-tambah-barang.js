// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import {
  getDatabase,
  ref as r,
  push,
  set,
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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const gambarRef = r(database, "Data-Produk");

//========= START - MEMBUAT FUNGSI MENGAMBIL NILAI EMAIL DARI FORM INPUT =========\\
document.addEventListener("DOMContentLoaded", function () {
  // Ambil nilai input dari variabel atau cookie yang telah disimpan
  var email = sessionStorage.getItem("email");

  // Tampilkan nilai input di halaman kedua
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = email;
});
//========= END - MEMBUAT FUNGSI MENGAMBIL NILAI EMAIL DARI FORM INPUT =========\\

//========= START - MEMBUAT FUNGSI UNTUK PROSES TAMBAH BARANG =========\\
let tambahButton = document.getElementById("tambah");
tambahButton.addEventListener("click", (e) => {
  const nama = document.getElementById("namabar").value;
  const harga = document.getElementById("hrgbar").value;
  const status = document.getElementById("stsbar").value;
  const jumlah = document.getElementById("jmlhbar").value;
  const file = document.getElementById("gambar-input").files[0];
  var image = document.getElementById("gambar-input").value;

  //========= START - MEMBUAT FUNGSI FORM KOSONG =========\\
  if (nama == "") {
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
  if (harga == "") {
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
  if (status == "") {
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
  if (jumlah == "") {
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
  //========= END - MEMBUAT FUNGSI FORM KOSONG =========\\

  //========= START - MEMBUAT FUNGSI FORMAT FILE =========\\
  if (image != "") {
    var checkimg = image.toLowerCase();
    if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
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
        title: "Input Image Files",
      });
      return false;
    }
  }
  //========= END - MEMBUAT FUNGSI FORMAT FILE =========\\

  //========= START - MEMBUAT FUNGSI TAMBAH PRODUK =========\\
  if (file && nama && harga && status && jumlah) {
    const storageRef = ref(storage, "Data-Produk/" + file.name);

    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            const gambarDataRef = push(gambarRef);
            set(gambarDataRef, {
              nama: nama,
              harga: harga,
              status: status,
              jumlah: jumlah,
              url: url,
            })
              .then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Product added successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                document.getElementById("namabar").value = "";
                document.getElementById("hrgbar").value = "";
                document.getElementById("stsbar").value = "";
                document.getElementById("jmlhbar").value = "";
                document.getElementById("gambar-input").value = "";
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  //========= END - MEMBUAT FUNGSI TAMBAH PRODUK =========\\
});
//========= END - MEMBUAT FUNGSI UNTUK PROSES TAMBAH BARANG =========\\
