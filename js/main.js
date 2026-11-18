// JavaScript portofolio Meta Dwi Putri Lestari
// Versi optimasi performa — dipasang di semua halaman dengan defer

/* ============================================================
   1. DAFTAR KEAHLIAN (hanya halaman Beranda)
   ============================================================ */
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const skills = await response.json();

    // Gunakan DocumentFragment agar DOM hanya di-update sekali
    const frag = document.createDocumentFragment();
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      frag.appendChild(item);
    });
    daftarSkill.appendChild(frag);

    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill) muatKeahlian();

/* ============================================================
   2. TEMA GELAP (semua halaman)
   ============================================================ */
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  // Pulihkan tema dari localStorage agar tidak "flash" saat reload
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode Terang";
  }

  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    const isGelap = document.body.classList.contains("gelap");
    tombolTema.textContent = isGelap ? "Mode Terang" : "Mode Gelap";
    localStorage.setItem("tema", isGelap ? "gelap" : "terang");
  });
}

/* ============================================================
   3. PENGHITUNG KARAKTER PESAN (halaman Kontak)
   ============================================================ */
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

/* ============================================================
   4. DAFTAR PROYEK + FILTER (halaman Proyek)
   ============================================================ */
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

let proyek = [];

function tampilkanProyek(data) {
  daftarProyek.innerHTML = "";

  // DocumentFragment: kurangi reflow/repaint
  const frag = document.createDocumentFragment();

  data.forEach((item, index) => {
    const kartu = document.createElement("article");
    kartu.classList.add("kartu-proyek");

    const gambar = document.createElement("img");
    gambar.src = item.gambar;
    gambar.alt = item.alt;
    // ✅ Cegah layout shift: beri ukuran eksplisit
    gambar.width = 400;
    gambar.height = 200;
    // ✅ Gambar pertama dimuat prioritas, sisanya lazy
    if (index === 0) {
      gambar.fetchPriority = "high";
    } else {
      gambar.loading = "lazy";
    }
    gambar.decoding = "async";

    const judul = document.createElement("h3");
    judul.textContent = item.judul;

    const kategori = document.createElement("p");
    kategori.textContent = item.kategori;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = item.deskripsi;

    kartu.append(gambar, judul, kategori, deskripsi);
    frag.appendChild(kartu);
  });

  daftarProyek.appendChild(frag);
  jumlahProyek.textContent = `Ada ${data.length} proyek.`;
}

function pasangFilter(id, kategori) {
  const tombol = document.querySelector(id);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    // Tandai tombol aktif
    document.querySelectorAll(".tombol-filter").forEach((b) =>
      b.classList.remove("aktif")
    );
    tombol.classList.add("aktif");

    const hasil =
      kategori === "Semua"
        ? proyek
        : proyek.filter((item) => item.kategori === kategori);

    tampilkanProyek(hasil);
  });
}

async function muatProyek() {
  try {
    jumlahProyek.textContent = "Memuat proyek...";
    const response = await fetch("data/proyek.json");
    if (!response.ok) throw new Error(`Status ${response.status}`);
    proyek = await response.json();
    tampilkanProyek(proyek);
  } catch (error) {
    jumlahProyek.textContent = "Daftar proyek gagal dimuat.";
    console.error("Error:", error);
  }
}

if (daftarProyek) {
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-javascript", "JavaScript");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-html", "HTML");
  muatProyek();
}

/* ============================================================
   5. REPOSITORI GITHUB — LAZY LOAD via IntersectionObserver
   ============================================================ */
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";
  try {
    const response = await fetch(
      "https://api.github.com/users/metarpl176-sketch/repos?sort=updated&per_page=6"
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const repos = await response.json();

    const frag = document.createDocumentFragment();
    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = repo.name;
      item.appendChild(tautan);
      frag.appendChild(item);
    });

    daftarRepo.appendChild(frag);
    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent = "Daftar repositori gagal dimuat.";
    console.error("Error:", error);
  }
}

if (daftarRepo) {
  // ✅ Hanya panggil API saat section repo hampir terlihat di layar
  const sectionRepo = daftarRepo.closest("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ambilRepo();
          observer.disconnect();
        }
      });
    },
    { rootMargin: "200px" }
  );
  observer.observe(sectionRepo);
}

/* ============================================================
   6. FITUR TAMBAH KEAHLIAN (Halaman Beranda)
   ============================================================ */
const tombolSkill = document.querySelector("#tombol-skill");
const inputSkill = document.querySelector("#input-skill");
const levelBaru = document.querySelector("#level-baru");
const pesanSkill = document.querySelector("#pesan-skill");

// Pastikan elemen ada sebelum menjalankan fungsi (agar tidak error di halaman lain)
if (tombolSkill && daftarSkill) {
  tombolSkill.addEventListener("click", () => {
    const namaSkill = inputSkill.value.trim();
    const levelSkill = levelBaru.value;

    // Validasi: Cek apakah input kosong
    if (namaSkill === "") {
      pesanSkill.textContent = "Nama keahlian tidak boleh kosong!";
      pesanSkill.style.color = "#E63946"; // Warna merah
      return; // Hentikan proses
    }

    // 1. Buat elemen list baru
    const itemBaru = document.createElement("li");
    itemBaru.textContent = `${namaSkill} (${levelSkill})`;

    // 2. Tambahkan ke daftar di HTML
    daftarSkill.appendChild(itemBaru);

    // 3. Update jumlah keahlian (hitung jumlah <li> di dalam <ul>)
    const totalSkillSekarang = daftarSkill.children.length;
    jumlahSkill.textContent = `Ada ${totalSkillSekarang} keahlian yang sedang saya kembangkan.`;

    // 4. Reset form dan beri pesan sukses
    inputSkill.value = ""; // Kosongkan input
    levelBaru.value = "Pemula"; // Kembalikan ke default
    pesanSkill.textContent = "Keahlian berhasil ditambahkan!";
    pesanSkill.style.color = "green";
    
    // Hilangkan pesan setelah 3 detik
    setTimeout(() => {
        pesanSkill.textContent = "";
    }, 3000);
  });
}