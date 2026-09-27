import { Tamagotchi } from './tamagotchi.js';

class TamagotchiGame {
    constructor() {
        this.pet = null;
        this.foodInBowl = 'empty';
        this.selectedType = '';
        this.gameInterval = null;
        this.ageInterval = null;

        this.petTypes = ['kutya', 'macska', 'hörcsög'];
        this.petImages = { kutya: 'img/dog.png', macska: 'img/cat.png', hörcsög: 'img/hamster.png' };
        this.dirtyPetImages = { kutya: 'img/dog_d.png', macska: 'img/cat_d.png', hörcsög: 'img/hamster_d.png' };
        this.drinkBowlImages = { filled: 'img/water_full.png', empty: 'img/water_empty.png' };
        this.foodBowlImages = { carrot: 'img/bowl_carrot.png', apple: 'img/bowl_apple.png', empty: 'img/bowl_empty.png' };

        this.initDomElements();
        this.initEventListeners();
        this.checkExistingGame();
    }
    // Inicializálja a játékot és a DOM elemeket
    initDomElements() {
        this.dom = {
            petNames: document.getElementById('pet-names'),
            petSelection: document.getElementById('pet-selection'),
            setupScreen: document.getElementById('setup-screen'),
            gameScreen: document.getElementById('game-screen'),
            drinkBowlImage: document.getElementById('drink-bowl-image'),
            petName: document.getElementById('pet-name'),
            petImage: document.getElementById('pet-image'),
            foodBowlImage: document.getElementById('food-bowl-image'),
            carrotCount: document.getElementById('carrot-count'),
            appleCount: document.getElementById('apple-count'),
            litterBox: document.getElementById('litter-box'),
            time: document.getElementById('time'),
            nameInput: document.getElementById('name'),
            okNameBtn: document.getElementById('ok-name-btn'),
            cancelNameBtn: document.getElementById('cancel-name-btn')
        };
    }
    // Inicializálja az eseményfigyelőket a DOM elemekhez
    initEventListeners() {
        window.drag = (e) => e.dataTransfer.setData("food", e.target.alt);
        window.allowDrop = (e) => e.preventDefault();
        window.drop = (e) => {
            e.preventDefault();
            const food = e.dataTransfer.getData("food");
            if (food === 'Répa') this.changeFoodBowl('carrot');
            if (food === 'Alma') this.changeFoodBowl('apple');
        };

        window.changeFoodBowl = (food) => this.changeFoodBowl(food);
        window.eatFood = () => this.eatFood();
        window.waterFill = () => { if (this.dom.drinkBowlImage) this.dom.drinkBowlImage.src = this.drinkBowlImages.filled; };
        window.waterempty = () => { if (this.dom.drinkBowlImage) this.dom.drinkBowlImage.src = this.drinkBowlImages.empty; };
        window.drink = () => this.drink();

        window.dragaction = (e) => e.dataTransfer.setData("action", e.target.alt);
        window.allowDropaction = (e) => e.preventDefault();
        window.dropaction = (e) => {
            e.preventDefault();
            const action = e.dataTransfer.getData("action");
            if (action === 'Tisztítás') this.clean();
            if (action === 'Játszik') this.play();
        };

        window.play = () => this.play();
        window.clean = () => this.clean();
        window.buying = () => this.buying();
        window.useLitterBox = () => this.useLitterBox();

        if (this.dom.okNameBtn) {
            this.dom.okNameBtn.onclick = () => {
                if (this.dom.petNames) this.dom.petNames.style.display = 'none';
                const nameInput = this.dom.nameInput ? this.dom.nameInput.value.trim() : '';
                
                this.pet = new Tamagotchi(this.selectedType, nameInput);
                this.pet.isStarted = true;

                if (this.dom.okNameBtn) this.dom.okNameBtn.style.display = 'none';
                if (this.dom.cancelNameBtn) this.dom.cancelNameBtn.style.display = 'none';

                this.pet.save();
                this.startGame();
            };
        }

        if (this.dom.cancelNameBtn) {
            this.dom.cancelNameBtn.onclick = () => {
                if (this.dom.petNames) this.dom.petNames.style.display = 'none';
                if (this.dom.petSelection) this.dom.petSelection.style.display = 'flex';
            };
        }

        this.petTypes.forEach(type => {
            const selectButton = document.createElement('button');
            selectButton.innerText = type.charAt(0).toUpperCase() + type.slice(1);
            selectButton.id = type;

            selectButton.onclick = () => {
                this.selectedType = type;
                if (this.dom.petNames) this.dom.petNames.style.display = 'block';
                if (this.dom.petSelection) this.dom.petSelection.style.display = 'none';
            };

            if (this.dom.petSelection) this.dom.petSelection.appendChild(selectButton);
        });

        setInterval(() => {
            if (this.dom.time) this.dom.time.innerText = new Date().toLocaleTimeString();
        }, 1000);

        setInterval(() => this.changeBackgroundBySunSchedule(), 60000);
    }
    // Ellenőrzi, hogy van-e mentett játék a localStorage-ben és betölti azt, ha van
    checkExistingGame() {
        const loadedPet = Tamagotchi.load();
        if (loadedPet) {
            this.pet = loadedPet;
            this.startGame();
        }
    }
    // Elindítja a játékot és beállítja az időzített eseményeket
    startGame() {
        if (this.dom.setupScreen) this.dom.setupScreen.style.display = 'none';
        if (this.dom.gameScreen) this.dom.gameScreen.style.display = 'block';

        if (this.dom.petName) this.dom.petName.innerText = this.pet.name.charAt(0).toUpperCase() + this.pet.name.slice(1);
        if (this.dom.petImage) this.dom.petImage.src = this.pet.dirty ? this.dirtyPetImages[this.pet.type] : this.petImages[this.pet.type];

        this.updateUI();
        this.updateFoodCount();
        this.updateCoins();
        this.updateLitterBox();
        this.changeBackgroundBySunSchedule();

        this.gameInterval = setInterval(() => {
            this.pet.tick();

            if (this.pet.isDead()) {
                this.die();
                return;
            }

            this.updateUI();
            this.updateLitterBox();
            this.pet.save();
        }, 3000);

        this.ageInterval = setInterval(() => {
            this.pet.age += 1;
            this.pet.coins += 10;
            this.updateCoins();
            this.updateUI();
            this.pet.save();
        }, 120000);
    }
    // A házikedvenc halála esetén végrehajtandó műveletek
    die() {
        clearInterval(this.gameInterval);
        clearInterval(this.ageInterval);
        Tamagotchi.removeSave();

        if (this.dom.gameScreen) this.dom.gameScreen.style.display = 'none';

        let gameOverScreen = document.getElementById('game-over-screen');
        if (!gameOverScreen) {
            gameOverScreen = document.createElement('div');
            gameOverScreen.id = 'game-over-screen';
            gameOverScreen.innerHTML = `
                <h2>A házikedvenced elpusztult! 💀</h2>
                <p>Sajnos nem élte túl a megpróbáltatásokat...</p>
                <button id="new-game-btn">Új játék</button>
            `;
            document.body.appendChild(gameOverScreen);
        } else {
            gameOverScreen.style.display = 'flex';
        }

        document.getElementById('new-game-btn').onclick = () => {
            gameOverScreen.style.display = 'none';
            this.pet = null;

            if (this.dom.setupScreen) this.dom.setupScreen.style.display = 'flex';
            if (this.dom.petSelection) this.dom.petSelection.style.display = 'flex';
            if (this.dom.petNames) this.dom.petNames.style.display = 'none';
            if (this.dom.nameInput) this.dom.nameInput.value = '';
            if (this.dom.okNameBtn) this.dom.okNameBtn.style.display = 'inline-block';
            if (this.dom.cancelNameBtn) this.dom.cancelNameBtn.style.display = 'inline-block';
        };
    }

