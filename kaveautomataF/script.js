let egyenleg = 0;
let visszajaro = 0;
let penztarcaertek = 825;

const drink = document.querySelector('.coffee-empty');
const kijelzo = document.getElementById('kijelzo');
const ermek = document.querySelectorAll('.erme');
const bedoboRekesz = document.getElementById('bedobo-rekesz');

function bedob(ertek) {
    if (ertek == 5) {
        alert("Az 5 Ft-os érmét nem fogadjuk el!");
    } else {
        if (penztarcaertek < ertek) {
            alert("Nincs elég pénz a pénztárcában!");
            return;
        }
        egyenleg += ertek;
        penztarcaertek -= ertek;
        document.getElementById('penztarca-ertek').innerText = penztarcaertek + " Ft";
        kijelzo.innerText = egyenleg + " Ft";
    }
}

function valasztas(ital, ar) {
    if (egyenleg >= ar) {
        egyenleg -= ar;
        visszajaro = egyenleg;
        egyenleg = 0;
        kijelzo.innerText = "Kávé folyamatban...";
        drink.classList.add('coffee-liquid');
        document.getElementById('visszajaro-rekesz').innerText = "Visszajáró: " + visszajaro + " Ft";
        setTimeout(() => {
            kijelzo.innerText = "A kávé elkészült";
        }, 3000);
    } else {
        alert("Nincs elég pénz!");
    }
}

function kiveszVisszajaro() {
    alert("Kivetted a visszajárót: " + visszajaro + " Ft");
    penztarcaertek += visszajaro;
    document.getElementById('penztarca-ertek').innerText = penztarcaertek + " Ft";
    visszajaro = 0;
    document.getElementById('visszajaro-rekesz').innerText = "Rekesz";
}

drink.addEventListener('click', () => {
    if (kijelzo.innerText === "A kávé elkészült") {
        drink.classList.remove('coffee-liquid');
        document.querySelector('.cup').style.background = "#999";
        kijelzo.innerText = "0 Ft";
    }
});

ermek.forEach(erme => {
    erme.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', erme.innerText);
    });
});

bedoboRekesz.addEventListener('dragover', (e) => {
    e.preventDefault();
});

bedoboRekesz.addEventListener('drop', (e) => {
    e.preventDefault();
    const ertek = parseInt(e.dataTransfer.getData('text/plain'));
    bedob(ertek);
});
