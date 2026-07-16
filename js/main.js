// =======================================
// DocAssist AI+
// main.js
// =======================================

// Display welcome message
window.addEventListener("load", () => {
    console.log("Welcome to DocAssist AI+");
});

// ===============================
// Smooth Scroll for Navigation
// ===============================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Ignore links to other pages
        if (href.endsWith(".html")) return;

        // Ignore empty links
        if (href === "#") return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// Hero Button Effects
// ===============================

const startBtn = document.querySelector(".start-btn");
const doctorBtn = document.querySelector(".doctor-btn");

if (startBtn) {
    startBtn.addEventListener("mouseenter", () => {
        startBtn.style.transform = "scale(1.05)";
    });

    startBtn.addEventListener("mouseleave", () => {
        startBtn.style.transform = "scale(1)";
    });
}

if (doctorBtn) {
    doctorBtn.addEventListener("mouseenter", () => {
        doctorBtn.style.transform = "scale(1.05)";
    });

    doctorBtn.addEventListener("mouseleave", () => {
        doctorBtn.style.transform = "scale(1)";
    });
}

// ===============================
// Feature Card Animation
// ===============================

const cards = document.querySelectorAll(".feature-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow =
            "0 10px 25px rgba(37,99,235,0.25)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.08)";

    });

});