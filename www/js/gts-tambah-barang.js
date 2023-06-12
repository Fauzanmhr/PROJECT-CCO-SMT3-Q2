// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { getDatabase, ref as r, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


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
const gambarRef = r(database, 'Data-Produk');

// Tambah data
let tambahButton = document.getElementById("tambah");

tambahButton.addEventListener("click", (e) => {
  const nama = document.getElementById('namabar').value;
  const harga = document.getElementById('hrgbar').value;
  const status = document.getElementById('stsbar').value;
  const jumlah = document.getElementById('jmlhbar').value;
  const file = document.getElementById('gambar-input').files[0];

  if (file && nama && harga && status && jumlah) {
    const storageRef = ref(storage, 'Data-Produk/' + file.name);

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
              url: url
            })
              .then(() => {
                console.log('Gambar berhasil diunggah');
                document.getElementById('namabar').value = '';
                document.getElementById('hrgbar').value = '';
                document.getElementById('stsbar').value = '';
                document.getElementById('jmlhbar').value = '';
                document.getElementById('gambar-input').value = '';
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

  // if (nama && harga && status && jumlah) {
  //   const newDataRef = push(dataRef);
  //   set(newDataRef, {
  //     nama: nama,
  //     harga: harga,
  //     status: status,
  //     jumlah: jumlah
  //   })
  //     .then(() => {
  //       console.log('Data berhasil ditambahkan');
  //       document.getElementById('namabar').value = '';
  //       document.getElementById('hrgbar').value = '';
  //       document.getElementById('stsbar').value = '';
  //       document.getElementById('jmlhbar').value = '';
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  // if (file) {
  //   const storageRef = ref(storage, 'gambar/' + file.name);

  //   uploadBytes(storageRef, file)
  //     .then(() => {
  //       getDownloadURL(storageRef)
  //         .then((url) => {
  //           const gambarDataRef = push(gambarRef);
  //           set(gambarDataRef, {
  //             nama: file.name,
  //             url: url
  //           })
  //             .then(() => {
  //               console.log('Gambar berhasil diunggah');
  //               document.getElementById('gambar-input').value = '';
  //             })
  //             .catch((error) => {
  //               console.error('Error:', error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.error('Error:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

 
  
);
