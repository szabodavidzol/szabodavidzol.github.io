const cards = document.querySelectorAll('.room-card');

cards.forEach(card => {
    card.addEventListener('click', () => {

        // MINDEN kártya bezárása
        cards.forEach(c => c.classList.remove('active'));

        // csak az aktuális nyíljon ki
        card.classList.add('active');
    });
});