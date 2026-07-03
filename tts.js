
/* =========================================================
   SISTEM TEXT TO SPEECH (TTS)
   Browser SpeechSynthesis
   ========================================================= */

let voices = [];

/* =========================
   LOAD VOICES
========================= */

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

/* Beberapa browser load voice secara async */
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

/* =========================
   UTAMA: FUNGSI SUARA
========================= */

function speakText(text) {

    if (!('speechSynthesis' in window)) {
        alert("Browser tidak mendukung Text-to-Speech");
        return;
    }

    // hentikan suara sebelumnya
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    /* =========================
       SETTING BAHASA INDONESIA
    ========================= */

    utterance.lang = "id-ID";
    utterance.rate = 0.9;   // kecepatan
    utterance.pitch = 1;    // nada
    utterance.volume = 1;   // volume

    // pilih voice Indonesia jika tersedia
    const indoVoice = voices.find(v =>
        v.lang && v.lang.toLowerCase().includes("id")
    );

    if (indoVoice) {
        utterance.voice = indoVoice;
    }

    /* =========================
       TAMBAHAN EFEK SUARA
    ========================= */

    // delay sedikit agar terasa seperti sistem antrian
    setTimeout(() => {
        window.speechSynthesis.speak(utterance);
    }, 300);
}

/* =========================
   GLOBAL ACCESS (dipakai admin.js)
========================= */

window.speakText = speakText;