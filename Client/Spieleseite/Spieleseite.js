"use strict";
//EventListener für die Memory Karten Rückseite
let picturesCollection = document.getElementsByClassName("Bild"); //muss der Collection sagen das es Images sind
for (let i = 0; i < 16; i++) { //soll auf alle 16 Karten den Listener anwenden
    picturesCollection[i].addEventListener("click", pictureDiscover); //Zugriff auf das einzelne Element der Bilder und Anwendung von Listener
}
let listFrontClicked = []; //leeres Array um die umgedrehten Karten/ Memory Bilder zu speichern
let listPictruresAll = []; //leeres Array um alle Memory Bidler zu spreichern
let dateTimeBegin; //Variable um Startzeit zu speichern
let dateTimeEnd; //Variable um Endzeit zu speichern
let pairs = 0; // Variable: Anzahl der Paare
let clicks = 0; //Variable der Cklicks
for (let item of document.getElementsByClassName("Bild")) { //collection der Vorderseite/ Memory Bilder durchgehen
    listPictruresAll.push(item); // jedes einzeln in Liste speichern
}
//Funktion Bilder aus DB holen und random anordnen
initMemory();
async function initMemory() {
    let daten = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url = "http://localhost:8100"; //um es lokas zu testen
    url += "/bilder"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort = await fetch(url);
    console.log(antwort);
    console.log(await antwort.text());
    console.log(await antwort.json());
    /* while() {
         console.log();
     }*/
} //Ende Funktion initMemory
//Funktion Memory Karten aufdecken und vergleichen und Start/Endzeit Funktion aufrufen
function pictureDiscover(_event) {
    startTimeifClickZero(); //Aufrufen der Zeit starten Funktion
    let clickedPicture = _event.target; //Objekt welches geklickt wurde --> bekommmt Image
    if (listFrontClicked.length < 2) { //solange in der Liste der Memory Bilder noch keine 2 Bilder vorhanden sind
        listFrontClicked.push(clickedPicture); //Element in Liste  speichern
        clickedPicture.style.opacity = "100%"; //Rückseite einblenden
    }
    if (listFrontClicked.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)
        if (listFrontClicked[0].src != listFrontClicked[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            setTimeout(pictureCoverUp, 2000); //ruft die Funktion bilderZudecken erst nach 5sec auf
        }
        else { //wenn die Bilder gleich sind
            listFrontClicked = []; //Liste leeren
        }
    }
}
//Funktion Bilder zudecken
function pictureCoverUp() {
    listFrontClicked.forEach(element => {
        element.style.opacity = "0%"; //dann geklicktes Element/ Memory Bild ausblenden -->Rückseite wird sichtbar
    });
    listFrontClicked = []; //Liste leeren um neuen Zug starten zu können
}
//Funktion Zeit starten
function startTimeifClickZero() {
    if (clicks == 0) { //Startzeit bei 0 clicks beginnen
        dateTimeBegin = new Date(); //um die Startzeit zu speichern
        console.log(dateTimeBegin.getTime()); //Zur Kontrolle in Konsole ausgeben -->in ms angeben
    }
    clicks = clicks + 1; //hochzählen der Clicks
}
//Funktion Endzeit des Spieles
function endTimeif8Pairs() {
    if (pairs == 8) {
        dateTimeEnd = new Date();
        console.log();
    }
}
//Funktion automatisches Wieterleitan auf die Spielergebnis Seite
//# sourceMappingURL=Spieleseite.js.map