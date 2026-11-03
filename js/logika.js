// Soal 1 : Ganjil atau Genap
function ganjilGenap(angka) {
  if (angka % 2 === 0) {
    return "Genap";
  } else {
    return "Ganjil";
  }
}
//Pengujian fungsi ganjilGenap
console.log("Soal 1: Ganjil atau Genap");
console.log(`ganjilGenap(5) = ${ganjilGenap(5)}`); // Ganjil
console.log(`ganjilGenap(8) = ${ganjilGenap(8)}`); // Genap


// Soal 2:Celsius ke Fahrenheit
const celsiusToFahrenheit = (celsius) => {return celsius * 9/5 + 32;};
//Pengujian fungsi celsiusToFahrenheit
console.log("Soal 2: Celsius ke Fahrenheit");
console.log(`0 Celsius = ${celsiusToFahrenheit(0)} Fahrenheit`);
console.log(`100 Celsius = ${celsiusToFahrenheit(100)} Fahrenheit`);
console.log(`-40 Celsius = ${celsiusToFahrenheit(-40)} Fahrenheit`);

// Soal 3: Nilai terbesar
function nilaiTerbesar(a, b, c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}
//Pengujian fungsi nilaiTerbesar
console.log("Soal 3: Nilai terbesar");
console.log(`nilaiTerbesar(5, 10, 3) = ${nilaiTerbesar(5, 10, 3)}`); // 10
console.log(`nilaiTerbesar(15, 8, 12) = ${nilaiTerbesar(15, 8, 12)}`); // 15
console.log(`nilaiTerbesar(7, 7, 7) = ${nilaiTerbesar(7, 7, 7)}`); // 7


// Soal 4: Tahun Kabisat
function tahunKabisat(tahun) {
    if ((tahun % 4 === 0 && tahun % 100 !== 0) || (tahun % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}
//Pengujian fungsi tahunKabisat
console.log("Soal 4: Tahun Kabisat");
console.log(`tahunKabisat(2020) = ${tahunKabisat(2020)}`); // true
console.log(`tahunKabisat(1900) = ${tahunKabisat(1900)}`); // false
console.log(`tahunKabisat(2000) = ${tahunKabisat(2000)}`); // true
console.log(`tahunKabisat(2021) = ${tahunKabisat(2021)}`); // false


// Soal 5: Harga Setelah Diskon
function hargaSetelahDiskon(total) {
    if (total > 200000) {
        return total - (total * 20 / 100); // Diskon 20%
    } else if (total > 100000) {
        return total - (total * 10 / 100); // Diskon 10%
    } else {
        return total; // Tidak ada diskon
    }
}
//Pengujian fungsi hargaSetelahDiskon
console.log("Soal 5: Harga Setelah Diskon");
console.log(`hargaSetelahDiskon(250000) = ${hargaSetelahDiskon(250000)}`); // 200000
console.log(`hargaSetelahDiskon(150000) = ${hargaSetelahDiskon(150000)}`); // 135000
console.log(`hargaSetelahDiskon(80000) = ${hargaSetelahDiskon(80000)}`); // 80000