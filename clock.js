// clock.js

function updateClock() {
    const jamEl = document.getElementById("jam");
    const tanggalEl = document.getElementById("tanggal");

    const now = new Date();

    jamEl.innerText = now.toLocaleTimeString("id-ID");

    tanggalEl.innerText = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

updateClock();
setInterval(updateClock, 1000);