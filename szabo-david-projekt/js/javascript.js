// Kártyák
const cards = document.querySelectorAll('.room-card');

cards.forEach(card => {
    card.addEventListener('click', () => {

        // MINDEN kártya bezárása
        cards.forEach(c => c.classList.remove('active'));

        // csak az aktuális nyíljon ki
        card.classList.add('active');
    });
});

// Slideshow
function nextImage(slideshow) {
    const images = slideshow.querySelectorAll('img');

    let currentIndex = 0;

    images.forEach((image, index) => {
        if (!image.classList.contains('hide')) {
            currentIndex = index;
        }
        image.classList.add('hide');
    });

    let nextIndex = (currentIndex + 1) % images.length;
    images[nextIndex].classList.remove('hide');
}

// Kapcsolat űrlap
function contactFunction() {
    if (document.getElementById("contact-name").value == "" ||
        document.getElementById("contact-email").value == "" ||
        document.getElementById("contact-message").value == "") {
        alert("Kérem, töltse ki az összes mezőt!");
        return;
    }
    alert("Köszönjük, hogy kapcsolatba lépett velünk! Hamarosan felvesszük Önnel a kapcsolatot.");
}

// Foglalás űrlap
function rentFunction() {
    if (document.getElementById("name").value == "" ||
        document.getElementById("email").value == "" ||
        document.getElementById("arrival").value == "" ||
        document.getElementById("departure").value == "" ||
        document.getElementById("guests").value == "" ||
        document.getElementById("roomtype").value == "") {
        alert("Kérem, töltse ki az összes mezőt!");
        return;
    } else if (!document.getElementById("terms").checked) {
        alert("Kérem, fogadja el a feltételeket!");
        return;
    }
    alert("Köszönjük, hogy lefoglalta a szobát! Hamarosan felvesszük Önnel a kapcsolatot.");
}