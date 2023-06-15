import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

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

//========= START - MEMBUAT FUNGSI UNTUK MENAMPILKAN GAMBAR YANG DI UPLOAD =========\\
document.getElementById("gambarInput").addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  // Ketika pembacaan file selesai
  reader.onload = function (e) {
    var gambarPreview = document.getElementById("gambarPreview");
    gambarPreview.src = e.target.result;
  };
  // Baca file gambar sebagai URL data
  reader.readAsDataURL(file);
});
//========= END - MEMBUAT FUNGSI UNTUK MENAMPILKAN GAMBAR YANG DI UPLOAD =========\\

//========= START - MEMBUAT FUNGSI UNTUK MENDAPATKAN KEY DARI HALAMAN CEK BARANG =========\\
// Mendapatkan key dari URL
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get("key");

// Mendapatkan data berdasarkan key
const dataRef = ref(database, `Data-Produk/${key}`);
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();

  // Mengisi nilai awal pada form dengan data yang akan diedit
  document.getElementById("nambar").value = data.nama;
  document.getElementById("harbar").value = data.harga;
  document.getElementById("jumbar").value = data.jumlah;
  document.getElementById("stabar").value = data.status;
  document.getElementById("gambarPreview").src = data.url;
});
//========= END - MEMBUAT FUNGSI UNTUK MENDAPATKAN KEY DARI HALAMAN CEK BARANG =========\\

//========= START - MEMBUAT FUNGSI UNTUK MENGUPDATE DATA PADA HALAMAN CEK BARANG =========\\
let updateButton = document.getElementById("gts-update");

updateButton.addEventListener("click", (e) => {
  
  e.preventDefault();

  const name = document.getElementById("nambar").value;
  const harga = document.getElementById("harbar").value;
  const jumlah = document.getElementById("jumbar").value;
  const status = document.getElementById("stabar").value;

  const newData = {
    nama: name,
    harga: harga,
    jumlah: jumlah,
    status: status,
  };

  var file = document.getElementById("gambarInput").files[0];
  if (file) {
    var gambarRef = storageRef(storage, `Data-Produk/${file.name}`);

    // Upload gambar ke Firebase Storage
    uploadBytes(gambarRef, file)
      .then((snapshot) => {
        console.log("Gambar berhasil diupload");

        // Dapatkan URL unduhan gambar yang diunggah
        return getDownloadURL(gambarRef);
      })
      .then((downloadURL) => {
        newData.url = downloadURL; // Tambahkan URL gambar ke newData

        // Memperbarui data berdasarkan key
        updateData(key, newData);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengupload gambar:", error);
      });
  } else {
    // Jika tidak ada gambar yang diunggah, langsung memperbarui data
    updateData(key, newData);
  }
});

// Memperbarui data berdasarkan key
function updateData(key, newData) {
  update(ref(database, `Data-Produk/${key}`), newData)
    .then(() => {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to update product data",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "The product has been successfully updated",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            window.location = "gts-cek-barang.html"; // Redirecting to other page.
          });
          
        }
      })
    })
    .catch((error) => {
      console.error("Gagal memperbarui data:", error);
    });
}
//========= END - MEMBUAT FUNGSI UNTUK MENGUPDATE DATA PADA HALAMAN CEK BARANG =========\\
