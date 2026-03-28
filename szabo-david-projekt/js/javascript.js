const cards = document.querySelectorAll('.room-card');

cards.forEach(card => {
    card.addEventListener('click', () => {

        // MINDEN kártya bezárása
        cards.forEach(c => c.classList.remove('active'));

        // csak az aktuális nyíljon ki
        card.classList.add('active');
    });
});




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