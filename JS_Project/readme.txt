Tamagocsi Klón (JavaScript)

Interaktív, webes alapú Tamagocsi klón JavaScript, HTML és CSS technológiákkal.
Vigyázz a kisállatodra, etesd, itasd, játssz vele, és tartsd tisztán, hogy ne pusztuljon el!

 Választható Állatok

Kutya (Alapértelmezett név: Kutyus)
Macska (Alapértelmezett név: Cicus)
Hörcsög (Alapértelmezett név: Hörcsög)

 Állat Statisztikák

Éhség: Idővel folyamatosan csökken, etetéssel növelhető.
Szomjúság: Idővel csökken, itatással növelhető.
Boldogság: Játékkal és törődéssel tartható fenn.
Egészség: Ha a többi statisztika kritikusan alacsonyra süllyed, az egészség csökkenni kezd. 0-nál az állat elpusztul.
Súly: Etetéssel növekszik, az alom használatával csökkenthető.
Kor: Idővel folyamatosan növekvő mutató.

 Fő Funkciók és Interakciók

Etetés: Többféle étel közül választhatsz, amelyek különböző pontértékkel bírnak. Csökkenti az éhséget, növeli a súlyt és a boldogságot. Az étel közvetlenül ráhúzható az állatra (Drag & Drop).
Itatás: Csökkenti a szomjúságot és növeli a boldogságot.
Játék: Labdával való játék, ami növeli a boldogságpontokat, de az állat koszosabb lesz tőle.
Tisztítás: Eltünteti a koszosságot és növeli a boldogságot.
Alom: Bizonyos mennyiségű elfogyasztott étel után az almot ki kell takarítani, ami csökkenti a súlyt és növeli a boldogságot.

 Kiemelt Technikai Jellemzők (Features)

Objektumorientált Programozás (OOP): A kód tiszta OOP elvek alapján épül fel. A Tamagotchi osztály felel az állat állapotáért és belső logikájáért (egységbezárás), míg a TamagotchiGame osztály vezérli a DOM-ot, az időzítőket és a felhasználói interakciókat.

Modern Modularitás: A forráskód ES6 modulokra (import és export) van bontva, szétválasztva a modellt a vezérlőtől, ami strukturálttá és könnyen bővíthetővé teszi a projektet.

Dinamikus UI: A választógombok és a Game Over / "New Game" képernyő dinamikusan, JavaScript createElement metódusával jön létre.

Perzisztencia: A játékállás automatikusan mentésre kerül a böngésző localStorage-ébe, így oldalújratöltés után is zökkenőmentesen folytatható.

Dinamikus Háttér: A napszaknak megfelelően változik a háttér egy segéd .json fájból napjárás alapján változtatja de van alapértelmezett napszakváltás is reggel 6-tól este 6-ig nappali háttérkép.

Egyedi Névadás: Az állatok elnevezhetők, üres hagyás esetén pedig automatikus alapértelmezett nevet kapnak.

Coin Rendszer: Játékon belüli valuta, amely az állat születésnapján (korának növekedésekor) automatikusan növekszik, és ételek vásárlására szolgál.