    // Étel tálcájának megváltoztatása
    changeFoodBowl(food) {
        if (food === 'carrot' && this.pet.carrotCount <= 0) return;
        if (food === 'apple' && this.pet.appleCount <= 0) return;
        if (this.dom.foodBowlImage) {
            this.dom.foodBowlImage.src = this.foodBowlImages[food];
            this.foodInBowl = food;
        }
    }

    // A házikedvenc étkezése
    eatFood() {
        if (this.foodInBowl === 'empty') return;
        
        const success = this.pet.feed(this.foodInBowl);
        if (success) {
            this.foodInBowl = 'empty';
            if (this.dom.foodBowlImage) this.dom.foodBowlImage.src = this.foodBowlImages.empty;
            this.updateFoodCount();
            this.updateUI();
            this.pet.save();
        }
    }

    // A házikedvenc ivása
    drink() {
        if (this.dom.drinkBowlImage && this.dom.drinkBowlImage.src !== this.drinkBowlImages.empty) {
            if (this.pet.drink()) {
                window.waterempty();
                this.updateUI();
                this.pet.save();
            }
        }
    }

    // A házikedvenc játéka
    play() {
        if (this.pet.play()) {
            if (this.dom.petImage) this.dom.petImage.src = this.dirtyPetImages[this.pet.type];
            this.updateUI();
            this.pet.save();
        }
    }

