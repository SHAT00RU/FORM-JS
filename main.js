// Data untuk rekomendasi nama
const namaList = ["Ahmad", "Budi", "Citra", "Dewi", "Eko", "Farah", "Gilang", "Hana", "Indra", "Joko"];
    
const namaInput = document.getElementById("nama");
const namaSuggestions = document.getElementById("nama-suggestions");

namaInput.addEventListener("input", () => {
  const query = namaInput.value.toLowerCase();
  namaSuggestions.innerHTML = ""; // Bersihkan saran
  if (query) {
    const matches = namaList.filter(name => name.toLowerCase().includes(query));
    matches.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      li.addEventListener("click", () => {
        namaInput.value = name;
        namaSuggestions.innerHTML = "";
      });
      namaSuggestions.appendChild(li);
    });
  }
});

// Data kode pos untuk wilayah
const dataWilayah = {
  "Jawa Tengah": {
    "Semarang": {
      "Banyumanik": "50263",
      "Candisari": "50252"
    },
    "Surakarta": {
      "Jebres": "57126",
      "Laweyan": "57148"
    }
  },
  "Jawa Timur": {
    "Surabaya": {
      "Sukolilo": "60111",
      "Tegalsari": "60262"
    },
    "Malang": {
      "Blimbing": "65126",
      "Klojen": "65116"
    }
  }
};

const provinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const kodeposOutput = document.getElementById("kodepos");

// Isi dropdown provinsi
for (const provinsi in dataWilayah) {
  const option = document.createElement("option");
  option.value = provinsi;
  option.textContent = provinsi;
  provinsiSelect.appendChild(option);
}

// Event ketika provinsi berubah
provinsiSelect.addEventListener("change", () => {
  const provinsi = provinsiSelect.value;
  kabupatenSelect.innerHTML = "<option value=''>Pilih Kabupaten/Kota</option>";
  kecamatanSelect.innerHTML = "<option value=''>Pilih Kecamatan</option>";
  kodeposOutput.textContent = "-";

  if (provinsi) {
    for (const kabupaten in dataWilayah[provinsi]) {
      const option = document.createElement("option");
      option.value = kabupaten;
      option.textContent = kabupaten;
      kabupatenSelect.appendChild(option);
    }
  }
});

// Event ketika kabupaten berubah
kabupatenSelect.addEventListener("change", () => {
  const provinsi = provinsiSelect.value;
  const kabupaten = kabupatenSelect.value;
  kecamatanSelect.innerHTML = "<option value=''>Pilih Kecamatan</option>";
  kodeposOutput.textContent = "-";

  if (kabupaten) {
    for (const kecamatan in dataWilayah[provinsi][kabupaten]) {
      const option = document.createElement("option");
      option.value = kecamatan;
      option.textContent = kecamatan;
      kecamatanSelect.appendChild(option);
    }
  }
});

// Event ketika kecamatan berubah
kecamatanSelect.addEventListener("change", () => {
  const provinsi = provinsiSelect.value;
  const kabupaten = kabupatenSelect.value;
  const kecamatan = kecamatanSelect.value;

  if (kecamatan) {
    kodeposOutput.textContent = dataWilayah[provinsi][kabupaten][kecamatan];
  } else {
    kodeposOutput.textContent = "-";
  }
});