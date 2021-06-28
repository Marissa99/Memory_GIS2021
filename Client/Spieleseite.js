"use strict";
//EventListender für die Memory Karten
let rückseiten = document.getElementsByClassName("Rückseite"); //auf Image umschreiben
for (let i = 0; i < 16; i++) { //soll auf alle 16 Karten den Listener anwenden
    rückseiten[i].addEventListener("click", bildAufdecken); //Zugriff auf das einzelen Element und Anwendung von Listener
}
let anzahlOffeneKarten = 0;
console.log("Top");
//Funktion Memory Karten aufdecken beim anklicken
function bildAufdecken(_event) {
    console.log("Top");
    let geklicktesBild = _event.target; //Objekt welches geklickt wurde --> bekommmt Image
    geklicktesBild.style.display = "none"; //oben schon in Image umgeschrieben
    anzahlOffeneKarten = anzahlOffeneKarten + 1; //lokal Variable immer um 1 erhöhen um max 2 zu erfassen
    console.log(anzahlOffeneKarten);
    if (anzahlOffeneKarten == 2) {
        anzahlOffeneKarten = 0;
    }
}
//# sourceMappingURL=Spieleseite.js.map