    // A házikedvenc tisztítása
    clean() {
        if (this.pet.clean()) {
            if (this.dom.petImage) this.dom.petImage.src = this.petImages[this.pet.type];
            this.updateUI();
            this.pet.save();
        }
    }

    // Étel vásárlása
    buying() {
        if (this.pet.buyFood()) {
            this.updateFoodCount();
            this.updateCoins();
            this.pet.save();
        }
    }

    // Litter box használata
    useLitterBox() {
        if (this.pet.useLitterBox()) {
            this.updateUI();
            this.pet.save();
        }
    }

    // Étel mennyiségének frissítése a UI-ban
    updateFoodCount() {
        if (this.dom.carrotCount) this.dom.carrotCount.innerText = this.pet.carrotCount;
        if (this.dom.appleCount) this.dom.appleCount.innerText = this.pet.appleCount;
    }

    // Érmék mennyiségének frissítése a UI-ban
    updateCoins() {
        const coinsCount = document.getElementById('coins-count');
        if (coinsCount) coinsCount.innerText = this.pet.coins;
    }

    // A házikedvenc állapotának frissítése a UI-ban
    updateUI() {
        const h = document.getElementById('hunger');
        const t = document.getElementById('thirst');
        const b = document.getElementById('happiness');
        const a = document.getElementById('age');
        const w = document.getElementById('weight');
        const he = document.getElementById('health');

        if (h) h.innerText = this.pet.hunger;
        if (t) t.innerText = this.pet.thirst;
        if (b) b.innerText = this.pet.happiness;
        if (a) a.innerText = 'Kor: ' + this.pet.age;
        if (w) w.innerText = 'Súly: ' + this.pet.weight;
        if (he) he.innerText = 'Egészség: ' + this.pet.health;
    }

    // Litter box állapotának frissítése a UI-ban
    updateLitterBox() {
        if (this.dom.litterBox) {
            this.dom.litterBox.style.backgroundImage = this.pet.foodEatenCount >= 3 ? "url('img/litter_f.png')" : "url('img/litter_e.png')";
        }
    }

    // A háttér megváltoztatása a napkelte és napnyugta ütemezése alapján
    async changeBackgroundBySunSchedule() {
        try {
            const response = await fetch('napjaras.json');
            const data = await response.json();
            const now = new Date();
            const schedule = data.monthly[now.getMonth() + 1] || data.default;

            const [riseHour, riseMin] = schedule.sunrise.split(':').map(Number);
            const [setHour, setMin] = schedule.sunset.split(':').map(Number);

            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const sunriseMinutes = riseHour * 60 + riseMin;
            const sunsetMinutes = setHour * 60 + setMin;

            if (this.dom.gameScreen) {
                this.dom.gameScreen.style.backgroundImage = (currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes) 
                    ? "url('img/bg-day.jpeg')" : "url('img/bg-night.jpeg')";
            }
        } catch {
            const hour = new Date().getHours();
            if (this.dom.gameScreen) {
                this.dom.gameScreen.style.backgroundImage = (hour >= 6 && hour < 18) ? "url('img/bg-day.jpeg')" : "url('img/bg-night.jpeg')";
            }
        }
    }
}

// Alkalmazás indítása
document.addEventListener('DOMContentLoaded', () => {
    window.game = new TamagotchiGame();
});