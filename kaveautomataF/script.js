let egyenleg = 0;
let visszajaro = 0;
let penztarcaertek = 800;

const drink = document.querySelector('.coffee-empty');
const kijelzo = document.getElementById('kijelzo');

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