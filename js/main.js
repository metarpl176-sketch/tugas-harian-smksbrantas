// JavaScript portofolio Meta Dwi Putri Lestari
// Dipasang diketiga halaman dengan defer

// 1. Daftar keahlian (halaman Beranda), data dari data / keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
    try {
        const response = await fetch("data/keahlian.json");
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }
        const skills = await response.json();
        skills.forEach((skill) => {
            const item = document.createElement("li");
            item.textContent = `${skill.nama} (${skill.level})`;
            daftarSkill.appendChild(item);
        });
        jumlahSkill.textContent = `Ada ${skills.length} keahlian yang 
sedang saya kembangkan.`;
    } catch (error) {
        jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
        console.error(error);
    }
}
if (daftarSkill) {
    muatKeahlian();
}
// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
    tombolTema.addEventListener("click", () => {
        document.body.classList.toggle("gelap");

        if (document.body.classList.contains("gelap")) {
            tombolTema.textContent = "Mode Terang";
        } else {
            tombolTema.textContent = "Mode Gelap";
        }
    });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan) {
    kotakPesan.addEventListener("input", () => {
        hitungKarakter.textContent = `${kotakPesan.value.length}/300 
karakter`;
    });
}

// 4. Daftar proyek dan filter (halaman proyek)
const proyek = [
    {
        judul: "Halaman Profil Pertama",
        kategori: "HTML",
        gambar: "img/proyek-profil.png",
        alt: "Tangkapan layar halaman profil Meta Dwi Putri Lestari",
        deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar",
    },
    {
        judul: "Form Kontak",
        kategori: "HTML",
        gambar: "img/proyek-kontak.png",
        alt: "Tangkapan layar form kontak berisi lima isian",
        deskripsi: "Form dengan label dan validasi bawaan browser.",
    },
    {
        judul: "Tabel Jadwal Belajar",
        kategori: "HTML",
        gambar: "img/proyek-jadwal.png",
        alt: "Tangkapan layar tabel jadwal belajar mandiri",
        deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
    },
    {
        judul: "Portofolio Responsive",
        kategori: "CSS",
        gambar: "img/responsive-design.png",
        alt: "Tangkapan layar halaman portofolio Meta Dwi Putri Lestari",
        deskripsi: "Halaman portofolio yang responsif dengan CSS Flexbox.",
    },
    {
        judul: "Kalkulator Nilai Rapor",
        kategori: "JavaScript",
        gambar: "img/proyek-kalkulator.png",
        alt: "Tangkapan layar kalkulator nilai rapor",
        deskripsi: "Kalkulator sederhana untuk menghitung nilai rapor.",
    },
    {
        judul: "Lima Soal Logika",
        kategori: "JavaScript",
        gambar: "img/proyek-logika.png",
        alt: "Tangkapan layar hasil uji lima soal logika",
        deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
    },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
function buatKartu(item) {
    return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>`;
}
function tampilkanProyek(daftar) {
    const semuaKartu = daftar.map((item) => buatKartu(item));
    daftarProyek.innerHTML = semuaKartu.join("");
    jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);
    tombol.addEventListener("click", () => {
        // Menghapus warna merah dari tombol sebelumnya
        document.querySelector(".tombol-filter.aktif")
            ?.classList.remove("aktif");

        // Memberikan warna merah pada tombol yang diklik
        tombol.classList.add("aktif");

        // Menampilkan proyek sesuai kategori
        if (kategori === "Semua") {
            tampilkanProyek(proyek);
        } else {
            tampilkanProyek(proyek.filter((item) =>
                item.kategori === kategori
            ));
        }
    });
}


if (daftarProyek) {
    tampilkanProyek(proyek);
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-javascript", "JavaScript");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-html", "HTML");
}




// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "metarpl176-sketch";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
async function ambilRepo() {
    const response = await fetch(alamatRepo + pilihan);
    const repos = await response.json();
    console.log(repos);
}
if (daftarRepo) {
    ambilRepo();
}
async function ambilRepo() {
    const response = await fetch(alamatRepo + pilihan);
    const repos = await response.json();
    repos.forEach((repo) => {
        const item = document.createElement("li");
        const tautan = document.createElement("a");
        tautan.href = repo.html_url;
        tautan.target = "_blank";
        tautan.textContent = repo.name;
        item.appendChild(tautan);
        daftarRepo.appendChild(item);
    });
    statusRepo.textContent = `${repos.length} repositori yang terakhir 
diperbarui:`;
}
async function ambilRepo() {
    statusRepo.textContent = "Memuat...";
    const response = await fetch(alamatRepo + pilihan);
    const repos = await response.json();
}
async function ambilRepo() {
    statusRepo.textContent = "Memuat...";
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
        statusRepo.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
        return;
    }

    try {
        const response = await fetch(alamatRepo + pilihan);
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }
        const repos = await response.json();
        repos.forEach((repo) => {
            const item = document.createElement("li");
            const tautan = document.createElement("a");
            tautan.href = repo.html_url;
            tautan.target = "_blank";
            tautan.textContent = repo.name;
            item.appendChild(tautan);
            daftarRepo.appendChild(item);
        });
        statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
    } catch (error) {
        statusRepo.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
        console.error("Error:", error);
    }
}