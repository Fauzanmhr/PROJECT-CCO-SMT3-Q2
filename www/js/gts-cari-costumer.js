import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, query, orderByChild, startAt, endAt, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, "Data-Penjualan");


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

// Get search input element
const searchInput = document.getElementById("cariin");
const searchButton = document.getElementById("btn-cari");

// Get search results table body
const searchResults = document.getElementById("items").getElementsByTagName("tbody")[0];

// Listen to search button click event
searchButton.addEventListener("click", handleSearch);

// Handle search function
async function handleSearch() {
  event.preventDefault();
  const searchTerm = searchInput.value;

  // Clear previous search results
  searchResults.innerHTML = "";

  // Create a query for searching in Firebase
  const searchQuery = query(dataRef, orderByChild("namacos"), startAt(searchTerm), endAt(searchTerm + "\uf8ff"));

  try {
    // Perform the search in Firebase
    const snapshot = await get(searchQuery);
    const data = snapshot.val();

    if (data) {
      // Display search results
      Object.entries(data).forEach(([key, value]) => {
        const row = document.createElement("tr");
    

        // NO COSTUMER \\
        const noCos = document.createElement("td");
        noCos.textContent = value.randomcode;
        row.appendChild(noCos);

        // NAMA COSTUMER \\
        const namaCos = document.createElement("td");
        namaCos.textContent = value.namacos;
        row.appendChild(namaCos);

        // NAMA COSTUMER \\
        const namaBar = document.createElement("td");
        namaBar.textContent = value.nama;
        row.appendChild(namaBar);

    
        // JUMLAH PRODUK \\
        var jumlahDB = value.jumlah;
        var jumlahitem = formatJumlah(jumlahDB);
        var jumlahProduk = document.createElement("td");
        jumlahProduk.textContent = jumlahitem;
        row.appendChild(jumlahProduk);

        // HARGA PRODUK \\
        var hargaDB = value.harga;
        var hargaRupiah = formatRupiah(hargaDB);
        var hargaProduk = document.createElement("td");
        hargaProduk.textContent = hargaRupiah;
        row.appendChild(hargaProduk);

        // STATUS PRODUK \\
        const statusProduk = document.createElement("td");
        statusProduk.textContent = value.status;
        row.appendChild(statusProduk);

        // GAMBAR PRODUK \\
        if (value.url) {
          const gambarProduk = document.createElement("td");
          const tampilGambar = document.createElement("img");
          tampilGambar.src = value.url;
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
        
        searchResults.appendChild(row);
      });
    } else {
      // Display message if no results found
      const row = document.createElement("tr");
      const noResultsCell = document.createElement("td");

      noResultsCell.textContent = "No results found.";
      noResultsCell.colSpan = 2;

      row.appendChild(noResultsCell);
      searchResults.appendChild(row);
    }
  } catch (error) {
    console.error("Error retrieving search results:", error);
  }
}
