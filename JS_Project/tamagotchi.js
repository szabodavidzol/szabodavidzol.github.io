export class Tamagotchi {
    constructor(type, name = '') {
        const defaultNames = { kutya: 'Kutyus', macska: 'Cicus', hörcsög: 'Hörcsög' };
        
        this.type = type;
        this.name = name === '' ? (defaultNames[type] || 'Kisállat') : name;
        this.hunger = 100;
        this.thirst = 100;
        this.happiness = 100;
        this.health = 100;
        this.weight = 5;
        this.age = 0;
        this.coins = 10;
        this.foodEatenCount = 0;
        this.carrotCount = 10;
        this.appleCount = 10;
        this.isStarted = false;
        this.dirty = false;
    }
    // Etetés után végrehajtandó műveletek
    feed(foodType) {
        if (foodType === 'carrot' && this.carrotCount > 0 && this.hunger < 100) {
            this.hunger = Math.min(100, this.hunger + 5);
            this.carrotCount -= 1;
            this.afterEat();
            return true;
        }
        if (foodType === 'apple' && this.appleCount > 0 && this.hunger < 100) {
            this.hunger = Math.min(100, this.hunger + 10);
            this.appleCount -= 1;
            this.afterEat();
            return true;
        }
        return false;
    }

    afterEat() {
        this.weight += 1;
        this.happiness = Math.min(100, this.happiness + 2);
        this.foodEatenCount += 1;
    }
    // Ivás után végrehajtandó műveletek
    drink() {
        if (this.thirst < 100) {
            this.thirst = Math.min(100, this.thirst + 10);
            this.happiness = Math.min(100, this.happiness + 1);
            return true;
        }
        return false;
    }
    // Játék után végrehajtandó műveletek
    play() {
        if (this.happiness < 100) {
            this.happiness = Math.min(100, this.happiness + 10);
            this.health = Math.max(0, this.health - 1);
            this.dirty = true;
            return true;
        }
        return false;
    }

    // Tisztítás után végrehajtandó műveletek
    clean() {
        if (!this.dirty) return false;
        this.happiness = Math.min(100, this.happiness + 5);
        this.dirty = false;
        return true;
    }

    // Étel vásárlása után végrehajtandó műveletek
    buyFood() {
        if (this.coins >= 10) {
            this.coins -= 10;
            this.carrotCount += 10;
            this.appleCount += 10;
            return true;
        }
        return false;
    }

    // Litter box használata után végrehajtandó műveletek
    useLitterBox() {
        if (this.foodEatenCount >= 3) {
            this.weight = Math.max(2, this.weight - 2);
            this.happiness = Math.min(100, this.happiness + 1);
            this.foodEatenCount = 0;
            return true;
        }
        return false;
    }

    // Időzített események (tick) végrehajtása minden periódusban
    tick() {
        this.hunger = Math.max(0, this.hunger - 1);
        this.thirst = Math.max(0, this.thirst - 1);
        this.happiness = Math.max(0, this.happiness - 1);

        if (this.hunger < 20 || this.thirst < 20 || this.happiness < 20) {
            this.health = Math.max(0, this.health - 5);
        } else if (this.hunger >= 80 && this.thirst >= 80 && this.happiness >= 80) {
            this.health = Math.min(100, this.health + 5);
        }
    }
    // Ellenőrzi, hogy a házikedvenc meghalt-e
    isDead() {
        return this.health <= 0 || this.hunger <= 0 || this.thirst <= 0 || this.happiness <= 0;
    }
    // Mentés a localStorage-be
    save() {
        localStorage.setItem('tamagotchi_pet', JSON.stringify(this));
    }
    // Betöltés a localStorage-ből
    static load() {
        const saved = localStorage.getItem('tamagotchi_pet');
        if (!saved) return null;
        const data = JSON.parse(saved);
        if (!data.isStarted) return null;

        const pet = new Tamagotchi(data.type, data.name);
        Object.assign(pet, data);
        return pet;
    }

    // Mentés törlése a localStorage-ből
    static removeSave() {
        localStorage.removeItem('tamagotchi_pet');
    }
}