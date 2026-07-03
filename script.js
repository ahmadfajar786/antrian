/* =========================================================
   SISTEM ANTRIAN - DISPLAY SCRIPT
   script.js
   ========================================================= */

/* =========================
   STATE DEFAULT
========================= */

let state = {
    currentStart: 1,
    currentEnd: 10,
    lastUpdate: null
};

/* =========================
   LOAD DARI LOCALSTORAGE
========================= */

function loadState() {

    const data = localStorage.getItem("antrian_state");

    if (data) {
        state = JSON.parse(data);
    }

    updateDisplay();
}

/* =========================
   SIMPAN STATE
========================= */

function saveState() {
    localStorage.setItem("antrian_state", JSON.stringify(state));
}

/* =========================
   UPDATE DISPLAY NOMOR
========================= */

function updateDisplay() {

    const nomor = document.getElementById("nomor");
    const status = document.getElementById("status");

    nomor.innerText = `${state.currentStart} - ${state.currentEnd}`;

    nomor.classList.remove("fade");
    void nomor.offsetWidth;
    nomor.classList.add("fade");

    status.innerText = "Menunggu Pemanggilan...";
}

/* =========================
   LISTEN PERUBAHAN LOCALSTORAGE
========================= */

window.addEventListener("storage", (e) => {

    if (e.key === "antrian_state") {
        loadState();
    }

});

/* =========================
   JAM DIGITAL
========================= */

function updateClock() {

    const jamEl = document.getElementById("jam");
    const tanggalEl = document.getElementById("tanggal");

    const now = new Date();

    const jam = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const tanggal = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    jamEl.innerText = jam;
    tanggalEl.innerText = tanggal;
}

/* =========================
   AUTO REFRESH LOOP
========================= */

setInterval(updateClock, 1000);

/* =========================
   INIT
========================= */

loadState();
updateClock();