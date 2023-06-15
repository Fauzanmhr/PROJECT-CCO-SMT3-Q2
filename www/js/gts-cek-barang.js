import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
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
const dataRef = ref(database, "Data-Produk");

//========= START - MEMBUAT FORMAT RUPIAH =========\\
function formatRupiah(number) {
  var rupiah = "";
  var numberString = number.toString();
  var sisa = numberString.length % 3;

  for (var i = 0; i < numberString.length; i++) {
    rupiah += numberString[i];
    if (i < numberString.length - 1) {
      if ((i + 1) % 3 === sisa) {
        rupiah += ".";
      }
    }
  }
  return "Rp " + rupiah;
}
//========= END - MEMBUAT FORMAT RUPIAH =========\\

//========= START - MEMBUAT FORMAT JUMLAH =========\\
function formatJumlah(numbers) {
  var item = "";
  var numberString = numbers.toString();

  for (var i = 0; i < numberString.length; i++) {
    item += numberString[i];
  }
  return item + " Item";
}
//========= END - MEMBUAT FORMAT JUMLAH =========\\

//========= START - MEMBUAT FUNGSI HAPUS BERDASARKAN KEY YANG DIPILIH =========\\
function deleteData(key) {
  remove(ref(database, `Data-Produk/${key}`))
    .then(() => {
      console.log("Data berhasil dihapus");
    })
    .catch((error) => {
      console.error("Gagal menghapus data:", error);
    });
}
//========= END - MEMBUAT FUNGSI HAPUS BERDASARKAN KEY YANG DIPILIH =========\\

//========= START - MEMBUAT FUNGSI MENGAMBIL NILAI EMAIL DARI FORM INPUT =========\\
document.addEventListener("DOMContentLoaded", function () {
  // Ambil nilai input dari variabel atau cookie yang telah disimpan
  var email = sessionStorage.getItem("email");

  // Tampilkan nilai input di halaman kedua
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = email;
});
//========= END - MEMBUAT FUNGSI MENGAMBIL NILAI EMAIL DARI FORM INPUT =========\\

//========= START - MEMBUAT TABEL DENGAN PAGINATION=========\\
const itemsPerPage = 4; // Jumlah item per halaman
let currentPage = 1; // Halaman saat ini
let totalItems = 0;
let totalPages = 0;

function fetchItems() {
  onValue(dataRef, (snapshot) => {
    const items = snapshot.val();
    const tabelProduk = document.getElementById("tabel-produk");

    // Hapus semua elemen pada tbody sebelumnya
    tabelProduk.innerHTML = "";

    if (items) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Tampilkan data sesuai dengan halaman saat ini
      let index = 0;
      for (const key in items) {
        if (index >= startIndex && index < endIndex) {
          const item = items[key];
          const row = document.createElement("tr");

          // NAMA PRODUK \\
          const namaProduk = document.createElement("td");
          namaProduk.textContent = item.nama;
          row.appendChild(namaProduk);

          // HARGA PRODUK \\
          var hargaDB = item.harga;
          var hargaRupiah = formatRupiah(hargaDB);
          var hargaProduk = document.createElement("td");
          hargaProduk.textContent = hargaRupiah;
          row.appendChild(hargaProduk);

          // JUMLAH PRODUK \\
          var jumlahDB = item.jumlah;
          var jumlahitem = formatJumlah(jumlahDB);
          var jumlahProduk = document.createElement("td");
          jumlahProduk.textContent = jumlahitem;
          row.appendChild(jumlahProduk);

          // STATUS PRODUK \\
          const statusProduk = document.createElement("td");
          statusProduk.textContent = item.status;
          row.appendChild(statusProduk);

          // GAMBAR PRODUK \\
          if (item.url) {
            const gambarProduk = document.createElement("td");
            const tampilGambar = document.createElement("img");
            tampilGambar.src = item.url;
            tampilGambar.width = 85; // Atur lebar gambar
            gambarProduk.appendChild(tampilGambar);
            row.appendChild(gambarProduk);
          }

          //========= START - MEMBUAT BUTTON EDIT =========\\
          const tabelKolom = document.createElement("td");
          const tombolEdit = document.createElement("button");
          tombolEdit.textContent = "Edit";
          tombolEdit.classList.add("btn", "btn-info", "me-2");
          tombolEdit.addEventListener("click", () => {
            // Mengarahkan ke halaman edit dengan mengirim key sebagai parameter
            window.location.href = `gts-edit-barang.html?key=${key}`;
          });
          tabelKolom.appendChild(tombolEdit);
          //========= END - MEMBUAT BUTTON EDIT =========\\

          //========= START - MEMBUAT BUTTON HAPUS =========\\
          const tombolHapus = document.createElement("button");
          tombolHapus.textContent = "Delete";
          tombolHapus.classList.add("btn", "btn-danger"); // Add Bootstrap button classes
          tombolHapus.addEventListener("click", () => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Deleted!',
                  'Your product has been deleted.',
                  'success',
                  deleteData(key)
                )
              }
            })
          });
          tabelKolom.appendChild(tombolHapus);
          row.appendChild(tabelKolom);
          //========= END - MEMBUAT BUTTON HAPUS =========\\
          tabelProduk.appendChild(row);
        }
        index++;
      }
      totalItems = index;
      totalPages = Math.ceil(totalItems / itemsPerPage);
    }
    updatePagination();
  });
}

function showItems(page) {
  currentPage = page;
  // Ambil data dari Firebase
  fetchItems();
}

function createPagination() {
  const pagination = document.getElementById("pagination");
  // Hapus semua elemen pada pagination sebelumnya
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = i;
    link.href = "#";
    link.addEventListener("click", () => showItems(i));
    if (i === currentPage) {
      li.classList.add("active");
    }

    li.appendChild(link);
    pagination.appendChild(li);
  }
}
function updatePagination() {
  createPagination();
}
// Inisialisasi pagination saat halaman dimuat
fetchItems();
//========= END - MEMBUAT TABEL DENGAN PAGINATION=========\\


