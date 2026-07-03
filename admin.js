
/* =========================================================
   SISTEM ANTRIAN - ADMIN LOGIC
   admin.js
   ========================================================= */

/* =========================
   STATE
========================= */

let state = {
    currentStart: 1,
    currentEnd: 10
};

/* =========================
   LOAD STATE
========================= */

function loadState() {

    const data = localStorage.getItem("antrian_state");

    if (data) {
        state = JSON.parse(data);
    }

    updateUI();
}

/* =========================
   SAVE STATE
========================= */

function saveState() {
    localStorage.setItem("antrian_state", JSON.stringify(state));
}

/* =========================
   UPDATE DISPLAY ADMIN
========================= */

function updateUI() {

    const el = document.getElementById("currentNumber");

    el.innerText = `${state.currentStart} - ${state.currentEnd}`;
}

/* =========================
   UPDATE KE DISPLAY TV
========================= */

function syncToDisplay() {
    saveState();
}

/* =========================
   FORMAT TEKS UNTUK TTS
========================= */

function getTTSMessage() {

    return `Antrian selanjutnya, nomor antrian ${numberToWords(state.currentStart)} sampai nomor antrian ${numberToWords(state.currentEnd)}`;
}

/* =========================
   KONVERSI ANGKA KE TEKS INDONESIA
========================= */

function numberToWords(num) {

    const satuan = [
        "", "satu", "dua", "tiga", "empat", "lima",
        "enam", "tujuh", "delapan", "sembilan", "sepuluh",
        "sebelas"
    ];

    if (num < 12) return satuan[num];

    if (num < 20) return numberToWords(num - 10) + " belas";

    if (num < 100) {
        return numberToWords(Math.floor(num / 10)) + " puluh " + numberToWords(num % 10);
    }

    if (num === 100) return "seratus";

    if (num < 200) {
        return "seratus " + numberToWords(num - 100);
    }

    if (num < 1000) {
        return numberToWords(Math.floor(num / 100)) + " ratus " + numberToWords(num % 100);
    }

    return num.toString();
}

/* =========================
   NEXT (MAJU 10 NOMOR)
========================= */

function nextQueue() {

    if (state.currentEnd >= 500) return;

    state.currentStart += 10;
    state.currentEnd += 10;

    if (state.currentEnd > 500) {
        state.currentEnd = 500;
    }

    syncToDisplay();
    updateUI();

    speakQueue();
}

/* =========================
   PREV (KEMBALI 10 NOMOR)
========================= */

function prevQueue() {

    if (state.currentStart <= 1) return;

    state.currentStart -= 10;
    state.currentEnd -= 10;

    if (state.currentStart < 1) {
        state.currentStart = 1;
        state.currentEnd = 10;
    }

    syncToDisplay();
    updateUI();

    speakQueue();
}

/* =========================
   REPEAT
========================= */

function repeatQueue() {
    speakQueue();
}

/* =========================
   RESET
========================= */

function resetQueue() {

    state.currentStart = 1;
    state.currentEnd = 10;

    syncToDisplay();
    updateUI();

    speakQueue();
}

/* =========================
   SPEAK TTS
========================= */

function speakQueue() {

    const msg = getTTSMessage();

    if (window.speakText) {
        window.speakText(msg);
    }
}

/* =========================
   INIT
========================= */

loadState();