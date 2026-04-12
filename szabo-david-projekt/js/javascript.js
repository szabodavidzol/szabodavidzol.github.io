
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

function checkVideo() {
  const video = document.getElementById('myVideo');
  const source = document.getElementById('videoSource');
  const currentSrc = source.getAttribute('src');
  
  // Ha 768px alatt vagyunk, legyen a mobil videó
  if (window.innerWidth <= 768) {
    if (currentSrc !== 'media/ad_3.mp4') {
      source.setAttribute('src', 'media/ad_3.mp4');
      video.load(); // Frissíteni kell a lejátszót!
    }
  } else {
    // Ha felette, akkor az asztali
    if (currentSrc !== 'media/ad.mp4') {
      source.setAttribute('src', 'media/ad.mp4');
      video.load();
    }
  }
}

// Figyeli az átméretezést és az oldalbetöltést
window.addEventListener('resize', checkVideo);
window.addEventListener('load', checkVideo);