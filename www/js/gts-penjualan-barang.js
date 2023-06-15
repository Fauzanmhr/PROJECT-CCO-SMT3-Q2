import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRefs = ref(database, "Data-Penjualan");

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
  onValue(dataRefs, (snapshot) => {
    const items = snapshot.val();
    const tabelProduk = document.getElementById("tabel-costumer");

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

          // NO COSTUMER \\
          const noCos = document.createElement("td");
          noCos.textContent = item.randomcode;
          row.appendChild(noCos);

          // NAMA COSTUMER \\
          const namaCos = document.createElement("td");
          namaCos.textContent = item.namacos;
          row.appendChild(namaCos);

          // NAMA BARANG \\
          const namaBar = document.createElement("td");
          namaBar.textContent = item.nama;
          row.appendChild(namaBar);

           // JUMLAH PRODUK \\
           var jumlahDB = item.jumlah;
           var jumlahitem = formatJumlah(jumlahDB);
           var jumlahProduk = document.createElement("td");
           jumlahProduk.textContent = jumlahitem;
           row.appendChild(jumlahProduk);

          // HARGA PRODUK \\
          var hargaDB = item.harga;
          var hargaRupiah = formatRupiah(hargaDB);
          var hargaProduk = document.createElement("td");
          hargaProduk.textContent = hargaRupiah;
          row.appendChild(hargaProduk);

         

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
          tombolEdit.textContent = "Konfirmasi";
          tombolEdit.classList.add("btn", "btn-info", "me-2");
          tombolEdit.addEventListener("click", () => {
            // Mengarahkan ke halaman edit dengan mengirim key sebagai parameter
            window.location.href = `gts-penjualan-barang.html?key=${key}`;
          });
          tabelKolom.appendChild(tombolEdit);
          //========= END - MEMBUAT BUTTON EDIT =========\\

          row.appendChild(tabelKolom);
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


//========= START - MEMBUAT FUNGSI UNTUK MENDAPATKAN KEY DARI HALAMAN CEK BARANG =========\\
// Mendapatkan key dari URL
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get("key");

// Mendapatkan data berdasarkan key
const dataRef = ref(database, `Data-Penjualan/${key}`);
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();

  // Mengisi nilai awal pada form dengan data yang akan diedit
  document.getElementById("noPesanan").value = data.randomcode;
  document.getElementById("namaCos").value = data.namacos;
  document.getElementById("namaBar").value = data.nama;
  document.getElementById("hargaBar").value = data.harga;
  document.getElementById("jumBar").value = data.jumlah;
  document.getElementById("stabar").value = data.status;
});
//========= END - MEMBUAT FUNGSI UNTUK MENDAPATKAN KEY DARI HALAMAN CEK BARANG =========\\


//========= START - MEMBUAT FUNGSI UNTUK MENGUPDATE DATA PADA HALAMAN CEK BARANG =========\\
let updateButton = document.getElementById("gts-konfirmasi");

updateButton.addEventListener("click", (e) => {
  
  e.preventDefault();
  const nopes = document.getElementById("noPesanan").value;
  const namcos = document.getElementById("namaCos").value;
  const name = document.getElementById("namaBar").value;
  const harga = document.getElementById("hargaBar").value;
  const jumlah = document.getElementById("jumBar").value;
  const status = document.getElementById("stabar").value;


  Swal.fire({
    title: 'Are you sure?',
    text: "Want to confirm data costumer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Confirm it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Confirm successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        const newData = {
          randomcode: nopes,
          nama: name,
          namacos: namcos,
          harga: harga,
          jumlah: jumlah,
          status: status,
        };
        updateData(key, newData);
        window.location = "gts-penjualan-barang.html"; // Redirecting to other page.
      });
      
    }
  })


});

// Memperbarui data berdasarkan key
function updateData(key, newData) {
  update(ref(database, `Data-Penjualan/${key}`), newData)
    .then(() => {
    
    })
    .catch((error) => {
      console.error("Gagal memperbarui data:", error);
    });
}
//========= END - MEMBUAT FUNGSI UNTUK MENGUPDATE DATA PADA HALAMAN CEK BARANG =========\\